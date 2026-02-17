const Hero = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.container}>

        {/* Eyebrow */}
        <span style={styles.eyebrow}>
          Remote-first development studio
        </span>

        {/* Headline */}
        <h1 style={styles.title}>
          Build Smart. <br /> Ship Fast.
        </h1>

        {/* Subtitle */}
        <p style={styles.subtitle}>
          We partner with startups and growing businesses to design,
          build, and scale reliable web & mobile applications
          with a long-term product mindset.
        </p>

        {/* Services */}
        <p style={styles.services}>
          Web Applications · Mobile Apps · Testing · Long-term Support
        </p>

        {/* CTA */}
        <div style={styles.buttons}>
          <a href="#contact" style={styles.primary}>
            Start a Project
          </a>
          <a href="#CaseStudies" style={styles.secondary}>
            View Case Studies
          </a>
        </div>

      </div>
    </section>
  )
}

const styles: any = {
  hero: {
    padding: '40px 20px 120px',
    backgroundColor: '#FFFFFF'
  },

  container: {
    maxWidth: '960px',
    margin: '0 auto',
    textAlign: 'center'
  },

  /* Small intro line */
  eyebrow: {
    display: 'inline-block',
    marginBottom: '16px',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--primary)',
    letterSpacing: '0.4px',
    textTransform: 'uppercase'
  },

  /* Main headline */
  title: {
    fontSize: 'clamp(40px, 6vw, 56px)',
    fontWeight: 800,
    lineHeight: '1.08',
    color: 'var(--secondary)',
    marginBottom: '26px'
  },

  subtitle: {
    fontSize: '18px',
    color: 'var(--text-muted)',
    maxWidth: '720px',
    margin: '0 auto 24px',
    lineHeight: '1.7'
  },

  services: {
    fontSize: '14.5px',
    color: 'var(--text-muted)',
    marginBottom: '44px'
  },

  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '18px',
    flexWrap: 'wrap'
  },

  primary: {
    textDecoration: 'none',
    padding: '14px 30px',
    backgroundColor: 'var(--primary)',
    color: '#FFFFFF',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '15px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },

  secondary: {
    textDecoration: 'none',
    padding: '14px 30px',
    border: '1px solid var(--border-light)',
    color: 'var(--secondary)',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '15px',
    transition: 'background-color 0.2s ease'
  }
}

export default Hero
