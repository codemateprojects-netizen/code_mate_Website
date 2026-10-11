import { Link } from 'react-router-dom'
import { Info } from 'lucide-react'
import { industries } from '../data/industries'
import { getService } from '../data/services'
import { IndustriesExplorer } from '../components/sections/CompanySections'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Section, SectionHeading } from '../components/ui/Section'
import { Seo } from '../components/ui/Seo'

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries We Serve"
        description="Software, AI, and digital marketing solutions for EdTech, recruitment and HRTech, e-commerce, logistics, professional services, healthcare, fintech, SaaS startups, manufacturing, and retail."
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Industries' }]}
        eyebrow="Industries"
        title={
          <>
            Technology shaped around <span className="text-gradient">how your industry works.</span>
          </>
        }
        description="Every sector has its own workflows, customers, and constraints. Explore the kinds of solutions we can design and build for yours."
      />

      <Section className="pt-0 md:pt-0">
        <IndustriesExplorer />
        <p className="mt-6 flex items-start gap-2 text-sm text-subtle">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          These are potential solutions, not claims of sector certification. For regulated industries we work alongside your compliance and legal advisers.
        </p>
      </Section>

      <Section tone="raised" aria-labelledby="all-industries">
        <SectionHeading id="all-industries" eyebrow="At a glance" title="All industries" className="mb-12" />
        <RevealGroup className="snap-row grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <RevealItem key={ind.id} className="card-glow group flex flex-col rounded-2xl border border-line bg-ink-950/60 p-6">
              <span className="grid size-11 place-items-center rounded-xl border border-line bg-ink-800 text-aqua transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-6">
                <ind.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-fg">{ind.name}</h3>
              <p className="mt-2 text-sm text-muted">{ind.summary}</p>
              <ul className="mt-4 flex-1 space-y-1.5 text-sm text-muted">
                {ind.useCases.map((u) => (
                  <li key={u} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-aqua" aria-hidden />
                    {u}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                {ind.services.map((slug) => (
                  <Link key={slug} to={`/services/${slug}`} className="rounded-full border border-line px-2.5 py-1 text-xs text-subtle transition-colors hover:border-brand/50 hover:text-fg">
                    {getService(slug)?.shortName}
                  </Link>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand title="Don’t see your industry?" description="Tell us about your business and the problem you want to solve. Good software starts with understanding the domain." />
    </>
  )
}
