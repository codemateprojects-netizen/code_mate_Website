/**
 * Illustrative product interfaces. All people, roles, scores and figures are
 * sample data; each mock renders a visible demonstration label.
 */
import { useId, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Code2,
  Lightbulb,
  Play,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { Product } from '../../data/products'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'
import { DemoBadge } from '../ui/DemoBadge'

/** Gentle scroll-linked drift for showcase frames. */
export function ScrollFloat({ children, distance = 40 }: { children: ReactNode; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

interface Tab {
  id: string
  label: string
  icon: LucideIcon
  content: ReactNode
}

function AppFrame({ title, accent, tabs }: { title: string; accent: string; tabs: Tab[] }) {
  const [active, setActive] = useState(0)
  const id = useId()
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-950 shadow-[0_40px_100px_-30px_rgb(0_0_0/0.9)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-ink-900 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </span>
          <span className="text-xs font-medium text-muted">{title}</span>
        </div>
        <DemoBadge>Illustrative · sample data</DemoBadge>
      </div>
      <div className="grid sm:grid-cols-[150px_1fr]">
        <div role="tablist" aria-label={`${title} views`} aria-orientation="vertical" className="flex gap-1 border-b border-line p-2 sm:flex-col sm:border-r sm:border-b-0">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              id={`${id}-${t.id}`}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls={`${id}-panel`}
              onClick={() => setActive(i)}
              className={cn(
                'relative flex flex-1 items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors sm:flex-none',
                active === i ? 'text-fg' : 'text-subtle hover:text-fg',
              )}
            >
              {active === i && <motion.span layoutId={`${id}-pill`} className="absolute inset-0 rounded-lg bg-white/[0.06]" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <t.icon className="relative size-4" style={{ color: active === i ? accent : undefined }} aria-hidden />
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${tabs[active].id}`} className="min-h-[300px] p-4">
          <AnimatePresence mode="wait">
            <motion.div key={tabs[active].id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25, ease }}>
              {tabs[active].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ───────────── SyjenHire ───────────── */

const pipeline = [
  { stage: 'Applied', people: [['AK', 'Strong'], ['RS', 'Good'], ['MN', 'Partial'], ['JT', 'Good']] },
  { stage: 'Screening', people: [['LP', 'Strong'], ['DV', 'Good'], ['SO', 'Good']] },
  { stage: 'Interview', people: [['EW', 'Strong'], ['NB', 'Good']] },
  { stage: 'Offer', people: [['CH', 'Strong']] },
]

const matchTone: Record<string, string> = {
  Strong: 'bg-success/15 text-success',
  Good: 'bg-brand/15 text-brand',
  Partial: 'border border-line text-muted',
}

export function HireDashboard() {
  return (
    <AppFrame
      title="SyjenHire · Senior Frontend Engineer"
      accent="#22D3EE"
      tabs={[
        {
          id: 'pipeline',
          label: 'Pipeline',
          icon: Users,
          content: (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {pipeline.map((col, ci) => (
                <div key={col.stage} className="rounded-xl border border-line bg-ink-900/60 p-2">
                  <p className="flex items-center justify-between px-1 pb-2 text-[0.7rem] font-semibold text-muted">
                    {col.stage} <span className="text-subtle">{col.people.length}</span>
                  </p>
                  <ul className="space-y-1.5">
                    {col.people.map(([initials, match], i) => (
                      <motion.li
                        key={initials}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: ci * 0.08 + i * 0.05 }}
                        className="flex items-center justify-between rounded-lg border border-line bg-ink-950 px-2 py-1.5"
                      >
                        <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-brand/50 to-aqua/40 text-[0.6rem] font-semibold text-fg">{initials}</span>
                        <span className={cn('rounded-full px-1.5 py-px text-[0.6rem]', matchTone[match])}>{match}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ),
        },
        {
          id: 'candidate',
          label: 'Resume analysis',
          icon: Sparkles,
          content: (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-brand/50 to-aqua/40 text-sm font-semibold text-fg">EW</span>
                <div>
                  <p className="text-sm font-semibold text-fg">Candidate E. W.</p>
                  <p className="text-xs text-subtle">Frontend Engineer · 6 years</p>
                </div>
                <span className="ml-auto rounded-full bg-success/15 px-2 py-0.5 text-xs text-success">Strong match</span>
              </div>
              <div className="rounded-xl border border-aqua/30 bg-aqua/[0.06] p-3 text-xs leading-relaxed text-muted">
                <p className="mb-1 flex items-center gap-1.5 font-medium text-aqua">
                  <Sparkles className="size-3.5" aria-hidden /> AI summary
                </p>
                Led a design-system migration to React and TypeScript; experience with accessibility audits and performance budgets.
              </div>
              <ul className="grid gap-1.5 text-xs sm:grid-cols-2">
                {[['React', true], ['TypeScript', true], ['Accessibility', true], ['GraphQL', false]].map(([skill, ok]) => (
                  <li key={String(skill)} className="flex items-center justify-between rounded-lg border border-line px-2.5 py-1.5">
                    <span className="text-fg">{skill}</span>
                    <span className={ok ? 'text-success' : 'text-subtle'}>{ok ? 'Matches requirement' : 'Not mentioned'}</span>
                  </li>
                ))}
              </ul>
            </div>
          ),
        },
        {
          id: 'insights',
          label: 'Insights',
          icon: BarChart3,
          content: (
            <div>
              <p className="text-xs font-medium text-muted">Candidates by stage</p>
              <ul className="mt-3 space-y-2.5">
                {pipeline.map((c, i) => (
                  <li key={c.stage} className="grid grid-cols-[72px_1fr_24px] items-center gap-3 text-xs">
                    <span className="text-subtle">{c.stage}</span>
                    <span className="h-2.5 overflow-hidden rounded-full bg-white/5">
                      <motion.span
                        className="block h-full rounded-full bg-brand"
                        initial={{ width: 0 }}
                        animate={{ width: `${(c.people.length / 4) * 100}%` }}
                        transition={{ delay: i * 0.08, duration: 0.6, ease }}
                      />
                    </span>
                    <span className="text-right font-mono text-fg">{c.people.length}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs text-muted">
                <Clock className="size-3.5 text-warn" aria-hidden /> 2 candidates have waited more than 5 days in Screening.
              </p>
            </div>
          ),
        },
      ]}
    />
  )
}

/* ───────────── Buddy AI ───────────── */

export function BuddyWorkspace() {
  return (
    <AppFrame
      title="Buddy AI · Python Foundations"
      accent="#8B5CF6"
      tabs={[
        {
          id: 'lab',
          label: 'Code lab',
          icon: Code2,
          content: (
            <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr]">
              <div className="overflow-hidden rounded-xl border border-line">
                <div className="flex items-center justify-between border-b border-line bg-ink-900 px-3 py-1.5 font-mono text-[0.65rem] text-subtle">
                  <span>average.py</span>
                  <span className="inline-flex items-center gap-1 rounded bg-success/15 px-1.5 py-0.5 text-success">
                    <Play className="size-2.5" aria-hidden /> Run
                  </span>
                </div>
                <pre className="overflow-x-auto bg-ink-950 p-3 font-mono text-[0.7rem] leading-relaxed text-muted">
                  <code>
                    <span className="text-iris">def</span> <span className="text-aqua">average</span>(nums):{'\n'}
                    {'    '}<span className="text-iris">return</span> sum(nums) / len(nums){'\n\n'}
                    print(average([])){'\n'}
                    <span className="text-danger">ZeroDivisionError: division by zero</span>
                  </code>
                </pre>
              </div>
              <div className="rounded-xl border border-iris/30 bg-iris/[0.07] p-3 text-xs leading-relaxed text-muted">
                <p className="mb-1.5 flex items-center gap-1.5 font-medium text-iris">
                  <Lightbulb className="size-3.5" aria-hidden /> Buddy hint
                </p>
                What happens to <code className="text-aqua">len(nums)</code> when the list is empty? Try handling that case before dividing.
              </div>
            </div>
          ),
        },
        {
          id: 'learn',
          label: 'Learning',
          icon: BookOpen,
          content: (
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                ['Variables & types', 100],
                ['Conditionals', 100],
                ['Loops', 70],
                ['Functions', 35],
              ].map(([topic, pct], i) => (
                <motion.li
                  key={String(topic)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-xl border border-line bg-ink-900/60 p-3"
                >
                  <p className="flex items-center justify-between text-xs">
                    <span className="font-medium text-fg">{topic}</span>
                    {pct === 100 && <CheckCircle2 className="size-3.5 text-success" aria-label="complete" />}
                  </p>
                  <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.span className="block h-full rounded-full bg-iris" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease }} />
                  </span>
                  <p className="mt-1.5 text-[0.65rem] text-subtle">{pct}% complete</p>
                </motion.li>
              ))}
            </ul>
          ),
        },
        {
          id: 'assess',
          label: 'Assessment',
          icon: ClipboardCheck,
          content: (
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-fg">Module quiz · Question 3 of 10</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 font-mono text-muted">
                  <Clock className="size-3" aria-hidden /> 12:40
                </span>
              </div>
              <p className="mt-3 text-sm text-fg">What does <code className="text-aqua">range(1, 5)</code> produce?</p>
              <ul className="mt-3 space-y-1.5 text-xs">
                {['1, 2, 3, 4, 5', '1, 2, 3, 4', '0, 1, 2, 3, 4', '1, 5'].map((o, i) => (
                  <li key={o} className={cn('rounded-lg border px-3 py-2', i === 1 ? 'border-iris/60 bg-iris/10 text-fg' : 'border-line text-muted')}>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          ),
        },
      ]}
    />
  )
}

/* ───────────── SyjenEvilo (configurable placeholder) ───────────── */

export function EviloPreview({ product }: { product: Product }) {
  if (product.screenshots.length) {
    return (
      <div className="grid gap-4">
        {product.screenshots.map((s) => (
          <img key={s.src} src={s.src} alt={s.alt} loading="lazy" className="w-full rounded-2xl border border-line-strong" />
        ))}
      </div>
    )
  }
  return (
    <div className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl border border-line-strong bg-ink-950">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <div
        aria-hidden
        className="absolute size-[60%] animate-spin-slow rounded-full opacity-40 blur-3xl"
        style={{ background: `conic-gradient(from 0deg, ${product.accent.from}, ${product.accent.to}, ${product.accent.from})` }}
      />
      <div className="relative text-center">
        <span
          className="mx-auto grid size-16 place-items-center rounded-2xl text-white shadow-2xl"
          style={{ backgroundImage: `linear-gradient(135deg, ${product.accent.from}, ${product.accent.to})` }}
        >
          <product.icon className="size-8" aria-hidden />
        </span>
        <p className="mt-4 text-2xl font-semibold text-fg">{product.name}</p>
        <p className="mt-1 text-sm text-muted">Product preview coming soon</p>
      </div>
    </div>
  )
}

export function ProductShowcase({ product }: { product: Product }) {
  if (product.showcase === 'hire') return <HireDashboard />
  if (product.showcase === 'buddy') return <BuddyWorkspace />
  return <EviloPreview product={product} />
}
