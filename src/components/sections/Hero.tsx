import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { ease } from '../../lib/motion'
import { ButtonLink } from '../ui/Button'
import { WordReveal } from '../ui/WordReveal'
import { HeroVisual } from '../visuals/HeroVisual'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
})

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 lg:min-h-[100svh] lg:pb-24">
      {/* 1 — Background */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
        <div className="absolute inset-0 bg-grid mask-radial animate-grid-drift opacity-80" />
        <div className="absolute -top-48 left-[-10%] h-[620px] w-[720px] rounded-full bg-brand/20 blur-[140px]" />
        <div className="absolute top-[10%] right-[-15%] h-[560px] w-[620px] rounded-full bg-iris/15 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-1/3 h-[420px] w-[520px] rounded-full bg-aqua/10 blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </motion.div>

      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="relative z-10">
          {/* 3 — Category label */}
          <motion.p {...fade(0.3)} className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[0.7rem] font-semibold tracking-[0.2em] text-aqua">
            <span className="size-1.5 rounded-full bg-aqua shadow-[0_0_10px_var(--color-aqua)]" aria-hidden />
            SOFTWARE • AI • DIGITAL GROWTH
          </motion.p>

          {/* 4 — Headline, word by word */}
          <h1 id="hero-title" className="mt-7 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-fg sm:text-6xl lg:text-[4.4rem]">
            <WordReveal text="We Build More Than Software." delay={0.45} />
            <br />
            <WordReveal text="We Build Your *Future.*" delay={0.75} />
          </h1>

          {/* 5 — Supporting copy */}
          <motion.p {...fade(1.1)} className="mt-6 text-lg font-medium text-fg/90 sm:text-xl">
            From Your First Idea to a Market-Ready Product.
          </motion.p>
          <motion.p {...fade(1.2)} className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Syjen Code combines software engineering, AI innovation, and digital marketing to help businesses build products, reach
            customers, and grow with confidence.
          </motion.p>

          {/* 6 — CTAs */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <motion.div {...fade(1.35)}>
              <ButtonLink to="/contact" size="lg" arrow>
                Start Your Project
              </ButtonLink>
            </motion.div>
            <motion.div {...fade(1.45)}>
              <ButtonLink to="/solutions" size="lg" variant="secondary">
                Explore Our Solutions
              </ButtonLink>
            </motion.div>
          </div>

          <motion.p {...fade(1.6)} className="mt-8 inline-flex items-center gap-2 text-sm text-subtle">
            <ShieldCheck className="size-4 text-brand" aria-hidden />
            One Technology Partner. From Development to Market.
          </motion.p>
        </div>

        {/* 2 & 7 — Brand symbol and network */}
        <div className="relative">
          <HeroVisual />
        </div>
      </div>

      {/* 8 — Scroll indicator */}
      <motion.a
        href="#partnership"
        aria-label="Scroll to our partnership promise"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-subtle transition-colors hover:text-fg lg:flex"
      >
        Scroll
        <span className="grid h-9 w-5 justify-center rounded-full border border-line-strong pt-1.5">
          <motion.span
            className="block h-2 w-0.5 rounded-full bg-aqua"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
