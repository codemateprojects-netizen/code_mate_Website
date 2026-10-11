import { serviceSlugs, type ServiceSlug } from '../routes'
import { aiServices } from './ai'
import { cloudServices } from './cloud'
import { engineeringServices } from './engineering'
import { growthServices } from './growth'
import type { ServiceDetail, ServiceGroupId } from './types'

export type { ServiceDetail, ServiceGroupId, ServiceFeature } from './types'

export const services: ServiceDetail[] = [...engineeringServices, ...aiServices, ...cloudServices, ...growthServices]

const bySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<ServiceSlug, ServiceDetail>

// Fail fast in development if a route has no content (or vice versa).
if (import.meta.env.DEV) {
  const missing = serviceSlugs.filter((s) => !bySlug[s])
  if (missing.length) console.error('Service content missing for:', missing)
}

export const getService = (slug: string): ServiceDetail | undefined => bySlug[slug as ServiceSlug]

export const serviceGroups: { id: ServiceGroupId; title: string; description: string }[] = [
  { id: 'engineering', title: 'Product Engineering', description: 'Software, web, and mobile products — designed, built, and tested.' },
  { id: 'ai', title: 'AI & Automation', description: 'Generative AI, RAG, agents, and machine learning in real workflows.' },
  { id: 'cloud', title: 'Cloud, Data & Security', description: 'Infrastructure, data foundations, and secure architecture.' },
  { id: 'growth', title: 'Digital Growth', description: 'Marketing that helps the right people find and choose you.' },
]

export const servicesByGroup = (group: ServiceGroupId) => services.filter((s) => s.group === group)
