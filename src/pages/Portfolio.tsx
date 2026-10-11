import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { portfolio, portfolioCategories, type PortfolioCategory } from '../data/portfolio'
import { PortfolioCard } from '../components/sections/CompanySections'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { Seo } from '../components/ui/Seo'
import { cn } from '../lib/cn'
import { ease } from '../lib/motion'

export default function Portfolio() {
  const [filter, setFilter] = useState<PortfolioCategory | 'all'>('all')
  const items = filter === 'all' ? portfolio : portfolio.filter((p) => p.categories.includes(filter))
  const count = (c: PortfolioCategory) => portfolio.filter((p) => p.categories.includes(c)).length

  return (
    <>
      <Seo
        title="Portfolio & Case Studies"
        description="Selected Syjen Code projects across AI solutions, web development, mobile applications, SaaS, and e-commerce."
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Portfolio' }]}
        eyebrow="Portfolio"
        title={
          <>
            Work that <span className="text-gradient">speaks for itself.</span>
          </>
        }
        description="Representative projects that show how we approach problems, architecture, and delivery."
      />

      <section className="pb-20" aria-label="Projects">
        <div className="container-site">
          <p className="mb-8 flex items-start gap-2.5 rounded-xl border border-line bg-ink-900/60 px-4 py-3 text-sm text-muted">
            <Lock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
            <span>
              Client names, live demos, and screenshots are shared under confidentiality.{' '}
              <Link to="/contact?type=consultation" className="text-brand hover:underline">
                Request a walkthrough
              </Link>
              .
            </span>
          </p>

          <div role="group" aria-label="Filter projects" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
            {[{ id: 'all' as const, label: 'All work', n: portfolio.length }, ...portfolioCategories.map((c) => ({ ...c, n: count(c.id) }))].map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
                className={cn(
                  'relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  filter === c.id ? 'border-transparent text-white' : 'border-line text-muted hover:border-line-strong hover:text-fg',
                )}
              >
                {filter === c.id && <motion.span layoutId="pf-filter" className="absolute inset-0 rounded-full bg-brand" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="relative">{c.label}</span>
                <span className={cn('relative text-xs', filter === c.id ? 'text-white/80' : 'text-subtle')}>{c.n}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((p) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3, ease }}>
                  <PortfolioCard project={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {items.length === 0 && (
            <div className="rounded-2xl border border-dashed border-line-strong p-10 text-center">
              <p className="text-lg font-medium text-fg">No published case studies in this category yet.</p>
              <p className="mt-2 text-muted">We’re happy to discuss relevant experience on a call.</p>
            </div>
          )}
        </div>
      </section>

      <CtaBand title="Your project could be next." />
    </>
  )
}
