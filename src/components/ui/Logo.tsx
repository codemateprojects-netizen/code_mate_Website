import { Link } from 'react-router-dom'
import mark from '../../assets/syjen-mark.png'
import { site } from '../../config/site'
import { cn } from '../../lib/cn'

export function LogoMark({ className }: { className?: string }) {
  return <img src={mark} alt="" width={160} height={160} className={cn('size-8 object-contain', className)} />
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className={cn('group inline-flex items-center gap-2.5', className)} aria-label={`${site.name} home`}>
      <LogoMark className="size-8 transition-transform duration-500 group-hover:-rotate-6" />
      <span className="whitespace-nowrap text-[1.05rem] font-semibold tracking-[-0.02em] text-fg">
        Syjen<span className="text-muted"> Code</span>
      </span>
    </Link>
  )
}
