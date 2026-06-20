import { useState, useEffect } from 'react'
import logo from '../assets/logo_new_syj.png'
import { Search, Menu, X } from 'lucide-react'
import SearchModal from './SearchModal'
import ToggleModal from './ToggleModal'

const NAV_ITEMS = [
  { id: 'services',    label: 'Services' },
  { id: 'casestudies', label: 'Work'     },
  { id: 'faq',         label: 'FAQ'      },
  { id: 'contact',     label: 'Contact'  },
]

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [progress,   setProgress]   = useState(0)
  const [active,     setActive]     = useState('')

  /* Scroll progress + shadow */
  useEffect(() => {
    const onScroll = () => {
      const el    = document.documentElement
      const top   = el.scrollTop || document.body.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (top / total) * 100 : 0)
      setScrolled(top > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Active section tracking */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-30% 0px -60% 0px' }
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  /* Close mobile menu + smooth scroll */
  const closeMobile = (id: string) => {
    setMobileOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 200)
  }

  return (
    <>
      <header style={{ ...styles.header, ...(scrolled ? styles.scrolled : {}) }}>

        {/* Scroll progress */}
        <div style={{ ...styles.progressBar, width: `${progress}%` }} />

        <nav style={styles.nav}>

          {/* Logo */}
          <a href="#" style={styles.logoLink} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logo} alt="SyjenCode" style={styles.logo} />
          </a>

          {/* Desktop links */}
          <ul style={styles.menu}>
            {NAV_ITEMS.map(item => (
              <li key={item.id} style={{ listStyle: 'none' }}>
                <a
                  href={`#${item.id}`}
                  style={{
                    ...styles.link,
                    ...(active === item.id ? styles.linkActive : {})
                  }}
                >
                  {item.label}
                  {active === item.id && <span style={styles.activeDot} />}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div style={styles.right}>

            {/* Search — visible on all screens */}
            <button
              style={styles.iconBtn}
              onClick={() => setOpenSearch(true)}
              aria-label="Search"
            >
              <Search size={17} />
            </button>

            {/* CTA — desktop only */}
            <a href="#contact" className="desktop-cta" style={styles.cta}>
              Start a Project
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="nav-hamburger"
              style={styles.iconBtn}
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </nav>
      </header>

      {/* Mobile menu modal */}
      <ToggleModal open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <div className="mobile-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className="mobile-link"
              onClick={() => closeMobile(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button className="mobile-cta" onClick={() => closeMobile('contact')}>
            Start a Project →
          </button>
        </div>
      </ToggleModal>

      <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  )
}

const styles: any = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    backgroundColor: 'rgba(255,255,255,0.82)',
    transition: 'box-shadow 0.3s ease'
  },

  scrolled: {
    borderBottom: '1px solid rgba(226,232,240,0.7)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
  },

  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #2563eb, #0ea5e9)',
    transition: 'width 0.08s linear',
    zIndex: 1
  },

  nav: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px'
  },

  logoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    flexShrink: 0
  },

  logo: {
    height: '38px',
    width: 'auto',
    display: 'block'
  },

  menu: {
    display: 'flex',
    gap: '4px',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },

  link: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    color: '#64748b',
    padding: '6px 12px',
    borderRadius: '8px',
    transition: 'color 0.2s ease, background-color 0.2s ease'
  },

  linkActive: {
    color: '#2563eb',
    fontWeight: 600,
    backgroundColor: 'rgba(37,99,235,0.07)'
  },

  activeDot: {
    display: 'block',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: '#2563eb'
  },

  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0
  },

  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#64748b',
    transition: 'background-color 0.2s ease, color 0.2s ease'
  },

  cta: {
    padding: '8px 18px',
    background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
    color: '#fff',
    borderRadius: '9px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '13.5px',
    boxShadow: '0 2px 10px rgba(37,99,235,0.28)',
    whiteSpace: 'nowrap'
  }
}

export default Navbar
