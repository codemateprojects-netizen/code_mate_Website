/**
 * Inquiry schema shared by the browser forms and the Express API.
 * Uses only erasable TypeScript so Node can run it directly.
 */

export const inquiryTypes = ['project', 'consultation', 'demo', 'marketing', 'careers'] as const
export type InquiryType = (typeof inquiryTypes)[number]

export const serviceOptions = [
  'Software Development',
  'AI and RAG',
  'AI Agents and Automation',
  'Mobile App Development',
  'Web Development',
  'Cloud and DevOps',
  'Data Engineering',
  'Digital Marketing',
  'Product Development',
  'Other',
] as const

export const projectStageOptions = [
  'Idea',
  'Planning',
  'In Development',
  'Ready to Launch',
  'Existing Product Needing Improvement',
  'Marketing and Growth',
] as const

export const budgetOptions = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
  'Not sure yet',
] as const

export const timelineOptions = [
  'As soon as possible',
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  'Flexible / still exploring',
] as const

export const productOptions = ['SyjenHire', 'SyjenEvilo', 'Buddy AI'] as const

export const marketingServiceOptions = [
  'Search Engine Optimization',
  'Social Media Marketing',
  'Performance Marketing',
  'Content Marketing',
  'Branding and Creative Design',
  'Lead Generation',
  'Email Marketing',
  'Analytics and Growth',
  'Influencer and Creator Marketing',
  'Not sure — I need a strategy',
] as const

export const careerAreaOptions = [
  'Software Engineering',
  'AI and Data',
  'Design',
  'Digital Marketing',
  'Other',
] as const

export interface InquiryPayload {
  type: InquiryType
  name: string
  email: string
  company?: string
  website?: string
  service?: string
  stage?: string
  budget?: string
  timeline?: string
  product?: string
  marketingService?: string
  preferredTime?: string
  careerArea?: string
  profileUrl?: string
  message?: string
  consent: boolean
  /** Honeypot — must stay empty. */
  hp?: string
  /** Milliseconds between rendering and submitting the form (time trap; clock-independent). */
  fillMs?: number
  /** Page the form was submitted from. */
  sourcePath?: string
}

export type FieldName = Exclude<keyof InquiryPayload, 'type' | 'hp' | 'fillMs' | 'sourcePath'>

/** Required fields for each inquiry type (consent is always required). */
export const requiredFields: Record<InquiryType, FieldName[]> = {
  project: ['name', 'email', 'company', 'service', 'stage', 'message'],
  consultation: ['name', 'email', 'message'],
  demo: ['name', 'email', 'company', 'product'],
  marketing: ['name', 'email', 'company', 'marketingService', 'message'],
  careers: ['name', 'email', 'careerArea', 'message'],
}

const allowedOptions: Partial<Record<FieldName, readonly string[]>> = {
  service: serviceOptions,
  stage: projectStageOptions,
  budget: budgetOptions,
  timeline: timelineOptions,
  product: productOptions,
  marketingService: marketingServiceOptions,
  careerArea: careerAreaOptions,
}

const maxLength: Partial<Record<FieldName, number>> = {
  name: 100,
  email: 254,
  company: 140,
  website: 300,
  preferredTime: 200,
  profileUrl: 300,
  message: 5000,
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidUrl(value: string): boolean {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
    return /\./.test(url.hostname)
  } catch {
    return false
  }
}

const label: Record<FieldName, string> = {
  name: 'Full name',
  email: 'Email',
  company: 'Company name',
  website: 'Website URL',
  service: 'Required service',
  stage: 'Project stage',
  budget: 'Estimated budget',
  timeline: 'Expected timeline',
  product: 'Product',
  marketingService: 'Marketing service',
  preferredTime: 'Preferred time',
  careerArea: 'Area of interest',
  profileUrl: 'Portfolio or LinkedIn URL',
  message: 'Message',
  consent: 'Consent',
}

export type ValidationResult =
  | { ok: true; data: InquiryPayload }
  | { ok: false; errors: Partial<Record<FieldName | 'form', string>> }

/** Validates and normalises an untrusted payload. */
export function validateInquiry(input: unknown): ValidationResult {
  const errors: Partial<Record<FieldName | 'form', string>> = {}
  if (typeof input !== 'object' || input === null) return { ok: false, errors: { form: 'Invalid request.' } }
  const raw = input as Record<string, unknown>

  const type = raw.type as InquiryType
  if (!inquiryTypes.includes(type)) return { ok: false, errors: { form: 'Unknown inquiry type.' } }

  const str = (k: string) => (typeof raw[k] === 'string' ? (raw[k] as string).trim() : '')
  const data: InquiryPayload = { type, name: str('name'), email: str('email'), consent: raw.consent === true }

  const optional: FieldName[] = [
    'company', 'website', 'service', 'stage', 'budget', 'timeline', 'product',
    'marketingService', 'preferredTime', 'careerArea', 'profileUrl', 'message',
  ]
  for (const k of optional) {
    const v = str(k)
    if (v) (data as unknown as Record<string, string>)[k] = v
  }

  for (const k of requiredFields[type]) {
    const v = (data as unknown as Record<string, unknown>)[k]
    if (!v) errors[k] = `${label[k]} is required.`
  }

  for (const [k, max] of Object.entries(maxLength) as [FieldName, number][]) {
    const v = (data as unknown as Record<string, unknown>)[k]
    if (typeof v === 'string' && v.length > max) errors[k] = `${label[k]} must be ${max} characters or fewer.`
  }

  if (data.email && !EMAIL_RE.test(data.email)) errors.email = 'Enter a valid email address.'
  if (data.website && !isValidUrl(data.website)) errors.website = 'Enter a valid website URL.'
  if (data.profileUrl && !isValidUrl(data.profileUrl)) errors.profileUrl = 'Enter a valid URL.'
  if (data.message && requiredFields[type].includes('message') && data.message.length < 20 && !errors.message) {
    errors.message = 'Please share a little more detail (at least 20 characters).'
  }

  for (const [k, options] of Object.entries(allowedOptions) as [FieldName, readonly string[]][]) {
    const v = (data as unknown as Record<string, unknown>)[k]
    if (typeof v === 'string' && v && !options.includes(v)) errors[k] = `Choose a valid ${label[k].toLowerCase()}.`
  }

  if (!data.consent) errors.consent = 'Please confirm you agree to be contacted about this inquiry.'

  if (typeof raw.hp === 'string') data.hp = raw.hp
  if (typeof raw.fillMs === 'number' && Number.isFinite(raw.fillMs)) data.fillMs = raw.fillMs
  if (typeof raw.sourcePath === 'string') data.sourcePath = raw.sourcePath.slice(0, 200)

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data }
}
