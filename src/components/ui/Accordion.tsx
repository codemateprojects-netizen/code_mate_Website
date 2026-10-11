import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'

export interface AccordionItem {
  question: string
  answer: string
}

/** Accessible disclosure list (used for FAQs). */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()
  return (
    <div className={cn('divide-y divide-line rounded-2xl border border-line bg-ink-900/50', className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-panel-${i}`
        const buttonId = `${baseId}-button-${i}`
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 px-5 py-5 text-left text-[0.975rem] font-medium text-fg transition-colors hover:text-brand md:px-6"
              >
                <span>{item.question}</span>
                <Plus
                  aria-hidden
                  className={cn('mt-0.5 size-5 shrink-0 text-muted transition-transform duration-300', isOpen && 'rotate-45 text-brand')}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 text-[0.95rem] leading-relaxed text-muted md:px-6">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
