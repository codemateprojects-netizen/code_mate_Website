import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MessageCircle } from 'lucide-react'

const faqs = [
  {
    q: 'What type of projects do you build?',
    a: 'We work on web applications, mobile apps, ecommerce platforms, AI solutions, and backend/API systems — for startups, small and medium businesses, and agencies.',
  },
  {
    q: 'Can you build an MVP from an idea?',
    a: 'Yes. We regularly take founders from an early idea through product planning, UI/UX, development, testing, and launch — with a scope that fits an MVP budget and timeline.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. SYJEN CODE works with clients worldwide through online discovery meetings, clear documentation, milestone-based development, and remote deployment and support.',
  },
  {
    q: 'How do you estimate project cost?',
    a: 'Cost depends on scope, features, and complexity. After an initial discussion of your requirements, we share a clear estimate and milestone breakdown before any work begins.',
  },
  {
    q: 'How long does development take?',
    a: 'Timelines depend on scope. A focused MVP or landing page can take a few weeks; a full-stack platform or AI system typically takes longer. We share a realistic estimate upfront.',
  },
  {
    q: 'Do you provide UI/UX design?',
    a: 'Yes. UI/UX is part of our standard process — we design the interface and user experience before development begins, not as an afterthought.',
  },
  {
    q: 'Can you work with an existing development team?',
    a: 'Yes. We can join as a technical partner alongside your existing team, taking ownership of specific features, modules, or the full build.',
  },
  {
    q: 'Can you maintain an existing application?',
    a: 'Yes. We take over maintenance and further development of applications already in production, including bug fixes and new features.',
  },
  {
    q: 'Do you provide ecommerce development?',
    a: 'Yes. We build custom ecommerce platforms end to end — catalogues, carts, payments, orders, and admin management.',
  },
  {
    q: 'Do you provide AI integrations?',
    a: 'Yes. We integrate AI chatbots, automation, and AI-powered workflows into new or existing products.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes. Support doesn’t necessarily end at launch — we offer maintenance, bug fixes, and feature updates for ongoing engagements.',
  },
]

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" style={styles.section}>
      <div style={styles.bgOrb} />

      <div style={styles.container}>

        {/* Header */}
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            style={styles.iconWrap}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <MessageCircle size={22} strokeWidth={1.8} style={{ color: '#2563eb' }} />
          </motion.div>

          <span style={styles.eyebrow}>FAQs</span>
          <h2 style={styles.heading}>Frequently Asked Questions</h2>
          <p style={styles.subheading}>Everything you need to know before working with us.</p>
        </motion.div>

        {/* Accordion */}
        <div style={styles.list}>
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={i}
                style={{
                  ...styles.item,
                  borderLeftColor: isOpen ? '#2563eb' : 'transparent',
                  backgroundColor: isOpen ? '#fafbff' : '#ffffff',
                  boxShadow: isOpen
                    ? '0 0 0 1px rgba(37,99,235,0.12), 0 8px 24px rgba(37,99,235,0.07)'
                    : '0 0 0 1px rgba(226,232,240,0.8)',
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: i * 0.06 }}
                viewport={{ once: true }}
              >
                {/* Question button */}
                <button
                  style={styles.questionBtn}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <div style={styles.questionLeft}>
                    <motion.span
                      style={styles.num}
                      animate={{ color: isOpen ? '#2563eb' : '#94a3b8' }}
                      transition={{ duration: 0.2 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.span>
                    <motion.span
                      style={styles.questionText}
                      animate={{ color: isOpen ? '#1e40af' : '#0f172a' }}
                      transition={{ duration: 0.2 }}
                    >
                      {faq.q}
                    </motion.span>
                  </div>

                  <motion.div
                    style={styles.toggleBtn}
                    animate={{
                      backgroundColor: isOpen ? '#2563eb' : 'rgba(226,232,240,0.8)',
                      rotate: isOpen ? 45 : 0,
                    }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    <Plus size={14} strokeWidth={2.5} style={{ color: isOpen ? '#ffffff' : '#64748b' }} />
                  </motion.div>
                </button>

                {/* Answer — animates height */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={styles.answer}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          style={styles.cta}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
        >
          <p style={styles.ctaText}>Still have questions?</p>
          <motion.a
            href="#contact"
            style={styles.ctaLink}
            whileHover={{ scale: 1.04, boxShadow: '0 6px 20px rgba(37,99,235,0.22)' }}
            whileTap={{ scale: 0.97 }}
          >
            Get in touch →
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}

const styles: any = {
  section: {
    position: 'relative',
    padding: '88px 20px 80px',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },

  bgOrb: {
    position: 'absolute',
    width: '500px', height: '500px',
    background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-150px', right: '-150px',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },

  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '700px',
    margin: '0 auto',
  },

  header: {
    textAlign: 'center',
    marginBottom: '52px',
  },

  iconWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '14px',
    backgroundColor: 'rgba(37,99,235,0.08)',
    border: '1px solid rgba(37,99,235,0.14)',
    marginBottom: '16px',
  },

  eyebrow: {
    display: 'inline-block',
    fontSize: '12px',
    fontWeight: 600,
    color: '#2563eb',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    marginBottom: '12px',
    padding: '4px 14px',
    backgroundColor: 'rgba(37,99,235,0.08)',
    borderRadius: '999px',
  },

  heading: {
    fontSize: 'clamp(26px, 4vw, 38px)',
    fontWeight: 800,
    marginBottom: '12px',
    color: '#0f172a',
    letterSpacing: '-0.3px',
  },

  subheading: {
    fontSize: '16px',
    color: '#64748b',
    lineHeight: '1.65',
    margin: 0,
  },

  /* Accordion */
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '48px',
  },

  item: {
    borderRadius: '14px',
    borderLeft: '3px solid transparent',
    overflow: 'hidden',
    transition: 'background-color 0.2s ease, border-left-color 0.2s ease',
  },

  questionBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    padding: '20px 22px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
  },

  questionLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flex: 1,
    minWidth: 0,
  },

  num: {
    fontSize: '11.5px',
    fontWeight: 700,
    fontFamily: 'monospace',
    letterSpacing: '0.5px',
    flexShrink: 0,
    lineHeight: 1,
  },

  questionText: {
    fontSize: '15.5px',
    fontWeight: 600,
    lineHeight: '1.4',
  },

  toggleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    flexShrink: 0,
  },

  answer: {
    padding: '0 22px 20px 52px',
    fontSize: '14.5px',
    color: '#475569',
    lineHeight: '1.72',
    margin: 0,
  },

  /* CTA */
  cta: {
    textAlign: 'center',
    padding: '28px 32px',
    background: 'linear-gradient(135deg, #f8faff 0%, #f0f9ff 100%)',
    border: '1px solid rgba(37,99,235,0.1)',
    borderRadius: '16px',
  },

  ctaText: {
    fontSize: '15.5px',
    color: '#475569',
    margin: '0 0 12px',
    fontWeight: 500,
  },

  ctaLink: {
    display: 'inline-block',
    fontSize: '14.5px',
    fontWeight: 700,
    color: '#2563eb',
    textDecoration: 'none',
    padding: '9px 22px',
    background: 'rgba(37,99,235,0.08)',
    border: '1px solid rgba(37,99,235,0.15)',
    borderRadius: '10px',
  },
}

export default FAQ
