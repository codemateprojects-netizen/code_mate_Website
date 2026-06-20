import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

const cyclingWords = ['Web Applications', 'AI Systems', 'Mobile Apps', 'SaaS Platforms']

const stats = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '5+',  label: 'AI Systems Built'   },
  { value: '5+',  label: 'Countries Served'   },
  { value: '24h', label: 'Response Time'      },
]

// Deterministic particle positions
const PARTICLES = [
  { x: '7%',  y: '15%', s: 5, dur: 4.2, delay: 0,   op: 0.65 },
  { x: '20%', y: '70%', s: 3, dur: 5.5, delay: 0.8, op: 0.5  },
  { x: '35%', y: '10%', s: 4, dur: 3.8, delay: 1.4, op: 0.55 },
  { x: '65%', y: '78%', s: 6, dur: 6.0, delay: 0.4, op: 0.4  },
  { x: '78%', y: '22%', s: 3, dur: 4.8, delay: 2.0, op: 0.6  },
  { x: '90%', y: '58%', s: 5, dur: 5.2, delay: 1.0, op: 0.5  },
  { x: '13%', y: '42%', s: 4, dur: 4.5, delay: 2.5, op: 0.4  },
  { x: '93%', y: '32%', s: 3, dur: 3.5, delay: 1.8, op: 0.65 },
]

const Hero = () => {
  const [wordIdx, setWordIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIdx(i => (i + 1) % cyclingWords.length)
        setVisible(true)
      }, 310)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={styles.hero}>
      <div style={styles.dotGrid} />

      {/* Aurora blobs — fluid x/y/scale motion */}
      <motion.div
        style={styles.blobBlue}
        animate={{ x: [0, 40, 0], y: [0, -24, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={styles.blobPurple}
        animate={{ x: [0, -28, 0], y: [0, 32, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        style={styles.blobCyan}
        animate={{ x: [0, 18, 0], y: [0, -16, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: p.x, top: p.y,
            width: p.s, height: p.s,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'rgba(37,99,235,0.75)' : 'rgba(14,165,233,0.65)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          animate={{ y: [0, -(p.s * 5), 0], opacity: [0.1, p.op, 0.1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      <div style={styles.container}>

        {/* Badge */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '28px' }}
          initial={{ opacity: 0, scale: 0.85, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span style={styles.badge}>
            <motion.span
              style={styles.badgeDot}
              animate={{ scale: [1, 1.45, 1], opacity: [1, 0.45, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Zap size={12} strokeWidth={2.5} style={{ color: '#2563eb', flexShrink: 0 }} />
            Full-Stack Developer · AI Solutions Builder
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          Build{' '}
          <AnimatePresence mode="wait">
            {visible && (
              <motion.span
                key={wordIdx}
                style={styles.cycleWord}
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                transition={{ duration: 0.32 }}
              >
                {cyclingWords[wordIdx]}
              </motion.span>
            )}
          </AnimatePresence>
          <br />for Real-World Impact
        </motion.h1>

        {/* Animated gradient underline */}
        <motion.div
          style={styles.headingLine}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Subtitle */}
        <motion.p
          style={styles.subtitle}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          I design and develop web, mobile, desktop, and AI-powered applications
          with a focus on performance, scalability, and real-world impact.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          style={styles.buttons}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
        >
          <motion.a
            href="#contact"
            style={styles.primary}
            whileHover={{ scale: 1.04, boxShadow: '0 10px 40px rgba(37,99,235,0.5)' }}
            whileTap={{ scale: 0.97 }}
            animate={{
              boxShadow: [
                '0 4px 20px rgba(37,99,235,0.35)',
                '0 6px 36px rgba(37,99,235,0.58)',
                '0 4px 20px rgba(37,99,235,0.35)',
              ]
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>Start a Project</span>
            <ArrowRight size={15} strokeWidth={2.5} />
          </motion.a>
          <motion.a
            href="#casestudies"
            style={styles.secondary}
            whileHover={{ scale: 1.02, borderColor: '#93c5fd', color: '#1d4ed8' }}
            whileTap={{ scale: 0.98 }}
          >
            View Case Studies
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          style={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="hero-stat"
              style={styles.stat}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.09 }}
            >
              <span style={styles.statValue}>{s.value}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

const styles: any = {
  hero: {
    position: 'relative',
    padding: '80px 20px 100px',
    background: 'linear-gradient(160deg, #eef2ff 0%, #ffffff 45%, #f0f9ff 100%)',
    overflow: 'hidden',
    isolation: 'isolate',
  },

  dotGrid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(circle at 1px 1px, #c7d2fe 1px, transparent 0)',
    backgroundSize: '28px 28px',
    opacity: 0.55,
    pointerEvents: 'none',
  },

  blobBlue: {
    position: 'absolute',
    width: '700px', height: '700px',
    background: 'radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 68%)',
    borderRadius: '50%',
    top: '-280px', right: '-150px',
    filter: 'blur(60px)',
    pointerEvents: 'none',
    zIndex: 0,
  },

  blobPurple: {
    position: 'absolute',
    width: '520px', height: '520px',
    background: 'radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 68%)',
    borderRadius: '50%',
    bottom: '-110px', left: '-100px',
    filter: 'blur(60px)',
    pointerEvents: 'none',
    zIndex: 0,
  },

  blobCyan: {
    position: 'absolute',
    width: '400px', height: '400px',
    background: 'radial-gradient(circle, rgba(14,165,233,0.09) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '38%', left: '46%',
    transform: 'translate(-50%, -50%)',
    filter: 'blur(52px)',
    pointerEvents: 'none',
    zIndex: 0,
  },

  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '860px',
    margin: '0 auto',
    textAlign: 'center',
  },

  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    padding: '7px 16px 7px 10px',
    backgroundColor: 'rgba(255,255,255,0.92)',
    border: '1px solid rgba(37,99,235,0.2)',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#1e40af',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 2px 16px rgba(37,99,235,0.1), inset 0 1px 0 rgba(255,255,255,0.9)',
  },

  badgeDot: {
    display: 'inline-block',
    width: '7px', height: '7px',
    borderRadius: '50%',
    backgroundColor: '#22c55e',
    flexShrink: 0,
    boxShadow: '0 0 0 3px rgba(34,197,94,0.18)',
  },

  title: {
    fontSize: 'clamp(34px, 5.8vw, 64px)',
    fontWeight: 800,
    lineHeight: '1.12',
    marginBottom: '8px',
    color: '#0f172a',
    letterSpacing: '-0.5px',
  },

  cycleWord: {
    display: 'inline',
    background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 55%, #06b6d4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  headingLine: {
    height: '3px',
    width: '100px',
    margin: '0 auto 22px',
    background: 'linear-gradient(90deg, #2563eb, #06b6d4)',
    borderRadius: '999px',
    transformOrigin: 'center',
  },

  subtitle: {
    fontSize: '17px',
    color: '#475569',
    maxWidth: '600px',
    margin: '0 auto 30px',
    lineHeight: '1.75',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '48px',
  },

  primary: {
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '13px 28px',
    background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    color: '#fff',
    borderRadius: '11px',
    fontWeight: 700,
    fontSize: '15px',
  },

  secondary: {
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '13px 28px',
    border: '1.5px solid #cbd5e1',
    color: '#334155',
    borderRadius: '11px',
    fontWeight: 600,
    fontSize: '15px',
    backgroundColor: 'rgba(255,255,255,0.88)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },

  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    maxWidth: '580px',
    margin: '0 auto',
    padding: '16px 0',
    background: 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(226,232,240,0.8)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
  },

  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 8px',
  },

  statValue: {
    fontSize: '22px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  statLabel: {
    fontSize: '11px',
    color: '#94a3b8',
    fontWeight: 500,
    textAlign: 'center',
    lineHeight: '1.3',
  },
}

export default Hero
