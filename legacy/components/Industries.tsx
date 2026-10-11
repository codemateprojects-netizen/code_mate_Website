import { useState } from 'react'
import { ShoppingCart, GraduationCap, HeartPulse, Briefcase, Sparkles, Rocket, Store, Truck, Boxes, Tag } from 'lucide-react'
import { motion } from 'framer-motion'

const industries = [
  { Icon: ShoppingCart,  label: 'Ecommerce' },
  { Icon: GraduationCap, label: 'Education' },
  { Icon: HeartPulse,    label: 'Healthcare' },
  { Icon: Briefcase,     label: 'Professional Services' },
  { Icon: Sparkles,      label: 'Creator Economy' },
  { Icon: Rocket,        label: 'Startups' },
  { Icon: Store,         label: 'Local Businesses' },
  { Icon: Truck,         label: 'Logistics' },
  { Icon: Boxes,         label: 'SaaS' },
  { Icon: Tag,           label: 'Retail' },
]

const accents = ['#2563eb', '#f97316', '#1e3a8a']

const Industries = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={styles.section}>
      <div style={styles.bgOrb} />

      <div style={styles.container}>

        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span style={styles.eyebrow}>Who We Serve</span>
          <h2 style={styles.heading}>Solutions Across Industries</h2>
          <p style={styles.subheading}>
            Industries we're equipped to build for — not a client list, a capability map.
          </p>
        </motion.div>

        <div style={styles.grid}>
          {industries.map((ind, i) => {
            const accent = accents[i % accents.length]
            const isHov = hovered === i
            return (
              <motion.div
                key={i}
                style={styles.card}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, delay: i * 0.04 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -4,
                  boxShadow: `0 0 0 1px ${accent}35, 0 14px 30px rgba(0,0,0,0.08)`,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
              >
                <motion.div
                  style={{
                    ...styles.iconBox,
                    backgroundColor: accent + '14',
                    border: `1px solid ${accent}30`,
                  }}
                  animate={{ scale: isHov ? 1.1 : 1 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <ind.Icon size={18} strokeWidth={1.9} style={{ color: accent }} />
                </motion.div>
                <motion.span
                  style={styles.label}
                  animate={{ color: isHov ? accent : '#334155' }}
                  transition={{ duration: 0.18 }}
                >
                  {ind.label}
                </motion.span>
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
    padding: '80px 20px',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },

  bgOrb: {
    position: 'absolute',
    width: '480px', height: '480px',
    background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-160px', left: '50%',
    transform: 'translateX(-50%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },

  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1020px',
    margin: '0 auto',
  },

  header: {
    textAlign: 'center',
    marginBottom: '40px',
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
    fontSize: 'clamp(24px, 3.4vw, 32px)',
    fontWeight: 800,
    marginBottom: '10px',
    color: '#0f172a',
    letterSpacing: '-0.3px',
  },

  subheading: {
    fontSize: '14.5px',
    color: '#64748b',
    lineHeight: '1.6',
    margin: 0,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '14px',
  },

  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 18px',
    borderRadius: '14px',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 0 1px rgba(226,232,240,0.9), 0 2px 8px rgba(0,0,0,0.03)',
    cursor: 'default',
  },

  iconBox: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  label: {
    fontSize: '13.5px',
    fontWeight: 600,
    lineHeight: '1.3',
  },
}

export default Industries
