import { useState } from 'react'
import { Brain, Bot, Zap, Server, Globe, Smartphone, TestTube2, Headphones, ArrowUpRight, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    Icon: Brain,
    title: 'AI Application Development',
    desc: 'Build intelligent applications using OpenAI, automation workflows, and scalable backend systems.',
    iconBg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
    iconColor: '#2563eb',
    num: '01',
  },
  {
    Icon: Bot,
    title: 'AI SaaS & Web Platforms',
    desc: 'Develop full-stack AI-powered SaaS products with clean UI, APIs, and production-ready architecture.',
    iconBg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    iconColor: '#7c3aed',
    num: '02',
  },
  {
    Icon: Zap,
    title: 'AI Automation & Integrations',
    desc: 'Automate workflows using APIs, LLMs, and backend logic to reduce manual work and improve efficiency.',
    iconBg: 'linear-gradient(135deg, #fef9c3, #fde68a)',
    iconColor: '#d97706',
    num: '03',
  },
  {
    Icon: Server,
    title: 'AI Maintenance & Scaling',
    desc: 'Optimize AI systems, improve performance, and scale infrastructure for real-world usage.',
    iconBg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
    iconColor: '#16a34a',
    num: '04',
  },
  {
    Icon: Globe,
    title: 'Web Development',
    desc: 'Modern, fast, and scalable web applications built with a clean, maintainable architecture.',
    iconBg: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
    iconColor: '#0284c7',
    num: '05',
  },
  {
    Icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Cross-platform mobile applications using React Native, designed for performance and usability.',
    iconBg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
    iconColor: '#db2777',
    num: '06',
  },
  {
    Icon: TestTube2,
    title: 'Testing & Bug Fixing',
    desc: 'Manual testing, bug fixing, and performance improvements to ensure reliability.',
    iconBg: 'linear-gradient(135deg, #ffedd5, #fed7aa)',
    iconColor: '#ea580c',
    num: '07',
  },
  {
    Icon: Headphones,
    title: 'Maintenance & Support',
    desc: 'Ongoing support, updates, and feature enhancements for long-term success.',
    iconBg: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
    iconColor: '#15803d',
    num: '08',
  },
]

const Services = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={styles.section} id="services">
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
          <span style={styles.eyebrow}>What I offer</span>
          <h2 style={styles.heading}>Services</h2>
          <p style={styles.subheading}>
            End-to-end development services focused on quality, scalability,
            and long-term product success.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={styles.grid}>
          {services.map((svc, i) => {
            const isHov = hovered === i
            return (
              <motion.div
                key={i}
                style={styles.card}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: i * 0.06 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -7,
                  boxShadow: `inset 0 3px 0 ${svc.iconColor}, 0 0 0 1px rgba(226,232,240,0.45), 0 24px 52px rgba(0,0,0,0.09)`,
                  transition: { duration: 0.22, ease: 'easeOut' },
                }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
              >
                {/* Top row: icon + number */}
                <div style={styles.cardTop}>
                  <motion.div
                    style={{ ...styles.iconBox, background: svc.iconBg, color: svc.iconColor }}
                    animate={{ scale: isHov ? 1.1 : 1 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    <svc.Icon size={20} strokeWidth={1.8} />
                  </motion.div>
                  <motion.span
                    style={styles.numBadge}
                    animate={{ opacity: isHov ? 0.5 : 0.18, color: isHov ? svc.iconColor : '#94a3b8' }}
                    transition={{ duration: 0.18 }}
                  >
                    {svc.num}
                  </motion.span>
                </div>

                {/* Title */}
                <motion.h3
                  style={styles.title}
                  animate={{ color: isHov ? svc.iconColor : '#0f172a' }}
                  transition={{ duration: 0.18 }}
                >
                  {svc.title}
                </motion.h3>

                {/* Desc */}
                <p style={styles.desc}>{svc.desc}</p>

                {/* Hover footer */}
                <motion.div
                  style={{ ...styles.learnMore, color: svc.iconColor }}
                  animate={{ opacity: isHov ? 1 : 0, y: isHov ? 0 : 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <span>Explore service</span>
                  <ArrowUpRight size={13} strokeWidth={2.5} />
                </motion.div>

              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          style={styles.ctaSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div style={styles.ctaOrb1} />
          <div style={styles.ctaOrb2} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={styles.ctaBadge}>Ready to start?</span>
            <h3 style={styles.ctaTitle}>Have an idea or need an AI solution?</h3>
            <p style={styles.ctaText}>
              I build AI-powered applications, automation systems, and scalable products.
              Let's work together to bring your idea to life.
            </p>
            <motion.a
              href="#contact"
              style={styles.ctaButton}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Start a Conversation</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </motion.a>
          </div>
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
    width: '500px', height: '500px',
    background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-160px', right: '-100px',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },

  bgOrb2: {
    position: 'absolute',
    width: '400px', height: '400px',
    background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '-100px', left: '-80px',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },

  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1100px',
    margin: '0 auto',
    textAlign: 'center',
  },

  header: {
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
    maxWidth: '560px',
    margin: '0 auto',
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#64748b',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    textAlign: 'left',
  },

  card: {
    backgroundColor: '#ffffff',
    padding: '28px',
    borderRadius: '16px',
    boxShadow: '0 0 0 1px rgba(226,232,240,0.9), 0 2px 8px rgba(0,0,0,0.04)',
    cursor: 'default',
  },

  cardTop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },

  iconBox: {
    width: '46px',
    height: '46px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  numBadge: {
    fontSize: '13px',
    fontWeight: 700,
    fontFamily: 'monospace',
    letterSpacing: '0.5px',
  },

  title: {
    fontSize: '15.5px',
    fontWeight: 700,
    margin: '0 0 8px',
    lineHeight: '1.35',
  },

  desc: {
    fontSize: '13.5px',
    lineHeight: '1.65',
    color: '#64748b',
    margin: '0 0 14px',
  },

  learnMore: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12.5px',
    fontWeight: 600,
  },

  /* CTA */
  ctaSection: {
    position: 'relative',
    marginTop: '72px',
    padding: '52px 40px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #0284c7 100%)',
    color: '#fff',
    textAlign: 'center',
    boxShadow: '0 24px 64px rgba(37,99,235,0.28)',
    overflow: 'hidden',
  },

  ctaOrb1: {
    position: 'absolute',
    width: '320px', height: '320px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-80px', right: '-60px',
    pointerEvents: 'none',
  },

  ctaOrb2: {
    position: 'absolute',
    width: '220px', height: '220px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '-60px', left: '30%',
    pointerEvents: 'none',
  },

  ctaBadge: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    color: 'rgba(255,255,255,0.65)',
    marginBottom: '14px',
    padding: '4px 12px',
    border: '1px solid rgba(255,255,255,0.22)',
    borderRadius: '999px',
  },

  ctaTitle: {
    fontSize: 'clamp(20px, 3vw, 28px)',
    fontWeight: 800,
    margin: '0 0 12px',
    lineHeight: '1.3',
  },

  ctaText: {
    fontSize: '15.5px',
    maxWidth: '540px',
    margin: '0 auto 28px',
    lineHeight: '1.65',
    opacity: 0.85,
  },

  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '13px 28px',
    background: '#ffffff',
    color: '#1e40af',
    borderRadius: '10px',
    fontWeight: 700,
    textDecoration: 'none',
    fontSize: '15px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
  },
}

export default Services
