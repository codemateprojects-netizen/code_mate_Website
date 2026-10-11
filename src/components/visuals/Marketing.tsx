import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  Eye,
  Filter,
  Handshake,
  Heart,
  Image as ImageIcon,
  LayoutGrid,
  Mail,
  MousePointerClick,
  PlayCircle,
  Repeat,
  Search,
  Target,
  UserPlus,
  Users,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'
import { DemoBadge } from '../ui/DemoBadge'
import { useElementWidth } from '../../hooks/useElementWidth'

/* ───────────────────────── Funnel ───────────────────────── */

const funnel = [
  { stage: 'Awareness', description: 'SEO, social, ads, and content introduce your brand.', icon: Eye, sample: '50,000 impressions' },
  { stage: 'Website Visits', description: 'Clear pages turn interest into exploration.', icon: MousePointerClick, sample: '4,000 visits' },
  { stage: 'Lead Generation', description: 'Offers and forms capture qualified interest.', icon: UserPlus, sample: '240 leads' },
  { stage: 'Lead Nurturing', description: 'Email and follow-ups build trust over time.', icon: Mail, sample: '120 nurtured' },
  { stage: 'Conversion', description: 'Prospects become customers.', icon: Handshake, sample: '24 customers' },
  { stage: 'Retention', description: 'Onboarding and engagement keep them coming back.', icon: Repeat, sample: '18 retained' },
]

export function MarketingFunnel() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const [showSample, setShowSample] = useState(false)
  const switchId = useId()

  return (
    <div ref={ref} className="rounded-3xl border border-line bg-ink-900/70 p-5 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-fg">The growth funnel</p>
        <label htmlFor={switchId} className="flex cursor-pointer items-center gap-2.5 text-xs text-muted">
          Show illustrative sample metrics
          <button
            id={switchId}
            type="button"
            role="switch"
            aria-checked={showSample}
            onClick={() => setShowSample((s) => !s)}
            className={cn('relative h-5 w-9 rounded-full transition-colors', showSample ? 'bg-brand' : 'bg-white/15')}
          >
            <motion.span layout className={cn('absolute top-0.5 size-4 rounded-full bg-white', showSample ? 'right-0.5' : 'left-0.5')} />
          </button>
        </label>
      </div>

      <ol className="space-y-2">
        {funnel.map((f, i) => {
          const width = 100 - i * 10
          return (
            <li key={f.stage} className="flex justify-center">
              <motion.div
                initial={{ width: '30%', opacity: 0 }}
                animate={inView ? { width: `${width}%`, opacity: 1 } : undefined}
                transition={{ delay: i * 0.12, duration: 0.7, ease }}
                className="relative flex min-h-[3.75rem] items-center gap-3 overflow-hidden rounded-xl border border-brand/25 px-4 py-2.5"
                style={{ background: `linear-gradient(90deg, rgb(79 140 255 / ${0.22 - i * 0.025}), rgb(34 211 238 / ${0.12 - i * 0.012}))` }}
              >
                <f.icon className="size-4 shrink-0 text-aqua" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-fg">{f.stage}</p>
                  <p className="hidden truncate text-xs text-muted sm:block">{f.description}</p>
                </div>
                <AnimatePresence>
                  {showSample && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      className="shrink-0 font-mono text-xs text-fg"
                    >
                      {f.sample}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </li>
          )
        })}
      </ol>
      <AnimatePresence>
        {showSample && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4">
            <DemoBadge>Sample figures for illustration only — not a forecast or client result</DemoBadge>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ───────────────────────── Charts ───────────────────────── */

interface Point {
  label: string
  value: number
}

const CHART_H = 220
const PAD = { l: 40, r: 12, t: 12, b: 26 }

function niceMax(v: number) {
  const p = Math.pow(10, Math.floor(Math.log10(v)))
  return Math.ceil(v / p) * p
}

function Gridlines({ max, format, W }: { max: number; format: (n: number) => string; W: number }) {
  const ticks = [0, 0.5, 1].map((t) => t * max)
  const innerH = CHART_H - PAD.t - PAD.b
  return (
    <g>
      {ticks.map((t) => {
        const y = PAD.t + innerH - (t / max) * innerH
        return (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} stroke="rgb(148 163 184 / 0.12)" />
            <text x={PAD.l - 8} y={y + 3.5} textAnchor="end" className="fill-subtle text-[11px]">
              {format(t)}
            </text>
          </g>
        )
      })}
    </g>
  )
}

function Tooltip({ x, y, label, value, W }: { x: number; y: number; label: string; value: string; W: number }) {
  const left = Math.min(Math.max(x, 60), W - 60)
  return (
    <div
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-line-strong bg-ink-800 px-2.5 py-1.5 text-xs shadow-xl"
      style={{ left, top: y, marginTop: -8 }}
    >
      <p className="text-subtle">{label}</p>
      <p className="font-semibold text-fg">{value}</p>
    </div>
  )
}

export function LineChart({ data, unit, title }: { data: Point[]; unit: string; title: string }) {
  const [hover, setHover] = useState<number | null>(null)
  const [box, measured] = useElementWidth<HTMLDivElement>()
  const W = measured || 520
  const max = niceMax(Math.max(...data.map((d) => d.value)))
  const innerW = W - PAD.l - PAD.r
  const innerH = CHART_H - PAD.t - PAD.b
  const pts = data.map((d, i) => ({ x: PAD.l + (i / (data.length - 1)) * innerW, y: PAD.t + innerH - (d.value / max) * innerH }))
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const area = `${path} L${pts[pts.length - 1].x},${PAD.t + innerH} L${pts[0].x},${PAD.t + innerH} Z`
  const fmt = (n: number) => n.toLocaleString('en-US')

  const onMove = (e: PointerEvent<SVGRectElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * innerW
    setHover(Math.round((x / innerW) * (data.length - 1)))
  }

  return (
    <figure className="relative">
      <figcaption className="mb-2 text-xs font-medium text-muted">{title}</figcaption>
      <div ref={box} className="relative">
        <svg viewBox={`0 0 ${W} ${CHART_H}`} width={W} height={CHART_H} className="block w-full" role="img" aria-label={`${title}: ${data.map((d) => `${d.label} ${fmt(d.value)} ${unit}`).join(', ')}`}>
          <defs>
            <linearGradient id="lc-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#4F8CFF" stopOpacity="0.25" />
              <stop offset="1" stopColor="#4F8CFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <Gridlines max={max} format={fmt} W={W} />
          {data.map((d, i) =>
            i % 2 === 0 ? (
              <text key={d.label} x={pts[i].x} y={CHART_H - 8} textAnchor="middle" className="fill-subtle text-[11px]">
                {d.label}
              </text>
            ) : null,
          )}
          <motion.path d={area} fill="url(#lc-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} />
          <motion.path
            d={path}
            fill="none"
            stroke="#4F8CFF"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease }}
          />
          {hover !== null && (
            <g>
              <line x1={pts[hover].x} x2={pts[hover].x} y1={PAD.t} y2={PAD.t + innerH} stroke="rgb(148 163 184 / 0.35)" />
              <circle cx={pts[hover].x} cy={pts[hover].y} r={5} fill="#4F8CFF" stroke="#0D1220" strokeWidth={2} />
            </g>
          )}
          <rect
            x={PAD.l}
            y={PAD.t}
            width={innerW}
            height={innerH}
            fill="transparent"
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
          />
        </svg>
        {hover !== null && <Tooltip W={W} x={pts[hover].x} y={pts[hover].y} label={data[hover].label} value={`${fmt(data[hover].value)} ${unit}`} />}
      </div>
    </figure>
  )
}

export function BarChart({ data, unit, title }: { data: Point[]; unit: string; title: string }) {
  const [hover, setHover] = useState<number | null>(null)
  const [box, measured] = useElementWidth<HTMLDivElement>()
  const W = measured || 520
  const max = niceMax(Math.max(...data.map((d) => d.value)))
  const innerW = W - PAD.l - PAD.r
  const innerH = CHART_H - PAD.t - PAD.b
  const slot = innerW / data.length
  const barW = Math.min(36, slot * 0.6)
  const fmt = (n: number) => n.toLocaleString('en-US')

  return (
    <figure className="relative">
      <figcaption className="mb-2 text-xs font-medium text-muted">{title}</figcaption>
      <div ref={box} className="relative">
        <svg viewBox={`0 0 ${W} ${CHART_H}`} width={W} height={CHART_H} className="block w-full" role="img" aria-label={`${title}: ${data.map((d) => `${d.label} ${fmt(d.value)} ${unit}`).join(', ')}`}>
          <Gridlines max={max} format={fmt} W={W} />
          {data.map((d, i) => {
            const h = (d.value / max) * innerH
            const x = PAD.l + i * slot + (slot - barW) / 2
            const y = PAD.t + innerH - h
            return (
              <g key={d.label} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}>
                <rect x={PAD.l + i * slot} y={PAD.t} width={slot} height={innerH} fill="transparent" />
                <motion.path
                  d={`M${x},${PAD.t + innerH} V${y + 4} Q${x},${y} ${x + 4},${y} H${x + barW - 4} Q${x + barW},${y} ${x + barW},${y + 4} V${PAD.t + innerH} Z`}
                  fill="#4F8CFF"
                  fillOpacity={hover === null || hover === i ? 1 : 0.45}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  style={{ originY: 1, transformBox: 'fill-box' }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease }}
                />
                <text x={x + barW / 2} y={CHART_H - 8} textAnchor="middle" className="fill-subtle text-[11px]">
                  {d.label}
                </text>
              </g>
            )
          })}
        </svg>
        {hover !== null && (
          <Tooltip
            W={W}
            x={PAD.l + hover * slot + slot / 2}
            y={PAD.t + innerH - (data[hover].value / max) * innerH}
            label={data[hover].label}
            value={`${fmt(data[hover].value)} ${unit}`}
          />
        )}
      </div>
    </figure>
  )
}

/* ───────────────────────── Campaign dashboard ───────────────────────── */

const weeks = (vals: number[]) => vals.map((v, i) => ({ label: `W${i + 1}`, value: v }))

const tabs = [
  {
    id: 'seo',
    label: 'SEO',
    icon: Search,
    kpis: [
      { label: 'Organic clicks', value: '3,180' },
      { label: 'Pages indexed', value: '64' },
      { label: 'Avg. position', value: '14.2' },
    ],
    chart: { kind: 'line' as const, title: 'Organic clicks per week', unit: 'clicks', data: weeks([120, 135, 160, 158, 190, 214, 236, 250, 281, 300, 322, 348]) },
  },
  {
    id: 'paid',
    label: 'Paid advertising',
    icon: Target,
    kpis: [
      { label: 'Conversions', value: '96' },
      { label: 'Click-through rate', value: '2.4%' },
      { label: 'Cost per lead', value: '$38' },
    ],
    chart: { kind: 'bar' as const, title: 'Conversions per week', unit: 'conversions', data: weeks([4, 6, 7, 6, 9, 8, 11, 10, 12, 11, 13, 14]) },
  },
  {
    id: 'social',
    label: 'Social media',
    icon: Heart,
    kpis: [
      { label: 'Posts published', value: '36' },
      { label: 'Engagement rate', value: '3.1%' },
      { label: 'Profile visits', value: '2,450' },
    ],
    chart: {
      kind: 'bar' as const,
      title: 'Average engagements by post format',
      unit: 'engagements',
      data: [
        { label: 'Carousel', value: 182 },
        { label: 'Reel', value: 240 },
        { label: 'Static', value: 96 },
        { label: 'Video', value: 150 },
        { label: 'Story', value: 74 },
      ],
    },
  },
  {
    id: 'leads',
    label: 'Lead generation',
    icon: Users,
    kpis: [
      { label: 'New leads', value: '212' },
      { label: 'Qualified', value: '74' },
      { label: 'Meetings booked', value: '19' },
    ],
    chart: { kind: 'line' as const, title: 'Qualified leads per week', unit: 'leads', data: weeks([2, 3, 4, 4, 5, 6, 6, 7, 7, 9, 10, 11]) },
  },
]

export function CampaignDashboard() {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const tab = tabs[active]

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (active + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length
    setActive(next)
    document.getElementById(`${baseId}-tab-${next}`)?.focus()
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-line-strong bg-ink-900/80">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 md:px-7">
        <p className="flex items-center gap-2 text-sm font-medium text-fg">
          <LayoutGrid className="size-4 text-brand" aria-hidden /> Campaign dashboard
        </p>
        <DemoBadge>Sample data · not client results</DemoBadge>
      </div>
      <div role="tablist" aria-label="Marketing channels" className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line px-3 md:px-5">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            id={`${baseId}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`${baseId}-panel`}
            tabIndex={active === i ? 0 : -1}
            onKeyDown={onKey}
            onClick={() => setActive(i)}
            className={cn(
              'relative flex shrink-0 items-center gap-2 px-3 py-3.5 text-sm font-medium transition-colors',
              active === i ? 'text-fg' : 'text-subtle hover:text-fg',
            )}
          >
            <t.icon className="size-4" aria-hidden />
            {t.label}
            {active === i && <motion.span layoutId={`${baseId}-tab-ind`} className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand" />}
          </button>
        ))}
      </div>
      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`} className="p-5 md:p-7">
        <AnimatePresence mode="wait">
          <motion.div key={tab.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25, ease }}>
            <dl className="grid grid-cols-3 gap-3">
              {tab.kpis.map((k) => (
                <div key={k.label} className="rounded-xl border border-line bg-ink-950/50 p-3 md:p-4">
                  <dt className="text-[0.7rem] text-subtle md:text-xs">{k.label}</dt>
                  <dd className="mt-1 text-lg font-semibold text-fg md:text-2xl">{k.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5">
              {tab.chart.kind === 'line' ? (
                <LineChart data={tab.chart.data} unit={tab.chart.unit} title={tab.chart.title} />
              ) : (
                <BarChart data={tab.chart.data} unit={tab.chart.unit} title={tab.chart.title} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ───────────────────────── Content formats carousel ───────────────────────── */

const formats = [
  { kind: 'Carousel', channel: 'Instagram', icon: LayoutGrid, title: '5 signs your business needs custom software' },
  { kind: 'Reel', channel: 'Instagram', icon: PlayCircle, title: 'Behind the build: a 30-second product tour' },
  { kind: 'Article', channel: 'LinkedIn', icon: ImageIcon, title: 'What we learned launching an MVP in 8 weeks' },
  { kind: 'Short video', channel: 'YouTube', icon: PlayCircle, title: 'RAG explained in 60 seconds' },
  { kind: 'Post', channel: 'Facebook', icon: ImageIcon, title: 'Customer story: from spreadsheet to platform' },
  { kind: 'Newsletter', channel: 'Email', icon: Mail, title: 'Monthly: product updates & tips' },
]

export function ContentCarousel() {
  const row = [...formats, ...formats]
  return (
    <div className="relative overflow-hidden mask-fade-x" aria-label="Example content formats">
      <ul className="flex w-max animate-marquee gap-4 py-2 hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap">
        {row.map((f, i) => (
          <li
            key={i}
            aria-hidden={i >= formats.length}
            className={cn('w-64 shrink-0 rounded-2xl border border-line bg-ink-900/80 p-4', i >= formats.length && 'motion-reduce:hidden')}
          >
            <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-brand/25 via-ink-800 to-iris/25">
              <f.icon className="size-8 text-fg/70" aria-hidden />
            </div>
            <p className="mt-3 flex items-center justify-between text-xs">
              <span className="font-medium text-aqua">{f.kind}</span>
              <span className="text-subtle">{f.channel}</span>
            </p>
            <p className="mt-1 line-clamp-2 text-sm text-fg">{f.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ───────────────────────── Lead generation workflow ───────────────────────── */

const leadSteps = [
  { label: 'Prospect research', icon: Search },
  { label: 'Outreach & capture', icon: UserPlus },
  { label: 'Qualification', icon: Filter },
  { label: 'CRM & nurturing', icon: Mail },
  { label: 'Sales conversation', icon: Handshake },
]

export function LeadFlow() {
  return (
    <ol className="grid gap-3 sm:grid-cols-5">
      {leadSteps.map((s, i) => (
        <motion.li
          key={s.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.45, ease }}
          className="relative flex items-center gap-3 rounded-2xl border border-line bg-ink-900/70 p-4 sm:flex-col sm:text-center"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-ink-800 text-aqua">
            <s.icon className="size-5" aria-hidden />
          </span>
          <span className="text-sm font-medium text-fg">{s.label}</span>
          {i < leadSteps.length - 1 && (
            <ArrowRight aria-hidden className="absolute -right-3 top-1/2 z-10 hidden size-4 -translate-y-1/2 text-subtle sm:block" />
          )}
        </motion.li>
      ))}
    </ol>
  )
}
