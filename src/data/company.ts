import {
  BarChart3,
  Blocks,
  Compass,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Map as MapIcon,
  Megaphone,
  MessagesSquare,
  PenTool,
  RefreshCw,
  Rocket,
  Scale,
  Code2,
  Sprout,
  Target,
  TrendingUp,
  Users,
  BrainCircuit,
  Eye,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   Partnership journey — "Your Project Is Our Project"
   ───────────────────────────────────────────── */
export interface JourneyStage {
  number: string
  title: string
  description: string
  icon: LucideIcon
  outputs: string[]
}

export const journey: JourneyStage[] = [
  { number: '01', title: 'Discover', description: 'Understand the idea, problem, audience, and business objectives.', icon: Lightbulb, outputs: ['Goals workshop', 'Audience & problem', 'Success criteria'] },
  { number: '02', title: 'Strategize', description: 'Define the scope, roadmap, priorities, and technical approach.', icon: Compass, outputs: ['Scope & roadmap', 'Priorities', 'Technical approach'] },
  { number: '03', title: 'Design', description: 'Create the user experience, interfaces, and product architecture.', icon: PenTool, outputs: ['User journeys', 'Interface design', 'Architecture'] },
  { number: '04', title: 'Develop', description: 'Build, integrate, test, and refine the product.', icon: Code2, outputs: ['Iterative builds', 'Integrations', 'Testing'] },
  { number: '05', title: 'Launch', description: 'Prepare the product for release, deployment, and market entry.', icon: Rocket, outputs: ['Deployment', 'Launch checklist', 'Release support'] },
  { number: '06', title: 'Market', description: 'Execute agreed branding, SEO, advertising, content, and outreach activities.', icon: Megaphone, outputs: ['Brand & content', 'SEO & ads', 'Outreach'] },
  { number: '07', title: 'Optimize', description: 'Learn from analytics, user feedback, and performance.', icon: BarChart3, outputs: ['Analytics review', 'User feedback', 'Improvements'] },
  { number: '08', title: 'Grow Together', description: 'Continue improving the product and supporting business growth.', icon: Sprout, outputs: ['Roadmap updates', 'New features', 'Growth support'] },
]

/* ─────────────────────────────────────────────
   Working process — How We Work
   ───────────────────────────────────────────── */
export interface ProcessStage {
  number: string
  title: string
  icon: LucideIcon
  happens: string
  receives: string
  communication: string
  approval: string
}

export const processStages: ProcessStage[] = [
  {
    number: '01', title: 'Discovery Call', icon: MessagesSquare,
    happens: 'A conversation about your idea or challenge, your users, goals, constraints, and timeline.',
    receives: 'A summary of what we heard and suggested next steps.',
    communication: 'Video call, followed by a written recap.',
    approval: 'Your go-ahead to prepare requirements and a proposal.',
  },
  {
    number: '02', title: 'Requirements and Scope', icon: MapIcon,
    happens: 'We document features, user roles, integrations, and assumptions, and agree what is in and out of scope.',
    receives: 'A scope document with priorities and open questions.',
    communication: 'Working sessions and shared documents.',
    approval: 'Sign-off on the scope that the proposal will be based on.',
  },
  {
    number: '03', title: 'Proposal and Planning', icon: Scale,
    happens: 'We estimate effort, plan milestones, and recommend an engagement model.',
    receives: 'A proposal covering scope, timeline, team, pricing, and terms.',
    communication: 'Proposal walkthrough call.',
    approval: 'Signed agreement before work begins.',
  },
  {
    number: '04', title: 'UI/UX and Architecture', icon: PenTool,
    happens: 'User flows, wireframes, interface design, and technical architecture.',
    receives: 'Clickable prototypes and an architecture overview.',
    communication: 'Design reviews with recorded feedback.',
    approval: 'Design and architecture sign-off before development.',
  },
  {
    number: '05', title: 'Development', icon: Code2,
    happens: 'Iterative development in short cycles with regular demonstrations of working software.',
    receives: 'Access to staging builds and progress updates.',
    communication: 'Regular demos and written status updates on an agreed cadence.',
    approval: 'Feedback on each demo; change requests handled transparently.',
  },
  {
    number: '06', title: 'Testing and Quality Assurance', icon: ShieldCheck,
    happens: 'Functional, regression, device, and performance testing; bugs fixed and retested.',
    receives: 'Test summary and known-issues list.',
    communication: 'Shared issue tracker.',
    approval: 'User acceptance testing sign-off.',
  },
  {
    number: '07', title: 'Deployment', icon: Rocket,
    happens: 'Production environment set-up, deployment, monitoring, and backups.',
    receives: 'Live product, credentials handover, and runbooks as agreed.',
    communication: 'Deployment plan shared in advance; go-live checklist.',
    approval: 'Go-live approval.',
  },
  {
    number: '08', title: 'Launch Preparation', icon: Target,
    happens: 'Analytics, SEO foundations, store listings, launch content, and support readiness.',
    receives: 'Launch checklist and tracking plan.',
    communication: 'Launch planning sessions.',
    approval: 'Launch date and launch materials approved by you.',
  },
  {
    number: '09', title: 'Marketing and Customer Acquisition', icon: Megaphone,
    happens: 'Agreed SEO, content, social, advertising, and outreach activities.',
    receives: 'Campaign plans, creatives, and performance reports.',
    communication: 'Regular reports and review meetings on an agreed cadence.',
    approval: 'Campaign plans, creatives, and budgets approved before launch.',
  },
  {
    number: '10', title: 'Ongoing Optimization', icon: RefreshCw,
    happens: 'Improvements based on analytics and feedback, maintenance, and new features.',
    receives: 'A prioritised improvement backlog and release notes.',
    communication: 'Periodic roadmap reviews.',
    approval: 'Prioritisation of the next set of improvements.',
  },
]

/* ─────────────────────────────────────────────
   Engagement models
   ───────────────────────────────────────────── */
export interface EngagementModel {
  title: string
  description: string
  bestFor: string
  icon: LucideIcon
}

export const engagementModels: EngagementModel[] = [
  { title: 'Project-based engagement', description: 'A defined scope delivered against agreed milestones.', bestFor: 'MVPs, websites, and well-defined builds.', icon: Blocks },
  { title: 'Dedicated development team', description: 'A team working on your roadmap, managed with your priorities.', bestFor: 'Evolving products and long-term roadmaps.', icon: Users },
  { title: 'Ongoing maintenance', description: 'Updates, monitoring, bug fixes, and small improvements.', bestFor: 'Live products that need reliable care.', icon: RefreshCw },
  { title: 'Marketing retainer', description: 'A monthly scope of marketing activities with regular reporting.', bestFor: 'Sustained growth and brand building.', icon: TrendingUp },
  { title: 'Consulting engagement', description: 'Expert guidance on architecture, AI strategy, or growth plans.', bestFor: 'Decisions that need an informed second opinion.', icon: Lightbulb },
]

export const engagementDisclaimer =
  'Pricing, scope, timelines, deliverables, and support depend on the project agreement. Ongoing development, marketing, and business support are agreed according to each engagement.'

/* ─────────────────────────────────────────────
   Why Syjen Code
   ───────────────────────────────────────────── */
export const differentiators: { title: string; description: string; icon: LucideIcon }[] = [
  { title: 'Ownership mindset', description: 'We treat your project as if it were our own — caring about outcomes, not just tickets.', icon: HeartHandshake },
  { title: 'Software & AI expertise', description: 'Product engineering and practical AI under one roof.', icon: BrainCircuit },
  { title: 'Integrated marketing', description: 'The team that builds your product can help bring it to market.', icon: Megaphone },
  { title: 'Business-focused engineering', description: 'Technical decisions tied to business goals, budget, and timing.', icon: Target },
  { title: 'Transparent communication', description: 'Regular demos, written updates, and honest trade-offs.', icon: Eye },
  { title: 'Scalable technology choices', description: 'Proven, maintainable stacks that can grow with you.', icon: Blocks },
  { title: 'Flexible engagement models', description: 'Projects, dedicated teams, retainers, or consulting.', icon: Scale },
  { title: 'Continuous improvement', description: 'We measure, learn, and improve after launch.', icon: RefreshCw },
  { title: 'Long-term collaboration', description: 'We aim to be a partner you keep, not a vendor you replace.', icon: Handshake },
]

/* ─────────────────────────────────────────────
   About — mission, vision, values
   ───────────────────────────────────────────── */
export const mission =
  'To help businesses turn ideas into working digital products, and products into growing businesses — through reliable engineering, practical AI, and focused marketing.'

export const vision =
  'To be the technology and growth partner businesses trust from their first idea through every stage of growth.'

export const values: { title: string; description: string; icon: LucideIcon }[] = [
  { title: 'Ownership', description: 'We take responsibility for outcomes and follow through.', icon: HeartHandshake },
  { title: 'Honesty', description: 'We say what we know, what we don’t, and what we recommend — even when it’s not what you hoped to hear.', icon: Eye },
  { title: 'Craft', description: 'We care about quality in code, design, and communication.', icon: PenTool },
  { title: 'Curiosity', description: 'We keep learning so our clients benefit from what’s new and what works.', icon: Lightbulb },
  { title: 'Partnership', description: 'Your goals shape our priorities.', icon: Handshake },
  { title: 'Responsibility', description: 'We build AI and software that respects users, data, and security.', icon: ShieldCheck },
]
