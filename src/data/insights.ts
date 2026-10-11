/**
 * Insights (blog) content. Keep this file free of React imports — the
 * sitemap generator in vite.config.ts reads the slugs.
 *
 * Articles are stored as structured blocks (not HTML strings) so they render
 * safely without dangerouslySetInnerHTML. To move to a CMS later, map the
 * CMS response into the `InsightPost` shape.
 */

export const insightCategories = [
  'AI Engineering',
  'RAG Tutorials',
  'Software Development',
  'Product Engineering',
  'Digital Marketing',
  'Startup Technology',
  'AI Automation',
] as const

export type InsightCategory = (typeof insightCategories)[number]

export type InsightBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; text: string }

export interface InsightPost {
  slug: string
  title: string
  excerpt: string
  category: InsightCategory
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string
  readingMinutes: number
  author: string
  body: InsightBlock[]
}

export const insights: InsightPost[] = [
  {
    slug: 'what-is-rag-and-when-does-your-business-need-it',
    title: 'What Is RAG, and When Does Your Business Actually Need It?',
    excerpt:
      'Retrieval-Augmented Generation connects a language model to your own documents. Here is how it works, where it helps, and where a simpler approach is enough.',
    category: 'RAG Tutorials',
    publishedAt: '2026-10-11',
    readingMinutes: 6,
    author: 'Syjen Code Team',
    body: [
      {
        type: 'p',
        text: 'Large language models are good at writing and reasoning over text, but they only know what was in their training data. They do not know your HR policy, your product catalogue, or the contract you signed last month. Retrieval-Augmented Generation (RAG) is the pattern that closes that gap.',
      },
      { type: 'h2', text: 'How RAG works, in plain terms' },
      {
        type: 'ol',
        items: [
          'Your documents are collected, cleaned, and split into small passages ("chunks").',
          'Each chunk is converted into an embedding — a list of numbers that captures its meaning.',
          'Embeddings are stored in a vector index alongside metadata such as source file, section, and access permissions.',
          'When someone asks a question, the question is embedded too, and the most relevant chunks are retrieved.',
          'Those chunks are passed to the language model with instructions to answer only from the provided context and to cite sources.',
        ],
      },
      {
        type: 'p',
        text: 'The model is no longer answering from memory. It is reading the relevant pages first, which makes answers more specific and lets users check the source.',
      },
      { type: 'h2', text: 'Where RAG tends to help' },
      {
        type: 'ul',
        items: [
          'Internal knowledge assistants over policies, SOPs, and wikis.',
          'Customer support assistants grounded in product documentation.',
          'Search across contracts, reports, or research where people need the passage, not just the file.',
          'Onboarding assistants that answer “how do we do X here?” questions.',
        ],
      },
      { type: 'h2', text: 'When you might not need it' },
      {
        type: 'p',
        text: 'If your knowledge fits comfortably in a single prompt, changes rarely, and is not sensitive, a well-written prompt may be enough. If the task is structured — “look up order 1042” — a direct database query or an API tool call is usually more reliable than semantic search. RAG earns its complexity when there is a lot of unstructured text that changes over time.',
      },
      { type: 'h2', text: 'What makes a RAG system good' },
      {
        type: 'ul',
        items: [
          'Chunking that respects document structure, so passages keep their meaning.',
          'Hybrid retrieval (semantic + keyword) for names, codes, and exact terms.',
          'Reranking when the first-pass results are noisy.',
          'Permission-aware retrieval, so users only see content they are allowed to see.',
          'An evaluation set of real questions, measured before and after every change.',
        ],
      },
      {
        type: 'callout',
        text: 'RAG reduces unsupported answers but does not eliminate them. Good systems show sources, say “I don’t know” when the context is missing, and are evaluated continuously.',
      },
      {
        type: 'p',
        text: 'If you are considering an AI assistant over your own documents, start with a small, representative document set and twenty to fifty real questions. That is enough to learn whether RAG fits before investing in a full build.',
      },
    ],
  },
  {
    slug: 'ai-agents-vs-chatbots',
    title: 'AI Agents vs. Chatbots: What Actually Changes?',
    excerpt:
      'A chatbot answers. An agent can take steps — look things up, call tools, and prepare actions for approval. Here is what that means for design, risk, and value.',
    category: 'AI Automation',
    publishedAt: '2026-10-11',
    readingMinutes: 5,
    author: 'Syjen Code Team',
    body: [
      {
        type: 'p',
        text: 'Most people’s first experience with business AI is a chatbot: you ask, it answers. An AI agent goes further. Given a goal, it decides which steps to take, uses tools you have approved, checks the results, and reports back — or asks a person to approve before anything consequential happens.',
      },
      { type: 'h2', text: 'The agent loop' },
      {
        type: 'ol',
        items: [
          'Understand the request and break it into tasks.',
          'Choose a tool for each task — a database query, a knowledge search, a CRM lookup, a document parser.',
          'Execute the tool with scoped, least-privilege credentials.',
          'Validate the result: is it complete, consistent, and within policy?',
          'Respond, or hand off to a human for approval.',
        ],
      },
      { type: 'h2', text: 'Design decisions that matter' },
      {
        type: 'ul',
        items: [
          'Permissions: an agent should only reach the systems and records it needs, through server-side credentials it never exposes.',
          'Human-in-the-loop: sending emails, issuing refunds, or changing records should require approval until the workflow has earned trust.',
          'Observability: every tool call and decision should be logged so you can review what happened and why.',
          'Guardrails: inputs from documents and websites can contain instructions; agents must treat them as data, not commands.',
        ],
      },
      { type: 'h2', text: 'Good first use cases' },
      {
        type: 'ul',
        items: [
          'Preparing weekly reports from several internal sources.',
          'Triaging support tickets and drafting responses for review.',
          'Extracting data from documents and pre-filling records for approval.',
          'Answering internal questions that require both a knowledge search and a data lookup.',
        ],
      },
      {
        type: 'callout',
        text: 'Start with workflows where a mistake is cheap and easy to catch. Expand autonomy only as evaluation results and audit logs justify it.',
      },
    ],
  },
  {
    slug: 'plan-development-and-marketing-together',
    title: 'Why Development and Marketing Should Be Planned Together',
    excerpt:
      'Many products are built first and marketed later. Planning both from the start shapes better scope, better analytics, and a smoother launch.',
    category: 'Startup Technology',
    publishedAt: '2026-10-11',
    readingMinutes: 4,
    author: 'Syjen Code Team',
    body: [
      {
        type: 'p',
        text: 'A common pattern: a team spends months building a product, then starts thinking about who will use it and how they will find it. By then, important decisions — onboarding flow, analytics events, landing pages, pricing pages — have already been made without marketing input.',
      },
      { type: 'h2', text: 'What changes when you plan both early' },
      {
        type: 'ul',
        items: [
          'Scope is shaped by what the first customers actually need, not every feature on the wish list.',
          'Analytics and conversion tracking are designed in, so launch data is usable from day one.',
          'SEO foundations — page structure, metadata, performance — are part of the build, not a retrofit.',
          'Launch content, landing pages, and outreach can be prepared while development is underway.',
        ],
      },
      { type: 'h2', text: 'A simple checklist before you build' },
      {
        type: 'ol',
        items: [
          'Who is the first customer, and what problem will they pay to solve?',
          'How will they discover the product — search, referrals, social, outbound?',
          'What is the single action that defines activation, and how will you measure it?',
          'What has to be true at launch for marketing spend to make sense?',
        ],
      },
      {
        type: 'p',
        text: 'None of this guarantees success — markets decide that. But it removes avoidable gaps between “the product works” and “people can find, understand, and adopt it.”',
      },
    ],
  },
]

export const getInsight = (slug: string) => insights.find((p) => p.slug === slug)
