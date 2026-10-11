/**
 * Vercel serverless entry for POST /api/inquiries.
 *
 * Source of truth for the function — `npm run build:api` bundles this file
 * (with its imports) into api/inquiries.js, which Vercel deploys.
 * Vercel's filesystem is ephemeral, so delivery is by email and/or webhook.
 */
import type { IncomingMessage, ServerResponse } from 'node:http'
import { createRateLimiter, deliveryFromEnv, handleInquiry } from './inquiries.ts'

const limiter = createRateLimiter()
const delivery = deliveryFromEnv()

type VercelRequest = IncomingMessage & { body?: unknown }

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.end(JSON.stringify(body))
}

async function readBody(req: VercelRequest): Promise<unknown> {
  if (req.body !== undefined) return typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  let raw = ''
  for await (const chunk of req) {
    raw += chunk
    if (raw.length > 24_000) throw new Error('too large')
  }
  return JSON.parse(raw || 'null')
}

export default async function handler(req: VercelRequest, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return send(res, 405, { ok: false, error: 'Method not allowed' })
  }
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()
  if (!limiter.allow(forwarded || String(req.headers['x-real-ip'] || 'unknown'))) {
    res.setHeader('Retry-After', String(Math.ceil(limiter.windowMs / 1000)))
    return send(res, 429, { ok: false, error: 'Too many submissions. Please try again later.' })
  }
  let input: unknown
  try {
    input = await readBody(req)
  } catch {
    return send(res, 400, { ok: false, error: 'Invalid request.' })
  }
  const { status, body } = await handleInquiry(input, delivery)
  send(res, status, body)
}
