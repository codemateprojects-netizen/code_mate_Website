import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, Download, Globe2, Mail, Megaphone, MonitorPlay, Phone, Rocket, type LucideIcon } from 'lucide-react'
import { productOptions, serviceOptions } from '../../shared/inquiry.ts'
import { site } from '../config/site'
import { InquiryForm } from '../components/forms/InquiryForm'
import { ButtonAnchor } from '../components/ui/Button'
import { HeroBackdrop } from '../components/ui/PageHero'
import { Eyebrow } from '../components/ui/Section'
import { Seo } from '../components/ui/Seo'
import { cn } from '../lib/cn'
import { ease } from '../lib/motion'

type EntryType = 'project' | 'consultation' | 'demo' | 'marketing'

const entries: { id: EntryType; label: string; icon: LucideIcon; title: string; description: string }[] = [
  { id: 'project', label: 'Start a Project', icon: Rocket, title: 'Tell us about your project', description: 'Share what you’re planning. We’ll come back with questions, a recommended approach, and next steps.' },
  { id: 'consultation', label: 'Book a Consultation', icon: CalendarDays, title: 'Book a consultation', description: 'A focused conversation about your idea, technology choices, AI opportunities, or growth plans.' },
  { id: 'demo', label: 'Request a Product Demo', icon: MonitorPlay, title: 'Request a product demo', description: 'See SyjenHire, Buddy AI, or hear about SyjenEvilo in a walkthrough tailored to your team.' },
  { id: 'marketing', label: 'Request a Marketing Proposal', icon: Megaphone, title: 'Request a marketing proposal', description: 'Tell us about your goals and current marketing. We’ll prepare a proposal tailored to your business.' },
]

const nextSteps = ['We review your message and any links you share.', 'We arrange a short call to understand your goals.', 'We share a clear proposal with scope, timeline, and pricing.']

export default function Contact() {
  const [params, setParams] = useSearchParams()
  const type = (entries.find((e) => e.id === params.get('type'))?.id ?? 'project') as EntryType
  const entry = entries.find((e) => e.id === type)!

  const serviceParam = params.get('service') ?? ''
  const productParam = params.get('product') ?? ''
  const defaults = {
    ...(serviceOptions.includes(serviceParam as (typeof serviceOptions)[number]) ? { service: serviceParam } : {}),
    ...(productOptions.includes(productParam as (typeof productOptions)[number]) ? { product: productParam } : {}),
  }

  const select = (id: EntryType) => setParams(id === 'project' ? {} : { type: id }, { replace: true, preventScrollReset: true })

  return (
    <>
      <Seo
        title="Contact — Start a Project or Book a Consultation"
        description="Contact Syjen Code to start a software, AI, or digital marketing project, book a consultation, request a product demo, or request a marketing proposal."
      />
      <header className="relative overflow-hidden pt-32 pb-10 md:pt-40">
        <HeroBackdrop />
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="container-site relative max-w-3xl text-center">
          <Eyebrow className="mb-6">Contact</Eyebrow>
          <h1 className="text-4xl font-semibold leading-[1.05] text-fg sm:text-5xl md:text-6xl">
            Have an Idea? <span className="text-gradient">Let’s Bring It to Market.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Tell us what you’re planning to build. We’ll help you explore the right technology, development approach, and growth strategy for your business.
          </p>
        </motion.div>
      </header>

      <section className="pb-24" aria-label="Contact options">
        <div className="container-site">
          <div role="tablist" aria-label="How can we help?" className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {entries.map((e) => (
              <button
                key={e.id}
                id={`entry-${e.id}`}
                role="tab"
                type="button"
                aria-selected={type === e.id}
                aria-controls="contact-panel"
                onClick={() => select(e.id)}
                className={cn(
                  'relative flex items-center gap-3 rounded-2xl border p-4 text-left text-sm font-medium transition-colors',
                  type === e.id ? 'border-brand/60 text-fg' : 'border-line bg-ink-900/50 text-muted hover:border-line-strong hover:text-fg',
                )}
              >
                {type === e.id && <motion.span layoutId="entry-bg" className="absolute inset-0 rounded-2xl bg-brand/10" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                <e.icon className={cn('relative size-5 shrink-0', type === e.id ? 'text-aqua' : 'text-subtle')} aria-hidden />
                <span className="relative">{e.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div id="contact-panel" role="tabpanel" aria-labelledby={`entry-${type}`} className="rounded-3xl border border-line-strong bg-ink-900/70 p-6 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div key={type} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }}>
                  <h2 className="text-2xl font-semibold text-fg">{entry.title}</h2>
                  <p className="mt-2 text-muted">{entry.description}</p>
                  {type === 'consultation' && site.bookingUrl && (
                    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-ink-950/60 p-4">
                      <CalendarDays className="size-5 text-aqua" aria-hidden />
                      <p className="flex-1 text-sm text-muted">Prefer to pick a time yourself?</p>
                      <ButtonAnchor href={site.bookingUrl} target="_blank" rel="noopener noreferrer" size="sm" arrow>
                        Open booking calendar
                      </ButtonAnchor>
                    </div>
                  )}
                  <InquiryForm key={type} type={type} defaults={defaults} className="mt-8" />
                </motion.div>
              </AnimatePresence>
            </div>

            <aside className="space-y-4">
              <div className="rounded-3xl border border-line bg-ink-900/50 p-6">
                <h2 className="text-base font-semibold text-fg">Reach us directly</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 text-muted transition-colors hover:text-fg">
                      <span className="grid size-9 place-items-center rounded-xl border border-line bg-ink-800 text-brand">
                        <Mail className="size-4" aria-hidden />
                      </span>
                      {site.contact.email}
                    </a>
                  </li>
                  {site.contact.phone && (
                    <li>
                      <a href={`tel:${site.contact.phone}`} className="flex items-center gap-3 text-muted transition-colors hover:text-fg">
                        <span className="grid size-9 place-items-center rounded-xl border border-line bg-ink-800 text-brand">
                          <Phone className="size-4" aria-hidden />
                        </span>
                        <span>
                          <span className="block text-xs text-subtle">{site.contact.phoneLabel}</span>
                          {site.contact.phone}
                        </span>
                      </a>
                    </li>
                  )}
                  <li className="flex items-center gap-3 text-muted">
                    <span className="grid size-9 place-items-center rounded-xl border border-line bg-ink-800 text-brand">
                      <Globe2 className="size-4" aria-hidden />
                    </span>
                    {site.serviceArea}
                  </li>
                </ul>
                <p className="mt-5 text-xs text-subtle">{site.responseTimeNote}</p>
              </div>

              <div className="rounded-3xl border border-line bg-ink-900/50 p-6">
                <h2 className="text-base font-semibold text-fg">What happens next</h2>
                <ol className="mt-4 space-y-4">
                  {nextSteps.map((s, i) => (
                    <li key={s} className="flex gap-3 text-sm text-muted">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-iris font-mono text-[0.7rem] text-white">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>

              {site.companyProfileUrl && (
                <a
                  href={site.companyProfileUrl}
                  download
                  className="card-glow flex items-center gap-3 rounded-3xl border border-line bg-ink-900/50 p-6 text-sm font-medium text-fg"
                >
                  <Download className="size-5 text-aqua" aria-hidden /> Download our company profile (PDF)
                </a>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
