import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { Search, Menu } from 'lucide-react'
import SearchModal from './SearchModal'
import ToggleModal from './ToggleModal'

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        style={{
          ...styles.header,
          ...(scrolled ? styles.headerScrolled : {})
        }}
      >
        <nav style={styles.nav}>

          {/* LEFT */}
          <div style={styles.left}>
            <img src={logo} alt="CodeMate" style={styles.logo} />
            {/* <span style={styles.brand}>CodeMate</span> */}
          </div>

          {/* DESKTOP MENU */}
          <ul style={styles.menu}>
            {['Services', 'CaseStudies', 'Contact'].map(item => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} style={styles.link}>
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* RIGHT */}
          <div style={styles.right}>
            <Search
              size={18}
              style={styles.search}
              onClick={() => setOpenSearch(true)}
            />

            <a href="#contact" style={styles.cta}>
              Start a Project
            </a>

            {/* MOBILE TOGGLE */}
            <button
              style={styles.menuBtn}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU MODAL */}
    <ToggleModal open={mobileOpen} onClose={() => setMobileOpen(false)}>
  <div className="mobile-nav">

    <button
      className="mobile-link"
      onClick={() => {
        setMobileOpen(false)
        window.location.hash = '#services'
      }}
    >
      Services
    </button>

    <button
      className="mobile-link"
      onClick={() => {
        setMobileOpen(false)
        window.location.hash = '#casestudies'
      }}
    >
      Work
    </button>

    <button
      className="mobile-link"
      onClick={() => {
        setMobileOpen(false)
        window.location.hash = '#contact'
      }}
    >
      Contact
    </button>

    <button
      className="mobile-cta"
      onClick={() => {
        setMobileOpen(false)
        window.location.hash = '#contact'
      }}
    >
      Start a Project
    </button>

  </div>
</ToggleModal>

      <SearchModal
        open={openSearch}
        onClose={() => setOpenSearch(false)}
      />
    </>
  )
}

const styles: any = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: 'rgba(255,255,255,0.95)',
    transition: 'all 0.25s ease'
  },

  headerScrolled: {
    borderBottom: '1px solid var(--border-light)'
  },

  nav: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },

  logo: {
    height: '40px'
  },

  brand: {
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--secondary)'
  },

  menu: {
    display: 'flex',
    gap: '36px',
    listStyle: 'none'
  },

  link: {
    textDecoration: 'none',
    fontSize: '14.5px',
    fontWeight: 500,
    color: 'var(--text-muted)'
  },

  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },

  search: {
    cursor: 'pointer',
    color: 'var(--text-muted)'
  },

  cta: {
    padding: '10px 18px',
    backgroundColor: 'var(--primary)',
    color: '#fff',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '14px'
  },

  menuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  },
mobileMenu: {
  display: 'flex',
  flexDirection: 'column',
  gap: '22px'
},

mobileLink: {
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 500,
  color: 'var(--secondary)'
},

mobileCTA: {
  marginTop: '12px',
  padding: '14px',
  textAlign: 'center',
  backgroundColor: 'var(--primary)',
  color: '#ffffff',
  borderRadius: '12px',
  fontWeight: 600,
  fontSize: '15px',
  textDecoration: 'none'
}

}

export default Navbar
