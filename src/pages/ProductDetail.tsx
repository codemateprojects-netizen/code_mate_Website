import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Info, Sparkles, XCircle } from 'lucide-react'
import { featureStatusLabel, getProduct, products, type Product } from '../data/products'
import { InquiryForm } from '../components/forms/InquiryForm'
import { ProductShowcase, ScrollFloat } from '../components/mockups/ProductMocks'
import { ButtonAnchor } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Section, SectionHeading } from '../components/ui/Section'
import { Seo } from '../components/ui/Seo'
import { breadcrumbSchema } from '../lib/seo'
import { cn } from '../lib/cn'
import { ease } from '../lib/motion'
import NotFound from './NotFound'

export default function ProductDetail() {
  const { slug = '' } = useParams()
  const p = getProduct(slug)
  if (!p) return <NotFound />
  const path = `/products/${p.slug}`
  const hasDetails = p.features.length > 0

  return (
    <>
      <Seo
        title={p.seo.title}
        description={p.seo.description}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: p.name,
            description: p.seo.description,
            applicationCategory: 'BusinessApplication',
            publisher: { '@type': 'Organization', name: 'Syjen Code' },
          },
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            { name: p.name, path },
          ]),
        ]}
      />

      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products' }, { label: p.name }]}
        eyebrow={`${p.name} · ${p.statusLabel}`}
        title={p.hero.title}
        description={p.hero.description}
        actions={
          <>
            <ButtonAnchor href="#demo" size="lg" arrow>
              {p.slug === 'syjenevilo' ? 'Request a Private Briefing' : 'Request a Demo'}
            </ButtonAnchor>
            {p.links.website && (
              <ButtonAnchor href={p.links.website} target="_blank" rel="noopener noreferrer" size="lg" variant="secondary">
                Visit {p.name}
              </ButtonAnchor>
            )}
          </>
        }
        aside={<ProductEmblem product={p} />}
      >
        <p className="mt-6 text-sm font-medium" style={{ color: p.accent.to }}>
          {p.tagline}
        </p>
      </PageHero>

      {p.problem.title && (
        <Section tone="raised" aria-labelledby="p-problem">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <SectionHeading id="p-problem" eyebrow="The problem" title={p.problem.title} description={p.problem.body} />
            <RevealGroup className="grid content-center gap-3">
              {p.problem.points.map((pt) => (
                <RevealItem key={pt} className="flex items-start gap-3 rounded-2xl border border-line bg-ink-950/60 px-5 py-4">
                  <XCircle className="mt-0.5 size-5 shrink-0 text-danger/80" aria-hidden />
                  <span className="text-[0.95rem] text-fg">{pt}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Section>
      )}

      {p.solution.title && (
        <Section aria-labelledby="p-solution">
          <SectionHeading id="p-solution" eyebrow="The solution" title={p.solution.title} description={p.solution.body} className="mb-12" />
          <RevealGroup className="snap-row grid gap-4 md:grid-cols-3">
            {p.solution.pillars.map((pl, i) => (
              <RevealItem key={pl.title} className="relative overflow-hidden rounded-2xl border border-line bg-ink-900/70 p-6">
                <span className="font-mono text-5xl font-semibold text-white/[0.06]">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-semibold text-fg">{pl.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{pl.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {/* Features */}
      <Section tone="raised" aria-labelledby="p-features">
        <SectionHeading id="p-features" eyebrow="Features" title={hasDetails ? `What ${p.name} brings together` : 'Product details coming soon'} className="mb-6" />
        {hasDetails ? (
          <>
            {!p.featuresVerified && (
              <p className="mb-10 flex max-w-3xl items-start gap-2.5 text-sm text-subtle">
                <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                These are the product’s capability areas. Current availability of each feature is confirmed during your demo.
              </p>
            )}
            <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.features.map((f) => (
                <RevealItem key={f.title} className="card-glow rounded-2xl border border-line bg-ink-950/60 p-6">
                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-xl text-white" style={{ backgroundImage: `linear-gradient(135deg, ${p.accent.from}, ${p.accent.to})` }}>
                      <f.icon className="size-5" aria-hidden />
                    </span>
                    {f.status && (
                      <span className={cn('rounded-full px-2 py-0.5 text-[0.7rem]', f.status === 'available' ? 'bg-success/15 text-success' : 'border border-line text-subtle')}>
                        {featureStatusLabel[f.status]}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-fg">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </>
        ) : (
          <div className="max-w-2xl rounded-2xl border border-line bg-ink-950/60 p-8">
            <Sparkles className="size-6 text-aqua" aria-hidden />
            <p className="mt-4 text-muted">
              We’ll publish {p.name}’s features, screenshots, and use cases here when the product is announced. Request a private briefing below
              to hear about it first.
            </p>
          </div>
        )}
      </Section>

      {/* Interface showcase */}
      <Section aria-labelledby="p-showcase">
        <SectionHeading
          id="p-showcase"
          eyebrow="Product interface"
          title={hasDetails ? `A look inside ${p.name}` : `${p.name} preview`}
          description={hasDetails ? 'An illustrative interface using sample data. Switch views to explore.' : undefined}
          className="mb-10"
        />
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-10 -top-10 h-64 rounded-full blur-[100px]" style={{ background: `linear-gradient(90deg, ${p.accent.from}33, ${p.accent.to}33)` }} />
          <ScrollFloat distance={24}>
            <div className="relative mx-auto max-w-4xl">
              <ProductShowcase product={p} />
            </div>
          </ScrollFloat>
        </div>
      </Section>

      {p.useCases.length > 0 && (
        <Section tone="raised" aria-labelledby="p-usecases">
          <SectionHeading id="p-usecases" eyebrow="Use cases" title={`Who ${p.name} is for`} className="mb-12" />
          <RevealGroup className="snap-row grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.useCases.map((u) => (
              <RevealItem key={u.title} className="rounded-2xl border border-line bg-ink-950/60 p-6">
                <CheckCircle2 className="size-5 text-success" aria-hidden />
                <h3 className="mt-3 text-base font-semibold text-fg">{u.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{u.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {p.roadmap.approved && p.roadmap.items.length > 0 && (
        <Section aria-labelledby="p-roadmap">
          <SectionHeading id="p-roadmap" eyebrow="Roadmap" title="What’s coming next" description="Roadmap items are plans, not commitments, and may change." className="mb-10" />
          <ol className="grid gap-4 md:grid-cols-3">
            {p.roadmap.items.map((r) => (
              <li key={r.title} className="rounded-2xl border border-line bg-ink-900/70 p-6">
                <h3 className="font-semibold text-fg">{r.title}</h3>
                <p className="mt-2 text-sm text-muted">{r.description}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* Demo request */}
      <Section id="demo" aria-labelledby="p-demo">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="p-demo"
            eyebrow={p.slug === 'syjenevilo' ? 'Private briefing' : 'Request a demo'}
            title={p.slug === 'syjenevilo' ? `Be first to hear about ${p.name}.` : `See ${p.name} in action.`}
            description="Tell us a little about your team and what you’d like to see. We’ll arrange a walkthrough at a time that suits you."
          />
          <div className="rounded-3xl border border-line-strong bg-ink-900/70 p-6 md:p-8">
            <InquiryForm type="demo" defaults={{ product: p.name }} />
          </div>
        </div>
      </Section>

      <RelatedProducts current={p} />

      <CtaBand
        title="Need something built around your own workflow?"
        description="Our products grew out of client problems. If none fits exactly, we can design and build a solution for you."
        primary={{ label: 'Start Your Project', to: '/contact' }}
        secondary={{ label: 'Contact Us', to: '/contact?type=consultation' }}
      />
    </>
  )
}

function ProductEmblem({ product: p }: { product: Product }) {
  return (
    <div className="relative mx-auto grid aspect-square max-w-[420px] place-items-center">
      <div aria-hidden className="absolute inset-[12%] animate-spin-slow rounded-full border border-dashed" style={{ borderColor: `${p.accent.from}55` }} />
      <div aria-hidden className="absolute inset-[26%] rounded-full blur-3xl" style={{ background: `linear-gradient(135deg, ${p.accent.from}66, ${p.accent.to}55)` }} />
      <motion.div
        initial={{ scale: 0.7, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className="relative grid size-36 place-items-center rounded-[2rem] text-white shadow-2xl"
        style={{ backgroundImage: `linear-gradient(135deg, ${p.accent.from}, ${p.accent.to})` }}
      >
        <p.icon className="size-16" aria-hidden />
      </motion.div>
      {p.features.slice(0, 4).map((f, i) => {
        const pos = ['left-0 top-[14%]', 'right-0 top-[22%]', 'left-[4%] bottom-[16%]', 'right-[2%] bottom-[10%]'][i]
        return (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.12, duration: 0.6, ease }}
            className={cn('absolute', pos)}
          >
            <span className="glass flex animate-float items-center gap-2 rounded-xl border border-line-strong px-3 py-2 text-xs font-medium text-fg shadow-xl" style={{ animationDelay: `${-i * 1.3}s` }}>
              <f.icon className="size-3.5" style={{ color: p.accent.to }} aria-hidden />
              {f.title}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

function RelatedProducts({ current }: { current: Product }) {
  const others = products.filter((x) => x.slug !== current.slug)
  return (
    <Section tone="raised" aria-labelledby="p-related">
      <h2 id="p-related" className="text-2xl font-semibold text-fg">
        Other products
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {others.map((o) => (
          <Link key={o.slug} to={`/products/${o.slug}`} className="card-glow group flex items-start gap-4 rounded-2xl border border-line bg-ink-950/60 p-6 transition-transform hover:-translate-y-1">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl text-white" style={{ backgroundImage: `linear-gradient(135deg, ${o.accent.from}, ${o.accent.to})` }}>
              <o.icon className="size-6" aria-hidden />
            </span>
            <span className="flex-1">
              <span className="flex items-center justify-between">
                <span className="text-lg font-semibold text-fg">{o.name}</span>
                <ArrowUpRight className="size-4 text-subtle transition-colors group-hover:text-brand" aria-hidden />
              </span>
              <span className="mt-1 block text-sm text-muted">{o.tagline}</span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  )
}
