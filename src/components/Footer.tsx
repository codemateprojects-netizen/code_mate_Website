import logo from '../assets/logo_new_syj.png'
import Stamp from './Stamp'
import { Mail, Code2, Briefcase, Share2 } from 'lucide-react'

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.topAccent} />

      <div style={styles.container}>

        {/* ── Top Row ── */}
        <div className="footer-top-row" style={styles.topRow}>

          {/* Brand */}
          <div style={styles.brand}>
            <div style={styles.logoWrap}>
              <img src={logo} alt="SyjenCode" style={styles.logo} />
            </div>
            <div>
              <p style={styles.brandName}>SyjenCode</p>
              <p style={styles.tagline}>Build Smart. Ship Fast.</p>
            </div>
          </div>

          {/* Nav */}
          <div style={styles.navGroup}>
            <p style={styles.navHeading}>Company</p>
            <nav style={styles.links}>
              <a href="#services" style={styles.link}>Services</a>
              <a href="#casestudies" style={styles.link}>Work</a>
              <a href="#contact" style={styles.link}>Contact</a>
              <a href="#faq" style={styles.link}>FAQ</a>
            </nav>
          </div>

          {/* Contact + Social */}
          <div style={styles.contactGroup}>
            <p style={styles.navHeading}>Get In Touch</p>
            <a href="mailto:codemate.projects@gmail.com" style={styles.emailLink}>
              <Mail size={14} />
              codemate.projects@gmail.com
            </a>
            <div style={styles.socials}>
              <a href="#" style={styles.socialIcon} aria-label="GitHub">
                <Code2 size={17} />
              </a>
              <a href="#" style={styles.socialIcon} aria-label="LinkedIn">
                <Briefcase size={17} />
              </a>
              <a href="#" style={styles.socialIcon} aria-label="Twitter">
                <Share2 size={17} />
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* ── Bottom Row ── */}
        <div className="footer-bottom-row" style={styles.bottomRow}>
          <p style={styles.copy}>
            © {new Date().getFullYear()} <span style={styles.highlight}>SyjenCode</span>. All rights reserved.
          </p>
          <p style={styles.copy}>
            Remote-first · Worldwide
          </p>
          <div style={styles.stampWrap}>
            <Stamp />
          </div>
        </div>

      </div>
    </footer>
  )
}

const styles: any = {
  footer: {
    backgroundColor: '#0F172A',
    padding: '48px 24px 28px',
    position: 'relative',
    animation: 'footerReveal 0.6s ease-out'
  },

  topAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)'
  },

  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  },

  /* ── Top Row ── */
  topRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1.5fr',
    gap: '40px',
    alignItems: 'start'
  },

  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },

  logoWrap: {
    padding: '5px 10px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    flexShrink: 0
  },

  logo: {
    height: '42px',
    width: 'auto',
    display: 'block'
  },

  brandName: {
    margin: '0 0 3px',
    fontSize: '15px',
    fontWeight: 700,
    color: '#f1f5f9'
  },

  tagline: {
    margin: 0,
    fontSize: '12.5px',
    color: '#475569',
    fontWeight: 500
  },

  /* Nav column */
  navGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },

  navHeading: {
    margin: '0 0 4px',
    fontSize: '11px',
    fontWeight: 700,
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: '1.2px'
  },

  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },

  link: {
    textDecoration: 'none',
    fontSize: '13.5px',
    fontWeight: 500,
    color: '#64748b',
    transition: 'color 0.2s ease'
  },

  /* Contact column */
  contactGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },

  emailLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    fontSize: '13px',
    color: '#64748b',
    textDecoration: 'none',
    transition: 'color 0.2s ease'
  },

  socials: {
    display: 'flex',
    gap: '10px',
    marginTop: '4px'
  },

  socialIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#64748b',
    textDecoration: 'none',
    transition: 'all 0.2s ease'
  },

  /* Divider */
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: 'rgba(255,255,255,0.07)'
  },

  /* Bottom Row */
  bottomRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px'
  },

  copy: {
    margin: 0,
    fontSize: '12.5px',
    color: '#334155'
  },

  highlight: {
    color: '#60a5fa',
    fontWeight: 600
  },

  stampWrap: {
    opacity: 0.55,
    flexShrink: 0
  }
}

export default Footer
