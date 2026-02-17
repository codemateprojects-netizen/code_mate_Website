import { Mail, Clock, Globe } from 'lucide-react'

const Contact = () => {
  return (
    <section style={styles.section} id="contact">
      <div style={styles.container}>

        {/* Left */}
        <div style={styles.left}>
          <span style={styles.eyebrow}>Get in touch</span>

          <h2 style={styles.heading}>
            Start a Project
          </h2>

          <p style={styles.text}>
            Looking for a reliable development partner?
            Let’s discuss your idea, requirements, and timeline.
          </p>

          <div style={styles.points}>
            <div style={styles.point}>
              <Mail size={18} />
              <span>codemate.dev@gmail.com</span>
            </div>
            <div style={styles.point}>
              <Clock size={18} />
              <span>Response within 24 hours</span>
            </div>
            <div style={styles.point}>
              <Globe size={18} />
              <span>Working with clients worldwide</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>What happens next?</p>

          <ul style={styles.steps}>
            <li>We review your message</li>
            <li>We schedule a short discussion</li>
            <li>We share a clear proposal & timeline</li>
          </ul>

          <a
            href="mailto:codemate.dev@gmail.com"
            style={styles.cta}
          >
            Send Project Details
          </a>
        </div>

      </div>
    </section>
  )
}

const styles: any = {
  section: {
    position: 'relative',
    padding: '50px 20px',
    background:
      'linear-gradient(180deg, #b2d5f8ff 0%, #ffffffff 60%)',
    overflow: 'hidden'
  },

  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '56px',
    alignItems: 'center'
  },

  /* LEFT */
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    animation: 'fadeUp 0.8s ease-out'
  },

  eyebrow: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.4px'
  },

  heading: {
    fontSize: '36px',
    fontWeight: 800,
    color: 'var(--secondary)',
    lineHeight: 1
  },

  text: {
    maxWidth: '520px',
    fontSize: '16px',
    lineHeight: '1',
    color: 'var(--text-muted)'
  },

  points: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '12px'
  },

  point: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14.5px',
    color: 'var(--secondary)'
  },

  /* RIGHT CARD */
  card: {
    padding: '40px',
    borderRadius: '22px',
    backgroundColor: '#ffffff',
    border: '1px solid var(--border-light)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    animation: 'fadeUp 1s ease-out'
  },

  cardTitle: {
    fontSize: '17px',
    fontWeight: 600,
    color: 'var(--secondary)'
  },

  steps: {
    paddingLeft: '18px',
    fontSize: '14.5px',
    color: 'var(--text-muted)',
    lineHeight: '1.7'
  },

  cta: {
    marginTop: '18px',
    textAlign: 'center',
    textDecoration: 'none',
    padding: '16px 24px',
    backgroundColor: 'var(--primary)',
    color: '#FFFFFF',
    borderRadius: '14px',
    fontWeight: 600,
    fontSize: '15px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  }
}

export default Contact
