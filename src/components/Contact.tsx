import { Mail, Clock, Globe, ArrowRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const contactPoints = [
  { Icon: Mail,  text: 'codemate.projects@gmail.com', href: 'mailto:codemate.projects@gmail.com' },
  { Icon: Clock, text: 'Response within 24 hours',   href: null },
  { Icon: Globe, text: 'Working with clients worldwide', href: null },
]

const steps = [
  'We review your message',
  'We schedule a short discussion',
  'We share a clear proposal & timeline',
]

const Contact = () => {
  return (
    <section style={styles.section} id="contact">

      {/* Animated background blobs */}
      <motion.div
        style={styles.blob1}
        animate={{ x: [0, 32, 0], y: [0, -22, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={styles.blob2}
        animate={{ x: [0, -22, 0], y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="contact-grid" style={styles.container}>

        {/* ── Left ── */}
        <motion.div
          style={styles.left}
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          {/* Availability badge */}
          <motion.div
            style={styles.availBadge}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.span
              style={styles.availDot}
              animate={{ scale: [1, 1.45, 1], opacity: [1, 0.45, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            Currently accepting projects
          </motion.div>

          <span style={styles.eyebrow}>Get in touch</span>

          <h2 style={styles.heading}>
            Let's Build Something
            <br />
            <span style={styles.accent}>Together</span>
          </h2>

          <p style={styles.text}>
            Looking for a reliable development partner?
            Let's discuss your idea, requirements, and timeline.
          </p>

          {/* Contact points */}
          <div style={styles.points}>
            {contactPoints.map((pt, i) => (
              <motion.div
                key={i}
                style={styles.point}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.09, duration: 0.36 }}
                viewport={{ once: true }}
                whileHover={{ x: 5, transition: { duration: 0.18 } }}
              >
                <div style={styles.pointIcon}>
                  <pt.Icon size={15} strokeWidth={2} />
                </div>
                {pt.href ? (
                  <a href={pt.href} style={styles.pointLink}>{pt.text}</a>
                ) : (
                  <span style={styles.pointText}>{pt.text}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Right card ── */}
        <motion.div
          style={styles.card}
          initial={{ opacity: 0, x: 28, y: 12 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          viewport={{ once: true }}
        >
          {/* Top gradient bar */}
          <div style={styles.cardBar} />

          {/* Card header */}
          <div style={styles.cardHeader}>
            <div style={styles.cardIconWrap}>
              <Zap size={15} strokeWidth={2.5} style={{ color: '#2563eb' }} />
            </div>
            <p style={styles.cardTitle}>What happens next?</p>
          </div>

          {/* Steps with connector line */}
          <div style={styles.stepsList}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                style={styles.step}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.28 + i * 0.1, duration: 0.36 }}
                viewport={{ once: true }}
              >
                <div style={styles.stepLeft}>
                  <div style={styles.stepNum}>{i + 1}</div>
                  {i < steps.length - 1 && <div style={styles.stepLine} />}
                </div>
                <span style={styles.stepText}>{step}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA button */}
          <motion.a
            href="mailto:codemate.projects@gmail.com"
            style={styles.cta}
            whileHover={{ scale: 1.03, boxShadow: '0 10px 36px rgba(37,99,235,0.48)' }}
            whileTap={{ scale: 0.97 }}
            animate={{
              boxShadow: [
                '0 4px 16px rgba(37,99,235,0.3)',
                '0 6px 28px rgba(37,99,235,0.52)',
                '0 4px 16px rgba(37,99,235,0.3)',
              ]
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>Send Project Details</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.a>

          <p style={styles.responseNote}>⚡ Typically responds within 12–24 hours</p>
        </motion.div>

      </div>
    </section>
  )
}

const styles: any = {
  section: {
    position: 'relative',
    padding: '96px 20px 88px',
    background: 'linear-gradient(160deg, #eef2ff 0%, #ffffff 50%, #f0f9ff 100%)',
    overflow: 'hidden',
    isolation: 'isolate',
  },

  blob1: {
    position: 'absolute',
    width: '560px', height: '560px',
    background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-220px', left: '50%',
    transform: 'translateX(-50%)',
    filter: 'blur(56px)',
    pointerEvents: 'none',
    zIndex: 0,
  },

  blob2: {
    position: 'absolute',
    width: '340px', height: '340px',
    background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '-80px', right: '8%',
    filter: 'blur(48px)',
    pointerEvents: 'none',
    zIndex: 0,
  },

  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1060px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1.15fr 0.95fr',
    gap: '60px',
    alignItems: 'center',
  },

  /* Left */
  left: {
    display: 'flex',
    flexDirection: 'column',
  },

  availBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '18px',
    padding: '6px 14px',
    backgroundColor: 'rgba(34,197,94,0.09)',
    border: '1px solid rgba(34,197,94,0.22)',
    borderRadius: '999px',
    fontSize: '12.5px',
    fontWeight: 600,
    color: '#15803d',
    width: 'fit-content',
  },

  availDot: {
    display: 'inline-block',
    width: '7px', height: '7px',
    borderRadius: '50%',
    backgroundColor: '#22c55e',
    flexShrink: 0,
    boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
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
    width: 'fit-content',
  },

  heading: {
    fontSize: 'clamp(30px, 4vw, 44px)',
    fontWeight: 800,
    color: '#0f172a',
    lineHeight: '1.12',
    marginBottom: '18px',
    letterSpacing: '-0.4px',
  },

  accent: {
    background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  text: {
    maxWidth: '440px',
    fontSize: '16px',
    lineHeight: '1.72',
    color: '#475569',
    marginBottom: '32px',
  },

  points: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  point: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'default',
  },

  pointIcon: {
    width: '36px', height: '36px',
    borderRadius: '10px',
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    border: '1px solid rgba(37,99,235,0.12)',
  },

  pointLink: {
    fontSize: '14.5px',
    fontWeight: 600,
    color: '#2563eb',
    textDecoration: 'none',
  },

  pointText: {
    fontSize: '14.5px',
    fontWeight: 500,
    color: '#334155',
  },

  /* Card */
  card: {
    position: 'relative',
    padding: '36px',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(226,232,240,0.8)',
    boxShadow: '0 24px 64px rgba(0,0,0,0.08), 0 0 0 1px rgba(226,232,240,0.6)',
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
    overflow: 'hidden',
  },

  cardBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #2563eb, #0ea5e9, #06b6d4)',
    borderRadius: '20px 20px 0 0',
  },

  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingTop: '4px',
  },

  cardIconWrap: {
    width: '32px', height: '32px',
    borderRadius: '9px',
    backgroundColor: 'rgba(37,99,235,0.09)',
    border: '1px solid rgba(37,99,235,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  cardTitle: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#0f172a',
    margin: 0,
  },

  /* Steps */
  stepsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },

  step: {
    display: 'flex',
    gap: '14px',
    alignItems: 'flex-start',
  },

  stepLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
  },

  stepNum: {
    width: '28px', height: '28px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(37,99,235,0.28)',
  },

  stepLine: {
    width: '2px',
    height: '28px',
    background: 'linear-gradient(180deg, rgba(37,99,235,0.35) 0%, transparent 100%)',
    margin: '4px 0',
  },

  stepText: {
    fontSize: '14.5px',
    color: '#475569',
    lineHeight: '1.5',
    paddingTop: '5px',
  },

  /* CTA */
  cta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '9px',
    textDecoration: 'none',
    padding: '15px 24px',
    background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    color: '#ffffff',
    borderRadius: '12px',
    fontWeight: 700,
    fontSize: '15px',
  },

  responseNote: {
    textAlign: 'center',
    fontSize: '12.5px',
    color: '#94a3b8',
    margin: '0',
    fontWeight: 500,
  },
}

export default Contact
