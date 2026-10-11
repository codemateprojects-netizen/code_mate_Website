import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'
import { Eyebrow } from './Section'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-subtle">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {c.to ? (
              <Link to={c.to} className="transition-colors hover:text-fg">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-muted">
                {c.label}
              </span>
            )}
            {i < items.length - 1 && <ChevronRight aria-hidden className="size-3.5" />}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Decorative backdrop shared by all page heroes. */
export function HeroBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-grid mask-radial opacity-70 animate-grid-drift" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
      <div className="absolute -top-20 right-[-10%] h-[360px] w-[420px] rounded-full bg-iris/15 blur-[110px]" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
    </div>
  )
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  aside,
  children,
  className,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  breadcrumbs?: Crumb[]
  actions?: ReactNode
  aside?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <header className={cn('relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24', className)}>
      <HeroBackdrop />
      <div className={cn('container-site relative', !!aside && 'grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]')}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-3xl"
        >
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
          <h1 className="text-4xl font-semibold leading-[1.05] text-fg sm:text-5xl md:text-6xl">{title}</h1>
          {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>}
          {actions && <div className="mt-9 flex flex-wrap items-center gap-3">{actions}</div>}
          {children}
        </motion.div>
        {aside && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="min-w-0"
          >
            {aside}
          </motion.div>
        )}
      </div>
    </header>
  )
}
