import { useRef, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { Bot, CheckCircle2, FileText, Megaphone } from 'lucide-react'
import { useFinePointer } from '../../hooks/useMediaQuery'
import { ease } from '../../lib/motion'
import { LogoMark } from '../ui/Logo'

const CX = 280
const CY = 260

/** Deterministic node layout: two rings around the brand symbol. */
const nodes = [
  ...Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 + 0.3
    return { x: CX + Math.cos(a) * 150, y: CY + Math.sin(a) * 128, r: 4.5, ring: 0 }
  }),
  ...Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 + 0.05
    return { x: CX + Math.cos(a) * 248, y: CY + Math.sin(a) * 210, r: 3, ring: 1 }
  }),
]

const edges: [number, number][] = [
  // hub → inner ring
  ...[0, 1, 2, 3, 4, 5].map((i) => [-1, i] as [number, number]),
  // inner ring loop
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  // inner → outer
  [0, 6], [0, 7], [1, 8], [1, 9], [2, 10], [3, 11], [3, 12], [4, 13], [5, 14], [5, 15],
]

const point = (i: number) => (i === -1 ? { x: CX, y: CY } : nodes[i])

function useDepth(mx: MotionValue<number>, my: MotionValue<number>, depth: number) {
  return {
    x: useTransform(mx, (v) => v * depth),
    y: useTransform(my, (v) => v * depth),
  }
}

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const interactive = fine && !reduce

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 })
  const my = useSpring(rawY, { stiffness: 60, damping: 18 })

  const back = useDepth(mx, my, -8)
  const mid = useDepth(mx, my, 10)
  const front = useDepth(mx, my, 22)
  const front2 = useDepth(mx, my, 16)

  const onMove = (e: PointerEvent) => {
    if (!interactive || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }
  const onLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden
      className="relative mx-auto aspect-[56/52] w-full max-w-[560px] select-none"
    >
      {/* Network layer */}
      <motion.svg viewBox="0 0 560 520" className="absolute inset-0 size-full overflow-visible" style={back}>
        <defs>
          <linearGradient id="hv-edge" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#4F8CFF" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <radialGradient id="hv-node">
            <stop offset="0%" stopColor="#E0ECFF" />
            <stop offset="100%" stopColor="#4F8CFF" />
          </radialGradient>
        </defs>

        {/* orbit rings */}
        <motion.ellipse
          cx={CX} cy={CY} rx={150} ry={128} fill="none" stroke="rgb(148 163 184 / 0.14)" strokeDasharray="2 6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}
        />
        <motion.ellipse
          cx={CX} cy={CY} rx={248} ry={210} fill="none" stroke="rgb(148 163 184 / 0.08)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
        />

        {edges.map(([a, b], i) => {
          const p = point(a)
          const q = point(b)
          const active = a === -1 || i % 3 === 0
          return (
            <g key={i}>
              <motion.line
                x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                stroke={active ? 'url(#hv-edge)' : 'rgb(148 163 184 / 0.16)'}
                strokeWidth={active ? 1.2 : 1}
                strokeOpacity={active ? 0.55 : 1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease, delay: 0.4 + i * 0.025 }}
              />
              {active && (
                <line
                  x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                  stroke="#9BE7F5" strokeWidth={1.6} strokeLinecap="round" strokeDasharray="2 22"
                  className="animate-dash"
                  style={{ animationDuration: `${1.4 + (i % 5) * 0.35}s`, animationDelay: `${(i % 7) * -0.3}s` }}
                />
              )}
            </g>
          )
        })}

        {nodes.map((n, i) => (
          <motion.g key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.04, duration: 0.5, ease }} style={{ originX: `${n.x}px`, originY: `${n.y}px` }}>
            {n.ring === 0 && <circle cx={n.x} cy={n.y} r={11} fill="#4F8CFF" opacity={0.12} className="animate-pulse-soft" style={{ animationDelay: `${i * 0.4}s` }} />}
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.ring === 0 ? 'url(#hv-node)' : '#64748B'} />
          </motion.g>
        ))}
      </motion.svg>

      {/* Brand symbol: isometric cube with the Syjen mark */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={mid}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className="relative grid size-[150px] place-items-center sm:size-[170px]"
        >
          <div className="absolute inset-0 rounded-full bg-brand/25 blur-3xl" />
          <svg viewBox="0 0 170 170" className="absolute inset-0 size-full">
            <defs>
              <linearGradient id="cube-top" x1="0" x2="1"><stop offset="0" stopColor="#1c2a48" /><stop offset="1" stopColor="#24375f" /></linearGradient>
              <linearGradient id="cube-left" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#141e33" /><stop offset="1" stopColor="#0d1424" /></linearGradient>
              <linearGradient id="cube-right" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#18233b" /><stop offset="1" stopColor="#101828" /></linearGradient>
              <linearGradient id="cube-edge" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#4F8CFF" /><stop offset="0.5" stopColor="#22D3EE" /><stop offset="1" stopColor="#8B5CF6" /></linearGradient>
            </defs>
            <polygon points="85,12 152,50 85,88 18,50" fill="url(#cube-top)" />
            <polygon points="18,50 85,88 85,160 18,122" fill="url(#cube-left)" />
            <polygon points="152,50 85,88 85,160 152,122" fill="url(#cube-right)" />
            <polygon points="85,12 152,50 152,122 85,160 18,122 18,50" fill="none" stroke="url(#cube-edge)" strokeWidth="1.5" />
            <polyline points="18,50 85,88 152,50" fill="none" stroke="rgb(148 163 184 / 0.25)" />
            <line x1="85" y1="88" x2="85" y2="160" stroke="rgb(148 163 184 / 0.25)" />
          </svg>
          <LogoMark className="relative size-16 drop-shadow-[0_6px_18px_rgb(79_140_255/0.45)] sm:size-[4.5rem]" />
        </motion.div>
      </motion.div>

      {/* Floating interface panels */}
      <motion.div style={front} className="absolute left-0 top-[6%] hidden sm:block">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8, ease }}>
          <div className="glass w-[210px] animate-float rounded-2xl border border-line-strong p-3.5 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-md bg-brand/20 text-brand"><Bot className="size-3.5" /></span>
              <span className="text-xs font-semibold text-fg">Knowledge assistant</span>
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-white/10" />
              <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['handbook.pdf', 'policy.md'].map((f) => (
                <span key={f} className="inline-flex items-center gap-1 rounded-md border border-line bg-ink-950/60 px-1.5 py-0.5 font-mono text-[0.6rem] text-aqua">
                  <FileText className="size-2.5" />{f}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div style={front2} className="absolute right-0 top-[18%] hidden sm:block">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8, ease }}>
          <div className="glass w-[190px] animate-float-slow rounded-2xl border border-line-strong p-3.5 shadow-2xl [animation-delay:-3s]">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-md bg-success/15 text-success"><CheckCircle2 className="size-3.5" /></span>
              <span className="text-xs font-semibold text-fg">Release pipeline</span>
            </div>
            <ul className="mt-3 space-y-1.5 font-mono text-[0.62rem] text-muted">
              {['build', 'test', 'deploy'].map((s) => (
                <li key={s} className="flex items-center justify-between">
                  <span>{s}</span>
                  <span className="size-1.5 rounded-full bg-success" />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <motion.div style={front} className="absolute bottom-[4%] right-[8%] hidden sm:block">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8, ease }}>
          <div className="glass w-[200px] animate-float rounded-2xl border border-line-strong p-3.5 shadow-2xl [animation-delay:-1.5s]">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-md bg-iris/20 text-iris"><Megaphone className="size-3.5" /></span>
              <span className="text-xs font-semibold text-fg">Launch campaign</span>
            </div>
            <div className="mt-3 flex h-10 items-end gap-1">
              {[30, 45, 38, 60, 52, 74, 68, 88].map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-iris/40 to-brand"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1.8 + i * 0.05, duration: 0.6, ease }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
