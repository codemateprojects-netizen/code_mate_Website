import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Terms = () => {
  return (
    <>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.container}>
          <span style={styles.eyebrow}>Legal</span>
          <h1 style={styles.h1}>Terms of Service</h1>
          <p style={styles.updated}>Last updated: August 2026</p>

          <p style={styles.p}>
            These terms govern your use of this website. By using this site, you agree to them.
          </p>

          <h2 style={styles.h2}>Website content</h2>
          <p style={styles.p}>
            Content on this website — including text, the SYJEN CODE name and logo, and case
            study descriptions — belongs to SYJEN CODE and is provided for informational
            purposes. Case studies describe representative work and are shared at a level of
            detail consistent with client confidentiality; live demos or additional detail are
            available on request.
          </p>

          <h2 style={styles.h2}>No guarantee of outcomes</h2>
          <p style={styles.p}>
            Descriptions of services and past work on this site are provided in good faith but do
            not constitute a guarantee of results for any future project. Scope, cost, and
            timeline for actual engagements are agreed separately with each client before work
            begins.
          </p>

          <h2 style={styles.h2}>Contacting us</h2>
          <p style={styles.p}>
            Submitting the contact form is an inquiry, not a binding agreement. Any project
            engagement is formalized separately, in writing, between SYJEN CODE and the client.
          </p>

          <h2 style={styles.h2}>Changes</h2>
          <p style={styles.p}>
            These terms may be updated from time to time as the business evolves. Continued use
            of the site after changes are posted constitutes acceptance of the updated terms.
          </p>

          <h2 style={styles.h2}>Contact</h2>
          <p style={styles.p}>
            Questions about these terms can be sent to{' '}
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

export default Terms
