import { useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { serviceGroups, servicesByGroup } from '../../data/services'
import { products } from '../../data/products'
import { site } from '../../config/site'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'
import { ButtonLink } from '../ui/Button'

const simpleLinks = [
  { label: 'AI Solutions', to: '/services/ai-solutions' },
  { label: 'Digital Marketing', to: '/services/digital-marketing' },
  { label: 'Solutions Overview', to: '/solutions' },
  { label: 'How We Work', to: '/how-we-work' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Industries', to: '/industries' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
]

export function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const { pathname } = useLocation()
  const [expanded, setExpanded] = useState<string | null>(null)
  const toggle = (id: string) => setExpanded((e) => (e === id ? null : id))

  const linkClass = (to: string) =>
    cn(
      'flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-medium transition-colors',
      pathname === to ? 'bg-white/[0.05] text-fg' : 'text-muted hover:bg-white/[0.04] hover:text-fg',
    )

  return (
    <motion.div
      id="mobile-menu"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease }}
      className="fixed inset-x-0 top-[calc(4rem+env(safe-area-inset-top))] bottom-0 overflow-y-auto overscroll-contain border-t border-line bg-ink-950 md:top-[calc(4.5rem+env(safe-area-inset-top))] xl:hidden"
    >
      <nav aria-label="Mobile" className="container-site flex min-h-full flex-col pt-6 pb-[calc(7rem+env(safe-area-inset-bottom))]">
        <motion.ul
          className="space-y-1"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
        >
          <Item>
            <Link to="/" onClick={onNavigate} className={linkClass('/')}>
              Home
            </Link>
          </Item>

          <Item>
            <Disclosure id="services" label="Services" open={expanded === 'services'} onToggle={toggle}>
              {serviceGroups.map((g) => (
                <div key={g.id} className="mb-4 last:mb-1">
                  <p className="px-4 pb-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-subtle">{g.title}</p>
                  {servicesByGroup(g.id).map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      onClick={onNavigate}
                      className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-[0.95rem] text-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
                    >
                      <s.icon aria-hidden className="size-4 text-brand" />
                      {s.shortName}
                    </Link>
                  ))}
                </div>
              ))}
              <Link to="/services" onClick={onNavigate} className="block px-4 py-2 text-sm font-medium text-brand">
                View all services →
              </Link>
            </Disclosure>
          </Item>

          <Item>
            <Disclosure id="products" label="Products" open={expanded === 'products'} onToggle={toggle}>
              {products.map((p) => (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  onClick={onNavigate}
                  className="block rounded-lg px-4 py-2.5 transition-colors hover:bg-white/[0.04]"
                >
                  <span className="block text-[0.95rem] font-medium text-fg">{p.name}</span>
                  <span className="block text-sm text-subtle">{p.tagline}</span>
                </Link>
              ))}
              <Link to="/products" onClick={onNavigate} className="block px-4 py-2 text-sm font-medium text-brand">
                All products →
              </Link>
            </Disclosure>
          </Item>

          {simpleLinks.map((l) => (
            <Item key={l.to}>
              <Link to={l.to} onClick={onNavigate} className={linkClass(l.to)}>
                {l.label}
              </Link>
            </Item>
          ))}
        </motion.ul>

        <div className="mt-auto space-y-3 pt-8">
          <ButtonLink to="/contact" size="lg" arrow className="w-full" onClick={onNavigate}>
            Start Your Project
          </ButtonLink>
          <ButtonLink to="/contact?type=consultation" size="lg" variant="secondary" className="w-full" onClick={onNavigate}>
            Book a Consultation
          </ButtonLink>
          <p className="pt-2 text-center text-sm text-subtle">
            <a href={`mailto:${site.contact.email}`} className="hover:text-fg">
              {site.contact.email}
            </a>
          </p>
        </div>
      </nav>
    </motion.div>
  )
}

function Item({ children }: { children: ReactNode }) {
  return (
    <motion.li variants={{ hidden: { opacity: 0, x: 12 }, show: { opacity: 1, x: 0, transition: { duration: 0.3, ease } } }}>
      {children}
    </motion.li>
  )
}

function Disclosure({
  id,
  label,
  open,
  onToggle,
  children,
}: {
  id: string
  label: string
  open: boolean
  onToggle: (id: string) => void
  children: ReactNode
}) {
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`m-${id}`}
        onClick={() => onToggle(id)}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-lg font-medium text-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
      >
        {label}
        <ChevronDown aria-hidden className={cn('size-5 transition-transform duration-300', open && 'rotate-180 text-brand')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`m-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <div className="ml-4 border-l border-line py-2 pl-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
