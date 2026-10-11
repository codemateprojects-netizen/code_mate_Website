import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-[-0.01em] transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white shadow-[0_8px_24px_-10px_rgb(79_140_255/0.8),inset_0_1px_0_rgb(255_255_255/0.2)] hover:bg-brand-strong hover:shadow-[0_12px_32px_-10px_rgb(79_140_255/0.9),inset_0_1px_0_rgb(255_255_255/0.25)] hover:-translate-y-px',
  secondary:
    'border border-line-strong bg-white/[0.04] text-fg hover:border-brand/50 hover:bg-white/[0.07] hover:-translate-y-px',
  ghost: 'text-muted hover:text-fg',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-6 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  /** Show a trailing arrow that nudges on hover. */
  arrow?: boolean
  icon?: ReactNode
  className?: string
  children: ReactNode
}

const Inner = ({ icon, arrow, children }: Pick<CommonProps, 'icon' | 'arrow' | 'children'>) => (
  <>
    {icon}
    <span>{children}</span>
    {arrow && <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
  </>
)

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  arrow,
  icon,
  className,
  children,
  ...props
}: CommonProps & Omit<LinkProps, 'className' | 'children'>) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Inner icon={icon} arrow={arrow}>{children}</Inner>
    </Link>
  )
}

export function ButtonAnchor({
  variant = 'primary',
  size = 'md',
  arrow,
  icon,
  className,
  children,
  ...props
}: CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Inner icon={icon} arrow={arrow}>{children}</Inner>
    </a>
  )
}

export const Button = forwardRef<
  HTMLButtonElement,
  CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>
>(function Button({ variant = 'primary', size = 'md', arrow, icon, className, children, type = 'button', ...props }, ref) {
  return (
    <button ref={ref} type={type} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Inner icon={icon} arrow={arrow}>{children}</Inner>
    </button>
  )
})
