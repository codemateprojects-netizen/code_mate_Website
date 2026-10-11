import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Search, X } from 'lucide-react'
import { serviceGroups, services, type ServiceGroupId } from '../data/services'
import { cn } from '../lib/cn'
import { ease } from '../lib/motion'
import { ButtonLink } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { Seo } from '../components/ui/Seo'

export default function Services() {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<ServiceGroupId | 'all'>('all')

  const q = query.trim().toLowerCase()
  const filtered = useMemo(
    () =>
      services
        .filter((s) => group === 'all' || s.group === group)
        .map((s) => {
          if (!q) return { s, hits: [] as string[] }
          const items = s.capabilities.flatMap((c) => c.items)
          const hits = items.filter((i) => i.toLowerCase().includes(q))
          const match = hits.length > 0 || `${s.name} ${s.summary}`.toLowerCase().includes(q)
          return match ? { s, hits } : null
        })
        .filter((x): x is { s: (typeof services)[number]; hits: string[] } => x !== null),
    [q, group],
  )

  return (
    <>
      <Seo
        title="Software, AI & Digital Marketing Services"
        description="Explore Syjen Code services: custom software, web and mobile development, AI solutions, RAG and AI agents, cloud and DevOps, data engineering, security, QA, UI/UX, and digital marketing."
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        eyebrow="Services"
        title={
          <>
            Everything you need to <span className="text-gradient">build, launch, and grow.</span>
          </>
        }
        description="From the first line of code to the first customer — engineering, AI, cloud, and marketing services that work together."
      >
        <div className="mt-10 max-w-xl">
          <label htmlFor="service-search" className="sr-only">
            Search services
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-subtle" aria-hidden />
            <input
              id="service-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search — e.g. “React Native”, “SEO”, “vector search”"
              className="field h-12 rounded-full pl-11 pr-11"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-subtle hover:text-fg"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      </PageHero>

      <section className="pb-8" aria-label="Service catalogue">
        <div className="container-site">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2" role="group" aria-label="Filter by category">
            {[{ id: 'all' as const, title: 'All services' }, ...serviceGroups].map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={group === g.id}
                onClick={() => setGroup(g.id)}
                className={cn(
                  'relative shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  group === g.id ? 'border-transparent text-white' : 'border-line text-muted hover:border-line-strong hover:text-fg',
                )}
              >
                {group === g.id && <motion.span layoutId="svc-filter" className="absolute inset-0 rounded-full bg-brand" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="relative">{g.title}</span>
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm text-subtle" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'service' : 'services'}
            {q && <> matching “{query.trim()}”</>}
          </p>

          <motion.div layout className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map(({ s, hits }) => (
                <motion.article
                  key={s.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease }}
                  className="card-glow group flex flex-col rounded-2xl border border-line bg-ink-900/70 p-6"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-line bg-ink-800 text-aqua transition-transform duration-500 group-hover:-rotate-6">
                      <s.icon className="size-5" aria-hidden />
                    </span>
                    <span className="text-xs text-subtle">{serviceGroups.find((g) => g.id === s.group)?.title}</span>
                  </div>
                  <h2 className="mt-5 text-lg font-semibold text-fg">
                    <Link to={`/services/${s.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                      {s.name}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {(hits.length ? hits : s.capabilities[0].items).slice(0, 6).map((item) => (
                      <li
                        key={item}
                        className={cn('rounded-full border px-2.5 py-0.5 text-xs', hits.includes(item) ? 'border-aqua/50 bg-aqua/10 text-fg' : 'border-line text-subtle')}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-brand">
                    Explore <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="mt-6 rounded-2xl border border-line bg-ink-900/60 p-10 text-center">
              <p className="text-lg font-medium text-fg">No services match “{query.trim()}”.</p>
              <p className="mt-2 text-muted">Tell us what you need — if it’s within our capabilities, we’ll help you scope it.</p>
              <ButtonLink to="/contact?type=consultation" variant="secondary" className="mt-6">
                Ask us directly
              </ButtonLink>
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
