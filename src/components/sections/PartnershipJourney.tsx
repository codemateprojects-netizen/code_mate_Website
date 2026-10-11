import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { journey } from '../../data/company'
import { useIsDesktop } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/Section'

const STAGES = journey.length

/**
 * "Your Project Is Our Project" — the eight-stage development-to-market journey.
 *  - mode="scroll": desktop sticky scroll scene; mobile vertical timeline.
 *  - mode="interactive": click-through stepper with no scroll coupling (for presentations).
 */
export function PartnershipJourney({ mode = 'scroll', showIntro = true }: { mode?: 'scroll' | 'interactive'; showIntro?: boolean }) {
  const desktop = useIsDesktop()

  return (
    <section id="partnership" aria-labelledby="partnership-title" className="relative">
      {showIntro && (
        <div className="container-site pt-20 md:pt-28">
          <SectionHeading
            id="partnership-title"
            eyebrow="Our Partnership Promise"
            title={
              <>
                Your Project Is <span className="text-gradient">Our Project.</span>
              </>
            }
            description="We don’t just build your product and hand it over. We work with you to bring your vision to life and support its journey into the market."
          >
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-subtle">
              When Syjen Code takes on a project, we approach it with an ownership mindset. We understand your goals, plan the right
              solution, build and test the product, support launch preparation, and help you execute your marketing and growth strategy
              through an agreed engagement.
            </p>
          </SectionHeading>
        </div>
      )}
      {!showIntro && <h2 id="partnership-title" className="sr-only">Development-to-market journey</h2>}

      {desktop ? mode === 'scroll' ? <ScrollScene /> : <InteractiveScene /> : <VerticalTimeline />}

      {showIntro && (
        <div className="container-site pb-20 md:pb-28">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-ink-900/60 p-6 md:flex-row md:items-center md:p-8">
            <p className="max-w-xl text-xl font-semibold leading-snug text-fg md:text-2xl">
              From Development to Market. We’re With You Every Step of the Way.
            </p>
            <ButtonLink to="/contact?type=consultation" size="lg" arrow className="shrink-0">
              Let’s Discuss Your Idea
            </ButtonLink>
          </div>
        </div>
      )}
    </section>
  )
}

/* ───────────── Desktop: sticky scroll scene ───────────── */

function ScrollScene() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(STAGES - 1, Math.max(0, Math.floor(v * STAGES)))))
  const fill = useTransform(scrollYProgress, [0, (STAGES - 1) / STAGES], [0, 1])

  const jumpTo = (i: number) => {
    const el = sceneRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const range = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + range * ((i + 0.5) / STAGES), behavior: 'smooth' })
  }

  return (
    <div ref={sceneRef} className="relative" style={{ height: `${STAGES * 50 + 60}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="container-site w-full pt-16">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-sm text-aqua">The development-to-market journey</p>
              <p className="mt-2 text-2xl font-semibold text-fg">Eight stages. One partner throughout.</p>
            </div>
            <p className="text-sm text-subtle">Scroll to follow the journey — or select any stage.</p>
          </div>
          <Track active={active} fill={fill} onSelect={jumpTo} />
          <StagePanel index={active} />
        </div>
      </div>
    </div>
  )
}

/* ───────────── Desktop: interactive stepper ───────────── */

function InteractiveScene() {
  const [active, setActive] = useState(0)
  return (
    <div className="container-site py-10">
      <Track active={active} fill={(STAGES > 1 ? active / (STAGES - 1) : 1)} onSelect={setActive} />
      <StagePanel index={active} />
      <div className="mt-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg disabled:opacity-40"
          aria-label="Previous stage"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setActive((a) => Math.min(STAGES - 1, a + 1))}
          disabled={active === STAGES - 1}
          className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg disabled:opacity-40"
          aria-label="Next stage"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}

function Track({ active, fill, onSelect }: { active: number; fill: MotionValue<number> | number; onSelect: (i: number) => void }) {
  return (
    <div className="relative">
      {/* track + progress fill run between the first and last node centres */}
      <div className="absolute top-6 h-px bg-line-strong" style={{ left: `${50 / STAGES}%`, right: `${50 / STAGES}%` }} />
      <motion.div
        className="absolute top-6 h-[2px] -translate-y-[0.5px] origin-left rounded-full bg-gradient-to-r from-brand via-aqua to-iris shadow-[0_0_14px_rgb(34_211_238/0.6)]"
        style={{ left: `${50 / STAGES}%`, right: `${50 / STAGES}%`, ...(typeof fill === 'number' ? {} : { scaleX: fill }) }}
        initial={false}
        animate={typeof fill === 'number' ? { scaleX: fill } : undefined}
        transition={{ duration: 0.5, ease }}
      />
      <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${STAGES}, minmax(0, 1fr))` }}>
        {journey.map((s, i) => {
          const done = i < active
          const current = i === active
          return (
            <li key={s.number} className="flex flex-col items-center text-center">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={current ? 'step' : undefined}
                aria-label={`Stage ${s.number}: ${s.title}`}
                className="group flex flex-col items-center gap-3"
              >
                <span
                  className={cn(
                    'relative grid size-12 place-items-center rounded-full border text-sm font-semibold transition-all duration-500',
                    current && 'scale-110 border-aqua bg-ink-800 text-fg shadow-[0_0_0_6px_rgb(34_211_238/0.12),0_0_30px_rgb(79_140_255/0.5)]',
                    done && 'border-transparent bg-gradient-to-br from-brand to-iris text-white',
                    !current && !done && 'border-line-strong bg-ink-900 text-subtle group-hover:border-brand/50 group-hover:text-fg',
                  )}
                >
                  {done ? <Check className="size-4" aria-hidden /> : s.number}
                </span>
                <span className={cn('text-sm font-medium transition-colors duration-300', current ? 'text-fg' : done ? 'text-muted' : 'text-subtle')}>
                  {s.title}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function StagePanel({ index }: { index: number }) {
  const s = journey[index]
  return (
    <div className="relative mt-12 overflow-hidden rounded-3xl border border-line bg-ink-900/70" aria-live="polite">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-brand/10 blur-3xl" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease }}
          className="relative grid items-center gap-10 p-8 md:grid-cols-[1.1fr_0.9fr] lg:p-12"
        >
          <div>
            <p className="font-mono text-sm text-aqua">Stage {s.number} / 0{STAGES}</p>
            <h3 className="mt-3 text-3xl font-semibold text-fg lg:text-4xl">{s.title}</h3>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{s.description}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative grid size-28 shrink-0 place-items-center">
              <span aria-hidden className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-brand/40" />
              <span aria-hidden className="absolute inset-3 rounded-full bg-gradient-to-br from-brand/25 to-iris/25 blur-md" />
              <motion.span
                initial={{ scale: 0.6, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                className="relative grid size-16 place-items-center rounded-2xl border border-line-strong bg-ink-800 text-aqua"
              >
                <s.icon className="size-7" aria-hidden />
              </motion.span>
            </div>
            <ul className="space-y-2.5">
              {s.outputs.map((o, i) => (
                <motion.li
                  key={o}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.35, ease }}
                  className="flex items-center gap-2.5 text-[0.95rem] text-fg"
                >
                  <span className="grid size-5 place-items-center rounded-full bg-success/15 text-success">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {o}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ───────────── Mobile / tablet: vertical timeline ───────────── */

function VerticalTimeline() {
  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })

  return (
    <div className="container-site py-12">
      <div ref={listRef} className="relative">
        <div aria-hidden className="absolute left-6 top-6 bottom-6 w-px bg-line-strong" />
        <motion.div
          aria-hidden
          className="absolute left-6 top-6 bottom-6 w-[2px] -translate-x-[0.5px] origin-top bg-gradient-to-b from-brand via-aqua to-iris"
          style={{ scaleY: scrollYProgress }}
        />
        <ol className="relative">
          {journey.map((s, i) => (
            <VerticalStage key={s.number} index={i} />
          ))}
        </ol>
      </div>
    </div>
  )
}

function VerticalStage({ index }: { index: number }) {
  const s = journey[index]
  const ref = useRef<HTMLLIElement>(null)
  const lit = useInView(ref, { once: true, margin: '0px 0px -35% 0px' })
  return (
    <li ref={ref} className="relative flex gap-5 pb-10 last:pb-0">
      <span
        className={cn(
          'relative z-10 grid size-12 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-all duration-500',
          lit ? 'border-transparent bg-gradient-to-br from-brand to-iris text-white shadow-[0_0_24px_rgb(79_140_255/0.45)]' : 'border-line-strong bg-ink-900 text-subtle',
        )}
      >
        {s.number}
      </span>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={lit ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, ease }}
        className="min-w-0 flex-1 rounded-2xl border border-line bg-ink-900/60 p-5"
      >
        <div className="flex items-center gap-3">
          <s.icon className="size-5 text-aqua" aria-hidden />
          <h3 className="text-lg font-semibold text-fg">{s.title}</h3>
        </div>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.description}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {s.outputs.map((o) => (
            <li key={o} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-subtle">
              {o}
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  )
}
