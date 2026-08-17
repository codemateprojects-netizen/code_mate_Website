import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const steps = [
  { num: '01', title: 'Discovery',              desc: 'Understand the business, users, and goals.' },
  { num: '02', title: 'Requirements',            desc: 'Define features, scope, and deliverables.' },
  { num: '03', title: 'Planning',                desc: 'Architecture, technology decisions, and milestones.' },
  { num: '04', title: 'Design',                  desc: 'Create the user experience and interface.' },
  { num: '05', title: 'Development',             desc: 'Build the product using modern technologies.' },
  { num: '06', title: 'Testing & Deployment',    desc: 'Test, fix, optimize, and launch.' },
  { num: '07', title: 'Support',                 desc: 'Maintenance, improvements, and ongoing technical support.' },
]

const Process = () => {
  return (
    <section style={styles.section} id="process">
      <div style={styles.container}>

        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span style={styles.eyebrow}>How We Work</span>
          <h2 style={styles.heading}>Our Process</h2>
          <p style={styles.subheading}>
            A structured path from idea to production, with clear milestones at every step.
          </p>
        </motion.div>

        <div style={styles.timeline}>
          {steps.map((s, i) => {
            const isOrange = i % 3 === 2
            return (
              <motion.div
                key={s.num}
                style={styles.row}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true }}
              >
                <div style={styles.left}>
                  <div style={{
                    ...styles.numCircle,
                    background: isOrange
                      ? 'linear-gradient(135deg, #f97316, #fb923c)'
                      : 'linear-gradient(135deg, #2563eb, #0ea5e9)',
                    boxShadow: isOrange
                      ? '0 4px 14px rgba(249,115,22,0.32)'
                      : '0 4px 14px rgba(37,99,235,0.32)',
                  }}>
                    {s.num}
                  </div>
                  {i < steps.length - 1 && <div style={styles.line} />}
                </div>
                <div style={styles.content}>
                  <h3 style={styles.stepTitle}>{s.title}</h3>
                  <p style={styles.stepDesc}>{s.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          style={styles.cta}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
        >
          <p style={styles.ctaText}>Have a project in mind? Let's discuss it.</p>
          <motion.a
            href="#contact"
            style={styles.ctaBtn}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(37,99,235,0.3)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Start a Project</span>
            <ArrowRight size={15} strokeWidth={2.5} />
          </motion.a>
        </motion.div>

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
    maxWidth: '760px',
    margin: '0 auto',
  },

  header: {
    textAlign: 'center',
    marginBottom: '56px',
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
    fontSize: 'clamp(28px, 4vw, 40px)',
    fontWeight: 800,
    marginBottom: '14px',
    color: '#0f172a',
    letterSpacing: '-0.3px',
  },

  subheading: {
    maxWidth: '520px',
    margin: '0 auto',
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#64748b',
  },

  timeline: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '52px',
  },

  row: {
    display: 'flex',
    gap: '22px',
    alignItems: 'flex-start',
  },

  left: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
  },

  numCircle: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 800,
    fontFamily: 'monospace',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  line: {
    width: '2px',
    flex: 1,
    minHeight: '32px',
    background: 'linear-gradient(180deg, rgba(37,99,235,0.3) 0%, rgba(226,232,240,0.6) 100%)',
    margin: '4px 0',
  },

  content: {
    paddingTop: '6px',
    paddingBottom: '30px',
  },

  stepTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#0f172a',
    margin: '0 0 4px',
  },

  stepDesc: {
    fontSize: '14.5px',
    color: '#64748b',
    lineHeight: '1.6',
    margin: 0,
  },

  cta: {
    textAlign: 'center',
    padding: '28px 32px',
    background: 'linear-gradient(135deg, #f8faff 0%, #f0f9ff 100%)',
    border: '1px solid rgba(37,99,235,0.1)',
    borderRadius: '16px',
  },

  ctaText: {
    fontSize: '16px',
    color: '#0f172a',
    fontWeight: 600,
    margin: '0 0 16px',
  },

  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 26px',
    background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    color: '#fff',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '14.5px',
    textDecoration: 'none',
    boxShadow: '0 4px 16px rgba(37,99,235,0.25)',
  },
}

export default Process
