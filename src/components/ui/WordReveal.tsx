import { motion } from 'framer-motion'
import { ease } from '../../lib/motion'

/**
 * Reveals text word by word on mount. Words wrapped in *asterisks* get the
 * gradient accent. Assistive tech reads the plain sentence.
 */
export function WordReveal({ text, delay = 0, step = 0.06 }: { text: string; delay?: number; step?: number }) {
  const words = text.split(' ')
  return (
    <>
      <span className="sr-only">{text.replace(/\*/g, '')}</span>
      <span aria-hidden>
        {words.map((raw, i) => {
          const accent = raw.startsWith('*')
          const word = raw.replace(/\*/g, '')
          return (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                className={accent ? 'inline-block text-gradient' : 'inline-block'}
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.7, ease, delay: delay + i * step }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 && ' '}
            </span>
          )
        })}
      </span>
    </>
  )
}
