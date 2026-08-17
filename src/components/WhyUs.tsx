import { useState } from 'react'
import { ClipboardList, MessageSquare, Milestone, CheckCircle, KeyRound, HeartHandshake } from 'lucide-react'
import { motion } from 'framer-motion'

const principles = [
  {
    Icon: ClipboardList,
    title: 'Clear Scope',
    desc: 'Requirements, deliverables, and responsibilities are documented before development.',
  },
  {
    Icon: MessageSquare,
    title: 'Transparent Communication',
    desc: 'Clients receive regular updates and meaningful progress demonstrations.',
  },
  {
    Icon: Milestone,
    title: 'Milestone-Based Delivery',
    desc: 'Large projects are divided into manageable phases.',
  },
  {
    Icon: CheckCircle,
    title: 'Quality Assurance',
    desc: 'Features are tested before production delivery.',
  },
  {
    Icon: KeyRound,
    title: 'Secure Development',
    desc: 'Appropriate security practices for authentication, authorization, data handling, and deployment.',
  },
  {
    Icon: HeartHandshake,
    title: 'Long-Term Support',
    desc: 'Post-launch maintenance and technical support options after the application goes live.',
  },
]

const accents = ['#2563eb', '#1e3a8a', '#f97316']

const WhyUs = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={styles.section} id="about">
      <div style={styles.container}>

        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span style={styles.eyebrow}>Why Us</span>
          <h2 style={styles.heading}>Why Businesses Choose SYJEN CODE</h2>
        </motion.div>

        <div style={styles.grid}>
          {principles.map((p, i) => {
            const isHov = hovered === i
            const accent = accents[i % accents.length]
            return (
              <motion.div
                key={i}
                style={styles.card}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
              >
                <div style={{
                  ...styles.iconBox,
                  backgroundColor: accent + '14',
                  border: `1px solid ${accent}30`,
                }}>
                  <p.Icon size={19} strokeWidth={1.8} style={{ color: accent }} />
                </div>
                <h3 style={{ ...styles.title, color: isHov ? accent : '#0f172a' }}>{p.title}</h3>
                <p style={styles.desc}>{p.desc}</p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

const styles: any = {
  section: {
    position: 'relative',
    padding: '88px 20px 80px',
    backgroundColor: '#f8fafc',
  },

  container: {
    maxWidth: '1100px',
    margin: '0 auto',
  },

  header: {
    textAlign: 'center',
    marginBottom: '48px',
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
    fontSize: 'clamp(28px, 4vw, 38px)',
    fontWeight: 800,
    color: '#0f172a',
    letterSpacing: '-0.3px',
    maxWidth: '640px',
    margin: '0 auto',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '18px',
  },

  card: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 0 0 1px rgba(226,232,240,0.9), 0 2px 8px rgba(0,0,0,0.04)',
    cursor: 'default',
  },

  iconBox: {
    width: '42px',
    height: '42px',
    borderRadius: '11px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '14px',
  },

  title: {
    fontSize: '15px',
    fontWeight: 700,
    margin: '0 0 6px',
    transition: 'color 0.18s ease',
  },

  desc: {
    fontSize: '13.5px',
    lineHeight: '1.6',
    color: '#64748b',
    margin: 0,
  },
}

export default WhyUs
