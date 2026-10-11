import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'
import { fadeUp, stagger, viewportOnce, withDelay } from '../../lib/motion'

type DivProps = Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView' | 'viewport'>

/** Fades and lifts its children into view once. */
export function Reveal({ delay = 0, variants = fadeUp, ...props }: DivProps & { delay?: number; variants?: Variants }) {
  return (
    <motion.div
      variants={withDelay(variants, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...props}
    />
  )
}

/** Container that staggers <RevealItem> children as it enters the viewport. */
export function RevealGroup({ gap = 0.07, delay = 0, ...props }: DivProps & { gap?: number; delay?: number }) {
  return <motion.div variants={stagger(gap, delay)} initial="hidden" whileInView="show" viewport={viewportOnce} {...props} />
}

export function RevealItem({ variants = fadeUp, ...props }: DivProps & { variants?: Variants }) {
  return <motion.div variants={variants} {...props} />
}
