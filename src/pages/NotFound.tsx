import { ButtonLink } from '../components/ui/Button'
import { HeroBackdrop } from '../components/ui/PageHero'
import { Seo } from '../components/ui/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you’re looking for doesn’t exist." noindex />
      <section className="relative grid min-h-[80vh] place-items-center overflow-hidden px-4 pt-24 text-center">
        <HeroBackdrop />
        <div className="relative">
          <p className="font-mono text-sm text-aqua">404</p>
          <h1 className="mt-4 text-4xl font-semibold text-fg md:text-5xl">This page doesn’t exist.</h1>
          <p className="mx-auto mt-4 max-w-md text-muted">It may have moved, or the link may be incorrect.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/" arrow>
              Back to home
            </ButtonLink>
            <ButtonLink to="/contact" variant="secondary">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
