import { useParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react'
import { getProject, portfolio, portfolioCategories } from '../data/portfolio'
import { PortfolioCard } from '../components/sections/CompanySections'
import { ButtonLink } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { Seo } from '../components/ui/Seo'
import { breadcrumbSchema } from '../lib/seo'
import NotFound from './NotFound'

const catLabel = Object.fromEntries(portfolioCategories.map((c) => [c.id, c.label]))

export default function PortfolioDetail() {
  const { slug = '' } = useParams()
  const p = getProject(slug)
  if (!p) return <NotFound />
  const more = portfolio.filter((x) => x.slug !== p.slug && x.categories.some((c) => p.categories.includes(c))).slice(0, 3)

  return (
    <>
      <Seo
        title={`${p.name} — Case Study`}
        description={p.summary}
        jsonLd={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
          { name: p.name, path: `/portfolio/${p.slug}` },
        ])}
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Portfolio', to: '/portfolio' }, { label: p.name }]}
        eyebrow={`${p.type} · ${p.industry}`}
        title={p.name}
        description={p.summary}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {p.categories.map((c) => (
            <li key={c} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
              {catLabel[c]}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section className="pt-0 md:pt-0">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-10">
            <Reveal>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">The problem</h2>
              <p className="mt-3 text-xl leading-relaxed text-fg">{p.problem}</p>
            </Reveal>
            <Reveal>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">Our solution</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">{p.solution}</p>
            </Reveal>
            <Reveal>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">Key features</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 rounded-xl border border-line bg-ink-900/60 px-4 py-3 text-sm text-fg">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
            {p.workflow && (
              <Reveal>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">How it works</h2>
                <ol className="mt-4 flex flex-wrap items-center gap-2">
                  {p.workflow.map((w, i) => (
                    <li key={w} className="flex items-center gap-2">
                      <span className="rounded-lg border border-line bg-ink-900 px-3 py-1.5 font-mono text-xs text-fg">{w}</span>
                      {i < p.workflow!.length - 1 && <ArrowRight className="size-3.5 text-subtle" aria-hidden />}
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}
            {p.outcome && (
              <Reveal className="rounded-2xl border border-brand/30 bg-brand/[0.07] p-6">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-brand">Outcome</h2>
                <p className="mt-2 text-lg text-fg">{p.outcome}</p>
              </Reveal>
            )}
            {p.screenshots.length > 0 ? (
              <div className="grid gap-4">
                {p.screenshots.map((s) => (
                  <img key={s.src} src={s.src} alt={s.alt} loading="lazy" className="rounded-2xl border border-line" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-line-strong p-6 sm:flex-row sm:items-center">
                <Lock className="size-6 shrink-0 text-subtle" aria-hidden />
                <p className="flex-1 text-sm text-muted">
                  {p.confidential ? 'Screenshots and a live demo are available on request, subject to client confidentiality.' : 'Screenshots coming soon.'}
                </p>
                <ButtonLink to="/contact?type=consultation" variant="secondary" size="sm">
                  Request a walkthrough
                </ButtonLink>
              </div>
            )}
          </div>

          <aside className="h-fit space-y-6 rounded-3xl border border-line bg-ink-900/60 p-6 lg:sticky lg:top-28">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">Industry</h2>
              <p className="mt-2 text-sm text-fg">{p.industry}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">Services delivered</h2>
              <ul className="mt-2 space-y-1.5 text-sm text-fg">
                {p.servicesDelivered.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle">Technology stack</h2>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li key={s} className="rounded-md border border-line bg-ink-950 px-2 py-1 font-mono text-xs text-fg">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline">
                Visit live project <ArrowRight className="size-3.5" aria-hidden />
              </a>
            )}
          </aside>
        </div>
      </Section>

      {more.length > 0 && (
        <Section tone="raised" aria-labelledby="more-work">
          <h2 id="more-work" className="text-2xl font-semibold text-fg">
            Related work
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {more.map((m) => (
              <PortfolioCard key={m.slug} project={m} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand title="Have a similar challenge?" />
    </>
  )
}
