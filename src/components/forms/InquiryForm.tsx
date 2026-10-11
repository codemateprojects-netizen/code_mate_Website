import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import {
  budgetOptions,
  careerAreaOptions,
  marketingServiceOptions,
  productOptions,
  projectStageOptions,
  requiredFields,
  serviceOptions,
  timelineOptions,
  validateInquiry,
  type FieldName,
  type InquiryPayload,
  type InquiryType,
} from '../../../shared/inquiry.ts'
import { site } from '../../config/site'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'
import { submitInquiry } from '../../lib/submit'
import { Button } from '../ui/Button'

type Values = Partial<Record<FieldName, string>> & { consent?: boolean }

interface FieldDef {
  name: Exclude<FieldName, 'consent'>
  label: string
  kind: 'text' | 'email' | 'url' | 'select' | 'textarea'
  options?: readonly string[]
  placeholder?: string
  autoComplete?: string
  half?: boolean
}

const F = {
  name: { name: 'name', label: 'Full name', kind: 'text', autoComplete: 'name', half: true },
  email: { name: 'email', label: 'Business email', kind: 'email', autoComplete: 'email', placeholder: 'you@company.com', half: true },
  company: { name: 'company', label: 'Company name', kind: 'text', autoComplete: 'organization', half: true },
  website: { name: 'website', label: 'Website URL', kind: 'url', autoComplete: 'url', placeholder: 'example.com', half: true },
  service: { name: 'service', label: 'Required service', kind: 'select', options: serviceOptions, half: true },
  stage: { name: 'stage', label: 'Project stage', kind: 'select', options: projectStageOptions, half: true },
  budget: { name: 'budget', label: 'Estimated budget', kind: 'select', options: budgetOptions, half: true },
  timeline: { name: 'timeline', label: 'Expected timeline', kind: 'select', options: timelineOptions, half: true },
  product: { name: 'product', label: 'Product', kind: 'select', options: productOptions, half: true },
  marketingService: { name: 'marketingService', label: 'Marketing service', kind: 'select', options: marketingServiceOptions, half: true },
  preferredTime: { name: 'preferredTime', label: 'Preferred days / times (with time zone)', kind: 'text', placeholder: 'e.g. Weekdays after 2pm IST', half: true },
  careerArea: { name: 'careerArea', label: 'Area of interest', kind: 'select', options: careerAreaOptions, half: true },
  profileUrl: { name: 'profileUrl', label: 'Portfolio or LinkedIn URL', kind: 'url', placeholder: 'linkedin.com/in/…', half: true },
} satisfies Record<string, FieldDef>

const layouts: Record<InquiryType, { fields: FieldDef[]; message: { label: string; placeholder: string }; submit: string }> = {
  project: {
    fields: [F.name, F.email, F.company, F.website, F.service, F.stage, F.budget, F.timeline],
    message: { label: 'Project description', placeholder: 'What are you planning to build? Who is it for, and what problem does it solve?' },
    submit: 'Send Project Inquiry',
  },
  consultation: {
    fields: [F.name, F.email, { ...F.company }, { ...F.service, label: 'Topic' }, F.preferredTime],
    message: { label: 'What would you like to discuss?', placeholder: 'A short summary helps us prepare for the call.' },
    submit: 'Request Consultation',
  },
  demo: {
    fields: [F.name, F.email, F.company, F.product],
    message: { label: 'Anything specific you’d like to see?', placeholder: 'Your use case, team size, or questions.' },
    submit: 'Request a Demo',
  },
  marketing: {
    fields: [F.name, F.email, F.company, F.website, F.marketingService, F.budget],
    message: { label: 'Goals and current marketing', placeholder: 'What do you want to achieve, and what have you tried so far?' },
    submit: 'Request a Marketing Proposal',
  },
  careers: {
    fields: [F.name, F.email, F.careerArea, F.profileUrl],
    message: { label: 'Tell us about yourself', placeholder: 'Your experience, the kind of work you enjoy, and why Syjen Code.' },
    submit: 'Send Expression of Interest',
  },
}

type Status = { state: 'idle' } | { state: 'submitting' } | { state: 'success'; id: string } | { state: 'error'; message: string; fallback: boolean }

export function InquiryForm({ type, defaults, className }: { type: InquiryType; defaults?: Values; className?: string }) {
  const layout = layouts[type]
  const required = new Set<string>(requiredFields[type])
  const { pathname } = useLocation()
  const formId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [startedAt] = useState(() => Date.now())
  const [values, setValues] = useState<Values>(() => ({ ...defaults }))
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const [hp, setHp] = useState('')

  const set = (name: string, value: string | boolean) => {
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const payload = (): InquiryPayload => ({
    ...(values as Omit<InquiryPayload, 'type' | 'consent' | 'name' | 'email'>),
    type,
    name: values.name ?? '',
    email: values.email ?? '',
    consent: values.consent === true,
    hp,
    fillMs: Date.now() - startedAt,
    sourcePath: pathname,
  })

  const focusFirstError = (errs: Partial<Record<string, string>>) => {
    const first = Object.keys(errs).find((k) => errs[k])
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status.state === 'submitting') return
    const data = payload()
    const check = validateInquiry(data)
    if (!check.ok) {
      setErrors(check.errors)
      setStatus({ state: 'idle' })
      focusFirstError(check.errors)
      return
    }
    setStatus({ state: 'submitting' })
    const res = await submitInquiry(data)
    if (res.ok) {
      setStatus({ state: 'success', id: res.id })
      return
    }
    if (res.fieldErrors) {
      setErrors(res.fieldErrors)
      focusFirstError(res.fieldErrors)
    }
    setStatus({ state: 'error', message: res.error, fallback: !!res.unreachable })
  }

  const mailto = () => {
    const name = values.name ?? ''
    const lines = [
      `Name: ${name}`,
      `Email: ${values.email ?? ''}`,
      ...layout.fields.filter((f) => !['name', 'email'].includes(f.name) && values[f.name]).map((f) => `${f.label}: ${values[f.name]}`),
      '',
      values.message ?? '',
    ]
    return `mailto:${site.contact.email}?subject=${encodeURIComponent(`${layout.submit} — ${name || 'Website inquiry'}`)}&body=${encodeURIComponent(lines.join('\n'))}`
  }

  if (status.state === 'success') {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease }}
        className={cn('rounded-3xl border border-success/30 bg-success/[0.06] p-8 text-center md:p-12', className)}
      >
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.1 }}
          className="mx-auto grid size-16 place-items-center rounded-full bg-success/15 text-success"
        >
          <CheckCircle2 className="size-8" aria-hidden />
        </motion.span>
        <h3 className="mt-6 text-2xl font-semibold text-fg">Thank you — we’ve received your message.</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">{site.responseTimeNote} We’ll reply to the email address you provided.</p>
        {status.id && <p className="mt-4 font-mono text-xs text-subtle">Reference: {status.id.slice(0, 8)}</p>}
      </motion.div>
    )
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${formId}-req`} className={cn('space-y-5', className)}>
      <p id={`${formId}-req`} className="text-xs text-subtle">
        Fields marked <span className="text-danger">*</span> are required.
      </p>

      <AnimatePresence>
        {errorCount > 0 && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              <AlertCircle className="size-4 shrink-0" aria-hidden />
              {errors.form ?? `Please correct ${errorCount} field${errorCount > 1 ? 's' : ''} below.`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-5 sm:grid-cols-2">
        {layout.fields.map((f) => (
          <div key={f.name} className={f.half ? '' : 'sm:col-span-2'}>
            <Field id={`${formId}-${f.name}`} label={f.label} required={required.has(f.name)} error={errors[f.name]}>
              {(props) =>
                f.kind === 'select' ? (
                  <select {...props} name={f.name} value={values[f.name] ?? ''} onChange={(e) => set(f.name, e.target.value)} className="field">
                    <option value="">{required.has(f.name) ? 'Select one' : 'Optional — select one'}</option>
                    {f.options!.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    {...props}
                    name={f.name}
                    type={f.kind === 'url' ? 'text' : f.kind}
                    inputMode={f.kind === 'url' ? 'url' : f.kind === 'email' ? 'email' : undefined}
                    autoComplete={f.autoComplete}
                    placeholder={f.placeholder ?? (required.has(f.name) ? undefined : 'Optional')}
                    value={values[f.name] ?? ''}
                    onChange={(e) => set(f.name, e.target.value)}
                    className="field"
                  />
                )
              }
            </Field>
          </div>
        ))}
        <div className="sm:col-span-2">
          <Field id={`${formId}-message`} label={layout.message.label} required={required.has('message')} error={errors.message}>
            {(props) => (
              <textarea
                {...props}
                name="message"
                rows={5}
                placeholder={layout.message.placeholder}
                value={values.message ?? ''}
                onChange={(e) => set('message', e.target.value)}
                className="field resize-y"
              />
            )}
          </Field>
        </div>
      </div>

      {/* Honeypot — invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-hp`}>Leave this field empty</label>
        <input id={`${formId}-hp`} name="company_website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent === true}
            onChange={(e) => set('consent', e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${formId}-consent-err` : undefined}
            className="mt-1 size-4 shrink-0 rounded border-line-strong accent-brand"
          />
          <span>
            I agree that {site.name} may store and use the information above to respond to this inquiry, as described in the{' '}
            <Link to="/privacy-policy" className="text-brand underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            . <span className="text-danger">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id={`${formId}-consent-err`} className="mt-1.5 pl-7 text-xs text-danger">
            {errors.consent}
          </p>
        )}
      </div>

      <AnimatePresence>
        {status.state === 'error' && (
          <motion.div role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border border-danger/30 bg-danger/10 p-4 text-sm">
            <p className="flex items-start gap-2 text-danger">
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden /> {status.message}
            </p>
            {status.fallback && (
              <a href={mailto()} className="mt-3 inline-flex items-center gap-2 font-medium text-fg underline-offset-2 hover:underline">
                <Mail className="size-4" aria-hidden /> Send the same details by email instead
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button
          type="submit"
          size="lg"
          disabled={status.state === 'submitting'}
          aria-busy={status.state === 'submitting'}
          icon={status.state === 'submitting' ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
        >
          {status.state === 'submitting' ? 'Sending…' : layout.submit}
        </Button>
        <p className="text-xs text-subtle">{site.responseTimeNote}</p>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string
  label: string
  required: boolean
  error?: string
  children: (props: { id: string; required: boolean; 'aria-invalid'?: boolean; 'aria-describedby'?: string }) => ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-fg">
        {label} {required ? <span className="text-danger">*</span> : <span className="text-xs font-normal text-subtle">(optional)</span>}
      </label>
      {children({ id, required, 'aria-invalid': error ? true : undefined, 'aria-describedby': error ? `${id}-err` : undefined })}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-err`} initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-danger">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
