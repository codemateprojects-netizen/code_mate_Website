import type { LucideIcon } from 'lucide-react'
import type { ServiceSlug } from '../routes'

export type ServiceGroupId = 'engineering' | 'ai' | 'cloud' | 'growth'

/** Interactive module rendered on a service page in addition to the template sections. */
export type ServiceFeature = 'ai-showcase' | 'llmops' | 'rag-pipeline' | 'agent-workflow' | 'marketing-funnel'

export interface ServiceDetail {
  slug: ServiceSlug
  /** Full service name, e.g. "Custom Software Development". */
  name: string
  /** Short label for menus. */
  shortName: string
  group: ServiceGroupId
  icon: LucideIcon
  /** One-line summary for cards and menus. */
  summary: string
  seo: { title: string; description: string }
  hero: { eyebrow: string; title: string; description: string }
  problem: { title: string; body: string; points: string[] }
  /** "What we deliver" — outcomes and artefacts. */
  deliverables: { title: string; description: string }[]
  /** Service catalogue groupings (e.g. "Backend & API Engineering"). */
  capabilities: { title: string; items: string[] }[]
  approach: { title: string; description: string }[]
  technologies: { group: string; items: string[] }[]
  useCases: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
  features?: ServiceFeature[]
  related: ServiceSlug[]
  cta: { title: string; description: string; label: string; to: string }
}
