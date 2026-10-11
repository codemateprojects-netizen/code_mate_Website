import { useState } from 'react'
import { ShieldCheck, Lock, FileText, Database, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const points = [
  {
    Icon: ShieldCheck,
    title: 'NDA-Friendly Engagement',
    desc: 'Client confidentiality is respected from day one — NDAs signed before any project begins.',
    iconBg: 'rgba(34,197,94,0.15)',
    iconColor: '#22c55e',
    glow: 'rgba(34,197,94,0.18)',
  },
  {
    Icon: Lock,
    title: 'Secure Code Practices',
    desc: 'Industry best practices followed to reduce risks and vulnerabilities across all systems.',
    iconBg: 'rgba(96,165,250,0.15)',
    iconColor: '#60a5fa',
    glow: 'rgba(96,165,250,0.18)',
  },
  {
    Icon: Database,
    title: 'Access-Controlled Repositories',
    desc: 'Only authorized access to code and infrastructure. Private repositories by default.',
    iconBg: 'rgba(167,139,250,0.15)',
    iconColor: '#a78bfa',
    glow: 'rgba(167,139,250,0.18)',
  },
  {
    Icon: FileText,
    title: 'Professional Documentation',
    desc: 'Clear documentation for maintainability and seamless knowledge transfer.',
    iconBg: 'rgba(56,189,248,0.15)',
    iconColor: '#38bdf8',
    glow: 'rgba(56,189,248,0.18)',
  },
  {
    Icon: CheckCircle,
    title: 'Client Data Confidentiality',
    desc: 'Data privacy and integrity are treated as non-negotiable top priorities.',
    iconBg: 'rgba(251,191,36,0.15)',
    iconColor: '#fbbf24',
    glow: 'rgba(251,191,36,0.18)',
  },
]

const trustStats = [
  { value: 'NDA',  label: 'Signed Before Every Project' },
  { value: '0',    label: 'Data Breaches or Leaks'      },
  { value: '100%', label: 'Private Repository Access'   },
]

const Security = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={styles.section}>
      {/* Background layers */}
      <div style={styles.dotGrid} />
      <div style={styles.orb1} />
      <div style={styles.orb2} />
      <div style={styles.topLine} />

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
            style={styles.shieldWrap}
            animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 0 0 rgba(34,197,94,0.3)', '0 0 0 14px rgba(34,197,94,0)', '0 0 0 0 rgba(34,197,94,0)'] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ShieldCheck size={26} strokeWidth={1.8} style={{ color: '#22c55e' }} />
          </motion.div>

          <span style={styles.eyebrow}>Trust &amp; Safety</span>
          <h2 style={styles.heading}>Security &amp; Compliance</h2>
          <p style={styles.subtext}>
            We follow responsible, industry-standard development practices to
            protect client data, code, and intellectual property.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={styles.cardsGrid}>
          {points.map((p, i) => {
            const isHov = hovered === i
            return (
              <motion.div
                key={i}
                style={styles.card}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.22, ease: 'easeOut' } }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
              >
                {/* Ambient glow */}
                <motion.div
                  style={{ ...styles.cardGlow, background: `radial-gradient(ellipse at top left, ${p.glow} 0%, transparent 65%)` }}
                  animate={{ opacity: isHov ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                />

                {/* Border glow ring */}
                <motion.div
                  style={styles.cardRing}
                  animate={{ opacity: isHov ? 1 : 0, boxShadow: isHov ? `0 0 0 1px ${p.iconColor}55, 0 20px 48px rgba(0,0,0,0.5)` : '0 0 0 1px rgba(255,255,255,0.06)' }}
                  transition={{ duration: 0.22 }}
                />

                <div style={styles.cardInner}>
                  {/* Icon */}
                  <motion.div
                    style={{ ...styles.iconBox, background: p.iconBg }}
                    animate={{ scale: isHov ? 1.12 : 1 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    <p.Icon size={20} strokeWidth={1.8} style={{ color: p.iconColor }} />
                  </motion.div>

                  {/* Text */}
                  <div>
                    <motion.strong
                      style={styles.title}
                      animate={{ color: isHov ? p.iconColor : '#f1f5f9' }}
                      transition={{ duration: 0.18 }}
                    >
                      {p.title}
                    </motion.strong>
                    <p style={styles.desc}>{p.desc}</p>
                  </div>
                </div>

                {/* Bottom accent bar */}
                <motion.div
                  style={{ ...styles.accentBar, background: p.iconColor }}
                  animate={{ scaleX: isHov ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Trust stats strip */}
        <motion.div
          style={styles.statsStrip}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {trustStats.map((s, i) => (
            <div key={i} style={{ ...styles.statItem, ...(i > 0 ? styles.statDivider : {}) }}>
              <span style={styles.statValue}>{s.value}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

const styles: any = {
  section: {
    position: 'relative',
    padding: '96px 20px 80px',
    background: 'linear-gradient(160deg, #0a1628 0%, #0f172a 60%, #0c1a30 100%)',
    overflow: 'hidden',
    isolation: 'isolate',
  },

  dotGrid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
    backgroundSize: '28px 28px',
    pointerEvents: 'none',
  },

  orb1: {
    position: 'absolute',
    width: '600px', height: '600px',
    background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-200px', right: '-100px',
    filter: 'blur(70px)',
    pointerEvents: 'none',
  },

  orb2: {
    position: 'absolute',
    width: '400px', height: '400px',
    background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '-100px', left: '-80px',
    filter: 'blur(70px)',
    pointerEvents: 'none',
  },

  topLine: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.5), rgba(34,197,94,0.5), transparent)',
    pointerEvents: 'none',
  },

  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center',
  },

  header: {
    marginBottom: '56px',
  },

  shieldWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'rgba(34,197,94,0.12)',
    border: '1px solid rgba(34,197,94,0.25)',
    marginBottom: '20px',
  },

  eyebrow: {
    display: 'inline-block',
    fontSize: '12px',
    fontWeight: 600,
    color: '#22c55e',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    marginBottom: '12px',
    padding: '4px 14px',
    backgroundColor: 'rgba(34,197,94,0.1)',
    border: '1px solid rgba(34,197,94,0.2)',
    borderRadius: '999px',
  },

  heading: {
    fontSize: 'clamp(28px, 4vw, 40px)',
    fontWeight: 800,
    marginBottom: '14px',
    color: '#f1f5f9',
    letterSpacing: '-0.3px',
  },

  subtext: {
    maxWidth: '580px',
    margin: '0 auto',
    color: '#64748b',
    lineHeight: '1.7',
    fontSize: '16px',
  },

  /* Cards */
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
    textAlign: 'left',
    marginBottom: '48px',
  },

  card: {
    position: 'relative',
    borderRadius: '16px',
    background: 'rgba(255,255,255,0.03)',
    overflow: 'hidden',
    cursor: 'default',
  },

  cardGlow: {
    position: 'absolute',
    inset: 0,
    borderRadius: '16px',
    pointerEvents: 'none',
    zIndex: 0,
  },

  cardRing: {
    position: 'absolute',
    inset: 0,
    borderRadius: '16px',
    pointerEvents: 'none',
    zIndex: 0,
    boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
  },

  cardInner: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    padding: '24px',
  },

  iconBox: {
    minWidth: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  title: {
    fontSize: '15px',
    fontWeight: 700,
    display: 'block',
    marginBottom: '6px',
    lineHeight: '1.3',
  },

  desc: {
    fontSize: '13.5px',
    color: '#64748b',
    lineHeight: '1.6',
    margin: 0,
  },

  accentBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    transformOrigin: 'left',
    zIndex: 1,
  },

  /* Stats strip */
  statsStrip: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '28px 32px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px',
    gap: '0',
  },

  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 40px',
  },

  statDivider: {
    borderLeft: '1px solid rgba(255,255,255,0.08)',
  },

  statValue: {
    fontSize: '22px',
    fontWeight: 800,
    color: '#f1f5f9',
    letterSpacing: '-0.5px',
  },

  statLabel: {
    fontSize: '12px',
    color: '#475569',
    fontWeight: 500,
    textAlign: 'center',
    lineHeight: '1.4',
  },
}

export default Security
