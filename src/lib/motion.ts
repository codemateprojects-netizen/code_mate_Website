import type { Transition, Variants } from 'framer-motion'

/**
 * Shared motion presets. Keep durations short and use transform/opacity only
 * so animations stay smooth during screen-shared presentations.
 * Reduced-motion users are handled globally by <MotionConfig reducedMotion="user">.
 */

export const ease = [0.16, 1, 0.3, 1] as const

export const spring: Transition = { type: 'spring', stiffness: 260, damping: 30, mass: 0.8 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } },
}

export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Default whileInView viewport: animate once, slightly before fully visible. */
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const

/** Returns a copy of `variants` whose "show" state starts after `delay` seconds. */
export function withDelay(variants: Variants, delay: number): Variants {
  const show = variants.show
  if (!delay || !show || typeof show === 'function') return variants
  return { ...variants, show: { ...show, transition: { ...(show.transition ?? {}), delay } } }
}
