import { useState, type ComponentType } from 'react'
import { ArrowUpRight, Bot, FileScan, GraduationCap, Headphones, UserSearch, Workflow, type LucideIcon } from 'lucide-react'
import { DocumentMock, KnowledgeMock, LearningMock, RecruitmentMock, SupportMock, WorkflowMock } from '../mockups/AiMocks'
import { ButtonLink } from '../ui/Button'
import { DemoBadge } from '../ui/DemoBadge'
import { Dialog } from '../ui/Dialog'
import { RevealGroup, RevealItem } from '../ui/Reveal'

interface Showcase {
  id: string
  title: string
  icon: LucideIcon
  summary: string
  how: string[]
  value: string[]
  consider: string
  Mock: ComponentType
  link: string
}

const items: Showcase[] = [
  {
    id: 'knowledge',
    title: 'AI Knowledge Assistant',
    icon: Bot,
    summary: 'Answers questions from your documents with source references.',
    how: ['Approved documents are ingested and indexed.', 'Relevant passages are retrieved for each question.', 'The model answers from those passages and cites them.'],
    value: ['Fewer repeated questions to experienced staff', 'Faster onboarding', 'Answers people can verify'],
    consider: 'Quality depends on document coverage and freshness. We evaluate against real questions before launch.',
    Mock: KnowledgeMock,
    link: '/services/rag-development',
  },
  {
    id: 'documents',
    title: 'Intelligent Document Processing',
    icon: FileScan,
    summary: 'Extracts structured data from invoices, forms, and contracts.',
    how: ['Documents are parsed (including scans via OCR).', 'Fields are extracted and validated against rules.', 'Low-confidence fields are flagged for human review.'],
    value: ['Less manual data entry', 'Consistent validation', 'Faster processing queues'],
    consider: 'Layouts vary widely; we measure extraction accuracy per field and keep people in the loop for exceptions.',
    Mock: DocumentMock,
    link: '/services/ai-solutions',
  },
  {
    id: 'workflow',
    title: 'AI Workflow Automation',
    icon: Workflow,
    summary: 'Adds AI judgement to automated business processes.',
    how: ['Triggers start the workflow (a form, an email, a record).', 'AI steps classify, enrich, or summarise.', 'Deterministic steps route, notify, and record results.'],
    value: ['Handles variable inputs rules can’t', 'Consistent, logged processing', 'Teams focus on exceptions'],
    consider: 'We combine AI with rule-based steps where rules are clearer and cheaper.',
    Mock: WorkflowMock,
    link: '/services/ai-agents',
  },
  {
    id: 'support',
    title: 'AI Customer Support',
    icon: Headphones,
    summary: 'Triage tickets and draft grounded replies for agents to approve.',
    how: ['Incoming tickets are classified by topic and urgency.', 'Relevant help articles and account context are retrieved.', 'A draft reply is prepared for an agent to review.'],
    value: ['Faster first responses', 'Consistent answers', 'Agents focus on complex cases'],
    consider: 'Customer-facing automation needs clear escalation paths and careful tone guidelines.',
    Mock: SupportMock,
    link: '/services/ai-agents',
  },
  {
    id: 'recruitment',
    title: 'Recruitment Intelligence',
    icon: UserSearch,
    summary: 'Resume analysis and candidate–role matching with explanations.',
    how: ['Resumes are parsed into structured profiles.', 'Profiles are compared with role requirements.', 'Matches are shown with reasons for recruiters to assess.'],
    value: ['Faster screening of large applicant pools', 'More consistent first-pass review', 'Recruiters spend time on conversations'],
    consider: 'Matching must be monitored for bias, and decisions must remain with people. See SyjenHire.',
    Mock: RecruitmentMock,
    link: '/products/syjenhire',
  },
  {
    id: 'learning',
    title: 'AI-Powered Learning',
    icon: GraduationCap,
    summary: 'Hints and explanations that build understanding, not shortcuts.',
    how: ['Learners work on exercises in a code lab.', 'Errors and attempts give the AI context.', 'The AI responds with hints and explanations at the right level.'],
    value: ['Learners get unstuck sooner', 'Instructors scale feedback', 'Progress is visible'],
    consider: 'Guardrails keep the assistant from simply handing over answers. See Buddy AI.',
    Mock: LearningMock,
    link: '/products/buddy-ai',
  },
]

export function AiShowcase() {
  const [open, setOpen] = useState<Showcase | null>(null)
  return (
    <>
      <RevealGroup className="snap-row grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <RevealItem key={item.id}>
            <button
              type="button"
              onClick={() => setOpen(item)}
              className="card-glow group flex h-full w-full flex-col rounded-2xl border border-line bg-ink-900/70 p-6 text-left transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl border border-line bg-ink-800 text-aqua transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <item.icon className="size-5" aria-hidden />
                </span>
                <ArrowUpRight className="size-4 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-fg">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.summary}</p>
              <span className="mt-5 text-sm font-medium text-brand">See how it works</span>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      <Dialog open={!!open} onClose={() => setOpen(null)} title={open?.title ?? ''} wide>
        {open && (
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-base leading-relaxed text-muted">{open.summary}</p>
              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-subtle">How it works</h3>
              <ol className="mt-3 space-y-2.5">
                {open.how.map((h, i) => (
                  <li key={h} className="flex gap-3 text-sm text-fg">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand/20 font-mono text-[0.7rem] text-brand">{i + 1}</span>
                    {h}
                  </li>
                ))}
              </ol>
              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-subtle">Where it helps</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {open.value.map((v) => (
                  <li key={v}>• {v}</li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl border border-line bg-ink-950/50 p-4 text-sm leading-relaxed text-muted">
                <span className="font-medium text-fg">Good to know: </span>
                {open.consider}
              </p>
              <ButtonLink to={open.link} variant="secondary" size="sm" arrow className="mt-6" onClick={() => setOpen(null)}>
                Learn more
              </ButtonLink>
            </div>
            <div>
              <DemoBadge className="mb-3">Illustrative interface · sample data</DemoBadge>
              <open.Mock />
            </div>
          </div>
        )}
      </Dialog>
    </>
  )
}
