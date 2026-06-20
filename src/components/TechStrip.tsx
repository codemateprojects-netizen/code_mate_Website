const techs = [
  'React', 'TypeScript', 'Python', 'FastAPI', 'OpenAI API',
  'React Native', 'Node.js', 'MongoDB', 'Next.js', 'Docker',
  'PostgreSQL', 'Vite', 'AWS', 'Prompt Engineering', 'REST APIs',
]

const TechStrip = () => {
  const doubled = [...techs, ...techs]

  return (
    <section style={styles.section}>
      <div style={styles.labelWrap}>
        <span style={styles.label}>Tech Stack</span>
        <div style={styles.line} />
      </div>

      <div style={styles.track}>
        <div style={styles.marquee}>
          {doubled.map((t, i) => (
            <span key={i} style={styles.item}>
              <span style={styles.dot}>◆</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles: any = {
  section: {
    padding: '28px 0 32px',
    backgroundColor: '#0F172A',
    overflow: 'hidden',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)'
  },

  labelWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '18px',
    padding: '0 20px'
  },

  label: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    whiteSpace: 'nowrap'
  },

  line: {
    height: '1px',
    width: '80px',
    background: 'linear-gradient(90deg, rgba(37,99,235,0.5), transparent)'
  },

  track: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
    WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)'
  },

  marquee: {
    display: 'inline-flex',
    gap: '0',
    animation: 'marquee 28s linear infinite',
    willChange: 'transform'
  },

  item: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 28px',
    fontSize: '13.5px',
    fontWeight: 600,
    color: '#64748b',
    whiteSpace: 'nowrap',
    letterSpacing: '0.2px'
  },

  dot: {
    fontSize: '6px',
    color: '#2563eb',
    opacity: 0.7
  }
}

export default TechStrip
