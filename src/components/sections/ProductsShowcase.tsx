import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { products } from '../../data/products'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'
import { ProductShowcase } from '../mockups/ProductMocks'
import { ButtonLink } from '../ui/Button'

/** Tabbed overview of all products with their illustrative interfaces. */
export function ProductsShowcase() {
  const [active, setActive] = useState(0)
  const p = products[active]

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
      <div role="tablist" aria-label="Products" aria-orientation="vertical" className="flex flex-col gap-2">
        {products.map((item, i) => (
          <button
            key={item.slug}
            role="tab"
            type="button"
            id={`product-tab-${item.slug}`}
            aria-selected={active === i}
            aria-controls="product-panel"
            onClick={() => setActive(i)}
            className={cn(
              'relative overflow-hidden rounded-2xl border p-5 text-left transition-colors duration-300',
              active === i ? 'border-line-strong bg-ink-800/80' : 'border-line bg-ink-900/40 hover:border-line-strong',
            )}
          >
            {active === i && (
              <motion.span
                layoutId="product-active"
                aria-hidden
                className="absolute inset-y-0 left-0 w-[3px]"
                style={{ backgroundImage: `linear-gradient(${item.accent.from}, ${item.accent.to})` }}
              />
            )}
            <span className="flex items-center gap-3">
              <span
                className="grid size-10 shrink-0 place-items-center rounded-xl text-white"
                style={{ backgroundImage: `linear-gradient(135deg, ${item.accent.from}, ${item.accent.to})` }}
              >
                <item.icon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="flex items-center gap-2">
                  <span className="text-base font-semibold text-fg">{item.name}</span>
                  <span className="rounded-full border border-line px-2 py-px text-[0.65rem] text-subtle">{item.statusLabel}</span>
                </span>
                <span className="mt-0.5 block text-sm text-muted">{item.tagline}</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      <div id="product-panel" role="tabpanel" aria-labelledby={`product-tab-${p.slug}`} className="min-w-0">
        <AnimatePresence mode="wait">
          <motion.div key={p.slug} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease }}>
            <ProductShowcase product={p} />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-md text-sm text-muted">{p.summary}</p>
              <ButtonLink to={`/products/${p.slug}`} variant="secondary" arrow>
                {p.cta}
              </ButtonLink>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
