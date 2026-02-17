
import logo from '../assets/logo.png'
import Stamp from './Stamp'

const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* Soft top accent */}
      <div style={styles.topAccent} />

      <div style={styles.container}>

        {/* Brand */}
        <div style={styles.brand}>
          <div style={styles.logoWrap}>
            <img src={logo} alt="CodeMate logo" style={styles.logo} />
          </div>
          
        </div>

        {/* Links */}
        <nav style={styles.links}>
          <a href="#services" style={styles.link}>Services</a>
          <a href="#projects" style={styles.link}>Work</a>
          <a href="#contact" style={styles.link}>Contact</a>
        </nav>

        {/* Divider */}
        <div style={styles.divider} />
{/* Left Stamp */}
<div style={styles.stamp}>
  <Stamp />
</div>

        {/* Copyright */}
        <div style={styles.copy}>
          © {new Date().getFullYear()}{' '}
          <span style={styles.brandName}>CodeMate</span>. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

const styles: any = {
  footer: {
    backgroundColor: '#f8fafc', // slightly different from page
    padding: '56px 20px 48px',
    position: 'relative'
  },

  topAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background:
      'linear-gradient(90deg, transparent, var(--primary), transparent)'
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
    textAlign: 'center'
  },

  brand: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px'
  },

  logoWrap: {
    padding: '4px 8px',
    borderRadius: '14px',
    backgroundColor: '#ffffff',
    border: '1px solid var(--border-light)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
  },
  
stamp: {
  position: 'absolute',

  right: '83px',
  bottom: '90px',
  opacity: 0.85
},

  logo: {
    height: '70px',
    width: 'auto',
    transition: 'transform 0.3s ease'
  },

  tagline: {
    fontSize: '14.5px',
    color: 'var(--text-muted)'
  },

  links: {
    display: 'flex',
    gap: '36px',
    flexWrap: 'wrap'
  },

  link: {
    position: 'relative',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 500,
    color: 'var(--secondary)',
    opacity: 0.75,
    transition: 'opacity 0.2s ease'
  },

  divider: {
    width: '100%',
    maxWidth: '90%',
    height: '1px',
    backgroundColor: 'var(--border-light)'
  },

  copy: {
    fontSize: '13.5px',
    color: 'var(--text-muted)'
  },

  brandName: {
    color: 'var(--primary)',
    fontWeight: 600
  }
}

export default Footer
