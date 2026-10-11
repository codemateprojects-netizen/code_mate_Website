/**
 * PRODUCT CONFIGURATION — edit this file to update product pages.
 *
 * Accuracy rules:
 *  - Only mark `featuresVerified: true` once every listed feature is live.
 *  - Use a feature's `status` to flag anything not yet generally available.
 *  - Set `roadmap.approved: true` only when the roadmap is approved for publication.
 *  - Screenshots go in /public/products/<slug>/ and are referenced as `/products/<slug>/file.webp`.
 */
import {
  BarChart3,
  BookOpenCheck,
  Bot,
  BrainCircuit,
  CalendarClock,
  ClipboardCheck,
  Code2,
  FileSearch,
  GitBranch,
  GraduationCap,
  Layers,
  LineChart,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { ProductSlug } from './routes'

export type FeatureStatus = 'available' | 'beta' | 'in-development' | 'planned'

export interface ProductFeature {
  title: string
  description: string
  icon: LucideIcon
  /** Omit when availability has not been confirmed — the page then shows a neutral note. */
  status?: FeatureStatus
}

export interface Product {
  slug: ProductSlug
  name: string
  /** Positioning statement. */
  tagline: string
  summary: string
  icon: LucideIcon
  /** Brand accent for this product (hex). */
  accent: { from: string; to: string }
  /** Short status pill, e.g. "Demo on request", "Beta", "Coming soon". */
  statusLabel: string
  seo: { title: string; description: string }
  hero: { title: string; description: string }
  problem: { title: string; body: string; points: string[] }
  solution: { title: string; body: string; pillars: { title: string; description: string }[] }
  features: ProductFeature[]
  /** False → page shows "availability confirmed during your demo". */
  featuresVerified: boolean
  /** Which illustrative interface to render. */
  showcase: 'hire' | 'buddy' | 'evilo'
  screenshots: { src: string; alt: string }[]
  useCases: { title: string; description: string }[]
  roadmap: { approved: boolean; items: { title: string; description: string }[] }
  links: { website?: string; demo?: string }
  cta: string
}

export const products: Product[] = [
  {
    slug: 'syjenhire',
    name: 'SyjenHire',
    tagline: 'AI-Assisted Recruitment and Hiring Platform.',
    summary: 'Bring candidates, pipelines, and hiring decisions into one AI-assisted workspace.',
    icon: Users,
    accent: { from: '#4F8CFF', to: '#22D3EE' },
    statusLabel: 'Demo on request',
    seo: {
      title: 'SyjenHire — AI-Assisted Recruitment Platform',
      description:
        'SyjenHire is an AI-assisted recruitment and hiring platform for managing candidates, analysing resumes, matching candidates to roles, and running hiring pipelines.',
    },
    hero: {
      title: 'Hire With Clarity, Not Spreadsheets.',
      description:
        'SyjenHire brings your recruitment workflow into one place — candidates, resumes, pipelines, and interviews — with AI assistance to help your team focus on the right people.',
    },
    problem: {
      title: 'Recruitment teams are buried in admin',
      body: 'Resumes arrive from many channels, candidate status lives in spreadsheets and inboxes, and recruiters spend hours screening before they ever speak to anyone.',
      points: [
        'High application volumes screened manually',
        'Candidate status scattered across tools',
        'Interview scheduling by email back-and-forth',
        'Little visibility into where the pipeline slows down',
      ],
    },
    solution: {
      title: 'One workspace for the whole hiring journey',
      body: 'SyjenHire organises candidates and roles in a single pipeline and uses AI to assist with resume analysis and matching — while hiring decisions stay with your team.',
      pillars: [
        { title: 'Organise', description: 'Candidates, roles, and stages in one structured pipeline.' },
        { title: 'Assist', description: 'AI-assisted resume analysis and candidate–role matching.' },
        { title: 'Decide', description: 'Clear information for recruiters and hiring managers to act on.' },
      ],
    },
    features: [
      { title: 'Recruitment workflow', description: 'Configure stages that match how your team hires.', icon: GitBranch },
      { title: 'Candidate management', description: 'Profiles, documents, notes, and history in one place.', icon: Users },
      { title: 'Resume analysis', description: 'AI-assisted extraction of skills, experience, and highlights.', icon: FileSearch },
      { title: 'Candidate matching', description: 'Suggested fit between candidates and role requirements, with reasons.', icon: Sparkles },
      { title: 'Hiring pipeline', description: 'Visual pipeline to move candidates between stages.', icon: Layers },
      { title: 'Interview coordination', description: 'Organise interviews and keep everyone informed.', icon: CalendarClock },
      { title: 'Recruitment insights', description: 'See pipeline health and where candidates drop off.', icon: BarChart3 },
    ],
    featuresVerified: false,
    showcase: 'hire',
    screenshots: [],
    useCases: [
      { title: 'Recruitment agencies', description: 'Manage many roles and clients with a consistent process.' },
      { title: 'Growing companies', description: 'Bring structure to hiring without enterprise complexity.' },
      { title: 'High-volume hiring', description: 'Screen large applicant pools more efficiently.' },
      { title: 'Campus & graduate hiring', description: 'Organise cohorts of applicants through assessments and interviews.' },
    ],
    roadmap: { approved: false, items: [] },
    links: {},
    cta: 'Explore SyjenHire',
  },
  {
    slug: 'buddy-ai',
    name: 'Buddy AI',
    tagline: 'AI-Powered Learning, Coding and Assessment Platform.',
    summary: 'Learn, practise code, and take assessments with an AI study companion.',
    icon: GraduationCap,
    accent: { from: '#8B5CF6', to: '#4F8CFF' },
    statusLabel: 'Demo on request',
    seo: {
      title: 'Buddy AI — AI Learning, Coding & Assessment Platform',
      description:
        'Buddy AI is an AI-powered learning, coding, and assessment platform with AI learning assistance, coding practice, an AI code lab, online examinations, and progress tracking.',
    },
    hero: {
      title: 'Learn, Code, and Prove It — With an AI Buddy.',
      description:
        'Buddy AI combines AI-assisted learning, hands-on coding practice, and online assessments in one platform for learners, educators, and training teams.',
    },
    problem: {
      title: 'Learning to code is lonely and hard to measure',
      body: 'Learners get stuck without timely help, educators struggle to give personalised feedback at scale, and assessments are often disconnected from practice.',
      points: [
        'Learners stuck on errors with no one to ask',
        'Instructors unable to review every submission in depth',
        'Practice and assessment in separate tools',
        'Little visibility into individual progress',
      ],
    },
    solution: {
      title: 'Practice, guidance, and assessment together',
      body: 'Buddy AI gives learners an AI companion that explains and hints rather than simply answering, alongside coding practice and assessments that track progress.',
      pillars: [
        { title: 'Learn', description: 'AI explanations and hints that build understanding.' },
        { title: 'Practise', description: 'Hands-on coding exercises in an in-browser lab.' },
        { title: 'Assess', description: 'Online exams and interactive assessments with progress tracking.' },
      ],
    },
    features: [
      { title: 'AI learning assistance', description: 'Ask questions and get explanations at the right level.', icon: Bot },
      { title: 'Coding practice', description: 'Exercises that build skills step by step.', icon: Code2 },
      { title: 'AI code lab', description: 'Write and run code with AI hints when you’re stuck.', icon: BrainCircuit },
      { title: 'Online examinations', description: 'Timed assessments with structured question types.', icon: ClipboardCheck },
      { title: 'Interactive assessments', description: 'Quizzes and challenges embedded in learning.', icon: BookOpenCheck },
      { title: 'Learning progress', description: 'Track progress across topics and assessments.', icon: LineChart },
    ],
    featuresVerified: false,
    showcase: 'buddy',
    screenshots: [],
    useCases: [
      { title: 'Colleges & universities', description: 'Supplement programming courses with practice and assessment.' },
      { title: 'Training institutes', description: 'Run coding bootcamps with consistent feedback.' },
      { title: 'Corporate learning', description: 'Upskill teams and assess technical skills.' },
      { title: 'Self-learners', description: 'Learn at your own pace with an AI study companion.' },
    ],
    roadmap: { approved: false, items: [] },
    links: {},
    cta: 'Explore Buddy AI',
  },
  {
    slug: 'syjenevilo',
    name: 'SyjenEvilo',
    // ── PLACEHOLDER CONTENT ──────────────────────────────────────────
    // SyjenEvilo's functionality has not been published yet. Replace the
    // fields below once the product scope is confirmed. Leave `features`
    // empty until then — the page shows an honest "details coming soon" state.
    tagline: 'A new product from Syjen Code.',
    summary: 'Product details will be announced soon. Request a private briefing to learn more.',
    icon: Sparkles,
    accent: { from: '#22D3EE', to: '#8B5CF6' },
    statusLabel: 'Coming soon',
    seo: {
      title: 'SyjenEvilo — A New Product from Syjen Code',
      description: 'SyjenEvilo is an upcoming product from Syjen Code. Request a private briefing to learn more ahead of its public launch.',
    },
    hero: {
      title: 'SyjenEvilo Is On Its Way.',
      description:
        'We’re preparing SyjenEvilo for its public introduction. Full details, features, and screenshots will be published here. In the meantime, you can request a private briefing.',
    },
    problem: { title: '', body: '', points: [] },
    solution: { title: '', body: '', pillars: [] },
    features: [
      // Example:
      // { title: 'Feature name', description: 'What it does.', icon: Sparkles, status: 'available' },
    ],
    featuresVerified: false,
    showcase: 'evilo',
    screenshots: [],
    useCases: [],
    roadmap: { approved: false, items: [] },
    links: {},
    cta: 'Discover SyjenEvilo',
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)

export const featureStatusLabel: Record<FeatureStatus, string> = {
  available: 'Available',
  beta: 'Beta',
  'in-development': 'In development',
  planned: 'Planned',
}
