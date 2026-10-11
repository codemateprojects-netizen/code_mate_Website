import { Suspense, useEffect, useLayoutEffect, useRef, type RefObject } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ease } from '../../lib/motion'
import { Footer } from './Footer'
import { MobileTabBar } from './MobileTabBar'
import { Navbar } from './Navbar'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[75] h-[2px] origin-left bg-gradient-to-r from-brand via-aqua to-iris"
    />
  )
}

/** Scrolls to top (or to #hash) on navigation and moves focus to <main> for screen readers. */
function useRouteScroll(mainRef: RefObject<HTMLElement | null>) {
  const { pathname, hash } = useLocation()
  const first = useRef(true)

  useLayoutEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  useEffect(() => {
    if (first.current) {
      first.current = false
    } else {
      mainRef.current?.focus({ preventScroll: true })
    }
    if (!hash) return
    // Lazy pages may not have rendered the target yet — retry briefly.
    let tries = 0
    let raf = 0
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else if (tries++ < 60) raf = requestAnimationFrame(seek)
    }
    raf = requestAnimationFrame(seek)
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash, mainRef])
}

function PageFallback() {
  return (
    <div className="grid min-h-[70vh] place-items-center" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <span aria-hidden className="size-8 animate-spin rounded-full border-2 border-line-strong border-t-brand" />
    </div>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  useRouteScroll(mainRef)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageFallback />}>
          <motion.div key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
            <Outlet />
          </motion.div>
        </Suspense>
      </main>
      <Footer />
      <MobileTabBar />
    </>
  )
}
