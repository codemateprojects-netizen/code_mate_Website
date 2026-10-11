import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Info, Lock } from 'lucide-react'
import { differentiators, engagementDisclaimer, engagementModels } from '../../data/company'
import { industries } from '../../data/industries'
import { portfolioCategories, type PortfolioProject } from '../../data/portfolio'
import { getService } from '../../data/services'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'
import { RevealGroup, RevealItem } from '../ui/Reveal'

/* ───────────── Why Syjen Code ───────────── */

export function Differentiators() {
  return (
    <RevealGroup className="snap-row grid gap-px overflow-hidden rounded-3xl border border-line bg-line max-sm:rounded-none max-sm:border-0 max-sm:bg-transparent sm:grid-cols-2 lg:grid-cols-3">
      {differentiators.map((d) => (
        <RevealItem key={d.title} className="group relative bg-ink-950 p-6 transition-colors duration-300 hover:bg-ink-900 max-sm:rounded-2xl max-sm:border max-sm:border-line max-sm:bg-ink-900/70 md:p-8">
          <span className="grid size-11 place-items-center rounded-xl border border-line bg-ink-800 text-aqua transition-all duration-500 group-hover:border-brand/40 group-hover:shadow-[0_0_24px_rgb(79_140_255/0.3)]">
            <d.icon className="size-5" aria-hidden />
          </span>
          <h3 className="mt-5 text-lg font-semibold text-fg">{d.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{d.description}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

/* ───────────── Engagement models ───────────── */

export function EngagementModels() {
  return (
    <div>
      <RevealGroup className="snap-row grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {engagementModels.map((m) => (
          <RevealItem key={m.title} className="card-glow flex flex-col rounded-2xl border border-line bg-ink-900/70 p-5">
            <m.icon className="size-6 text-brand" aria-hidden />
            <h3 className="mt-4 text-base font-semibold text-fg">{m.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{m.description}</p>
            <p className="mt-4 border-t border-line pt-3 text-xs text-subtle">
              <span className="text-muted">Best for:</span> {m.bestFor}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
      <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-line bg-ink-900/50 px-4 py-3 text-sm text-muted">
        <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
        {engagementDisclaimer}
      </p>
    </div>
  )
}

/* ───────────── Industries explorer ───────────── */

export function IndustriesExplorer() {
  const [active, setActive] = useState(0)
  const ind = industries[active]
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div role="tablist" aria-label="Industries" aria-orientation="vertical" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
        {industries.map((item, i) => (
          <button
            key={item.id}
            role="tab"
            type="button"
            id={`ind-tab-${item.id}`}
            aria-selected={active === i}
            aria-controls="industry-panel"
            onClick={() => setActive(i)}
            className={cn(
              'group flex items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm font-medium transition-all duration-300',
              active === i ? 'border-brand/50 bg-brand/10 text-fg' : 'border-line bg-ink-900/50 text-muted hover:border-line-strong hover:text-fg',
            )}
          >
            <motion.span animate={active === i ? { rotate: [0, -12, 8, 0], scale: [1, 1.15, 1] } : {}} transition={{ duration: 0.6 }}>
              <item.icon className={cn('size-5 shrink-0', active === i ? 'text-aqua' : 'text-subtle group-hover:text-brand')} aria-hidden />
            </motion.span>
            {item.name}
          </button>
        ))}
      </div>

      <div id="industry-panel" role="tabpanel" aria-labelledby={`ind-tab-${ind.id}`} className="relative overflow-hidden rounded-3xl border border-line bg-ink-900/70 p-6 md:p-8">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/15 blur-3xl" />
        <AnimatePresence mode="wait">
          <motion.div key={ind.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }} className="relative">
            <span className="grid size-14 place-items-center rounded-2xl border border-line-strong bg-ink-800 text-aqua">
              <ind.icon className="size-7" aria-hidden />
            </span>
            <h3 className="mt-5 text-2xl font-semibold text-fg">{ind.name}</h3>
            <p className="mt-2 text-muted">{ind.summary}</p>
            <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-subtle">Potential solutions</h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {ind.useCases.map((u, i) => (
                <motion.li
                  key={u}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="rounded-xl border border-line bg-ink-950/50 px-3.5 py-2.5 text-sm text-fg"
                >
                  {u}
                </motion.li>
              ))}
            </ul>
            <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-subtle">Relevant services</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {ind.services.map((slug) => {
                const s = getService(slug)
                return s ? (
                  <li key={slug}>
                    <Link to={`/services/${slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-brand/50 hover:text-fg">
                      {s.shortName} <ArrowUpRight className="size-3" aria-hidden />
                    </Link>
                  </li>
                ) : null
              })}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ───────────── Portfolio card ───────────── */

const catLabel = Object.fromEntries(portfolioCategories.map((c) => [c.id, c.label]))

export function PortfolioCard({ project }: { project: PortfolioProject }) {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="card-glow group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-900/70 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-ink-950">
        {project.screenshots[0] ? (
          <img src={project.screenshots[0].src} alt={project.screenshots[0].alt} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div aria-hidden className="absolute inset-0">
            <div className="absolute inset-0 bg-grid opacity-60" />
            <div className="absolute -left-10 -top-10 size-40 rounded-full bg-brand/25 blur-2xl transition-transform duration-700 group-hover:translate-x-6" />
            <div className="absolute -bottom-12 right-0 size-40 rounded-full bg-iris/20 blur-2xl" />
            <div className="absolute inset-x-6 bottom-6 space-y-1.5">
              <div className="h-2 w-1/3 rounded bg-white/20" />
              <div className="h-2 w-2/3 rounded bg-white/10" />
              <div className="h-2 w-1/2 rounded bg-white/10" />
            </div>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-line-strong bg-ink-950/80 px-2.5 py-1 text-[0.7rem] font-medium text-fg backdrop-blur">{project.type}</span>
        {project.confidential && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-ink-950/80 px-2 py-1 text-[0.65rem] text-subtle backdrop-blur">
            <Lock className="size-3" aria-hidden /> Confidential
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-subtle">{project.industry}</p>
        <h3 className="mt-1 text-lg font-semibold text-fg">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.categories.map((c) => (
            <span key={c} className="rounded-full border border-line px-2 py-0.5 text-[0.7rem] text-subtle">
              {catLabel[c]}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
