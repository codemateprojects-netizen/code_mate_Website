import type { ReactNode } from 'react'
import { HeroBackdrop, Breadcrumbs } from './PageHero'

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-10 md:pt-40">
        <HeroBackdrop />
        <div className="container-site relative max-w-3xl">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: title }]} />
          <h1 className="text-4xl font-semibold text-fg md:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-subtle">Last updated: {updated}</p>
        </div>
      </header>
      <div className="container-site max-w-3xl pb-24 [&_a]:text-brand [&_a:hover]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-fg [&_li]:mt-1.5 [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-muted [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-muted">
        {children}
      </div>
    </>
  )
}
