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
import { existsSync } from 'node:fs'
import { appendFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRateLimiter, deliveryFromEnv, handleInquiry, type DeliveryConfig } from './inquiries.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const config = {
  port: Number(process.env.PORT) || 8787,
  storePath: process.env.INQUIRY_STORE_PATH || path.join(root, 'server', 'data', 'inquiries.jsonl'),
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean),
  trustProxy: process.env.TRUST_PROXY === 'true',
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

// ── Rate limiting & submissions (logic shared with the Vercel function) ──
const limiter = createRateLimiter()
const delivery: DeliveryConfig = {
  ...deliveryFromEnv(),
  store: async (record) => {
    await mkdir(path.dirname(config.storePath), { recursive: true })
    await appendFile(config.storePath, JSON.stringify(record) + '\n', 'utf8')
  },
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/inquiries', async (req, res) => {
  if (!limiter.allow(req.ip || 'unknown')) {
    res.setHeader('Retry-After', String(Math.ceil(limiter.windowMs / 1000)))
    return void res.status(429).json({ ok: false, error: 'Too many submissions. Please try again later.' })
  }
  const { status, body } = await handleInquiry(req.body, delivery)
  res.status(status).json(body)
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
    delivery.resendApiKey && delivery.notifyTo ? 'email (Resend)' : '',
    delivery.webhookUrl ? 'webhook' : '',
  ].filter(Boolean)
  console.log(`Syjen Code API listening on http://localhost:${config.port} — delivery: ${channels.join(', ')}`)
})
