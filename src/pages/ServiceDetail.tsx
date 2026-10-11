import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, viewportOnce, withDelay } from '../lib/motion'
import { ArrowRight, ArrowUpRight, CheckCircle2, Gauge, GitCompare, Info, RefreshCw, Rocket, XCircle } from 'lucide-react'
import { getService, type ServiceDetail as Service, type ServiceFeature } from '../data/services'
import { AiShowcase } from '../components/sections/AiShowcase'
import { AgentWorkflow } from '../components/visuals/AgentWorkflow'
import { CampaignDashboard, ContentCarousel, LeadFlow, MarketingFunnel } from '../components/visuals/Marketing'
import { RagArchitecture, RagDemo } from '../components/visuals/RagPipeline'
import { Accordion } from '../components/ui/Accordion'
import { ButtonLink } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Section, SectionHeading } from '../components/ui/Section'
import { Seo } from '../components/ui/Seo'
import { breadcrumbSchema, serviceSchema } from '../lib/seo'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug = '' } = useParams()
  const s = getService(slug)
  if (!s) return <NotFound />

  const path = `/services/${s.slug}`
  const isMarketing = s.group === 'growth'

  return (
    <>
      <Seo
        title={s.seo.title}
        description={s.seo.description}
        jsonLd={[
          serviceSchema(s.name, s.seo.description, path),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: s.name, path },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
          },
        ]}
      />

      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: s.shortName }]}
        eyebrow={s.hero.eyebrow}
        title={s.hero.title}
        description={s.hero.description}
        actions={
          <>
            <ButtonLink to={s.cta.to} size="lg" arrow>
              {s.cta.label}
            </ButtonLink>
            <ButtonLink to="/contact?type=consultation" size="lg" variant="secondary">
              {isMarketing ? 'Discuss My Marketing Strategy' : 'Book a Consultation'}
            </ButtonLink>
          </>
        }
        aside={<CapabilityCard service={s} />}
      />

      {/* Problem */}
      <Section tone="raised" aria-labelledby="problem-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading id="problem-title" eyebrow="The challenge" title={s.problem.title} description={s.problem.body} />
          <RevealGroup className="grid content-center gap-3">
            {s.problem.points.map((p) => (
              <RevealItem key={p} className="flex items-start gap-3 rounded-2xl border border-line bg-ink-950/60 px-5 py-4">
                <XCircle className="mt-0.5 size-5 shrink-0 text-danger/80" aria-hidden />
                <span className="text-[0.95rem] text-fg">{p}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {s.features?.map((f) => <FeatureBlock key={f} feature={f} />)}

      {/* What we deliver */}
      <Section aria-labelledby="deliver-title">
        <SectionHeading id="deliver-title" eyebrow="What we deliver" title={`What you get with ${s.shortName}`} className="mb-12" />
        <RevealGroup className="snap-row grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.deliverables.map((d, i) => (
            <RevealItem key={d.title} className="card-glow rounded-2xl border border-line bg-ink-900/70 p-6">
              <span className="font-mono text-xs text-aqua">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold text-fg">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Capabilities */}
      <Section tone="raised" aria-labelledby="cap-title">
        <SectionHeading
          id="cap-title"
          eyebrow={isMarketing && s.slug === 'digital-marketing' ? 'Marketing service categories' : 'Capabilities'}
          title={s.slug === 'digital-marketing' ? 'Everything you need to reach and convert your audience.' : 'What this service covers'}
          className="mb-12"
        />
        <RevealGroup className={s.capabilities.length > 2 ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-4 lg:grid-cols-2'}>
          {s.capabilities.map((c) => (
            <RevealItem key={c.title} className="rounded-2xl border border-line bg-ink-950/60 p-6">
              <h3 className="text-base font-semibold text-fg">{c.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.items.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-ink-900 px-3 py-1 text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Approach */}
      <Section aria-labelledby="approach-title">
        <SectionHeading id="approach-title" eyebrow="Our approach" title="How we work on it" className="mb-12" />
        <div className="relative">
          <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-brand/0 via-brand/40 to-brand/0 lg:block" />
          <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-4">
            {s.approach.map((a, i) => (
              <motion.li
                key={a.title}
                variants={withDelay(fadeUp, i * 0.08)}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
              >
                <span className="relative z-10 grid size-12 place-items-center rounded-full border border-line-strong bg-ink-900 font-mono text-sm text-aqua">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-base font-semibold text-fg">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Technologies + use cases */}
      <Section tone="raised" aria-labelledby="tech-title">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="min-w-0">
            <SectionHeading id="tech-title" eyebrow="Technologies" title="Relevant tools and platforms" />
            <p className="mt-4 flex items-start gap-2 text-sm text-subtle">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
              We select tools for each project — not every project needs every technology listed.
            </p>
            <div className="mt-8 space-y-5">
              {s.technologies.map((t) => (
                <div key={t.group}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-subtle">{t.group}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {t.items.map((item) => (
                      <li key={item} className="rounded-lg border border-line bg-ink-950/60 px-3 py-1.5 font-mono text-xs text-fg">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <SectionHeading eyebrow="Example use cases" title="Where it makes a difference" as="h2" />
            <RevealGroup className="snap-row mt-8 grid gap-3 sm:grid-cols-2">
              {s.useCases.map((u) => (
                <RevealItem key={u.title} className="rounded-2xl border border-line bg-ink-950/60 p-5">
                  <CheckCircle2 className="size-5 text-success" aria-hidden />
                  <h3 className="mt-3 text-base font-semibold text-fg">{u.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{u.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* FAQs */}
      <Section aria-labelledby="faq-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQs"
            title="Questions we often hear"
            description={
              <>
                Something else on your mind?{' '}
                <Link to="/contact?type=consultation" className="text-brand hover:underline">
                  Ask us directly
                </Link>
                .
              </>
            }
          />
          <Accordion items={s.faqs} />
        </div>
      </Section>

      <RelatedServices service={s} />

      <CtaBand title={s.cta.title} description={s.cta.description} primary={{ label: s.cta.label, to: s.cta.to }} />
    </>
  )
}

function CapabilityCard({ service }: { service: Service }) {
  const items = service.capabilities.flatMap((c) => c.items)
  return (
    <div className="relative mx-auto max-w-md rounded-3xl border border-line-strong bg-ink-900/80 p-6 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] backdrop-blur lg:ml-auto">
      <div className="flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand to-iris text-white shadow-[0_10px_30px_-8px_rgb(79_140_255/0.7)]">
          <service.icon className="size-6" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-semibold text-fg">{service.name}</p>
          <p className="text-xs text-subtle">{items.length} capabilities</p>
        </div>
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-2">
        {items.slice(0, 8).map((item, i) => (
          <li
            key={item}
            className="animate-float truncate rounded-lg border border-line bg-ink-950/60 px-2.5 py-2 text-xs text-muted"
            style={{ animationDelay: `${-i * 0.7}s`, animationDuration: `${7 + (i % 3)}s` }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FeatureBlock({ feature }: { feature: ServiceFeature }) {
  switch (feature) {
    case 'ai-showcase':
      return (
        <Section aria-labelledby="showcase-title">
          <SectionHeading
            id="showcase-title"
            eyebrow="Interactive showcase"
            title="Turning Artificial Intelligence Into Practical Business Solutions."
            description="Open any card to see how the solution works and an illustrative interface. Examples use sample data."
            className="mb-12"
          />
          <AiShowcase />
        </Section>
      )
    case 'llmops':
      return (
        <Section id="llmops" tone="raised" aria-labelledby="llmops-title">
          <SectionHeading
            id="llmops-title"
            eyebrow="MLOps & LLMOps"
            title="AI that keeps working after launch."
            description="Models, prompts, and data change. We treat AI systems as living software — evaluated before release and observed in production."
            className="mb-12"
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: GitCompare, title: 'Evaluate', text: 'Test sets, AI quality testing, and prompt versioning before changes ship.' },
              { icon: Rocket, title: 'Deploy', text: 'Model deployment, inference optimisation, and safe rollouts.' },
              { icon: Gauge, title: 'Observe', text: 'Observability and model monitoring for quality, latency, and cost.' },
              { icon: RefreshCw, title: 'Improve', text: 'Guardrails, feedback loops, and evidence-based updates.' },
            ].map((c, i) => (
              <RevealItem key={c.title} className="relative rounded-2xl border border-line bg-ink-950/60 p-6">
                <c.icon className="size-6 text-aqua" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold text-fg">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>
                {i < 3 && <ArrowRight aria-hidden className="absolute -right-3.5 top-1/2 z-10 hidden size-5 -translate-y-1/2 text-brand lg:block" />}
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )
    case 'rag-pipeline':
      return (
        <>
          <Section aria-labelledby="rag-arch-title">
            <SectionHeading
              id="rag-arch-title"
              eyebrow="RAG architecture"
              title="From documents to grounded answers, in ten stages."
              description="Each stage is a design decision. Getting them right is what separates a reliable assistant from a confident guesser."
              className="mb-12"
            />
            <RagArchitecture />
          </Section>
          <Section tone="raised" aria-labelledby="rag-demo-title">
            <SectionHeading
              id="rag-demo-title"
              eyebrow="See it in action"
              title="Follow a question through the pipeline."
              description="Pick a sample question and step through ingestion, chunking, embedding, retrieval, and answer generation. This is a pre-written demonstration — no live model is called."
              className="mb-10"
            />
            <RagDemo />
          </Section>
        </>
      )
    case 'agent-workflow':
      return (
        <Section aria-labelledby="agent-title">
          <SectionHeading
            id="agent-title"
            eyebrow="Agent workflow"
            title="Request in. Verified result out."
            description="An agent analyses the task, selects only the approved tools it needs, executes with scoped permissions, validates the results, and asks a person before anything is sent."
            className="mb-8"
          />
          <Reveal className="mb-10 flex flex-wrap items-center gap-2 text-sm">
            {['User Request', 'Task Analysis', 'Tool Selection', 'Tool Execution', 'Result Validation', 'Final Response'].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-line bg-ink-900 px-3 py-1.5 text-fg">{step}</span>
                {i < arr.length - 1 && <ArrowRight className="size-3.5 text-subtle" aria-hidden />}
              </span>
            ))}
          </Reveal>
          <AgentWorkflow />
          <p className="mt-6 text-sm text-subtle">
            In real deployments, API keys stay on the server and agents never take consequential actions without the authorisation you define.
          </p>
        </Section>
      )
    case 'marketing-funnel':
      return (
        <>
          <Section aria-labelledby="funnel-title">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <SectionHeading
                id="funnel-title"
                eyebrow="Full-funnel marketing"
                title="From first impression to loyal customer."
                description="We plan every stage of the funnel together, so awareness campaigns, landing pages, nurturing, and retention reinforce each other."
              >
                <p className="mt-6 text-sm text-subtle">We don’t guarantee rankings, leads, sales, or ad returns — we commit to strategy, execution, and honest reporting.</p>
              </SectionHeading>
              <MarketingFunnel />
            </div>
          </Section>
          <Section tone="raised" aria-labelledby="dash-title">
            <SectionHeading
              id="dash-title"
              eyebrow="Measurement"
              title="Reporting you can actually act on."
              description="An example of the channel dashboards we set up for clients. Figures shown are sample data."
              className="mb-10"
            />
            <CampaignDashboard />
          </Section>
          <Section aria-labelledby="content-title">
            <SectionHeading id="content-title" eyebrow="Content & social" title="Content made for each channel." className="mb-10" />
            <ContentCarousel />
            <div className="mt-20">
              <SectionHeading eyebrow="Lead generation" title="A connected path from prospect to conversation." className="mb-10" />
              <LeadFlow />
            </div>
          </Section>
        </>
      )
  }
}

function RelatedServices({ service }: { service: Service }) {
  const related = service.related.map(getService).filter((x): x is Service => !!x)
  return (
    <Section tone="raised" aria-labelledby="related-title">
      <h2 id="related-title" className="text-2xl font-semibold text-fg">
        Related services
      </h2>
      <div className="snap-row mt-8 grid gap-4 md:grid-cols-3">
        {related.map((r) => (
          <Link key={r.slug} to={`/services/${r.slug}`} className="card-glow group rounded-2xl border border-line bg-ink-950/60 p-6 transition-transform hover:-translate-y-1">
            <span className="flex items-center justify-between">
              <r.icon className="size-6 text-aqua" aria-hidden />
              <ArrowUpRight className="size-4 text-subtle transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" aria-hidden />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-fg">{r.name}</h3>
            <p className="mt-1.5 text-sm text-muted">{r.summary}</p>
          </Link>
        ))}
      </div>
    </Section>
  )
}
