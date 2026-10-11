/**
 * Illustrative AI interfaces for the AI Solutions showcase.
 * All names, documents and values are fictional sample data.
 */
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, Bot, CheckCircle2, FileText, Lightbulb, Sparkles, User } from 'lucide-react'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'

const Frame = ({ title, children, className }: { title: string; children: ReactNode; className?: string }) => (
  <div className={cn('overflow-hidden rounded-2xl border border-line-strong bg-ink-950', className)}>
    <div className="flex items-center gap-2 border-b border-line bg-ink-900 px-4 py-2.5">
      <span className="flex gap-1.5" aria-hidden>
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
      </span>
      <span className="ml-2 truncate text-xs text-subtle">{title}</span>
    </div>
    <div className="p-4">{children}</div>
  </div>
)

const appear = (i: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.15 + i * 0.12, duration: 0.4, ease },
})

export function KnowledgeMock() {
  return (
    <Frame title="Knowledge assistant · Sample HR workspace">
      <div className="space-y-3 text-sm">
        <motion.div {...appear(0)} className="ml-auto flex max-w-[85%] items-start gap-2 rounded-2xl rounded-tr-sm bg-brand/20 px-3.5 py-2.5 text-fg">
          <User className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
          What’s our parental leave policy?
        </motion.div>
        <motion.div {...appear(1)} className="flex max-w-[92%] items-start gap-2 rounded-2xl rounded-tl-sm border border-line bg-ink-900 px-3.5 py-2.5 text-muted">
          <Bot className="mt-0.5 size-4 shrink-0 text-aqua" aria-hidden />
          <span>
            Eligible employees receive up to 16 weeks of paid parental leave. Requests should be submitted to HR at least 8 weeks in advance.
            <span className="mt-2 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-md border border-line bg-ink-950 px-1.5 py-0.5 font-mono text-[0.65rem] text-aqua">
                <FileText className="size-3" aria-hidden /> Benefits Guide §7.1
              </span>
            </span>
          </span>
        </motion.div>
      </div>
    </Frame>
  )
}

export function DocumentMock() {
  const fields = [
    { k: 'Supplier', v: 'Contoso Supplies Ltd', ok: true },
    { k: 'Invoice no.', v: 'INV-20418', ok: true },
    { k: 'Date', v: '2026-09-28', ok: true },
    { k: 'Total', v: 'USD 4,820.00', ok: true },
    { k: 'PO number', v: 'Not found', ok: false },
  ]
  return (
    <Frame title="Document intake · invoice_20418.pdf">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 rounded-xl border border-line bg-white/[0.03] p-3" aria-hidden>
          <div className="h-2 w-1/2 rounded bg-white/20" />
          <div className="h-2 w-1/3 rounded bg-brand/50" />
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="h-1.5 w-5/6 rounded bg-white/10" />
          <div className="h-1.5 w-4/6 rounded bg-white/10" />
          <div className="mt-3 h-2 w-1/4 rounded bg-aqua/50" />
        </div>
        <ul className="space-y-1.5 text-xs">
          {fields.map((f, i) => (
            <motion.li key={f.k} {...appear(i)} className="flex items-center justify-between gap-2 rounded-lg border border-line px-2.5 py-1.5">
              <span className="text-subtle">{f.k}</span>
              <span className={cn('flex items-center gap-1.5 font-medium', f.ok ? 'text-fg' : 'text-warn')}>
                {f.v}
                {f.ok ? <CheckCircle2 className="size-3.5 text-success" aria-label="extracted" /> : <AlertTriangle className="size-3.5" aria-label="needs review" />}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
      <p className="mt-3 text-xs text-warn">1 field needs human review before posting to the accounting system.</p>
    </Frame>
  )
}

export function WorkflowMock() {
  const nodes = ['New lead form', 'AI enrichment', 'Qualification score', 'Route to CRM', 'Notify sales']
  return (
    <Frame title="Workflow · inbound lead automation">
      <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        {nodes.map((n, i) => (
          <motion.li key={n} {...appear(i)} className="flex items-center gap-2">
            <span className={cn('rounded-xl border px-3 py-2 text-xs font-medium', i === 1 || i === 2 ? 'border-aqua/50 bg-aqua/10 text-fg' : 'border-line bg-ink-900 text-muted')}>
              {(i === 1 || i === 2) && <Sparkles className="mr-1 inline size-3 text-aqua" aria-hidden />}
              {n}
            </span>
            {i < nodes.length - 1 && <ArrowRight className="size-3.5 rotate-90 text-subtle sm:rotate-0" aria-hidden />}
          </motion.li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-subtle">AI steps are highlighted; routing rules and notifications are deterministic.</p>
    </Frame>
  )
}

export function SupportMock() {
  const tickets = [
    { t: 'Can’t reset my password', tag: 'Account access', p: 'High' },
    { t: 'Invoice shows wrong address', tag: 'Billing', p: 'Normal' },
    { t: 'How do I export reports?', tag: 'How-to', p: 'Low' },
  ]
  return (
    <Frame title="Support desk · AI triage">
      <ul className="space-y-1.5">
        {tickets.map((t, i) => (
          <motion.li key={t.t} {...appear(i)} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line px-3 py-2 text-xs">
            <span className="text-fg">{t.t}</span>
            <span className="flex gap-1.5">
              <span className="rounded-full bg-brand/15 px-2 py-0.5 text-brand">{t.tag}</span>
              <span className="rounded-full border border-line px-2 py-0.5 text-muted">{t.p}</span>
            </span>
          </motion.li>
        ))}
      </ul>
      <motion.div {...appear(3)} className="mt-3 rounded-xl border border-aqua/30 bg-aqua/[0.06] p-3 text-xs text-muted">
        <span className="font-medium text-aqua">Suggested reply (draft):</span> You can reset your password from Settings → Security. If the link has expired, I’ve
        attached a new one…
        <span className="mt-2 block text-subtle">Agent reviews and sends · cites Help Center article 2.3</span>
      </motion.div>
    </Frame>
  )
}

export function RecruitmentMock() {
  const rows = [
    { n: 'Candidate A', m: 'Strong', r: '5 yrs React · led design system' },
    { n: 'Candidate B', m: 'Good', r: '3 yrs React · TypeScript' },
    { n: 'Candidate C', m: 'Partial', r: 'Strong backend · limited React' },
  ]
  return (
    <Frame title="Role: Senior Frontend Engineer · sample candidates">
      <ul className="space-y-1.5">
        {rows.map((r, i) => (
          <motion.li key={r.n} {...appear(i)} className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs">
            <span>
              <span className="block font-medium text-fg">{r.n}</span>
              <span className="text-subtle">{r.r}</span>
            </span>
            <span className={cn('rounded-full px-2 py-0.5', i === 0 ? 'bg-success/15 text-success' : i === 1 ? 'bg-brand/15 text-brand' : 'border border-line text-muted')}>
              {r.m} match
            </span>
          </motion.li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-subtle">Match reasons are shown for every suggestion. Hiring decisions stay with your team.</p>
    </Frame>
  )
}

export function LearningMock() {
  return (
    <Frame title="Lesson 4 · Loops in Python">
      <pre className="overflow-x-auto rounded-lg bg-ink-900 p-3 font-mono text-xs leading-relaxed text-muted">
        <code>
          <span className="text-iris">for</span> i <span className="text-iris">in</span> <span className="text-aqua">range</span>(1, 5):{'\n'}
          {'    '}total = total + i{'\n'}
          <span className="text-danger">NameError: name 'total' is not defined</span>
        </code>
      </pre>
      <motion.div {...appear(1)} className="mt-3 flex gap-2 rounded-xl border border-iris/30 bg-iris/[0.08] p-3 text-xs text-muted">
        <Lightbulb className="mt-0.5 size-4 shrink-0 text-iris" aria-hidden />
        <span>
          <span className="font-medium text-fg">Hint:</span> Python needs <code className="text-aqua">total</code> to exist before you add to it. What value should a
          running total start with?
        </span>
      </motion.div>
    </Frame>
  )
}
