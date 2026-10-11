import type { ReactNode } from 'react'
import { ButtonLink } from './Button'
import { Reveal } from './Reveal'

/** Closing call-to-action panel used at the end of most pages. */
export function CtaBand({
  title = 'Have an Idea? Let’s Bring It to Market.',
  description = 'Tell us what you’re planning to build. We’ll help you explore the right technology, development approach, and growth strategy for your business.',
  primary = { label: 'Start Your Project', to: '/contact' },
  secondary = { label: 'Book a Consultation', to: '/contact?type=consultation' },
  children,
}: {
  title?: ReactNode
  description?: ReactNode
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string } | null
  children?: ReactNode
}) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-line-strong bg-ink-900 px-6 py-14 text-center sm:px-10 md:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-grid mask-radial opacity-60" />
            <div className="absolute -bottom-40 left-1/2 h-80 w-[680px] -translate-x-1/2 rounded-full bg-brand/25 blur-[100px]" />
            <div className="absolute -top-32 right-0 h-64 w-80 rounded-full bg-iris/20 blur-[90px]" />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight text-fg sm:text-4xl md:text-5xl">{title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{description}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink to={primary.to} size="lg" arrow>
                {primary.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink to={secondary.to} size="lg" variant="secondary">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
