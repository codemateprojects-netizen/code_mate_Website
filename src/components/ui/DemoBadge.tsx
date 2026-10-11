import { FlaskConical } from 'lucide-react'
import { cn } from '../../lib/cn'

/** Visible label for any simulated interface, sample data, or mock response. */
export function DemoBadge({ children = 'Demonstration · sample data', className }: { children?: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-warn/30 bg-warn/10 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-warn',
        className,
      )}
    >
      <FlaskConical aria-hidden className="size-3" />
      {children}
    </span>
  )
}
