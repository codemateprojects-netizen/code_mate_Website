/**
 * Syjen Code API server.
 *
 *  - POST /api/inquiries  → validates, stores, and (optionally) forwards form submissions
 *  - GET  /api/health     → liveness check
 *  - Serves the built frontend from /dist with SPA fallback (production)
 *
 * Runs directly on Node ≥ 22.18 (native TypeScript type-stripping):
 *   node server/index.ts
 */
import express, { type NextFunction, type Request, type Response } from 'express'
import { randomUUID } from 'node:crypto'
import { existsSync } from 'node:fs'
import { appendFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateInquiry, type InquiryPayload } from '../shared/inquiry.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const config = {
  port: Number(process.env.PORT) || 8787,
  storePath: process.env.INQUIRY_STORE_PATH || path.join(root, 'server', 'data', 'inquiries.jsonl'),
  resendApiKey: process.env.RESEND_API_KEY || '',
  notifyTo: process.env.INQUIRY_TO_EMAIL || '',
  notifyFrom: process.env.INQUIRY_FROM_EMAIL || '',
  webhookUrl: process.env.INQUIRY_WEBHOOK_URL || '',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean),
  trustProxy: process.env.TRUST_PROXY === 'true',
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX) || 5,
  rateLimitWindowMs: (Number(process.env.RATE_LIMIT_WINDOW_MINUTES) || 10) * 60_000,
  minFillMs: 3000,
  distDir: path.join(root, 'dist'),
}

const app = express()
app.disable('x-powered-by')
if (config.trustProxy) app.set('trust proxy', 1)

// ── Security headers ───────────────────────────────────────────
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  next()
})

// ── CORS (only needed when the frontend is hosted on another origin) ──
app.use('/api', (req, res, next) => {
  const origin = req.headers.origin
  if (origin && config.allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  }
  if (req.method === 'OPTIONS') return void res.sendStatus(204)
  next()
})

app.use('/api', express.json({ limit: '24kb' }))

// ── Rate limiting (in-memory, per IP) ──────────────────────────
const hits = new Map<string, number[]>()
function rateLimit(req: Request, res: Response, next: NextFunction) {
  const key = req.ip || 'unknown'
  const now = Date.now()
  const recent = (hits.get(key) || []).filter((t) => now - t < config.rateLimitWindowMs)
  if (recent.length >= config.rateLimitMax) {
    res.setHeader('Retry-After', String(Math.ceil(config.rateLimitWindowMs / 1000)))
    return void res.status(429).json({ ok: false, error: 'Too many submissions. Please try again later.' })
  }
  recent.push(now)
  hits.set(key, recent)
  next()
}
setInterval(() => {
  const now = Date.now()
  for (const [k, v] of hits) if (v.every((t) => now - t > config.rateLimitWindowMs)) hits.delete(k)
}, 60_000).unref()

// ── Delivery ───────────────────────────────────────────────────
const typeLabel: Record<InquiryPayload['type'], string> = {
  project: 'Project inquiry',
  consultation: 'Consultation request',
  demo: 'Product demo request',
  marketing: 'Marketing proposal request',
  careers: 'Careers — expression of interest',
}

function formatText(id: string, d: InquiryPayload): string {
  const rows: [string, string | undefined][] = [
    ['Type', typeLabel[d.type]],
    ['Name', d.name],
    ['Email', d.email],
    ['Company', d.company],
    ['Website', d.website],
    ['Service', d.service],
    ['Project stage', d.stage],
    ['Budget', d.budget],
    ['Timeline', d.timeline],
    ['Product', d.product],
    ['Marketing service', d.marketingService],
    ['Preferred time', d.preferredTime],
    ['Area of interest', d.careerArea],
    ['Profile URL', d.profileUrl],
    ['Submitted from', d.sourcePath],
  ]
  const lines = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)
  return `${lines.join('\n')}\n\nMessage:\n${d.message || '—'}\n\nReference: ${id}`
}

async function store(record: object) {
  await mkdir(path.dirname(config.storePath), { recursive: true })
  await appendFile(config.storePath, JSON.stringify(record) + '\n', 'utf8')
}

async function sendEmail(id: string, d: InquiryPayload) {
  if (!config.resendApiKey || !config.notifyTo || !config.notifyFrom) return false
  const subject = `${typeLabel[d.type]} — ${d.name}${d.company ? ` (${d.company})` : ''}`.replace(/[\r\n]+/g, ' ')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.resendApiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: config.notifyFrom,
      to: config.notifyTo.split(',').map((s) => s.trim()),
      reply_to: d.email,
      subject: subject.slice(0, 200),
      text: formatText(id, d),
    }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`Resend responded ${res.status}`)
  return true
}

async function sendWebhook(id: string, d: InquiryPayload) {
  if (!config.webhookUrl) return false
  const res = await fetch(config.webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...d, text: formatText(id, d) }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
  return true
}

// ── Routes ─────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/inquiries', rateLimit, async (req, res) => {
  const result = validateInquiry(req.body)
  if (!result.ok) return void res.status(422).json({ ok: false, error: 'Please correct the highlighted fields.', fieldErrors: result.errors })

  const { hp, fillMs, ...data } = result.data

  // Honeypot filled → silently accept without storing (do not tip off bots).
  if (hp) return void res.json({ ok: true, id: randomUUID() })
  if (typeof fillMs === 'number' && fillMs < config.minFillMs) {
    return void res.status(400).json({ ok: false, error: 'That was quick! Please review your details and submit again.' })
  }

  const id = randomUUID()
  const record = { id, receivedAt: new Date().toISOString(), ...data }

  const outcomes = await Promise.allSettled([store(record), sendEmail(id, data), sendWebhook(id, data)])
  const [stored, emailed, hooked] = outcomes
  outcomes.forEach((o, i) => {
    if (o.status === 'rejected') console.error(`[inquiry ${id}] ${['store', 'email', 'webhook'][i]} failed:`, o.reason)
  })

  const delivered =
    stored.status === 'fulfilled' ||
    (emailed.status === 'fulfilled' && emailed.value) ||
    (hooked.status === 'fulfilled' && hooked.value)

  if (!delivered) {
    return void res.status(502).json({ ok: false, error: 'We could not record your message. Please email us directly.' })
  }
  console.log(`[inquiry ${id}] ${data.type} from ${data.email}`)
  res.status(201).json({ ok: true, id })
})

app.use('/api', (_req, res) => {
  res.status(404).json({ ok: false, error: 'Not found' })
})

// ── Static frontend (production) ───────────────────────────────
if (existsSync(config.distDir)) {
  // Hashed build assets can be cached forever; everything else briefly.
  app.use('/assets', express.static(path.join(config.distDir, 'assets'), { immutable: true, maxAge: '1y' }))
  app.use(express.static(config.distDir, { index: false, maxAge: '1h' }))
  app.get('/{*splat}', (_req, res) => res.sendFile(path.join(config.distDir, 'index.html')))
}

// Malformed JSON and other errors.
// Express identifies error handlers by their four-argument signature.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error & { status?: number }, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status && err.status < 500 ? err.status : 500
  if (status === 500) console.error(err)
  res.status(status).json({ ok: false, error: status === 500 ? 'Unexpected server error.' : 'Invalid request.' })
})

app.listen(config.port, () => {
  const channels = [
    'file store',
    config.resendApiKey && config.notifyTo ? 'email (Resend)' : '',
    config.webhookUrl ? 'webhook' : '',
  ].filter(Boolean)
  console.log(`Syjen Code API listening on http://localhost:${config.port} — delivery: ${channels.join(', ')}`)
})
