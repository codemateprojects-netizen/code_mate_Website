import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

export function Section({
  id,
  className,
  containerClassName,
  children,
  tone = 'default',
  ...rest
}: {
  id?: string
  className?: string
  containerClassName?: string
  children: ReactNode
  tone?: 'default' | 'raised'
  'aria-labelledby'?: string
}) {
  return (
    <section
      id={id}
      className={cn('relative py-16 md:py-28', tone === 'raised' && 'border-y border-line bg-ink-900/60', className)}
      {...rest}
    >
      <div className={cn('container-site', containerClassName)}>{children}</div>
    </section>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-aqua',
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-aqua shadow-[0_0_10px_var(--color-aqua)]" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  id,
  className,
  as: Tag = 'h2',
  children,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  id?: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
  children?: ReactNode
}) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <Tag id={id} className="text-3xl font-semibold leading-[1.1] text-fg sm:text-4xl md:text-[2.75rem]">
        {title}
      </Tag>
      {description && <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{description}</p>}
      {children}
    </Reveal>
  )
}
