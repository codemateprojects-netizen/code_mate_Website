/**
 * Runtime-independent inquiry handling, shared by the Express server
 * (server/index.ts) and the Vercel serverless function (server/vercel.ts).
 */
import { randomUUID } from 'node:crypto'
import { validateInquiry, type InquiryPayload } from '../shared/inquiry.ts'

export interface DeliveryConfig {
  resendApiKey: string
  notifyTo: string
  notifyFrom: string
  webhookUrl: string
  minFillMs: number
  /** Optional persistent store (the Express server appends to a JSONL file). */
  store?: (record: Record<string, unknown>) => Promise<void>
}

export const deliveryFromEnv = (): Omit<DeliveryConfig, 'store'> => ({
  resendApiKey: process.env.RESEND_API_KEY || '',
  notifyTo: process.env.INQUIRY_TO_EMAIL || '',
  notifyFrom: process.env.INQUIRY_FROM_EMAIL || '',
  webhookUrl: process.env.INQUIRY_WEBHOOK_URL || '',
  minFillMs: 3000,
})

export const hasRemoteDelivery = (c: DeliveryConfig) => !!((c.resendApiKey && c.notifyTo && c.notifyFrom) || c.webhookUrl)

/* ───────────── Rate limiting (in-memory, per key) ───────────── */

export function createRateLimiter(max = Number(process.env.RATE_LIMIT_MAX) || 5, windowMs = (Number(process.env.RATE_LIMIT_WINDOW_MINUTES) || 10) * 60_000) {
  const hits = new Map<string, number[]>()
  return {
    windowMs,
    /** Records a hit; returns false when the key is over the limit. */
    allow(key: string) {
      const now = Date.now()
      if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t > windowMs)) hits.delete(k)
      const recent = (hits.get(key) || []).filter((t) => now - t < windowMs)
      if (recent.length >= max) return false
      recent.push(now)
      hits.set(key, recent)
      return true
    },
  }
}

/* ───────────── Formatting & delivery ───────────── */

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

async function sendEmail(c: DeliveryConfig, id: string, d: InquiryPayload) {
  if (!c.resendApiKey || !c.notifyTo || !c.notifyFrom) return false
  const subject = `${typeLabel[d.type]} — ${d.name}${d.company ? ` (${d.company})` : ''}`.replace(/[\r\n]+/g, ' ')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${c.resendApiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: c.notifyFrom,
      to: c.notifyTo.split(',').map((s) => s.trim()),
      reply_to: d.email,
      subject: subject.slice(0, 200),
      text: formatText(id, d),
    }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`Resend responded ${res.status}`)
  return true
}

async function sendWebhook(c: DeliveryConfig, id: string, d: InquiryPayload) {
  if (!c.webhookUrl) return false
  const res = await fetch(c.webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...d, text: formatText(id, d) }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
  return true
}

/* ───────────── Request handling ───────────── */

export interface HandlerResult {
  status: number
  body: Record<string, unknown>
}

/**
 * Validates and delivers one submission. Responds `ok: true` only when at
 * least one delivery channel (store, email or webhook) actually succeeded.
 */
export async function handleInquiry(input: unknown, c: DeliveryConfig): Promise<HandlerResult> {
  const result = validateInquiry(input)
  if (!result.ok) return { status: 422, body: { ok: false, error: 'Please correct the highlighted fields.', fieldErrors: result.errors } }

  const { hp, fillMs, ...data } = result.data

  // Honeypot filled → silently accept without delivering (do not tip off bots).
  if (hp) return { status: 200, body: { ok: true, id: randomUUID() } }
  if (typeof fillMs === 'number' && fillMs < c.minFillMs) {
    return { status: 400, body: { ok: false, error: 'That was quick! Please review your details and submit again.' } }
  }

  if (!c.store && !hasRemoteDelivery(c)) {
    console.error('[inquiry] no delivery channel configured (set RESEND_* or INQUIRY_WEBHOOK_URL)')
    return { status: 503, body: { ok: false, error: 'Our form service is not set up yet. Please email us directly.' } }
  }

  const id = randomUUID()
  const record = { id, receivedAt: new Date().toISOString(), ...data }
  const names = ['store', 'email', 'webhook']
  const outcomes = await Promise.allSettled([c.store ? c.store(record).then(() => true) : Promise.resolve(false), sendEmail(c, id, data), sendWebhook(c, id, data)])
  outcomes.forEach((o, i) => {
    if (o.status === 'rejected') console.error(`[inquiry ${id}] ${names[i]} failed:`, o.reason)
  })

  if (!outcomes.some((o) => o.status === 'fulfilled' && o.value)) {
    return { status: 502, body: { ok: false, error: 'We could not record your message. Please email us directly.' } }
  }
  console.log(`[inquiry ${id}] ${data.type} from ${data.email}`)
  return { status: 201, body: { ok: true, id } }
}
