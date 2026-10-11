import { Link } from 'react-router-dom'
import { Mail, Phone, Globe2 } from 'lucide-react'
import { site } from '../../config/site'
import { servicesByGroup } from '../../data/services'
import { products } from '../../data/products'
import { Logo } from '../ui/Logo'

const columns: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Services',
    links: [
      ...servicesByGroup('engineering').map((s) => ({ label: s.shortName, to: `/services/${s.slug}` })),
      ...servicesByGroup('cloud').map((s) => ({ label: s.shortName, to: `/services/${s.slug}` })),
    ],
  },
  {
    title: 'AI & Growth',
    links: [
      ...servicesByGroup('ai').map((s) => ({ label: s.shortName, to: `/services/${s.slug}` })),
      ...servicesByGroup('growth').map((s) => ({ label: s.shortName, to: `/services/${s.slug}` })),
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'How We Work', to: '/how-we-work' },
      { label: 'Solutions Overview', to: '/solutions' },
      { label: 'Industries', to: '/industries' },
      { label: 'Portfolio', to: '/portfolio' },
      { label: 'Insights', to: '/insights' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-950">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-brand/10 blur-[100px]" />

      <div className="container-site relative pt-16 pb-[calc(7rem+env(safe-area-inset-bottom))] md:pt-20 xl:pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{site.description}</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-fg">
                  <Mail className="size-4 text-brand" aria-hidden /> {site.contact.email}
                </a>
              </li>
              {site.contact.phone && (
                <li>
                  <a href={`tel:${site.contact.phone}`} className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-fg">
                    <Phone className="size-4 text-brand" aria-hidden /> {site.contact.phoneLabel}: {site.contact.phone}
                  </a>
                </li>
              )}
              <li className="inline-flex items-center gap-2.5 text-muted">
                <Globe2 className="size-4 text-brand" aria-hidden /> {site.serviceArea}
              </li>
            </ul>
            {site.social.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-3">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-fg">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">{col.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-sm text-muted transition-colors hover:text-fg">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">Products</h2>
              <ul className="mt-4 space-y-2.5">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/products/${p.slug}`} className="text-sm text-muted transition-colors hover:text-fg">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <h2 className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-subtle">Get started</h2>
              <ul className="mt-4 space-y-2.5">
                <li><Link to="/contact" className="text-sm text-muted hover:text-fg">Start a Project</Link></li>
                <li><Link to="/contact?type=consultation" className="text-sm text-muted hover:text-fg">Book a Consultation</Link></li>
                <li><Link to="/contact?type=demo" className="text-sm text-muted hover:text-fg">Request a Demo</Link></li>
                <li><Link to="/contact?type=marketing" className="text-sm text-muted hover:text-fg">Marketing Proposal</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-line bg-ink-900/60 px-6 py-6 text-center md:px-10">
          <p className="text-balance text-base font-medium text-fg md:text-lg">
            Your Project Is Our Project. Your Success Is Our Mission.{' '}
            <span className="text-gradient">From Development to Market, We Grow Together.</span>
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-sm text-subtle md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link to="/privacy-policy" className="hover:text-fg">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-fg">Terms and Conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
