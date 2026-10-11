import { Link } from 'react-router-dom'
import { ArrowUpRight, BrainCircuit, Cloud, Code2, Megaphone, type LucideIcon } from 'lucide-react'
import { serviceGroups, servicesByGroup, type ServiceGroupId } from '../../data/services'
import { RevealGroup, RevealItem } from '../ui/Reveal'

const groupIcon: Record<ServiceGroupId, LucideIcon> = {
  engineering: Code2,
  ai: BrainCircuit,
  cloud: Cloud,
  growth: Megaphone,
}

const groupAccent: Record<ServiceGroupId, string> = {
  engineering: 'from-brand/30',
  ai: 'from-aqua/25',
  cloud: 'from-iris/25',
  growth: 'from-brand/20',
}

/** Four capability groups with links to every service page. */
export function ServicesOverview() {
  return (
    <RevealGroup className="snap-row grid gap-4 md:grid-cols-2">
      {serviceGroups.map((g) => {
        const Icon = groupIcon[g.id]
        return (
          <RevealItem key={g.id} className="card-glow relative overflow-hidden rounded-3xl border border-line bg-ink-900/70 p-6 md:p-8">
            <div aria-hidden className={`pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-gradient-to-br ${groupAccent[g.id]} to-transparent blur-2xl`} />
            <div className="relative flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line-strong bg-ink-800 text-aqua">
                <Icon className="size-6" aria-hidden />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-fg">{g.title}</h3>
                <p className="mt-1 text-sm text-muted">{g.description}</p>
              </div>
            </div>
            <ul className="relative mt-6 grid gap-1 sm:grid-cols-2">
              {servicesByGroup(g.id).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
                  >
                    <span className="flex items-center gap-2.5">
                      <s.icon className="size-4 text-brand transition-transform duration-300 group-hover:scale-110" aria-hidden />
                      {s.shortName}
                    </span>
                    <ArrowUpRight className="size-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </RevealItem>
        )
      })}
    </RevealGroup>
  )
}
