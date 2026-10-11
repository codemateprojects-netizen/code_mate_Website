import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Boxes, House, LayoutGrid, Menu, Rocket, X, type LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'
import { mobileMenu, useMobileMenu } from '../../lib/menuStore'

interface Tab {
  label: string
  to: string
  icon: LucideIcon
  match: (path: string) => boolean
}

const left: Tab[] = [
  { label: 'Home', to: '/', icon: House, match: (p) => p === '/' },
  { label: 'Services', to: '/services', icon: LayoutGrid, match: (p) => p.startsWith('/services') },
]
const right: Tab[] = [{ label: 'Products', to: '/products', icon: Boxes, match: (p) => p.startsWith('/products') }]

/**
 * App-style bottom navigation for phones and tablets.
 * Slides away while scrolling down and returns on scroll up, like native apps.
 */
export function MobileTabBar() {
  const { pathname } = useLocation()
  const menuOpen = useMobileMenu()
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      if (Math.abs(delta) > 8) {
        setHidden(delta > 0 && y > 160)
        lastY.current = y
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const show = !hidden || menuOpen
  const activeTab = menuOpen ? 'More' : [...left, ...right].find((t) => t.match(pathname))?.label

  const item = (t: Tab) => (
    <Link
      key={t.label}
      to={t.to}
      onClick={() => mobileMenu.set(false)}
      aria-current={activeTab === t.label ? 'page' : undefined}
      className="relative flex flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition-transform active:scale-90"
    >
      <TabIcon icon={t.icon} active={activeTab === t.label} />
      <span className={cn('text-[0.65rem] font-medium', activeTab === t.label ? 'text-fg' : 'text-subtle')}>{t.label}</span>
    </Link>
  )

  return (
    <motion.nav
      aria-label="Quick navigation"
      initial={false}
      animate={{ y: show ? 0 : '130%' }}
      transition={{ type: 'spring', stiffness: 420, damping: 38 }}
      className="fixed inset-x-0 bottom-0 z-[72] px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] xl:hidden"
    >
      <div className="mx-auto grid h-16 max-w-md grid-cols-5 items-center rounded-2xl border border-line-strong bg-ink-900/85 px-1 shadow-[0_20px_50px_-12px_rgb(0_0_0/0.9)] backdrop-blur-xl">
        {left.map(item)}
        <Link
          to="/contact"
          onClick={() => mobileMenu.set(false)}
          aria-label="Start your project"
          className="flex flex-col items-center justify-center transition-transform active:scale-90"
        >
          <span className="-mt-7 grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-iris text-white shadow-[0_10px_28px_-6px_rgb(79_140_255/0.85)] ring-4 ring-ink-950">
            <Rocket className="size-6" aria-hidden />
          </span>
          <span className={cn('mt-1 text-[0.65rem] font-medium', pathname === '/contact' ? 'text-fg' : 'text-subtle')}>Start</span>
        </Link>
        {right.map(item)}
        <button
          type="button"
          onClick={mobileMenu.toggle}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="relative flex flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition-transform active:scale-90"
        >
          <TabIcon icon={menuOpen ? X : Menu} active={menuOpen} />
          <span className={cn('text-[0.65rem] font-medium', menuOpen ? 'text-fg' : 'text-subtle')}>{menuOpen ? 'Close' : 'More'}</span>
        </button>
      </div>
    </motion.nav>
  )
}

function TabIcon({ icon: Icon, active }: { icon: LucideIcon; active: boolean }) {
  return (
    <span className="relative grid h-7 w-12 place-items-center">
      {active && (
        <motion.span
          layoutId="tab-active"
          className="absolute inset-0 rounded-full bg-brand/20"
          transition={{ type: 'spring', stiffness: 500, damping: 36 }}
        />
      )}
      <Icon className={cn('relative size-5 transition-colors', active ? 'text-brand' : 'text-subtle')} aria-hidden />
    </span>
  )
}
