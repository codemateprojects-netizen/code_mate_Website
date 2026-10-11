import { Rocket, Building2, Globe2, ArrowRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'

const cards = [
  {
    Icon: Rocket,
    accent: '#2563eb',
    tag: 'Startups & Founders',
    title: 'Have an Idea? Let’s Turn It Into an MVP.',
    flow: ['Idea', 'Product Planning', 'UI/UX', 'Development', 'Testing', 'Launch'],
    points: ['MVP development', 'Web & mobile apps', 'Admin dashboards & payments', 'AI integrations', 'Cloud deployment'],
    cta: 'Discuss My Idea',
  },
  {
    Icon: Building2,
    accent: '#1e3a8a',
    tag: 'Agencies',
    title: 'Need a Reliable Development Partner?',
    body: 'SYJEN CODE works with agencies that need a dependable technical team for web, mobile, ecommerce, backend, and AI development.',
    points: ['You handle the client relationship, marketing & strategy', 'We handle architecture, development, testing, deployment & support'],
    cta: 'Partner With SYJEN CODE',
  },
  {
    Icon: Globe2,
    accent: '#f97316',
    tag: 'International Businesses',
    title: 'Building Products for Businesses Beyond Borders.',
    points: ['Online discovery meetings', 'Clear documentation', 'Milestone-based development', 'Remote collaboration & regular updates', 'Remote deployment & support'],
    cta: 'Start an International Project',
  },
]

const Audiences = () => {
  return (
    <section style={styles.section}>
      <div style={styles.container}>

        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span style={styles.eyebrow}>Who We Work With</span>
          <h2 style={styles.heading}>Built for How You Work</h2>
        </motion.div>

        <div style={styles.grid}>
          {cards.map((c, i) => (
            <motion.div
              key={c.tag}
              style={{ ...styles.card, boxShadow: `inset 3px 0 0 ${c.accent}, 0 0 0 1px rgba(226,232,240,0.85), 0 4px 16px rgba(0,0,0,0.05)` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
            >
              <div style={{ ...styles.iconBox, backgroundColor: c.accent + '14', border: `1px solid ${c.accent}30` }}>
                <c.Icon size={20} strokeWidth={1.8} style={{ color: c.accent }} />
              </div>

              <span style={{ ...styles.tag, color: c.accent, backgroundColor: c.accent + '10' }}>{c.tag}</span>
              <h3 style={styles.title}>{c.title}</h3>

              {c.body && <p style={styles.body}>{c.body}</p>}

              {c.flow && (
                <div style={styles.flow}>
                  {c.flow.map((f, fi) => (
                    <span key={fi} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ ...styles.flowStep, borderColor: c.accent + '40', color: c.accent }}>{f}</span>
                      {fi < c.flow.length - 1 && <span style={{ color: c.accent, fontSize: '11px' }}>→</span>}
                    </span>
                  ))}
                </div>
              )}

              <ul style={styles.points}>
                {c.points.map((p, pi) => (
                  <li key={pi} style={styles.point}>
                    <Check size={13} strokeWidth={2.5} style={{ color: c.accent, flexShrink: 0, marginTop: '2px' }} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#contact"
                style={{ ...styles.cta, backgroundColor: c.accent }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{c.cta}</span>
                <ArrowRight size={14} strokeWidth={2.5} />
              </motion.a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

const styles: any = {
  section: {
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
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '22px',
    textAlign: 'left',
  },

  card: {
    backgroundColor: '#ffffff',
    padding: '28px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
  },

  iconBox: {
    width: '46px',
    height: '46px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },

  tag: {
    display: 'inline-block',
    fontSize: '11.5px',
    fontWeight: 700,
    padding: '3px 11px',
    borderRadius: '999px',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    width: 'fit-content',
    marginBottom: '12px',
  },

  title: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#0f172a',
    margin: '0 0 12px',
    lineHeight: '1.35',
  },

  body: {
    fontSize: '13.5px',
    color: '#64748b',
    lineHeight: '1.65',
    margin: '0 0 14px',
  },

  flow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    alignItems: 'center',
    marginBottom: '14px',
  },

  flowStep: {
    padding: '3px 9px',
    borderRadius: '6px',
    fontSize: '11.5px',
    fontWeight: 600,
    border: '1px solid',
  },

  points: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },

  point: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '13.5px',
    color: '#475569',
    lineHeight: '1.5',
  },

  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    padding: '11px 20px',
    color: '#ffffff',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '13.5px',
    textDecoration: 'none',
    marginTop: 'auto',
  },
}

export default Audiences
