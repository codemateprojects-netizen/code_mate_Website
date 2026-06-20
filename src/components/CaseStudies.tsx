import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Mail } from 'lucide-react'

const tagMeta: Record<string, { bg: string; color: string; border: string }> = {
  'AI Application':     { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
  'AI Tool':            { bg: '#f5f3ff', color: '#7c3aed', border: '#ddd6fe' },
  'AI Automation':      { bg: '#fffbeb', color: '#b45309', border: '#fde68a' },
  'AI Dashboard':       { bg: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
  'Web Application':    { bg: '#e0f2fe', color: '#0284c7', border: '#bae6fd' },
  'Web Platform':       { bg: '#e0f2fe', color: '#0284c7', border: '#bae6fd' },
  'Mobile Application': { bg: '#fdf4ff', color: '#a21caf', border: '#f0abfc' },
  'Business Website':   { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
  'Landing Page':       { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
}

const FILTERS = ['All', 'AI', 'Web', 'Mobile']
const categoryMap: Record<string, string[]> = {
  AI:     ['AI Application', 'AI Tool', 'AI Automation', 'AI Dashboard'],
  Web:    ['Web Application', 'Web Platform', 'Business Website', 'Landing Page'],
  Mobile: ['Mobile Application'],
}

const cases = [
  {
    title: 'Startup Landing Website',
    tag: 'Landing Page',
    problem: 'A startup needed a clean landing page to validate an early-stage idea.',
    solution: 'Created a high-performance landing experience optimized for outreach.',
    tech: 'React · Vite',
    outcome: 'Enabled faster validation and early traction.'
  },
  {
    title: 'AI Customer Support Chatbot',
    tag: 'AI Application',
    problem: 'Businesses needed automated customer support to handle repetitive queries and reduce response time.',
    solution: 'Built an AI chatbot using OpenAI API with context handling and FAQ-based retrieval system.',
    tech: 'Python · FastAPI · OpenAI API · MongoDB',
    outcome: 'Reduced manual support workload by 60% and improved response time significantly.',
    workflow: 'User Query → API → OpenAI Processing → Context Retrieval → Response'
  },
  {
    title: 'AI Content Generator',
    tag: 'AI Tool',
    problem: 'Content creators needed faster ways to generate blogs, captions, and marketing content.',
    solution: 'Developed an AI-powered content generator with customizable prompts and tone control.',
    tech: 'React · Node.js · OpenAI API',
    outcome: 'Enabled rapid content creation with consistent quality and tone.',
    workflow: 'User Input → Prompt Engineering → OpenAI API → Content Output'
  },
  {
    title: 'AI Feedback Summarization System',
    tag: 'AI Automation',
    problem: 'Companies struggled to analyze large volumes of user feedback manually.',
    solution: 'Built an NLP-based summarization tool to extract key insights from feedback data.',
    tech: 'Python · NLP · OpenAI · FastAPI',
    outcome: 'Improved decision-making by converting raw feedback into actionable insights.',
    workflow: 'Feedback Data → Preprocessing → NLP Model → Summary + Insights'
  },
  {
    title: 'AI Analytics Dashboard',
    tag: 'AI Dashboard',
    problem: 'Businesses lacked insights from raw data for better decision-making.',
    solution: 'Created a dashboard integrating AI insights with data visualization tools.',
    tech: 'React · Chart.js · FastAPI · AI APIs',
    outcome: 'Delivered real-time insights and improved business intelligence.',
    workflow: 'Data Source → Backend → AI Analysis → Dashboard Visualization'
  },
  {
    title: 'AI Developer Terminal (CLI Assistant)',
    tag: 'AI Tool',
    problem: 'Developers needed fast AI help for coding and debugging without leaving the terminal.',
    solution: 'Built a CLI-based AI assistant using Python with intelligent response processing.',
    tech: 'Python · OpenAI API · CLI · Prompt Engineering',
    outcome: 'Improved developer productivity by enabling instant AI assistance in terminal workflows.',
    workflow: 'User Command → CLI Input → OpenAI API → Terminal Output'
  },
  {
    title: 'Books Marketplace Platform',
    tag: 'Web Application',
    problem: 'Independent sellers needed a simple, scalable way to sell books online.',
    solution: 'Designed and developed a secure marketplace with authentication and modular architecture.',
    tech: 'React · Node.js',
    outcome: 'Production-ready MVP with scalability and long-term maintainability.'
  },
  {
    title: 'Service Booking Platform',
    tag: 'Web Platform',
    problem: 'Local service providers needed a digital platform to manage bookings and clients.',
    solution: 'Built a service-based platform with clean workflows and user management.',
    tech: 'React · Node.js',
    outcome: 'Ready-to-scale foundation supporting multiple service categories.'
  },
  {
    title: 'Creator Support Mobile App',
    tag: 'Mobile Application',
    problem: 'Creators needed a mobile-first way to share content and connect with supporters.',
    solution: 'Developed a cross-platform mobile app with clean UI, authentication, and scalable architecture.',
    tech: 'React Native · TypeScript',
    outcome: 'Mobile-ready product designed for future feature expansion.'
  },
  {
    title: 'Business Management Mobile App',
    tag: 'Mobile Application',
    problem: 'Small businesses required a mobile app to manage daily operations on the go.',
    solution: 'Built a lightweight, performance-focused mobile application with intuitive navigation.',
    tech: 'React Native · API Integration',
    outcome: 'Improved accessibility and mobile productivity.'
  },
  {
    title: 'Digital Marketing Portfolio',
    tag: 'Business Website',
    problem: 'A marketing consultant needed a professional online presence to attract international clients.',
    solution: 'Developed a fast, conversion-focused website with clear messaging.',
    tech: 'React · Vite',
    outcome: 'Improved credibility and global client readiness.'
  },
]

const CaseStudies = () => {
  const [showAll, setShowAll]   = useState(false)
  const [filter, setFilter]     = useState('All')
  const [hovered, setHovered]   = useState<number | null>(null)

  const filtered = filter === 'All'
    ? cases
    : cases.filter(c => categoryMap[filter]?.includes(c.tag))

  const visible = showAll ? filtered : filtered.slice(0, 6)

  const handleFilter = (f: string) => {
    setFilter(f)
    setShowAll(false)
    setHovered(null)
  }

  return (
    <section style={styles.section} id="casestudies">
      <div style={styles.bgOrb} />

      <div style={styles.container}>

        {/* Header */}
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span style={styles.eyebrow}>Portfolio</span>
          <h2 style={styles.heading}>Case Studies</h2>
          <p style={styles.subheading}>
            Representative projects demonstrating our approach to building
            scalable, production-ready products.
          </p>
        </motion.div>

        {/* Confidentiality notice */}
        <motion.div
          style={styles.notice}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <Lock size={14} style={{ color: '#2563eb', flexShrink: 0 }} />
          <span style={styles.noticeText}>
            Live demos &amp; screenshots are under client confidentiality —
            available on request.
          </span>
          <a href="#contact" style={styles.noticeLink}>
            <Mail size={12} />
            Request access
          </a>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          style={styles.filters}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {FILTERS.map(f => {
            const count = f === 'All'
              ? cases.length
              : cases.filter(c => categoryMap[f]?.includes(c.tag)).length
            const isActive = filter === f
            return (
              <motion.button
                key={f}
                style={{ ...styles.filterBtn, ...(isActive ? styles.filterBtnActive : {}) }}
                onClick={() => handleFilter(f)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {f}
                <span style={{ ...styles.filterCount, ...(isActive ? styles.filterCountActive : {}) }}>
                  {count}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            style={styles.grid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {visible.map((c, i) => {
              const meta   = tagMeta[c.tag] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' }
              const isHov  = hovered === i
              const techs  = c.tech.split(' · ')
              const steps  = c.workflow ? c.workflow.split(' → ') : []

              return (
                <motion.article
                  key={c.title}
                  style={{
                    ...styles.card,
                    boxShadow: `inset 3px 0 0 ${meta.border}, 0 0 0 1px rgba(226,232,240,0.85), 0 2px 8px rgba(0,0,0,0.04)`,
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  whileHover={{
                    y: -6,
                    boxShadow: `inset 3px 0 0 ${meta.color}, 0 0 0 1.5px ${meta.border}, 0 24px 52px rgba(0,0,0,0.10)`,
                    transition: { duration: 0.22, ease: 'easeOut' },
                  }}
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                >

                  {/* Tag + number */}
                  <div style={styles.cardTop}>
                    <span style={{ ...styles.tag, backgroundColor: meta.bg, color: meta.color, borderColor: meta.border }}>
                      {c.tag}
                    </span>
                    <motion.span
                      style={styles.cardNum}
                      animate={{ opacity: isHov ? 0.5 : 0.2, color: isHov ? meta.color : '#94a3b8' }}
                      transition={{ duration: 0.18 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.span>
                  </div>

                  {/* Title */}
                  <motion.h3
                    style={styles.title}
                    animate={{ color: isHov ? meta.color : '#0f172a' }}
                    transition={{ duration: 0.18 }}
                  >
                    {c.title}
                  </motion.h3>

                  {/* Problem */}
                  <div style={styles.block}>
                    <span style={styles.label}>Problem</span>
                    <p style={styles.blockText}>{c.problem}</p>
                  </div>

                  {/* Solution */}
                  <div style={styles.block}>
                    <span style={styles.label}>Solution</span>
                    <p style={styles.blockText}>{c.solution}</p>
                  </div>

                  {/* Workflow */}
                  {steps.length > 0 && (
                    <div style={styles.workflowBox}>
                      <span style={styles.label}>Workflow</span>
                      <div style={styles.steps}>
                        {steps.map((step, si) => (
                          <span key={si} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ ...styles.step, color: meta.color, backgroundColor: meta.bg, borderColor: meta.border }}>
                              {step}
                            </span>
                            {si < steps.length - 1 && (
                              <span style={{ ...styles.stepArrow, color: meta.color }}>→</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stack */}
                  <div style={styles.block}>
                    <span style={styles.label}>Stack</span>
                    <div style={styles.techRow}>
                      {techs.map((t, ti) => (
                        <span key={ti} style={styles.techPill}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Outcome */}
                  <div style={styles.outcomeBox}>
                    <span style={{ ...styles.label, color: '#15803d' }}>Outcome</span>
                    <p style={{ ...styles.blockText, color: '#166534', fontWeight: 500, margin: 0 }}>
                      {c.outcome}
                    </p>
                  </div>

                </motion.article>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* View all / less */}
        {filtered.length > 6 && (
          <motion.div
            style={styles.buttonWrapper}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              style={styles.showButton}
              onClick={() => setShowAll(v => !v)}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(37,99,235,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              {showAll ? '↑ Show Less' : `View All ${filtered.length} Projects`}
            </motion.button>
          </motion.div>
        )}

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
    width: '600px', height: '600px',
    background: 'radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-200px', right: '-200px',
    filter: 'blur(80px)',
    pointerEvents: 'none',
  },

  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1200px',
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
    fontSize: 'clamp(28px, 4vw, 40px)',
    fontWeight: 800,
    marginBottom: '14px',
    color: '#0f172a',
    letterSpacing: '-0.3px',
  },

  subheading: {
    maxWidth: '620px',
    margin: '0 auto',
    color: '#64748b',
    lineHeight: '1.7',
    fontSize: '16px',
  },

  /* Confidentiality notice */
  notice: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '32px',
    padding: '10px 20px',
    backgroundColor: 'rgba(37,99,235,0.05)',
    border: '1px solid rgba(37,99,235,0.14)',
    borderRadius: '12px',
    maxWidth: '620px',
    margin: '0 auto 32px',
  },

  noticeText: {
    fontSize: '13px',
    color: '#475569',
    lineHeight: '1.5',
  },

  noticeLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12.5px',
    fontWeight: 600,
    color: '#2563eb',
    textDecoration: 'none',
    padding: '3px 10px',
    backgroundColor: 'rgba(37,99,235,0.08)',
    borderRadius: '999px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },

  /* Filter tabs */
  filters: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '48px',
  },

  filterBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    padding: '8px 18px',
    borderRadius: '999px',
    border: '1px solid rgba(226,232,240,0.9)',
    background: '#ffffff',
    fontSize: '13.5px',
    fontWeight: 500,
    color: '#64748b',
    cursor: 'pointer',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },

  filterBtnActive: {
    background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    color: '#ffffff',
    border: '1px solid transparent',
    fontWeight: 600,
    boxShadow: '0 4px 16px rgba(37,99,235,0.28)',
  },

  filterCount: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '20px',
    height: '20px',
    padding: '0 5px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 700,
    backgroundColor: 'rgba(100,116,139,0.1)',
    color: '#64748b',
  },

  filterCountActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    color: '#ffffff',
  },

  /* Grid */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
  },

  card: {
    padding: '28px',
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'default',
  },

  cardTop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '14px',
  },

  tag: {
    display: 'inline-block',
    padding: '4px 11px',
    fontSize: '12px',
    borderRadius: '999px',
    border: '1px solid',
    fontWeight: 600,
  },

  cardNum: {
    fontSize: '13px',
    fontWeight: 700,
    fontFamily: 'monospace',
    letterSpacing: '0.5px',
    flexShrink: 0,
  },

  title: {
    fontSize: '17px',
    fontWeight: 700,
    margin: '0 0 16px',
    lineHeight: '1.3',
  },

  block: {
    marginBottom: '14px',
  },

  label: {
    fontSize: '10.5px',
    fontWeight: 700,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.9px',
    display: 'block',
    marginBottom: '5px',
  },

  blockText: {
    fontSize: '13.5px',
    color: '#64748b',
    lineHeight: '1.6',
    margin: 0,
  },

  /* Workflow */
  workflowBox: {
    background: '#f8fafc',
    border: '1px solid rgba(226,232,240,0.8)',
    padding: '12px',
    borderRadius: '10px',
    marginBottom: '14px',
  },

  steps: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    alignItems: 'center',
    marginTop: '4px',
  },

  step: {
    padding: '3px 8px',
    borderRadius: '6px',
    fontSize: '11.5px',
    fontWeight: 600,
    border: '1px solid',
  },

  stepArrow: {
    fontSize: '11px',
    fontWeight: 700,
    flexShrink: 0,
  },

  /* Stack */
  techRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '2px',
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

  /* Outcome */
  outcomeBox: {
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    padding: '12px',
    borderRadius: '10px',
    marginTop: 'auto',
  },

  /* Button */
  buttonWrapper: {
    textAlign: 'center',
    marginTop: '52px',
  },

  showButton: {
    padding: '13px 32px',
    background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '15px',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(37,99,235,0.28)',
  },
}

export default CaseStudies
