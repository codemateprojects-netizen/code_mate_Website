import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.container}>
          <span style={styles.eyebrow}>Legal</span>
          <h1 style={styles.h1}>Privacy Policy</h1>
          <p style={styles.updated}>Last updated: August 2026</p>

          <p style={styles.p}>
            SYJEN CODE ("we," "us," "our") respects your privacy. This page explains what
            information we collect through this website and how it is used.
          </p>

          <h2 style={styles.h2}>Information we collect</h2>
          <p style={styles.p}>
            The only information we collect is what you choose to give us through the contact
            form on this site — your name, company, email, phone/WhatsApp number, project type,
            estimated budget, and project description. Submitting the form opens a pre-filled
            email in your own email application; the information is sent directly from you to our
            inbox at <a href="mailto:syjencode@gmail.com" style={styles.link}>syjencode@gmail.com</a> and
            is not stored on any server we operate.
          </p>

          <h2 style={styles.h2}>Cookies and tracking</h2>
          <p style={styles.p}>
            This website does not use cookies, analytics, or third-party tracking scripts.
          </p>

          <h2 style={styles.h2}>How we use your information</h2>
          <p style={styles.p}>
            Information you submit is used only to respond to your inquiry and discuss a
            potential project. We do not sell or share your information with third parties.
          </p>

          <h2 style={styles.h2}>Contact</h2>
          <p style={styles.p}>
            Questions about this policy can be sent to{' '}
            <a href="mailto:syjencode@gmail.com" style={styles.link}>syjencode@gmail.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

const styles: any = {
  main: {
    padding: '64px 20px 96px',
    backgroundColor: '#ffffff',
  },
  container: {
    maxWidth: '700px',
    margin: '0 auto',
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
  h1: {
    fontSize: 'clamp(30px, 4vw, 42px)',
    fontWeight: 800,
    color: '#0f172a',
    margin: '0 0 8px',
    letterSpacing: '-0.3px',
  },
  updated: {
    fontSize: '13.5px',
    color: '#94a3b8',
    margin: '0 0 32px',
  },
  h2: {
    fontSize: '19px',
    fontWeight: 700,
    color: '#0f172a',
    margin: '32px 0 10px',
  },
  p: {
    fontSize: '15px',
    lineHeight: '1.75',
    color: '#475569',
    margin: '0 0 4px',
  },
  link: {
    color: '#2563eb',
    fontWeight: 600,
    textDecoration: 'none',
  },
}

export default PrivacyPolicy
