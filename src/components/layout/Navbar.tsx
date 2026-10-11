import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { serviceGroups, servicesByGroup } from '../../data/services'
import { products } from '../../data/products'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useScrollLock } from '../../hooks/useScrollLock'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'
import { mobileMenu, useMobileMenu } from '../../lib/menuStore'
import { ButtonLink } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'

type MenuId = 'services' | 'products'

interface NavItem {
  label: string
  to: string
  menu?: MenuId
  /** Custom active matcher. */
  match?: (path: string) => boolean
}

const isServices = (p: string) =>
  p.startsWith('/services') && !p.startsWith('/services/ai-solutions') && !p.startsWith('/services/digital-marketing')

const navItems: NavItem[] = [
  { label: 'Home', to: '/', match: (p) => p === '/' },
  { label: 'Services', to: '/services', menu: 'services', match: isServices },
  { label: 'AI Solutions', to: '/services/ai-solutions' },
  { label: 'Digital Marketing', to: '/services/digital-marketing' },
  { label: 'Products', to: '/products', menu: 'products', match: (p) => p.startsWith('/products') },
  { label: 'How We Work', to: '/how-we-work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const isActive = (item: NavItem, path: string) => (item.match ? item.match(path) : path.startsWith(item.to))

export function Navbar() {
  const { pathname, search } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState<MenuId | null>(null)
  const mobileOpen = useMobileMenu()
  const headerRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close any open menu on navigation (state adjusted during render, not in an effect).
  const routeKey = pathname + search
  const [lastRoute, setLastRoute] = useState(routeKey)
  if (routeKey !== lastRoute) {
    setLastRoute(routeKey)
    setMenu(null)
  }
  useEffect(() => mobileMenu.set(false), [routeKey])

  const closeMobile = useCallback(() => mobileMenu.set(false), [])
  useScrollLock(mobileOpen)
  useFocusTrap(headerRef, mobileOpen, closeMobile)

  const openMenu = (id: MenuId) => {
    window.clearTimeout(closeTimer.current)
    setMenu(id)
  }
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMenu(null), 140)
  }

  const solid = scrolled || menu !== null

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-[70] pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter] duration-300',
        // No backdrop-filter while the mobile menu is open: it would become the
        // containing block for the menu's position:fixed panel and collapse it.
        mobileOpen
          ? 'border-b border-line bg-ink-950'
          : solid
            ? 'border-b border-line bg-ink-950/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
      )}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && menu) {
          const trigger = headerRef.current?.querySelector<HTMLButtonElement>(`[data-menu-trigger="${menu}"]`)
          setMenu(null)
          trigger?.focus()
        }
      }}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Logo />

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = isActive(item, pathname)
              if (!item.menu) {
                return (
                  <li key={item.label}>
                    <NavLink
                      to={item.to}
                      className={cn(
                        'relative block px-3 py-2 text-sm font-medium transition-colors',
                        active ? 'text-fg' : 'text-muted hover:text-fg',
                      )}
                    >
                      <span className="link-underline">{item.label}</span>
                      {active && <ActiveDot />}
                    </NavLink>
                  </li>
                )
              }
              const open = menu === item.menu
              return (
                <li
                  key={item.label}
                  className={item.menu === 'products' ? 'relative' : undefined}
                  onMouseEnter={() => openMenu(item.menu!)}
                  onMouseLeave={scheduleClose}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose()
                  }}
                >
                  <button
                    type="button"
                    data-menu-trigger={item.menu}
                    aria-expanded={open}
                    aria-controls={`menu-${item.menu}`}
                    onClick={() => (open ? setMenu(null) : openMenu(item.menu!))}
                    className={cn(
                      'relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors',
                      active || open ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    <span className="link-underline">{item.label}</span>
                    <ChevronDown aria-hidden className={cn('size-3.5 transition-transform duration-300', open && 'rotate-180')} />
                    {active && <ActiveDot />}
                  </button>
                  <AnimatePresence>
                    {open && item.menu === 'services' && <ServicesMegaMenu onNavigate={() => setMenu(null)} />}
                    {open && item.menu === 'products' && <ProductsMenu onNavigate={() => setMenu(null)} />}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink to="/contact" size="sm" arrow>
              Start Your Project
            </ButtonLink>
          </div>
          <button
            type="button"
            className="relative grid size-10 place-items-center rounded-full border border-line bg-white/[0.03] xl:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={mobileMenu.toggle}
          >
            <Hamburger open={mobileOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>{mobileOpen && <MobileMenu onNavigate={closeMobile} />}</AnimatePresence>
    </header>
  )
}

function ActiveDot() {
  return (
    <motion.span
      layoutId="nav-active"
      aria-hidden
      className="absolute inset-x-3 -bottom-[0.95rem] h-[2px] rounded-full bg-gradient-to-r from-brand to-aqua md:-bottom-[1.2rem]"
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
    />
  )
}

function Hamburger({ open }: { open: boolean }) {
  const line = 'absolute left-0 h-[1.5px] w-full rounded-full bg-fg'
  return (
    <span aria-hidden className="relative block h-3 w-[18px]">
      <motion.span className={line} style={{ top: 0 }} animate={open ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }} transition={{ duration: 0.3, ease }} />
      <motion.span className={line} style={{ top: 5 }} animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.4 : 1 }} transition={{ duration: 0.2 }} />
      <motion.span className={line} style={{ top: 10 }} animate={open ? { top: 5, rotate: -45 } : { top: 10, rotate: 0 }} transition={{ duration: 0.3, ease }} />
    </span>
  )
}

function MenuPanel({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.22, ease }}
      className={cn('absolute top-full z-10 pt-3', className)}
    >
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-900 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]">
        {children}
      </div>
    </motion.div>
  )
}

function ServicesMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <MenuPanel id="menu-services" className="left-1/2 w-[min(1100px,calc(100vw-4rem))] -translate-x-1/2">
      <div className="grid grid-cols-4 gap-1 p-3">
        {serviceGroups.map((group) => (
          <div key={group.id} className="rounded-xl p-3">
            <p className="mb-3 px-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-subtle">{group.title}</p>
            <ul className="space-y-0.5">
              {servicesByGroup(group.id).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    onClick={onNavigate}
                    className="group flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.05] focus-visible:bg-white/[0.05]"
                  >
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md border border-line bg-ink-800 text-brand transition-colors group-hover:border-brand/40 group-hover:text-aqua">
                      <s.icon className="size-3.5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-fg">{s.shortName}</span>
                      <span className="line-clamp-1 text-xs text-subtle">{s.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-line bg-ink-950/60 px-6 py-3.5 text-sm">
        <span className="text-muted">Not sure what you need? We’ll help you scope it.</span>
        <div className="flex items-center gap-5">
          <Link to="/contact?type=consultation" onClick={onNavigate} className="font-medium text-muted transition-colors hover:text-fg">
            Book a consultation
          </Link>
          <Link to="/services" onClick={onNavigate} className="inline-flex items-center gap-1.5 font-medium text-brand hover:text-aqua">
            View all services <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </MenuPanel>
  )
}

function ProductsMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <MenuPanel id="menu-products" className="left-1/2 w-[440px] -translate-x-1/2">
      <ul className="p-2">
        {products.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/products/${p.slug}`}
              onClick={onNavigate}
              className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-white/[0.05] focus-visible:bg-white/[0.05]"
            >
              <span
                className="grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-lg"
                style={{ backgroundImage: `linear-gradient(135deg, ${p.accent.from}, ${p.accent.to})` }}
              >
                <p.icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-fg">{p.name}</span>
                  <span className="rounded-full border border-line px-2 py-px text-[0.65rem] font-medium text-subtle">{p.statusLabel}</span>
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted">{p.tagline}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="border-t border-line bg-ink-950/60 px-5 py-3">
        <Link to="/products" onClick={onNavigate} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-aqua">
          All products <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </MenuPanel>
  )
}
