import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, Download, Keyboard } from 'lucide-react'
import { site } from '../config/site'
import { portfolio } from '../data/portfolio'
import { AiShowcase } from '../components/sections/AiShowcase'
import { EngagementModels, PortfolioCard } from '../components/sections/CompanySections'
import { PartnershipJourney } from '../components/sections/PartnershipJourney'
import { ProductsShowcase } from '../components/sections/ProductsShowcase'
import { ServicesOverview } from '../components/sections/ServicesOverview'
import { AgentWorkflow } from '../components/visuals/AgentWorkflow'
import { RagArchitecture, RagDemo } from '../components/visuals/RagPipeline'
import { ButtonAnchor, ButtonLink } from '../components/ui/Button'
import { PageHero } from '../components/ui/PageHero'
import { Seo } from '../components/ui/Seo'
import { cn } from '../lib/cn'

const chapters = [
  { id: 'who', label: 'Who we are' },
  { id: 'services', label: 'Services' },
  { id: 'ai', label: 'AI capabilities' },
  { id: 'rag', label: 'RAG architecture' },
  { id: 'agents', label: 'AI agents' },
  { id: 'products', label: 'Products' },
  { id: 'journey', label: 'Development to market' },
  { id: 'engagement', label: 'Engagement models' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'next', label: 'Next steps' },
] as const

export default function Solutions() {
  const [active, setActive] = useState(0)

  // Track which chapter is in view.
  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(chapters.findIndex((c) => c.id === visible[0].target.id))
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const go = useCallback((i: number) => {
    const idx = Math.max(0, Math.min(chapters.length - 1, i))
    document.getElementById(chapters[idx].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // ← / → move between chapters (ignored while typing or inside tab lists).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, select, [role="tablist"], [role="radiogroup"], [role="dialog"]')) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(active + 1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(active - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, go])

  useEffect(() => {
    document.getElementById(`chip-${chapters[active].id}`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [active])

  return (
    <>
      <Seo
        title="Solutions Overview — What We Can Build Together"
        description="A guided overview of Syjen Code: services, AI capability demonstrations, RAG architecture, AI agent workflows, products, the development-to-market journey, engagement models, and portfolio."
      />

      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Solutions' }]}
        eyebrow="Solutions overview"
        title={
          <>
            Let’s Explore What We Can <span className="text-gradient">Build Together.</span>
          </>
        }
        description="A guided tour of how we help businesses go from idea to market — services, live demonstrations, products, and how we partner."
        actions={
          <>
            <ButtonLink to="/contact" size="lg" arrow>
              Start Your Project
            </ButtonLink>
            <button type="button" onClick={() => go(0)} className="inline-flex items-center gap-2 px-2 text-sm text-muted hover:text-fg">
              <Keyboard className="size-4" aria-hidden /> Begin the tour (use ← → keys)
            </button>
          </>
        }
      />

      {/* Chapter rail */}
      <nav aria-label="Chapters" className="sticky top-16 z-40 border-y border-line bg-ink-950/85 backdrop-blur-xl md:top-[4.5rem]">
        <div className="container-site">
          <ol className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 py-2.5">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <button
                  id={`chip-${c.id}`}
                  type="button"
                  onClick={() => go(i)}
                  aria-current={active === i ? 'step' : undefined}
                  className={cn(
                    'flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors',
                    active === i ? 'bg-brand/15 text-fg' : 'text-subtle hover:text-fg',
                  )}
                >
                  <span className={cn('font-mono text-xs', active === i ? 'text-aqua' : 'text-subtle')}>{String(i + 1).padStart(2, '0')}</span>
                  {c.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <Chapter index={0} title="We build more than software. We build your future.">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 text-lg leading-relaxed text-muted">
            <p>{site.description}</p>
            <p>
              Our key difference is an <span className="font-medium text-fg">ownership mindset</span>: we treat your project as our own, and
              we can stay with you beyond launch — through marketing, optimisation, and growth — under an agreed engagement.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-ink-900/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Our promise</p>
            <p className="mt-3 text-2xl font-semibold leading-snug text-fg">
              Your Project Is Our Project. <span className="text-gradient">Your Success Is Our Mission.</span>
            </p>
            <p className="mt-4 text-sm text-muted">{site.secondaryTagline}</p>
          </div>
        </div>
      </Chapter>

      <Chapter index={1} title="Services across engineering, AI, cloud, and growth." raised>
        <ServicesOverview />
      </Chapter>

      <Chapter index={2} title="AI that solves practical business problems.">
        <AiShowcase />
      </Chapter>

      <Chapter index={3} title="How a RAG knowledge assistant works." raised>
        <RagArchitecture />
        <div className="mt-10">
          <RagDemo />
        </div>
      </Chapter>

      <Chapter index={4} title="From chatbots to intelligent workflows.">
        <AgentWorkflow />
      </Chapter>

      <Chapter index={5} title="Our products." raised>
        <ProductsShowcase />
      </Chapter>

      <Chapter index={6} title="From development to market — together.">
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
          <PartnershipJourney mode="interactive" showIntro={false} />
        </div>
      </Chapter>

      <Chapter index={7} title="Flexible ways to work together." raised>
        <EngagementModels />
      </Chapter>

      <Chapter index={8} title="Selected work.">
        <div className="snap-row grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.slice(0, 6).map((p) => (
            <PortfolioCard key={p.slug} project={p} />
          ))}
        </div>
        <ButtonLink to="/portfolio" variant="secondary" arrow className="mt-8">
          View full portfolio
        </ButtonLink>
      </Chapter>

      <Chapter index={9} title="Let’s discuss your idea." raised>
        <div className="grid gap-4 md:grid-cols-3">
          <NextCard title="Start a project" text="Share your idea and we’ll propose an approach." to="/contact" cta="Start Your Project" />
          <NextCard title="Book a consultation" text="A focused call on technology, AI, or growth." to="/contact?type=consultation" cta="Book a Consultation" />
          <NextCard title="Request a demo" text="See SyjenHire or Buddy AI in a tailored walkthrough." to="/contact?type=demo" cta="Request a Demo" />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {site.bookingUrl && (
            <ButtonAnchor href={site.bookingUrl} target="_blank" rel="noopener noreferrer" variant="secondary" icon={<CalendarDays className="size-4" aria-hidden />}>
              Open booking calendar
            </ButtonAnchor>
          )}
          {site.companyProfileUrl && (
            <ButtonAnchor href={site.companyProfileUrl} download variant="secondary" icon={<Download className="size-4" aria-hidden />}>
              Download company profile
            </ButtonAnchor>
          )}
        </div>
      </Chapter>

      {/* Floating chapter controls */}
      <div className="fixed bottom-5 right-5 z-40 hidden items-center gap-1 rounded-full border border-line-strong bg-ink-900/90 p-1 shadow-2xl backdrop-blur xl:flex">
        <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous chapter" className="grid size-9 place-items-center rounded-full text-muted hover:bg-white/[0.06] hover:text-fg disabled:opacity-40">
          <ChevronLeft className="size-4" />
        </button>
        <span className="px-2 font-mono text-xs text-muted" aria-live="polite">
          {active + 1} / {chapters.length}
        </span>
        <button type="button" onClick={() => go(active + 1)} disabled={active === chapters.length - 1} aria-label="Next chapter" className="grid size-9 place-items-center rounded-full text-muted hover:bg-white/[0.06] hover:text-fg disabled:opacity-40">
          <ChevronRight className="size-4" />
        </button>
      </div>
    </>
  )
}

function Chapter({ index, title, raised, children }: { index: number; title: string; raised?: boolean; children: ReactNode }) {
  const c = chapters[index]
  return (
    <section id={c.id} aria-labelledby={`${c.id}-title`} className={cn('scroll-mt-32 py-16 md:py-24', raised && 'border-y border-line bg-ink-900/40')}>
      <div className="container-site">
        <p className="font-mono text-sm text-aqua">
          {String(index + 1).padStart(2, '0')} — {c.label}
        </p>
        <h2 id={`${c.id}-title`} className="mt-3 mb-10 max-w-3xl text-3xl font-semibold leading-tight text-fg md:text-4xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

function NextCard({ title, text, to, cta }: { title: string; text: string; to: string; cta: string }) {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-ink-950/60 p-6">
      <h3 className="text-lg font-semibold text-fg">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{text}</p>
      <ButtonLink to={to} size="sm" arrow className="mt-5 self-start">
        {cta}
      </ButtonLink>
    </div>
  )
}
