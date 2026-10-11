import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Binary,
  FileText,
  MessageSquareText,
  Pause,
  Play,
  RotateCcw,
  Scissors,
  Search,
  SkipForward,
  Upload,
} from 'lucide-react'
import { fakeVector, ragArchitecture, ragChunks, ragQuestions, ragSources } from '../../data/demos'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'
import { DemoBadge } from '../ui/DemoBadge'
import { RevealGroup, RevealItem } from '../ui/Reveal'

/* ───────────── Architecture map (10 stages) ───────────── */

export function RagArchitecture() {
  return (
    <RevealGroup className="snap-row relative grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {ragArchitecture.map((s, i) => (
        <RevealItem key={s.title} className="card-glow group relative rounded-2xl border border-line bg-ink-900/70 p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-aqua">Stage {String(i + 1).padStart(2, '0')}</span>
            {i < ragArchitecture.length - 1 && (
              <ArrowRight aria-hidden className="size-3.5 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
            )}
          </div>
          <h4 className="mt-3 text-[0.95rem] font-semibold text-fg">{s.title}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.description}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

/* ───────────── Animated demo ───────────── */

const stations = [
  { id: 'ingest', label: 'Ingest', icon: Upload },
  { id: 'chunk', label: 'Chunk', icon: Scissors },
  { id: 'embed', label: 'Embed', icon: Binary },
  { id: 'retrieve', label: 'Retrieve', icon: Search },
  { id: 'generate', label: 'Generate', icon: MessageSquareText },
] as const

const chunkById = Object.fromEntries(ragChunks.map((c) => [c.id, c]))

export function RagDemo() {
  const reduce = useReducedMotion()
  const autoStarted = useRef(false)
  const [qi, setQi] = useState(0)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const q = ragQuestions[qi]
  const atEnd = step >= stations.length - 1
  const running = playing && !atEnd

  // Autoplay the first time the demo scrolls into view (not for reduced-motion users).
  const onEnter = () => {
    if (autoStarted.current || reduce) return
    autoStarted.current = true
    setPlaying(true)
  }

  useEffect(() => {
    if (!running) return
    const t = window.setTimeout(() => setStep((s) => s + 1), 2600)
    return () => window.clearTimeout(t)
  }, [running, step])

  const chooseQuestion = (i: number) => {
    setQi(i)
    setPlaying(false)
    setStep(3) // same documents — jump straight to retrieval for the new question
  }

  const replay = () => {
    setStep(0)
    setPlaying(true)
  }

  return (
    <motion.div
      onViewportEnter={onEnter}
      viewport={{ once: true, amount: 0.4 }}
      className="overflow-hidden rounded-3xl border border-line-strong bg-ink-900/80 shadow-[0_40px_100px_-40px_rgb(0_0_0/0.8)]"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 md:px-7">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </span>
          <p className="text-sm font-medium text-fg">RAG pipeline — knowledge assistant</p>
        </div>
        <DemoBadge>Demonstration · pre-written sample, not a live AI response</DemoBadge>
      </div>

      {/* Question picker */}
      <div className="border-b border-line px-5 py-4 md:px-7">
        <p id="rag-q-label" className="text-xs font-medium uppercase tracking-wider text-subtle">
          Try a sample question
        </p>
        <div role="radiogroup" aria-labelledby="rag-q-label" className="mt-3 flex flex-wrap gap-2">
          {ragQuestions.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={qi === i}
              onClick={() => chooseQuestion(i)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-left text-sm transition-colors',
                qi === i ? 'border-brand/60 bg-brand/15 text-fg' : 'border-line text-muted hover:border-line-strong hover:text-fg',
              )}
            >
              {item.question}
            </button>
          ))}
        </div>
      </div>

      {/* Stations */}
      <div className="relative px-5 pt-7 md:px-7">
        <div className="relative">
          <div className="absolute top-5 h-px bg-line-strong" style={{ left: '10%', right: '10%' }} />
          <motion.div
            className="absolute top-5 h-[2px] origin-left bg-gradient-to-r from-brand to-aqua"
            style={{ left: '10%', right: '10%' }}
            animate={{ scaleX: step / (stations.length - 1) }}
            transition={{ duration: 0.6, ease }}
          />
          {/* moving document packet */}
          <motion.div
            aria-hidden
            className="absolute top-5 z-10 -translate-x-1/2 -translate-y-1/2"
            animate={{ left: `${10 + (step / (stations.length - 1)) * 80}%` }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="grid size-6 place-items-center rounded-md bg-aqua text-ink-950 shadow-[0_0_20px_var(--color-aqua)]">
              <FileText className="size-3.5" />
            </span>
          </motion.div>
          <ol className="relative grid grid-cols-5">
            {stations.map((s, i) => (
              <li key={s.id} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => {
                    setPlaying(false)
                    setStep(i)
                  }}
                  aria-current={step === i ? 'step' : undefined}
                  className="group flex flex-col items-center gap-2"
                >
                  <span
                    className={cn(
                      'grid size-10 place-items-center rounded-xl border transition-all duration-300',
                      i === step && 'border-aqua bg-ink-800 text-aqua shadow-[0_0_24px_rgb(34_211_238/0.35)]',
                      i < step && 'border-brand/50 bg-brand/15 text-brand',
                      i > step && 'border-line bg-ink-900 text-subtle group-hover:text-fg',
                    )}
                  >
                    <s.icon className="size-4" aria-hidden />
                  </span>
                  <span className={cn('text-xs font-medium sm:text-sm', i === step ? 'text-fg' : 'text-subtle')}>{s.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Stage view */}
      <div className="min-h-[340px] px-5 py-6 md:px-7" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${step}-${step >= 3 ? q.id : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
          >
            {step === 0 && <IngestView />}
            {step === 1 && <ChunkView />}
            {step === 2 && <EmbedView />}
            {step === 3 && <RetrieveView qi={qi} />}
            {step === 4 && <GenerateView qi={qi} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-ink-950/40 px-5 py-3 md:px-7">
        <p className="text-xs text-subtle">
          Step {step + 1} of {stations.length} · {stations[step].label}
        </p>
        <div className="flex items-center gap-2">
          <ControlButton label={running ? 'Pause' : 'Play'} onClick={() => (atEnd ? replay() : setPlaying(!running))}>
            {running ? <Pause className="size-4" /> : <Play className="size-4" />}
          </ControlButton>
          <ControlButton
            label="Next step"
            disabled={step >= stations.length - 1}
            onClick={() => {
              setPlaying(false)
              setStep((s) => Math.min(stations.length - 1, s + 1))
            }}
          >
            <SkipForward className="size-4" />
          </ControlButton>
          <ControlButton label="Replay from start" onClick={replay}>
            <RotateCcw className="size-4" />
          </ControlButton>
        </div>
      </div>
    </motion.div>
  )
}

function ControlButton({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg disabled:opacity-40"
    >
      {children}
    </button>
  )
}

function StageCaption({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <h4 className="text-base font-semibold text-fg">{title}</h4>
      <p className="mt-1 text-sm text-muted">{children}</p>
    </div>
  )
}

function IngestView() {
  return (
    <div>
      <StageCaption title="1 · Ingest">Approved sources are collected, text is extracted, and content is normalised.</StageCaption>
      <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1.3fr]">
        <ul className="space-y-2">
          {ragSources.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              className="flex items-center gap-2.5 rounded-xl border border-line bg-ink-950/50 px-3 py-2.5 text-sm text-fg"
            >
              <FileText className="size-4 shrink-0 text-brand" aria-hidden />
              <span className="truncate">{s}</span>
            </motion.li>
          ))}
        </ul>
        <ArrowRight aria-hidden className="mx-auto size-5 rotate-90 text-subtle md:rotate-0" />
        <div className="rounded-xl border border-line bg-ink-950/60 p-4 font-mono text-xs leading-relaxed text-muted">
          {ragChunks.slice(0, 4).map((c, i) => (
            <motion.p key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.15 }} className="truncate">
              <span className="text-subtle">{c.section}</span> {c.text}
            </motion.p>
          ))}
          <p className="text-subtle">…</p>
        </div>
      </div>
    </div>
  )
}

function ChunkView() {
  return (
    <div>
      <StageCaption title="2 · Chunk">Text is split into context-preserving passages, each keeping its source and section.</StageCaption>
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {ragChunks.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.35, ease }}
            className="rounded-xl border border-line bg-ink-950/50 p-3"
          >
            <p className="flex items-center justify-between font-mono text-[0.7rem] text-aqua">
              <span>#{c.id}</span>
              <span className="truncate pl-2 text-subtle">{c.section}</span>
            </p>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">{c.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function VectorBars({ seed, delay = 0, dim }: { seed: string; delay?: number; dim?: boolean }) {
  const v = fakeVector(seed)
  return (
    <div className={cn('flex h-8 items-center gap-[3px]', dim && 'opacity-40')} aria-hidden>
      {v.map((x, i) => (
        <motion.span
          key={i}
          className={cn('w-1.5 rounded-full', x >= 0 ? 'bg-brand' : 'bg-aqua/70')}
          initial={{ height: 2 }}
          animate={{ height: Math.max(3, Math.abs(x) * 28) }}
          transition={{ delay: delay + i * 0.02, duration: 0.4, ease }}
        />
      ))}
    </div>
  )
}

function EmbedView() {
  return (
    <div>
      <StageCaption title="3 · Embed & index">
        Each chunk becomes a vector that captures its meaning, then is stored with its metadata.
      </StageCaption>
      <ul className="space-y-2">
        {ragChunks.map((c, i) => (
          <li key={c.id} className="grid grid-cols-[3rem_1fr] items-center gap-3 rounded-xl border border-line bg-ink-950/50 px-3 py-1.5 sm:grid-cols-[3rem_1fr_auto]">
            <span className="font-mono text-xs text-aqua">#{c.id}</span>
            <VectorBars seed={c.id} delay={i * 0.06} />
            <span className="hidden font-mono text-[0.7rem] text-subtle sm:block">
              [{fakeVector(c.id).slice(0, 3).map((x) => x.toFixed(2)).join(', ')}, …]
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RetrieveView({ qi }: { qi: number }) {
  const q = ragQuestions[qi]
  return (
    <div>
      <StageCaption title="4 · Retrieve & rerank">
        The question is embedded and compared against the index. Scores below the relevance threshold ({q.threshold.toFixed(2)}) are ignored.
      </StageCaption>
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-brand/30 bg-brand/10 px-3 py-2.5">
        <Search className="size-4 text-brand" aria-hidden />
        <span className="text-sm text-fg">“{q.question}”</span>
        <VectorBars seed={q.id} />
      </div>
      <ul className="space-y-2">
        {q.retrieved.map((r, i) => {
          const c = chunkById[r.id]
          const relevant = r.score >= q.threshold
          return (
            <motion.li
              key={r.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: relevant ? 1 : 0.45, x: 0 }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.35, ease }}
              className={cn('rounded-xl border p-3', relevant ? 'border-aqua/40 bg-aqua/[0.06]' : 'border-line bg-ink-950/40')}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-xs text-subtle">
                  {c.source} · {c.section}
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                    <motion.span
                      className="block h-full rounded-full bg-aqua"
                      initial={{ width: 0 }}
                      animate={{ width: `${r.score * 100}%` }}
                      transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease }}
                    />
                  </span>
                  <span className="font-mono text-xs text-fg">{r.score.toFixed(2)}</span>
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.text}</p>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

function GenerateView({ qi }: { qi: number }) {
  const q = ragQuestions[qi]
  const parts = q.answer.split(/(\[\d+\])/g)
  return (
    <div>
      <StageCaption title="5 · Generate a grounded answer">
        The model answers only from the retrieved context and cites its sources — or says it doesn’t know.
      </StageCaption>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-line bg-ink-950/60 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-subtle">Question</p>
          <p className="mt-1 text-sm text-fg">{q.question}</p>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-subtle">Sample answer</p>
          <p className="mt-1 text-[0.95rem] leading-relaxed text-fg">
            {parts.map((p, i) =>
              /^\[\d+\]$/.test(p) ? (
                <sup key={i} className="ml-0.5 rounded bg-brand/20 px-1 font-mono text-[0.7rem] text-brand">
                  {p}
                </sup>
              ) : (
                <span key={i}>{p}</span>
              ),
            )}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-ink-950/40 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-subtle">Sources</p>
          {q.citations.length ? (
            <ol className="mt-3 space-y-3">
              {q.citations.map((id, i) => {
                const c = chunkById[id]
                return (
                  <li key={id} className="flex gap-3">
                    <span className="grid size-5 shrink-0 place-items-center rounded bg-brand/20 font-mono text-[0.7rem] text-brand">{i + 1}</span>
                    <span className="text-sm">
                      <span className="block font-medium text-fg">{c.source}</span>
                      <span className="text-subtle">{c.section}</span>
                    </span>
                  </li>
                )
              })}
            </ol>
          ) : (
            <p className="mt-3 text-sm text-muted">No sources met the relevance threshold, so no answer was generated from them.</p>
          )}
        </div>
      </div>
    </div>
  )
}
