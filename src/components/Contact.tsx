import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mail, Phone, Globe, ArrowRight, Send } from 'lucide-react'
import { motion } from 'framer-motion'

const contactPoints = [
  { Icon: Mail,  text: 'syjencode@gmail.com', href: 'mailto:syjencode@gmail.com' },
  { Icon: Phone, text: 'Phone / WhatsApp: 8790899459', href: 'tel:8790899459' },
  { Icon: Globe, text: 'Working with clients worldwide', href: null },
]

const steps = [
  'We review your message',
  'We schedule a short discussion',
  'We share a clear proposal & timeline',
]

const PROJECT_TYPES = [
  'Web Application', 'Mobile Application', 'Ecommerce', 'AI Solution',
  'Backend / API', 'UI/UX', 'Cloud / DevOps', 'Maintenance', 'Other',
]

const BUDGET_RANGES = [
  'Under $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000+', 'Not sure yet',
]

type FormState = {
  name: string
  company: string
  email: string
  phone: string
  projectType: string
  budget: string
  description: string
}

const initialForm: FormState = {
  name: '', company: '', email: '', phone: '',
  projectType: '', budget: '', description: '',
}

const Contact = () => {
  const [form, setForm] = useState<FormState>(initialForm)

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const subject = `New Project Inquiry — ${form.name}${form.company ? ` (${form.company})` : ''}`
    const bodyLines = [
      `Name: ${form.name}`,
      `Company: ${form.company || '—'}`,
      `Email: ${form.email}`,
      `Phone / WhatsApp: ${form.phone || '—'}`,
      `Project Type: ${form.projectType || '—'}`,
      `Estimated Budget: ${form.budget || '—'}`,
      '',
      'Project Description:',
      form.description,
    ]

    const mailto = `mailto:syjencode@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`
    window.location.href = mailto
  }

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
            <span style={styles.accent}>Valuable</span>
          </h2>

          <p style={styles.text}>
            Tell us what you're building, and our team will help you understand the next steps.
          </p>

          <p style={styles.responseTime}>We typically respond within 24 hours.</p>

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

          {/* What happens next */}
          <div style={styles.stepsCard}>
            <p style={styles.stepsHeading}>What happens next?</p>
            <div style={styles.stepsList}>
              {steps.map((step, i) => (
                <div key={i} style={styles.step}>
                  <div style={styles.stepLeft}>
                    <div style={styles.stepNum}>{i + 1}</div>
                    {i < steps.length - 1 && <div style={styles.stepLine} />}
                  </div>
                  <span style={styles.stepText}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Right: form card ── */}
        <motion.form
          onSubmit={handleSubmit}
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
              <Send size={15} strokeWidth={2.5} style={{ color: '#2563eb' }} />
            </div>
            <p style={styles.cardTitle}>Tell us about your project</p>
          </div>

          <div className="cf-row" style={styles.fieldRow}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="cf-name">Name *</label>
              <input id="cf-name" required style={styles.input} value={form.name} onChange={update('name')} placeholder="Your name" />
            </div>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="cf-company">Company</label>
              <input id="cf-company" style={styles.input} value={form.company} onChange={update('company')} placeholder="Optional" />
            </div>
          </div>

          <div className="cf-row" style={styles.fieldRow}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="cf-email">Email *</label>
              <input id="cf-email" type="email" required style={styles.input} value={form.email} onChange={update('email')} placeholder="you@company.com" />
            </div>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="cf-phone">Phone / WhatsApp</label>
              <input id="cf-phone" style={styles.input} value={form.phone} onChange={update('phone')} placeholder="Optional" />
            </div>
          </div>

          <div className="cf-row" style={styles.fieldRow}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="cf-type">Project Type *</label>
              <select id="cf-type" required style={styles.input} value={form.projectType} onChange={update('projectType')}>
                <option value="" disabled>Select one</option>
                {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="cf-budget">Estimated Budget</label>
              <select id="cf-budget" style={styles.input} value={form.budget} onChange={update('budget')}>
                <option value="" disabled>Select a range</option>
                {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="cf-desc">Project Description *</label>
            <textarea
              id="cf-desc"
              required
              style={styles.textarea}
              value={form.description}
              onChange={update('description')}
              placeholder="What are you building? What problem does it solve?"
              rows={4}
            />
          </div>

          {/* CTA button */}
          <motion.button
            type="submit"
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
            <span>Start a Project</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.button>

          <p style={styles.responseNote}>Opens a pre-filled email in your mail app — nothing is stored on our servers.</p>
        </motion.form>

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
    maxWidth: '1080px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '0.95fr 1.15fr',
    gap: '60px',
    alignItems: 'start',
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
    fontSize: 'clamp(28px, 3.6vw, 40px)',
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
    marginBottom: '10px',
  },

  responseTime: {
    fontSize: '13.5px',
    fontWeight: 600,
    color: '#2563eb',
    marginBottom: '24px',
  },

  points: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '28px',
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

  /* What happens next (compact, left column) */
  stepsCard: {
    padding: '20px 22px',
    borderRadius: '16px',
    backgroundColor: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(226,232,240,0.8)',
  },

  stepsHeading: {
    fontSize: '13.5px',
    fontWeight: 700,
    color: '#0f172a',
    margin: '0 0 14px',
  },

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
    width: '24px', height: '24px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(37,99,235,0.28)',
  },

  stepLine: {
    width: '2px',
    height: '22px',
    background: 'linear-gradient(180deg, rgba(37,99,235,0.35) 0%, transparent 100%)',
    margin: '4px 0',
  },

  stepText: {
    fontSize: '13.5px',
    color: '#475569',
    lineHeight: '1.5',
    paddingTop: '3px',
    paddingBottom: '10px',
  },

  /* Card / form */
  card: {
    position: 'relative',
    padding: '32px 32px 28px',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(226,232,240,0.8)',
    boxShadow: '0 24px 64px rgba(0,0,0,0.08), 0 0 0 1px rgba(226,232,240,0.6)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
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
    marginBottom: '2px',
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
    fontSize: '16.5px',
    fontWeight: 700,
    color: '#0f172a',
    margin: 0,
  },

  fieldRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
  },

  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },

  label: {
    fontSize: '12.5px',
    fontWeight: 600,
    color: '#334155',
  },

  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    borderRadius: '10px',
    border: '1px solid rgba(203,213,225,0.9)',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },

  textarea: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    borderRadius: '10px',
    border: '1px solid rgba(203,213,225,0.9)',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    resize: 'vertical',
  },

  /* CTA */
  cta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '9px',
    border: 'none',
    padding: '15px 24px',
    background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    color: '#ffffff',
    borderRadius: '12px',
    fontWeight: 700,
    fontSize: '15px',
    cursor: 'pointer',
    marginTop: '4px',
  },

  responseNote: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#94a3b8',
    margin: '0',
    fontWeight: 500,
  },
}

export default Contact
