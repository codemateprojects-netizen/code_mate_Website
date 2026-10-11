import { useRef } from 'react'
import { motion, useInView, useScroll } from 'framer-motion'
import { CheckSquare, MessageSquare, Package, Workflow } from 'lucide-react'
import { processStages, type ProcessStage } from '../data/company'
import { EngagementModels } from '../components/sections/CompanySections'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { Section, SectionHeading } from '../components/ui/Section'
import { Seo } from '../components/ui/Seo'
import { cn } from '../lib/cn'
import { ease } from '../lib/motion'

export default function HowWeWork() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })

  return (
    <>
      <Seo
        title="How We Work — Our Development Process"
        description="Syjen Code’s process from discovery call to long-term partnership: requirements, proposal, design, development, QA, deployment, launch, marketing, and ongoing optimisation."
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'How We Work' }]}
        eyebrow="Our process"
        title={
          <>
            From First Conversation to <span className="text-gradient">Long-Term Partnership.</span>
          </>
        }
        description="A clear, transparent process — so you always know what’s happening, what you’ll receive, and what we need from you."
      />

      <Section className="pt-0 md:pt-0" aria-label="Process stages">
        <div ref={ref} className="relative">
          <div aria-hidden className="absolute bottom-0 left-6 top-0 w-px bg-line-strong md:left-1/2" />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-6 top-0 w-[2px] -translate-x-[0.5px] origin-top bg-gradient-to-b from-brand via-aqua to-iris md:left-1/2"
            style={{ scaleY: scrollYProgress }}
          />
          <ol className="relative space-y-10 md:space-y-16">
            {processStages.map((s, i) => (
              <StageRow key={s.number} stage={s} index={i} />
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="raised" aria-labelledby="engage-title">
        <SectionHeading
          id="engage-title"
          eyebrow="Engagement models"
          title="Transparent ways to work together."
          description="Choose the model that fits your stage. Many clients combine them — for example, a project build followed by a maintenance and marketing retainer."
          className="mb-12"
        />
        <EngagementModels />
      </Section>

      <CtaBand title="Ready for the first conversation?" primary={{ label: 'Book a Discovery Call', to: '/contact?type=consultation' }} secondary={{ label: 'Start Your Project', to: '/contact' }} />
    </>
  )
}

function StageRow({ stage: s, index }: { stage: ProcessStage; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const lit = useInView(ref, { once: true, margin: '0px 0px -40% 0px' })
  const right = index % 2 === 1

  return (
    <li ref={ref} className="relative grid grid-cols-[3rem_1fr] gap-5 md:grid-cols-2 md:gap-16">
      <span
        className={cn(
          'relative z-10 grid size-12 place-items-center rounded-full border font-mono text-sm font-semibold transition-all duration-500 md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2',
          lit ? 'border-transparent bg-gradient-to-br from-brand to-iris text-white shadow-[0_0_28px_rgb(79_140_255/0.5)]' : 'border-line-strong bg-ink-900 text-subtle',
        )}
      >
        {s.number}
      </span>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={lit ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease }}
        className={cn('min-w-0 rounded-3xl border border-line bg-ink-900/70 p-6 md:p-7', right ? 'md:col-start-2' : 'md:col-start-1 md:mr-6', right && 'md:ml-6')}
      >
        <div className="flex items-center gap-3">
          <s.icon className="size-5 text-aqua" aria-hidden />
          <h2 className="text-xl font-semibold text-fg">{s.title}</h2>
        </div>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <Facet icon={Workflow} label="What happens" text={s.happens} />
          <Facet icon={Package} label="What you receive" text={s.receives} />
          <Facet icon={MessageSquare} label="How we communicate" text={s.communication} />
          <Facet icon={CheckSquare} label="Your approval" text={s.approval} />
        </dl>
      </motion.div>
    </li>
  )
}

function Facet({ icon: Icon, label, text }: { icon: typeof Workflow; label: string; text: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-subtle">
        <Icon className="size-3.5" aria-hidden /> {label}
      </dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-muted">{text}</dd>
    </div>
  )
}
