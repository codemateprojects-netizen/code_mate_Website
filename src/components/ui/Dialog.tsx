import { useCallback, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useScrollLock } from '../../hooks/useScrollLock'
import { cn } from '../../lib/cn'
import { ease } from '../../lib/motion'

/** Accessible modal dialog: focus trap, Escape to close, scroll lock, labelled title. */
export function Dialog({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  wide?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const close = useCallback(() => onClose(), [onClose])
  useFocusTrap(ref, open, close)
  useScrollLock(open)

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease }}
            className={cn(
              'relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-line-strong bg-ink-900 shadow-2xl outline-none sm:rounded-3xl',
              wide ? 'sm:max-w-5xl' : 'sm:max-w-2xl',
            )}
          >
            <div aria-hidden className="sticky top-0 z-20 flex justify-center bg-ink-900 pt-2.5 sm:hidden">
              <span className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-ink-900/95 px-5 py-4 backdrop-blur max-sm:top-3.5 md:px-7">
              <h2 id={titleId} className="text-lg font-semibold text-fg">
                {title}
              </h2>
              <button
                type="button"
                onClick={close}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
                aria-label="Close dialog"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="px-5 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] md:px-7">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
