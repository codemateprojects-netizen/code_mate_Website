import { site } from '../config/site'

/** Public origin used for canonical URLs and structured data. */
export const origin = () => site.url || window.location.origin

/** Organization schema — factual fields only (no ratings or reviews). */
export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: origin(),
  logo: `${origin()}/apple-touch-icon.png`,
  email: site.contact.email,
  slogan: site.tagline,
  areaServed: site.serviceAreaSchema,
  ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
})

export const serviceSchema = (name: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url: origin() + path,
  areaServed: site.serviceAreaSchema,
  provider: { '@type': 'Organization', name: site.name, url: origin() },
})

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: origin() + item.path,
  })),
})
