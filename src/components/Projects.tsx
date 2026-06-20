import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'

const projects = [
  {
    num: '01',
    name: 'Digital Marketing Portfolio',
    category: 'Business Website',
    tech: ['React', 'Vite', 'CSS'],
    desc: 'Conversion-focused portfolio for digital marketing services with professional design and fast performance.',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    accent: '#6366f1',
    dots: ['#ff5f57', '#febc2e', '#28c840'],
  },
  {
    num: '02',
    name: 'Books Buy & Sell Platform',
    category: 'Web Application',
    tech: ['React', 'Node.js', 'MongoDB'],
    desc: 'Full-stack marketplace with user authentication, product listings, and a secure transaction flow.',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    accent: '#0ea5e9',
    dots: ['#ff5f57', '#febc2e', '#28c840'],
  },
  {
    num: '03',
    name: 'Mobile App UI Demo',
    category: 'Mobile App',
    tech: ['React Native', 'TypeScript'],
    desc: 'Cross-platform mobile UI showcasing intuitive navigation patterns and polished UX design.',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
    accent: '#ec4899',
    dots: ['#ff5f57', '#febc2e', '#28c840'],
  },
]

const Projects = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={styles.section} id="projects">
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />

      <div style={styles.container}>

        {/* Header */}
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span style={styles.eyebrow}>Featured Work</span>
          <h2 style={styles.heading}>Projects</h2>
          <p style={styles.subheading}>
            Handpicked projects built with a focus on clean code,
            performance, and real-world usability.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={styles.grid}>
          {projects.map((p, i) => {
            const isHov = hovered === i
            return (
              <motion.div
                key={i}
                style={{
                  ...styles.card,
                  boxShadow: isHov
                    ? `0 0 0 2px ${p.accent}44, 0 28px 56px rgba(0,0,0,0.13)`
                    : '0 0 0 1px rgba(226,232,240,0.85), 0 4px 16px rgba(0,0,0,0.05)',
                }}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.44, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.22, ease: 'easeOut' } }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
              >

                {/* ── Preview area ── */}
                <div style={{ ...styles.preview, background: p.gradient }}>
                  {/* Decorative circles */}
                  <div style={styles.previewCircle1} />
                  <div style={styles.previewCircle2} />

                  {/* Mock browser window */}
                  <motion.div
                    style={styles.mockWindow}
                    animate={{ y: isHov ? -6 : 0, scale: isHov ? 1.03 : 1 }}
                    transition={{ duration: 0.26, ease: 'easeOut' }}
                  >
                    {/* Title bar */}
                    <div style={styles.mockBar}>
                      {p.dots.map((c, di) => (
                        <span key={di} style={{ ...styles.mockDot, backgroundColor: c }} />
                      ))}
                      <div style={styles.mockUrl} />
                    </div>
                    {/* Content lines */}
                    <div style={styles.mockBody}>
                      <div style={styles.mockHero} />
                      <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                        <div style={{ ...styles.mockLine, flex: 1 }} />
                        <div style={{ ...styles.mockLine, flex: 1, opacity: 0.5 }} />
                      </div>
                      <div style={{ ...styles.mockLine, width: '70%', marginTop: '6px', opacity: 0.4 }} />
                    </div>
                  </motion.div>

                  {/* Large ghost number */}
                  <span style={styles.previewNum}>{p.num}</span>
                </div>

                {/* ── Card body ── */}
                <div style={styles.body}>

                  {/* Category */}
                  <span style={{
                    ...styles.catPill,
                    color: p.accent,
                    backgroundColor: p.accent + '12',
                    borderColor: p.accent + '38',
                  }}>
                    {p.category}
                  </span>

                  {/* Title */}
                  <motion.h3
                    style={styles.title}
                    animate={{ color: isHov ? p.accent : '#0f172a' }}
                    transition={{ duration: 0.18 }}
                  >
                    {p.name}
                  </motion.h3>

                  {/* Desc */}
                  <p style={styles.desc}>{p.desc}</p>

                  {/* Tech pills */}
                  <div style={styles.techRow}>
                    {p.tech.map((t, ti) => (
                      <span key={ti} style={styles.techPill}>{t}</span>
                    ))}
                  </div>

                  {/* Footer link */}
                  <motion.a
                    href="#contact"
                    style={{ ...styles.footerLink, color: p.accent }}
                    animate={{ opacity: isHov ? 1 : 0.55, x: isHov ? 3 : 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <span>Request Demo</span>
                    <ArrowRight size={13} strokeWidth={2.5} />
                  </motion.a>

                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          style={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <p style={styles.ctaText}>Want to see more work?</p>
          <motion.a
            href="#casestudies"
            style={styles.ctaBtn}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(37,99,235,0.3)' }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink size={14} strokeWidth={2.5} />
            View Full Case Studies
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
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },

  bgOrb1: {
    position: 'absolute',
    width: '480px', height: '480px',
    background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-150px', right: '-100px',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },

  bgOrb2: {
    position: 'absolute',
    width: '360px', height: '360px',
    background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '-100px', left: '-80px',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },

  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1060px',
    margin: '0 auto',
    textAlign: 'center',
  },

  header: {
    marginBottom: '52px',
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

  /* Grid */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    textAlign: 'left',
    marginBottom: '52px',
  },

  card: {
    borderRadius: '18px',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    cursor: 'default',
  },

  /* Preview */
  preview: {
    position: 'relative',
    height: '188px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  previewCircle1: {
    position: 'absolute',
    width: '200px', height: '200px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    top: '-60px', right: '-40px',
    pointerEvents: 'none',
  },

  previewCircle2: {
    position: 'absolute',
    width: '120px', height: '120px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)',
    bottom: '-30px', left: '-20px',
    pointerEvents: 'none',
  },

  mockWindow: {
    width: '62%',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 14px 36px rgba(0,0,0,0.22)',
    position: 'relative',
    zIndex: 1,
  },

  mockBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '7px 10px',
    backgroundColor: 'rgba(0,0,0,0.07)',
  },

  mockDot: {
    width: '7px', height: '7px',
    borderRadius: '50%',
    flexShrink: 0,
  },

  mockUrl: {
    flex: 1,
    height: '6px',
    borderRadius: '3px',
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginLeft: '6px',
  },

  mockBody: {
    padding: '10px 12px 12px',
  },

  mockHero: {
    height: '22px',
    borderRadius: '4px',
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '100%',
  },

  mockLine: {
    height: '7px',
    borderRadius: '4px',
    backgroundColor: 'rgba(0,0,0,0.08)',
  },

  previewNum: {
    position: 'absolute',
    bottom: '8px',
    right: '14px',
    fontSize: '36px',
    fontWeight: 900,
    color: 'rgba(255,255,255,0.18)',
    fontFamily: 'monospace',
    letterSpacing: '-2px',
    lineHeight: 1,
    pointerEvents: 'none',
  },

  /* Body */
  body: {
    padding: '24px 24px 22px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  catPill: {
    display: 'inline-block',
    fontSize: '11.5px',
    fontWeight: 600,
    padding: '3px 10px',
    borderRadius: '999px',
    border: '1px solid',
    width: 'fit-content',
  },

  title: {
    fontSize: '17px',
    fontWeight: 700,
    margin: 0,
    lineHeight: '1.3',
  },

  desc: {
    fontSize: '13.5px',
    color: '#64748b',
    lineHeight: '1.65',
    margin: 0,
  },

  techRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },

  techPill: {
    padding: '3px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: '1px solid rgba(226,232,240,0.9)',
  },

  footerLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '13px',
    fontWeight: 600,
    textDecoration: 'none',
    marginTop: '2px',
  },

  /* Bottom CTA */
  cta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    padding: '24px 32px',
    background: 'rgba(255,255,255,0.8)',
    border: '1px solid rgba(226,232,240,0.8)',
    borderRadius: '16px',
  },

  ctaText: {
    fontSize: '15px',
    color: '#475569',
    fontWeight: 500,
    margin: 0,
  },

  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    padding: '9px 20px',
    background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    color: '#fff',
    borderRadius: '9px',
    fontWeight: 600,
    fontSize: '13.5px',
    textDecoration: 'none',
    boxShadow: '0 4px 14px rgba(37,99,235,0.25)',
  },
}

export default Projects
