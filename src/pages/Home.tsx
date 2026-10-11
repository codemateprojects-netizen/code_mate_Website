import { Link } from 'react-router-dom'
import { ArrowRight, BrainCircuit, Code2, Megaphone, Presentation } from 'lucide-react'
import { site } from '../config/site'
import { Hero } from '../components/sections/Hero'
import { PartnershipJourney } from '../components/sections/PartnershipJourney'
import { ServicesOverview } from '../components/sections/ServicesOverview'
import { ProductsShowcase } from '../components/sections/ProductsShowcase'
import { Differentiators, IndustriesExplorer } from '../components/sections/CompanySections'
import { RagDemo } from '../components/visuals/RagPipeline'
import { MarketingFunnel } from '../components/visuals/Marketing'
import { ButtonLink } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Section, SectionHeading } from '../components/ui/Section'
import { Seo } from '../components/ui/Seo'
import { organizationSchema } from '../lib/seo'

const pillars = [
  {
    icon: Code2,
    title: 'Software Engineering',
    text: 'Web platforms, mobile apps, SaaS products, and backend systems — designed, built, tested, and deployed.',
    to: '/services/software-development',
  },
  {
    icon: BrainCircuit,
    title: 'AI Innovation',
    text: 'RAG knowledge assistants, AI agents, document processing, and machine learning in real workflows.',
    to: '/services/ai-solutions',
  },
  {
    icon: Megaphone,
    title: 'Digital Growth',
    text: 'SEO, social, performance marketing, and lead generation to help the right people find you.',
    to: '/services/digital-marketing',
  },
]

export default function Home() {
  return (
    <>
      <Seo
        title="Software, AI & Digital Growth Partner"
        description="Syjen Code is a software development company and AI development partner. We build web and mobile applications, RAG and AI agent solutions, and run digital marketing — from idea to market."
        jsonLd={[
          organizationSchema(),
          { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url || window.location.origin },
        ]}
      />

      <Hero />

      {/* What we do — the whole business at a glance */}
      <section aria-label="What we do" className="relative border-y border-line bg-ink-900/40">
        <RevealGroup className="container-site grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {pillars.map((p) => (
            <RevealItem key={p.title}>
              <Link to={p.to} className="group block h-full px-2 py-8 md:px-8 md:py-10">
                <span className="flex items-center justify-between">
                  <p.icon className="size-6 text-aqua transition-transform duration-500 group-hover:scale-110" aria-hidden />
                  <ArrowRight className="size-4 text-subtle transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand" aria-hidden />
                </span>
                <h2 className="mt-5 text-lg font-semibold text-fg">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <PartnershipJourney />

      <Section tone="raised" aria-labelledby="services-title">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Services"
            title="One partner for technology, AI, and growth."
            description="Engineering, AI, cloud, and marketing capabilities that work together — so your product and its launch are planned as one."
          />
          <ButtonLink to="/services" variant="secondary" arrow className="shrink-0">
            All services
          </ButtonLink>
        </div>
        <ServicesOverview />
      </Section>

      <Section aria-labelledby="ai-title">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            id="ai-title"
            eyebrow="AI capabilities"
            title="Your business knowledge, accessible through AI."
            description="See how a retrieval-augmented assistant finds the right passage and answers with sources — or says when it doesn’t know."
          />
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/services/rag-development" variant="secondary" arrow>
              RAG development
            </ButtonLink>
            <ButtonLink to="/services/ai-agents" variant="ghost" arrow>
              AI agents
            </ButtonLink>
          </div>
        </div>
        <RagDemo />
      </Section>

      <Section tone="raised" aria-labelledby="products-title">
        <SectionHeading
          id="products-title"
          eyebrow="Our products"
          title="Products we build for ourselves — and for you."
          description="Alongside client work, we develop our own platforms for recruitment, learning, and more."
          className="mb-12"
        />
        <ProductsShowcase />
      </Section>

      <Section aria-labelledby="growth-title">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="growth-title"
              eyebrow="Digital marketing"
              title="Build your brand. Reach your audience. Grow your business."
              description="When the team that builds your product also plans its launch, analytics, SEO, and campaigns are ready from day one — not bolted on later."
            />
            <ul className="mt-8 space-y-3 text-sm text-muted">
              {['SEO & content that match how customers search', 'Social and performance campaigns with proper tracking', 'Lead generation connected to your CRM'].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-aqua" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/services/digital-marketing" arrow>
                Grow My Business
              </ButtonLink>
              <ButtonLink to="/contact?type=marketing" variant="secondary">
                Request a Marketing Proposal
              </ButtonLink>
            </div>
          </div>
          <MarketingFunnel />
        </div>
      </Section>

      <Section tone="raised" aria-labelledby="why-title">
        <SectionHeading
          id="why-title"
          eyebrow="Why Syjen Code"
          title="One Partner for Technology, AI and Growth."
          description="We’re a growing company, so we earn trust the honest way: transparent processes, working demonstrations, and genuine capabilities — not inflated statistics."
          className="mb-12"
        />
        <Differentiators />
      </Section>

      <Section aria-labelledby="industries-title">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="industries-title"
            eyebrow="Industries"
            title="Practical solutions across industries."
            description="Explore the kinds of solutions we can build in different sectors."
          />
          <ButtonLink to="/industries" variant="secondary" arrow className="shrink-0">
            All industries
          </ButtonLink>
        </div>
        <IndustriesExplorer />
      </Section>

      {/* Client meeting entry point */}
      <Section className="pb-0 md:pb-0">
        <Link
          to="/solutions"
          className="card-glow group relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-ink-800 to-ink-900 p-8 md:flex-row md:items-center md:justify-between md:p-10"
        >
          <div className="flex items-start gap-5">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-line-strong bg-ink-950 text-aqua">
              <Presentation className="size-6" aria-hidden />
            </span>
            <div>
              <h2 className="text-2xl font-semibold text-fg md:text-3xl">Let’s Explore What We Can Build Together.</h2>
              <p className="mt-2 max-w-xl text-muted">
                A guided overview of our services, AI demonstrations, products, and partnership model — designed for live conversations.
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand">
            Open the overview <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        </Link>
      </Section>

      <CtaBand />
    </>
  )
}
