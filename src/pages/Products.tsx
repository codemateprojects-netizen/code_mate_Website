import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { products } from '../data/products'
import { ProductsShowcase } from '../components/sections/ProductsShowcase'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Section, SectionHeading } from '../components/ui/Section'
import { Seo } from '../components/ui/Seo'

export default function Products() {
  return (
    <>
      <Seo
        title="Our Products — SyjenHire, SyjenEvilo & Buddy AI"
        description="Products built by Syjen Code: SyjenHire, an AI-assisted recruitment platform; Buddy AI, an AI learning, coding and assessment platform; and SyjenEvilo, coming soon."
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
        eyebrow="Our products"
        title={
          <>
            Products built from <span className="text-gradient">real problems.</span>
          </>
        }
        description="Alongside client projects, we build and operate our own platforms. They sharpen our engineering and AI practice — and they may solve your problem out of the box."
      />

      <Section className="pt-0 md:pt-0">
        <RevealGroup className="snap-row grid gap-4 md:grid-cols-3">
          {products.map((p) => (
            <RevealItem key={p.slug}>
              <Link
                to={`/products/${p.slug}`}
                className="card-glow group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ink-900/70 p-7 transition-transform duration-300 hover:-translate-y-1"
              >
                <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-70" style={{ background: `linear-gradient(135deg, ${p.accent.from}, ${p.accent.to})` }} />
                <span className="relative grid size-14 place-items-center rounded-2xl text-white shadow-xl" style={{ backgroundImage: `linear-gradient(135deg, ${p.accent.from}, ${p.accent.to})` }}>
                  <p.icon className="size-7" aria-hidden />
                </span>
                <div className="relative mt-6 flex items-center gap-2">
                  <h2 className="text-2xl font-semibold text-fg">{p.name}</h2>
                  <span className="rounded-full border border-line px-2 py-px text-[0.65rem] text-subtle">{p.statusLabel}</span>
                </div>
                <p className="relative mt-2 text-sm font-medium text-fg/90">{p.tagline}</p>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
                <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  {p.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="raised" aria-labelledby="explore-products">
        <SectionHeading id="explore-products" eyebrow="Explore" title="Take a closer look." description="Illustrative interfaces with sample data." className="mb-12" />
        <ProductsShowcase />
      </Section>

      <CtaBand
        title="Want a walkthrough?"
        description="Request a demo of any product and we’ll tailor it to your team and use case."
        primary={{ label: 'Request a Product Demo', to: '/contact?type=demo' }}
        secondary={{ label: 'Start a Custom Project', to: '/contact' }}
      />
    </>
  )
}
