import { site } from '../config/site'
import type { FieldName, InquiryPayload } from '../../shared/inquiry.ts'

export type SubmitResult =
  | { ok: true; id: string }
  | { ok: false; error: string; fieldErrors?: Partial<Record<FieldName | 'form', string>>; unreachable?: boolean }

/**
 * Posts an inquiry to the configured endpoint.
 * Success is reported ONLY when the endpoint answers with JSON `{ ok: true }`.
 * Anything else (network error, HTML fallback page, non-2xx) is a failure.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<SubmitResult> {
  let res: Response
  try {
    res = await fetch(site.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    })
  } catch {
    return { ok: false, unreachable: true, error: 'We could not reach our server. Please check your connection or email us directly.' }
  }

  let body: unknown = null
  try {
    body = await res.json()
  } catch {
    return { ok: false, unreachable: true, error: 'Our form service is not available right now. Please email us directly.' }
  }

  const data = body as { ok?: boolean; id?: string; error?: string; fieldErrors?: Record<string, string> }
  if (res.ok && data?.ok === true) return { ok: true, id: data.id ?? '' }
  return {
    ok: false,
    error: data?.error || 'Something went wrong. Please try again.',
    fieldErrors: data?.fieldErrors,
    unreachable: res.status >= 500 || res.status === 404,
  }
}
