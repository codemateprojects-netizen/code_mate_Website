import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  BookOpen,
  Bot,
  Check,
  CheckCircle2,
  Circle,
  Database,
  FileScan,
  Globe,
  Loader2,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  Users,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import { agentRequest, agentResult, agentSteps, agentTools, type AgentToolId } from '../../data/demos'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'
import { DemoBadge } from '../ui/DemoBadge'

const toolIcon: Record<AgentToolId, LucideIcon> = {
  database: Database,
  knowledge: BookOpen,
  crm: Users,
  documents: FileScan,
  api: Globe,
}

// Pentagon layout around the agent hub (percent of the square).
const toolPos = agentTools.map((_, i) => {
  const a = -Math.PI / 2 + (i / agentTools.length) * Math.PI * 2
  return { x: 50 + Math.cos(a) * 38, y: 50 + Math.sin(a) * 38 }
})

export function AgentWorkflow() {
  const reduce = useReducedMotion()
  const autoStarted = useRef(false)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [decision, setDecision] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const last = agentSteps.length - 1
  const current = agentSteps[step]
  const running = playing && step < last

  // Autoplay the first time the demo scrolls into view (not for reduced-motion users).
  const onEnter = () => {
    if (autoStarted.current || reduce) return
    autoStarted.current = true
    setPlaying(true)
  }

  useEffect(() => {
    if (!running) return
    const t = window.setTimeout(() => setStep((s) => s + 1), 2200)
    return () => window.clearTimeout(t)
  }, [running, step])

  const reset = () => {
    setStep(0)
    setDecision('pending')
    setPlaying(true)
  }

  const activeTools = new Set(current.tools)
  const logs = agentSteps.slice(0, step + 1).flatMap((s) => s.log.map((l) => ({ step: s.id, line: l })))

  return (
    <motion.div
      onViewportEnter={onEnter}
      viewport={{ once: true, amount: 0.35 }}
      className="overflow-hidden rounded-3xl border border-line-strong bg-ink-900/80 shadow-[0_40px_100px_-40px_rgb(0_0_0/0.8)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 md:px-7">
        <p className="text-sm font-medium text-fg">AI agent — support operations workflow</p>
        <DemoBadge>Demonstration · simulated tools & sample data</DemoBadge>
      </div>

      <div className="border-b border-line px-5 py-4 md:px-7">
        <p className="text-xs font-medium uppercase tracking-wider text-subtle">User request</p>
        <p className="mt-1.5 text-[0.95rem] text-fg">“{agentRequest}”</p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
        {/* Hub diagram */}
        <div className="relative border-b border-line p-5 md:p-7 lg:border-r lg:border-b-0">
          <div className="relative mx-auto aspect-square w-full max-w-[380px]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
              {toolPos.map((p, i) => {
                const on = activeTools.has(agentTools[i].id)
                return (
                  <g key={i}>
                    <line x1="50" y1="50" x2={p.x} y2={p.y} stroke={on ? '#22D3EE' : 'rgb(148 163 184 / 0.18)'} strokeWidth={on ? 0.5 : 0.35} />
                    {on && (
                      <line x1="50" y1="50" x2={p.x} y2={p.y} stroke="#E0F7FF" strokeWidth={0.7} strokeDasharray="0.6 4" strokeLinecap="round" className="animate-dash" />
                    )}
                  </g>
                )
              })}
              <circle cx="50" cy="50" r="24" fill="none" stroke="rgb(148 163 184 / 0.1)" strokeDasharray="0.8 1.6" />
            </svg>

            {/* Agent hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative grid size-20 place-items-center rounded-2xl border border-brand/50 bg-ink-800 shadow-[0_0_40px_rgb(79_140_255/0.35)] sm:size-24">
                {running && <span aria-hidden className="absolute inset-0 animate-ping rounded-2xl border border-brand/40 [animation-duration:2s]" />}
                <Bot className="size-8 text-brand" aria-hidden />
                <span className="absolute -bottom-6 whitespace-nowrap text-xs font-medium text-fg">Agent</span>
              </div>
            </div>

            {/* Tools */}
            {agentTools.map((t, i) => {
              const Icon = toolIcon[t.id]
              const on = activeTools.has(t.id)
              const skipped = current.id === 'selection' && !on
              return (
                <div
                  key={t.id}
                  className="absolute w-[34%] -translate-x-1/2 -translate-y-1/2 text-center"
                  style={{ left: `${toolPos[i].x}%`, top: `${toolPos[i].y}%` }}
                >
                  <motion.div
                    animate={{ scale: on ? 1.06 : 1, opacity: skipped ? 0.4 : 1 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      'mx-auto grid size-11 place-items-center rounded-xl border transition-colors duration-300',
                      on ? 'border-aqua/60 bg-aqua/10 text-aqua shadow-[0_0_20px_rgb(34_211_238/0.3)]' : 'border-line bg-ink-900 text-subtle',
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </motion.div>
                  <p className={cn('mt-1.5 text-[0.7rem] font-medium leading-tight sm:text-xs', on ? 'text-fg' : 'text-subtle')}>{t.label}</p>
                  <p className="hidden text-[0.65rem] text-subtle sm:block">{t.detail}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Steps + trace */}
        <div className="flex flex-col p-5 md:p-7">
          <ol className="space-y-1" aria-label="Agent execution steps">
            {agentSteps.map((s, i) => {
              const state = i < step ? 'done' : i === step ? 'current' : 'pending'
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setPlaying(false)
                      setStep(i)
                    }}
                    aria-current={state === 'current' ? 'step' : undefined}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left transition-colors',
                      state === 'current' ? 'bg-white/[0.05]' : 'hover:bg-white/[0.03]',
                    )}
                  >
                    <span className="mt-0.5">
                      {state === 'done' && <CheckCircle2 className="size-4 text-success" aria-hidden />}
                      {state === 'current' &&
                        (running ? <Loader2 className="size-4 animate-spin text-aqua" aria-hidden /> : <Circle className="size-4 fill-aqua/30 text-aqua" aria-hidden />)}
                      {state === 'pending' && <Circle className="size-4 text-subtle" aria-hidden />}
                    </span>
                    <span>
                      <span className={cn('block text-sm font-medium', state === 'pending' ? 'text-subtle' : 'text-fg')}>{s.title}</span>
                      {state === 'current' && <span className="mt-0.5 block text-xs leading-relaxed text-muted">{s.description}</span>}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="mt-4 flex-1 rounded-xl border border-line bg-ink-950/70 p-3 font-mono text-[0.7rem] leading-relaxed" aria-live="polite">
            <p className="mb-1.5 text-subtle">// execution trace (sample)</p>
            <AnimatePresence initial={false}>
              {logs.map((l, i) => (
                <motion.p
                  key={`${l.step}-${i}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease }}
                  className={cn('break-words', l.line.startsWith('✓') ? 'text-success' : l.line.startsWith('skipped') ? 'text-subtle' : 'text-muted')}
                >
                  <span className="text-brand">›</span> {l.line}
                </motion.p>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Result with human approval */}
      <AnimatePresence>
        {step === last && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden border-t border-line"
          >
            <div className="grid gap-5 p-5 md:p-7 lg:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-subtle">Summary</p>
                <ul className="mt-3 space-y-2">
                  {agentResult.summary.map((s) => (
                    <li key={s} className="flex gap-2.5 text-sm text-fg">
                      <Check className="mt-0.5 size-4 shrink-0 text-aqua" aria-hidden />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-line bg-ink-950/60 p-4">
                <p className="text-xs text-subtle">
                  Draft to <span className="text-fg">{agentResult.email.to}</span>
                </p>
                <p className="mt-1 text-sm font-medium text-fg">{agentResult.email.subject}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{agentResult.email.body}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                  {decision === 'pending' ? (
                    <>
                      <span className="mr-auto text-xs font-medium text-warn">Human approval required to send</span>
                      <SmallButton onClick={() => setDecision('rejected')}>Reject</SmallButton>
                      <SmallButton primary onClick={() => setDecision('approved')}>
                        Approve (demo)
                      </SmallButton>
                    </>
                  ) : (
                    <p className={cn('flex items-center gap-2 text-sm', decision === 'approved' ? 'text-success' : 'text-muted')}>
                      {decision === 'approved' ? <CheckCircle2 className="size-4" aria-hidden /> : <XCircle className="size-4" aria-hidden />}
                      {decision === 'approved'
                        ? 'Approved in this demo — no email was actually sent.'
                        : 'Rejected — the draft is discarded and nothing is sent.'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-ink-950/40 px-5 py-3 md:px-7">
        <p className="text-xs text-subtle">
          Step {step + 1} of {agentSteps.length} · {current.title}
        </p>
        <div className="flex items-center gap-2">
          <Ctrl label={running ? 'Pause' : 'Run'} onClick={() => (step >= last ? reset() : setPlaying(!running))}>
            {running ? <Pause className="size-4" /> : <Play className="size-4" />}
          </Ctrl>
          <Ctrl
            label="Next step"
            disabled={step >= last}
            onClick={() => {
              setPlaying(false)
              setStep((s) => Math.min(last, s + 1))
            }}
          >
            <SkipForward className="size-4" />
          </Ctrl>
          <Ctrl label="Restart" onClick={reset}>
            <RotateCcw className="size-4" />
          </Ctrl>
        </div>
      </div>
    </motion.div>
  )
}

function Ctrl({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: ReactNode }) {
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

function SmallButton({ primary, onClick, children }: { primary?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
        primary ? 'bg-brand text-white hover:bg-brand-strong' : 'border border-line text-muted hover:text-fg',
      )}
    >
      {children}
    </button>
  )
}
