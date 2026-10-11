import logo from '../assets/logo_new_syj.png'
import Stamp from './Stamp'
import { Mail, Phone } from 'lucide-react'

const COMPANY_LINKS = [
  { href: '#services',    label: 'Services'       },
  { href: '#solutions',   label: 'Solutions'      },
  { href: '#casestudies', label: 'Our Work'       },
  { href: '#process',     label: 'Process'        },
  { href: '#about',       label: 'About'          },
  { href: '#faq',         label: 'FAQ'            },
  { href: '#contact',     label: 'Contact'        },
  { href: '/privacy',     label: 'Privacy Policy' },
  { href: '/terms',       label: 'Terms'          },
]

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.topAccent} />

      <div style={styles.container}>

        {/* ── Top Row ── */}
        <div className="footer-top-row" style={styles.topRow}>

          {/* Brand */}
          <div className="footer-brand" style={styles.brand}>
            <div style={styles.logoWrap}>
              <img src={logo} alt="SYJEN CODE" style={styles.logo} />
            </div>
            <div>
              <p style={styles.brandName}>SYJEN CODE</p>
              <p style={styles.tagline}>Build Smart. Deliver Beyond.</p>
            </div>
          </div>

          {/* Company nav */}
          <div className="footer-col" style={styles.navGroup}>
            <p style={styles.navHeading}>
              Company
              <span style={styles.headingBar} />
            </p>
            <nav style={styles.links}>
              {COMPANY_LINKS.map(l => (
                <a key={l.href} href={l.href} className="footer-link" style={styles.link}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="footer-col" style={styles.contactGroup}>
            <p style={styles.navHeading}>
              Get In Touch
              <span style={styles.headingBar} />
            </p>

            <a href="mailto:syjencode@gmail.com" className="footer-link footer-contact-link" style={styles.contactRow}>
              <span className="footer-contact-icon" style={styles.iconChip}>
                <Mail size={13} strokeWidth={2} />
              </span>
              <span>syjencode@gmail.com</span>
            </a>

            <a href="tel:8790899459" className="footer-link footer-contact-link" style={styles.contactRow}>
              <span className="footer-contact-icon" style={styles.iconChip}>
                <Phone size={13} strokeWidth={2} />
              </span>
              <span>8790899459</span>
            </a>
          </div>

        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* ── Bottom Row ── */}
        <div className="footer-bottom-row" style={styles.bottomRow}>
          <div className="footer-bottom-text" style={styles.bottomText}>
            <p style={styles.copy}>
              © {new Date().getFullYear()} <span style={styles.highlight}>SYJEN CODE</span>. All rights reserved.
            </p>
            <span className="footer-dot-sep" style={styles.dotSep}>•</span>
            <p style={styles.copy}>Remote-first · Worldwide</p>
          </div>

          <div style={styles.stampWrap}>
            <Stamp size={58} />
          </div>
        </div>

      </div>
    </footer>
  )
}

const styles: any = {
  footer: {
    backgroundColor: '#0F172A',
    padding: '56px 24px 28px',
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
    maxWidth: '1120px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  },

  /* ── Top Row ── */
  topRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '32px 24px'
  },

  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flex: '1 1 240px',
    maxWidth: '300px'
  },

  logoWrap: {
    padding: '5px 10px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    flexShrink: 0
  },

  logo: {
    height: '40px',
    width: 'auto',
    display: 'block'
  },

  brandName: {
    margin: '0 0 4px',
    fontSize: '15px',
    fontWeight: 700,
    color: '#f1f5f9',
    letterSpacing: '0.2px'
  },

  tagline: {
    margin: 0,
    fontSize: '12.5px',
    color: '#8a97b3',
    fontWeight: 500
  },

  /* Nav columns */
  navGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '13px',
    minWidth: '130px'
  },

  navHeading: {
    position: 'relative',
    margin: '0 0 3px',
    fontSize: '11px',
    fontWeight: 700,
    color: '#8a97b3',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    paddingBottom: '10px'
  },

  headingBar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '20px',
    height: '2px',
    borderRadius: '2px',
    background: 'linear-gradient(90deg, #3b82f6, #0ea5e9)'
  },

  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '11px'
  },

  link: {
    textDecoration: 'none',
    fontSize: '13.5px',
    fontWeight: 500,
    color: '#9aa6bf',
    transition: 'color 0.2s ease, transform 0.2s ease',
    width: 'fit-content'
  },

  /* Contact column */
  contactGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    minWidth: '220px'
  },

  contactRow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13.5px',
    fontWeight: 500,
    color: '#9aa6bf',
    textDecoration: 'none',
    transition: 'color 0.2s ease, transform 0.2s ease',
    width: 'fit-content'
  },

  iconChip: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '26px',
    height: '26px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.09)',
    color: '#7c8db3',
    flexShrink: 0,
    transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease'
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
    gap: '16px'
  },

  bottomText: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px'
  },

  copy: {
    margin: 0,
    fontSize: '12.5px',
    color: '#8a97b3'
  },

  dotSep: {
    color: '#3d4a63',
    fontSize: '12px',
    lineHeight: 1
  },

  highlight: {
    color: '#60a5fa',
    fontWeight: 600
  },

  stampWrap: {
    opacity: 0.7,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center'
  }
}

export default Footer
