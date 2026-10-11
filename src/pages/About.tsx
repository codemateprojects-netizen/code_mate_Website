import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Eye, Layers, ShieldCheck, Telescope, Target } from 'lucide-react'
import { mission, processStages, values, vision } from '../data/company'
import { Differentiators } from '../components/sections/CompanySections'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Section, SectionHeading } from '../components/ui/Section'
import { Seo } from '../components/ui/Seo'
import { organizationSchema } from '../lib/seo'

const philosophy = [
  { icon: Layers, title: 'Proven over trendy', text: 'We choose mature, well-supported technologies unless something newer clearly serves your goals better.' },
  { icon: Target, title: 'Fit for purpose', text: 'Architecture should match your stage. An MVP and an enterprise platform need different trade-offs.' },
  { icon: ShieldCheck, title: 'Secure by default', text: 'Secrets stay on servers, access follows least privilege, and inputs are validated — from day one.' },
  { icon: Eye, title: 'Measured AI', text: 'We use AI where it improves outcomes, evaluate it on real examples, and keep people in the loop where it matters.' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Syjen Code brings together software engineering, AI innovation, and digital growth services to help organisations turn ideas into practical digital solutions — with a long-term partnership mindset."
        jsonLd={organizationSchema()}
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        eyebrow="About Syjen Code"
        title={
          <>
            Technology should help businesses <span className="text-gradient">move forward.</span>
          </>
        }
      >
        <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
          <p>
            Syjen Code is built around a simple belief: technology should help businesses move forward. We bring together software engineering, AI
            innovation, and digital growth services to help organizations transform ideas into practical digital solutions.
          </p>
          <p>
            Our approach combines thoughtful planning, reliable development, and a long-term partnership mindset. We aim to help clients not only build
            products, but also prepare them for launch, connect with their audiences, and improve them over time.
          </p>
        </div>
      </PageHero>

      <Section className="pt-0 md:pt-0" aria-label="Mission and vision">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-ink-900/70 p-8 md:p-10">
            <div aria-hidden className="absolute -right-20 -top-20 size-60 rounded-full bg-brand/15 blur-3xl" />
            <Compass className="relative size-7 text-aqua" aria-hidden />
            <h2 className="relative mt-5 text-sm font-semibold uppercase tracking-wider text-subtle">Our mission</h2>
            <p className="relative mt-3 text-2xl font-medium leading-snug text-fg">{mission}</p>
          </Reveal>
          <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl border border-line bg-ink-900/70 p-8 md:p-10">
            <div aria-hidden className="absolute -right-20 -top-20 size-60 rounded-full bg-iris/15 blur-3xl" />
            <Telescope className="relative size-7 text-aqua" aria-hidden />
            <h2 className="relative mt-5 text-sm font-semibold uppercase tracking-wider text-subtle">Our vision</h2>
            <p className="relative mt-3 text-2xl font-medium leading-snug text-fg">{vision}</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="raised" aria-labelledby="values-title">
        <SectionHeading id="values-title" eyebrow="Core values" title="What we stand for" className="mb-12" />
        <RevealGroup className="snap-row grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <RevealItem key={v.title} className="rounded-2xl border border-line bg-ink-950/60 p-6">
              <v.icon className="size-6 text-brand" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold text-fg">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section aria-labelledby="philosophy-title">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="philosophy-title"
            eyebrow="Technology philosophy"
            title="Choices that serve the business."
            description="Every technical decision is a business decision. We explain trade-offs in plain language so you can decide with confidence."
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {philosophy.map((p) => (
              <RevealItem key={p.title} className="rounded-2xl border border-line bg-ink-900/70 p-6">
                <p.icon className="size-5 text-aqua" aria-hidden />
                <h3 className="mt-4 font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section tone="raised" aria-labelledby="partner-title">
        <SectionHeading
          id="partner-title"
          eyebrow="Client partnership approach"
          title="Your Project Is Our Project."
          description="We approach every engagement with an ownership mindset: understanding your goals, being honest about trade-offs, and caring about what happens after launch. Ongoing development, marketing, and support are agreed for each engagement — so expectations are always clear."
          className="mb-12"
        />
        <Differentiators />
      </Section>

      <Section aria-labelledby="process-title">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="process-title" eyebrow="Our process" title="Ten clear stages, from idea to growth." />
          <Link to="/how-we-work" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand hover:text-aqua">
            See the full process <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ol className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {processStages.map((s) => (
            <li key={s.number} className="flex items-center gap-3 rounded-xl border border-line bg-ink-900/60 px-4 py-3">
              <span className="font-mono text-xs text-aqua">{s.number}</span>
              <span className="text-sm text-fg">{s.title}</span>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand />
    </>
  )
}
