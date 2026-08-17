import { ClipboardCheck, Milestone, BadgeCheck, Lock, LifeBuoy } from 'lucide-react'
import { motion } from 'framer-motion'

const points = [
  { Icon: ClipboardCheck, label: 'Clear Requirements' },
  { Icon: Milestone,      label: 'Transparent Milestones' },
  { Icon: BadgeCheck,     label: 'Quality-Focused Development' },
  { Icon: Lock,           label: 'Secure Deployment' },
  { Icon: LifeBuoy,       label: 'Post-Launch Support' },
]

const TrustStrip = () => {
  return (
    <section style={styles.section}>
      <motion.div
        className="trust-strip"
        style={styles.row}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {points.map((p, i) => (
          <div key={i} className="trust-item" style={styles.item}>
            <div style={styles.iconBox}>
              <p.Icon size={16} strokeWidth={2} style={{ color: '#2563eb' }} />
            </div>
            <span style={styles.label}>{p.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

const styles: any = {
  section: {
    backgroundColor: '#ffffff',
    padding: '0 20px 56px',
    borderBottom: '1px solid rgba(226,232,240,0.7)',
  },

  row: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: '1 1 180px',
    minWidth: '180px',
  },

  iconBox: {
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    backgroundColor: 'rgba(37,99,235,0.08)',
    border: '1px solid rgba(37,99,235,0.14)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  label: {
    fontSize: '13.5px',
    fontWeight: 600,
    color: '#334155',
    lineHeight: '1.3',
  },
}

export default TrustStrip
