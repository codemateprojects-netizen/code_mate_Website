import { Briefcase, MapPin } from 'lucide-react'
import { openings, workAreas } from '../data/careers'
import { site } from '../config/site'
import { InquiryForm } from '../components/forms/InquiryForm'
import { PageHero } from '../components/ui/PageHero'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Section, SectionHeading } from '../components/ui/Section'
import { Seo } from '../components/ui/Seo'

export default function Careers() {
  return (
    <>
      <Seo
        title="Careers"
        description="Work with Syjen Code across software engineering, AI and data, design, and digital marketing. Share your interest for current and future opportunities."
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Careers' }]}
        eyebrow="Careers"
        title={
          <>
            Build what’s next — <span className="text-gradient">with us.</span>
          </>
        }
        description={`${site.name} is a growing team working across software engineering, AI, design, and digital marketing. We value ownership, craft, honesty, and curiosity.`}
      />

      <Section className="pt-0 md:pt-0" aria-labelledby="areas-title">
        <SectionHeading id="areas-title" eyebrow="Areas of work" title="Where you could contribute" className="mb-12" />
        <RevealGroup className="snap-row grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workAreas.map((a) => (
            <RevealItem key={a.title} className="card-glow flex flex-col rounded-2xl border border-line bg-ink-900/70 p-6">
              <a.icon className="size-6 text-aqua" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold text-fg">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{a.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {a.skills.map((s) => (
                  <li key={s} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-subtle">
                    {s}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="raised" aria-labelledby="openings-title">
        <SectionHeading id="openings-title" eyebrow="Open positions" title={openings.length ? 'Current openings' : 'No open positions right now'} className="mb-8" />
        {openings.length ? (
          <ul className="space-y-3">
            {openings.map((o) => (
              <li key={o.id} className="flex flex-col gap-3 rounded-2xl border border-line bg-ink-950/60 p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-fg">{o.title}</h3>
                  <p className="mt-1 text-sm text-muted">{o.summary}</p>
                </div>
                <p className="flex shrink-0 flex-wrap gap-4 text-sm text-subtle">
                  <span className="inline-flex items-center gap-1.5"><Briefcase className="size-4" aria-hidden />{o.type}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" aria-hidden />{o.location}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-2xl text-muted">
            We don’t have specific roles open at the moment. If you’d like to be considered for future opportunities, share your interest below and
            we’ll keep your details on file for relevant openings.
          </p>
        )}
      </Section>

      <Section aria-labelledby="apply-title">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="apply-title"
            eyebrow="Expression of interest"
            title="Introduce yourself."
            description="Tell us about your experience and the kind of work you enjoy. Share a link to your portfolio, GitHub, or LinkedIn profile."
          />
          <div className="rounded-3xl border border-line-strong bg-ink-900/70 p-6 md:p-8">
            <InquiryForm type="careers" />
          </div>
        </div>
      </Section>
    </>
  )
}
