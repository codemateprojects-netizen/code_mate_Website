import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../../config/site'
import { origin } from '../../lib/seo'

interface SeoProps {
  /** Page title without the brand suffix. */
  title: string
  description: string
  /** Override the canonical path (defaults to the current route). */
  path?: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  noindex?: boolean
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

/**
 * Per-route document metadata: title, description, canonical, Open Graph,
 * Twitter and JSON-LD. Writes to <head> directly so tags are never duplicated.
 */
export function Seo({ title, description, path, image = '/og-image.png', type = 'website', jsonLd, noindex }: SeoProps) {
  const { pathname } = useLocation()
  const canonicalPath = path ?? pathname
  const json = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const fullTitle = canonicalPath === '/' ? `${site.name} | ${title}` : `${title} | ${site.name}`
    const url = origin() + (canonicalPath === '/' ? '/' : canonicalPath.replace(/\/+$/, ''))
    const img = image.startsWith('http') ? image : origin() + image

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    upsertLink('canonical', url)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:image', img)
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', img)

    let script: HTMLScriptElement | null = null
    if (json) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = json
      document.head.appendChild(script)
    }
    return () => script?.remove()
  }, [title, description, canonicalPath, image, type, json, noindex])

  return null
}
