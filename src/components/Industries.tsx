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

const Industries = () => {
  return (
    <section style={styles.section}>
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

        <motion.div
          style={styles.grid}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {industries.map((ind, i) => (
            <div key={i} style={styles.pill}>
              <ind.Icon size={16} strokeWidth={1.9} style={{ color: '#2563eb' }} />
              <span style={styles.label}>{ind.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

const styles: any = {
  section: {
    padding: '72px 20px',
    backgroundColor: '#ffffff',
  },

  container: {
    maxWidth: '900px',
    margin: '0 auto',
  },

  header: {
    textAlign: 'center',
    marginBottom: '36px',
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
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
  },

  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '999px',
    backgroundColor: '#f8fafc',
    border: '1px solid rgba(226,232,240,0.9)',
  },

  label: {
    fontSize: '13.5px',
    fontWeight: 600,
    color: '#334155',
  },
}

export default Industries
