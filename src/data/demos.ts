/**
 * Pre-written sample data for the AI demonstrations.
 * Everything here is fictional ("Northwind Co." is not a real client) and every
 * component that renders it shows a visible "Demonstration" label.
 * No model is called — these are NOT live AI responses.
 */

/* ─────────────── RAG ─────────────── */

export const ragArchitecture = [
  { title: 'Data Sources', description: 'PDFs, internal documents, websites, knowledge bases, and approved databases.' },
  { title: 'Data Ingestion', description: 'Extract text, normalize content, and process supported formats.' },
  { title: 'Chunking', description: 'Split content into useful, context-preserving segments.' },
  { title: 'Embeddings', description: 'Transform content into vector representations.' },
  { title: 'Indexing', description: 'Store vectors and metadata in an appropriate vector database.' },
  { title: 'Retrieval', description: 'Retrieve relevant content using semantic or hybrid search.' },
  { title: 'Reranking', description: 'Improve the relevance of retrieved results where necessary.' },
  { title: 'Generation', description: 'Provide the retrieved context to the selected language model.' },
  { title: 'Grounded Response', description: 'Generate an answer with source references when supported by the source material.' },
  { title: 'Evaluation & Monitoring', description: 'Measure retrieval quality, answer relevance, latency, and cost.' },
]

export interface RagChunk {
  id: string
  source: string
  section: string
  text: string
}

export const ragSources = ['Employee Handbook.pdf', 'IT Security Policy.pdf', 'Travel & Expense Guide.docx']

export const ragChunks: RagChunk[] = [
  { id: 'c1', source: 'Employee Handbook.pdf', section: '§4.2 Remote work', text: 'Employees may work remotely up to 3 days per week with manager approval. Core collaboration hours are 10:00–15:00 local time.' },
  { id: 'c2', source: 'Employee Handbook.pdf', section: '§4.3 Equipment', text: 'Company laptops must be used for all work. Personal devices may access email only through the approved mobile app.' },
  { id: 'c3', source: 'IT Security Policy.pdf', section: '§2.1 Lost devices', text: 'Report a lost or stolen device to the IT service desk within 24 hours. IT will remotely lock the device and reset your credentials.' },
  { id: 'c4', source: 'IT Security Policy.pdf', section: '§2.4 Passwords', text: 'Passwords must be at least 14 characters. Multi-factor authentication is required for all company systems.' },
  { id: 'c5', source: 'Travel & Expense Guide.docx', section: '§3.1 Meals', text: 'The international travel meal allowance is up to USD 60 per day. Keep itemised receipts for all claims.' },
  { id: 'c6', source: 'Travel & Expense Guide.docx', section: '§3.4 Claims', text: 'Submit expense claims within 30 days of returning from travel using the finance portal.' },
]

export interface RagQuestion {
  id: string
  question: string
  /** Retrieved chunk ids with illustrative similarity scores, best first. */
  retrieved: { id: string; score: number }[]
  /** Minimum score treated as relevant. */
  threshold: number
  /** Answer text; [n] markers refer to `citations` (chunk ids, 1-based). */
  answer: string
  citations: string[]
}

export const ragQuestions: RagQuestion[] = [
  {
    id: 'remote',
    question: 'How many days a week can I work remotely?',
    retrieved: [{ id: 'c1', score: 0.89 }, { id: 'c2', score: 0.61 }, { id: 'c6', score: 0.38 }],
    threshold: 0.6,
    answer: 'You can work remotely up to 3 days per week, with your manager’s approval. Core collaboration hours are 10:00–15:00 local time [1].',
    citations: ['c1'],
  },
  {
    id: 'laptop',
    question: 'What should I do if I lose my laptop?',
    retrieved: [{ id: 'c3', score: 0.91 }, { id: 'c2', score: 0.64 }, { id: 'c4', score: 0.55 }],
    threshold: 0.6,
    answer: 'Report it to the IT service desk within 24 hours — IT will remotely lock the device and reset your credentials [1]. A replacement company laptop is needed for work, since personal devices can only access email through the approved app [2].',
    citations: ['c3', 'c2'],
  },
  {
    id: 'meals',
    question: 'What is the meal allowance for international trips?',
    retrieved: [{ id: 'c5', score: 0.93 }, { id: 'c6', score: 0.71 }, { id: 'c1', score: 0.22 }],
    threshold: 0.6,
    answer: 'The meal allowance for international travel is up to USD 60 per day. Keep itemised receipts [1] and submit your claim through the finance portal within 30 days of returning [2].',
    citations: ['c5', 'c6'],
  },
  {
    id: 'gym',
    question: 'Does the company pay for a gym membership?',
    retrieved: [{ id: 'c1', score: 0.31 }, { id: 'c5', score: 0.27 }, { id: 'c2', score: 0.19 }],
    threshold: 0.6,
    answer: 'I couldn’t find information about gym memberships in the available documents, so I can’t answer this reliably. Please check with HR.',
    citations: [],
  },
]

/** Deterministic pseudo-embedding for visualisation only. */
export function fakeVector(seed: string, dims = 12): number[] {
  let h = 2166136261
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return Array.from({ length: dims }, (_, i) => {
    h = Math.imul(h ^ (h >>> 13), 0x5bd1e995) + i
    return ((h >>> 0) % 2000) / 1000 - 1
  })
}

/* ─────────────── AI agent ─────────────── */

export type AgentToolId = 'database' | 'knowledge' | 'crm' | 'documents' | 'api'

export const agentTools: { id: AgentToolId; label: string; detail: string }[] = [
  { id: 'database', label: 'Approved database', detail: 'Read-only ticket store' },
  { id: 'knowledge', label: 'Knowledge base', detail: 'Policies & SLAs' },
  { id: 'crm', label: 'CRM sandbox', detail: 'Accounts & contacts' },
  { id: 'documents', label: 'Document processor', detail: 'PDF & form extraction' },
  { id: 'api', label: 'External API sandbox', detail: 'Service status API' },
]

export const agentRequest =
  'Summarise this week’s open support tickets for Acme Corp and draft a follow-up email to their account manager.'

export interface AgentStep {
  id: string
  title: string
  description: string
  tools: AgentToolId[]
  log: string[]
}

export const agentSteps: AgentStep[] = [
  {
    id: 'request',
    title: 'User Request',
    description: 'The request arrives with the user’s role and permissions attached.',
    tools: [],
    log: ['request received · user role: support_lead · scope: read tickets, draft email'],
  },
  {
    id: 'analysis',
    title: 'Task Analysis',
    description: 'The agent breaks the goal into sub-tasks it can verify.',
    tools: [],
    log: ['plan: 1) fetch open tickets  2) find account manager  3) check SLA policy  4) check service status  5) draft email'],
  },
  {
    id: 'selection',
    title: 'Tool Selection',
    description: 'Only the tools needed for this task are chosen — the document processor is not required.',
    tools: ['database', 'crm', 'knowledge', 'api'],
    log: ['selected: database.tickets, crm.account, knowledge.search, status.incidents', 'skipped: documents.extract (not needed)'],
  },
  {
    id: 'execution',
    title: 'Tool Execution',
    description: 'Each tool is called with scoped, server-side credentials.',
    tools: ['database', 'crm', 'knowledge', 'api'],
    log: [
      'database.tickets(account="Acme Corp", status="open") → 4 tickets (2 high priority)',
      'crm.account("Acme Corp") → account manager: J. Rivera',
      'knowledge.search("high priority SLA") → "first response within 4 business hours"',
      'status.incidents() → no active incidents',
    ],
  },
  {
    id: 'validation',
    title: 'Result Validation',
    description: 'Results are checked for completeness and policy before anything is produced.',
    tools: [],
    log: ['✓ 4 of 4 tickets included', '✓ SLA statement cites knowledge base', '✓ output is a draft — no message sent'],
  },
  {
    id: 'response',
    title: 'Final Response',
    description: 'A summary and a draft email, held for human approval.',
    tools: [],
    log: ['response ready · awaiting human approval to send'],
  },
]

export const agentResult = {
  summary: [
    '4 open tickets this week; 2 are high priority (login errors, export timeout).',
    'Both high-priority tickets are within the 4-business-hour first-response SLA.',
    'No active service incidents reported by the status API.',
  ],
  email: {
    to: 'J. Rivera (Account Manager)',
    subject: 'Acme Corp — weekly support summary',
    body: 'Hi J., Acme Corp has 4 open tickets this week, including 2 high-priority issues (login errors and an export timeout). Both received a first response within our SLA. There are no active service incidents. I’ll share an update once the high-priority items are resolved.',
  },
}
