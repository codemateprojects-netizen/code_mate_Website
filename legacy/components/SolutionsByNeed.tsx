import { useState } from 'react'
import { Lightbulb, Smartphone, ShoppingBag, Zap, Wrench, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const solutions = [
  {
    Icon: Lightbulb,
    title: 'I Have a Business Idea',
    desc: 'We help turn an idea into a working MVP.',
  },
  {
    Icon: Smartphone,
    title: 'I Need a Mobile App',
    desc: 'We design and develop production-ready mobile applications.',
  },
  {
    Icon: ShoppingBag,
    title: 'My Business Needs an Online Store',
    desc: 'We build ecommerce platforms with payments, orders, and administration.',
  },
  {
    Icon: Zap,
    title: 'I Need to Automate My Business',
    desc: 'We build AI-powered workflows and integrations.',
  },
  {
    Icon: Wrench,
    title: 'My Existing Software Needs Improvement',
    desc: 'We can maintain, optimize, redesign, or extend existing applications.',
  },
  {
    Icon: Users,
    title: 'I Need a Development Partner',
    desc: 'We can work as a technical extension of your existing team or agency.',
  },
]

const accents = ['#2563eb', '#1e3a8a', '#f97316']

const SolutionsByNeed = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={styles.section} id="solutions">
      <div style={styles.bgOrb} />

      <div style={styles.container}>

        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span style={styles.eyebrow}>Solutions</span>
          <h2 style={styles.heading}>Technology Built Around Your Business</h2>
        </motion.div>

        <div style={styles.grid}>
          {solutions.map((s, i) => {
            const accent = accents[i % accents.length]
            const isHov = hovered === i
            return (
              <motion.div
                key={s.title}
                style={styles.card}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -6,
                  boxShadow: `0 0 0 1px ${accent}35, 0 20px 44px rgba(0,0,0,0.09)`,
                  transition: { duration: 0.22, ease: 'easeOut' },
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
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <s.Icon size={19} strokeWidth={1.8} style={{ color: accent }} />
                </motion.div>
                <motion.h3
                  style={styles.title}
                  animate={{ color: isHov ? accent : '#0f172a' }}
                  transition={{ duration: 0.18 }}
                >
                  {s.title}
                </motion.h3>
                <p style={styles.desc}>{s.desc}</p>

                <motion.div
                  style={{ ...styles.accentBar, background: accent }}
                  animate={{ scaleX: isHov ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
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
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },

  bgOrb: {
    position: 'absolute',
    width: '460px', height: '460px',
    background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-140px', right: '-120px',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },

  container: {
    position: 'relative',
    zIndex: 1,
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
    maxWidth: '620px',
    margin: '0 auto',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '18px',
    textAlign: 'left',
  },

  card: {
    position: 'relative',
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 0 0 1px rgba(226,232,240,0.9), 0 2px 8px rgba(0,0,0,0.04)',
    cursor: 'default',
    overflow: 'hidden',
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
    fontSize: '15.5px',
    fontWeight: 700,
    margin: '0 0 6px',
    lineHeight: '1.35',
  },

  desc: {
    fontSize: '13.5px',
    lineHeight: '1.6',
    color: '#64748b',
    margin: 0,
  },

  accentBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '3px',
    transformOrigin: 'left',
  },
}

export default SolutionsByNeed
