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
  return (
    <section style={styles.section} id="solutions">
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
            return (
              <motion.div
                key={s.title}
                style={styles.card}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
              >
                <div style={{
                  ...styles.iconBox,
                  backgroundColor: accent + '14',
                  border: `1px solid ${accent}30`,
                }}>
                  <s.Icon size={19} strokeWidth={1.8} style={{ color: accent }} />
                </div>
                <h3 style={styles.title}>{s.title}</h3>
                <p style={styles.desc}>{s.desc}</p>
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
    backgroundColor: '#f8fafc',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid rgba(226,232,240,0.9)',
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
    fontSize: '15.5px',
    fontWeight: 700,
    color: '#0f172a',
    margin: '0 0 6px',
    lineHeight: '1.35',
  },

  desc: {
    fontSize: '13.5px',
    lineHeight: '1.6',
    color: '#64748b',
    margin: 0,
  },
}

export default SolutionsByNeed
