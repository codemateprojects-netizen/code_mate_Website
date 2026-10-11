/**
 * Canonical list of routable slugs and static paths.
 *
 * This file must stay free of React / DOM imports — it is also loaded by
 * vite.config.ts to generate sitemap.xml at build time.
 */

export const serviceSlugs = [
  'software-development',
  'ai-solutions',
  'rag-development',
  'ai-agents',
  'mobile-app-development',
  'web-development',
  'cloud-devops',
  'data-engineering',
  'cybersecurity',
  'ui-ux-design',
  'quality-assurance',
  'digital-marketing',
  'seo',
  'social-media-marketing',
  'performance-marketing',
  'lead-generation',
] as const

export type ServiceSlug = (typeof serviceSlugs)[number]

export const productSlugs = ['syjenhire', 'syjenevilo', 'buddy-ai'] as const

export type ProductSlug = (typeof productSlugs)[number]

export const staticPaths = [
  '/',
  '/services',
  '/products',
  '/solutions',
  '/industries',
  '/portfolio',
  '/how-we-work',
  '/about',
  '/careers',
  '/insights',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
] as const

export const servicePath = (slug: ServiceSlug) => `/services/${slug}`
export const productPath = (slug: ProductSlug) => `/products/${slug}`
