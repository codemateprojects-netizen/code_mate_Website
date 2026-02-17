import { ArrowUpRight, Smartphone } from 'lucide-react'

const CaseStudies = () => {
  const cases = [
    {
      title: 'Books Marketplace Platform',
      tag: 'Web Application',
      problem:
        'Independent sellers needed a simple, scalable way to sell books online.',
      solution:
        'Designed and developed a secure marketplace with authentication and modular architecture.',
      tech: 'React · Node.js',
      outcome:
        'Production-ready MVP with scalability and long-term maintainability.'
    },
    {
      title: 'Service Booking Platform',
      tag: 'Web Platform',
      problem:
        'Local service providers needed a digital platform to manage bookings and clients.',
      solution:
        'Built a service-based platform with clean workflows and user management.',
      tech: 'React · Node.js',
      outcome:
        'Ready-to-scale foundation supporting multiple service categories.'
    },

    // 🔹 MOBILE APPLICATIONS
    {
      title: 'Creator Support Mobile App',
      tag: 'Mobile Application',
      problem:
        'Creators needed a mobile-first way to share content and connect with supporters.',
      solution:
        'Developed a cross-platform mobile app with clean UI, authentication, and scalable architecture.',
      tech: 'React Native · TypeScript',
      outcome:
        'Mobile-ready product designed for future feature expansion.'
    },
    {
      title: 'Business Management Mobile App',
      tag: 'Mobile Application',
      problem:
        'Small businesses required a mobile app to manage daily operations on the go.',
      solution:
        'Built a lightweight, performance-focused mobile application with intuitive navigation.',
      tech: 'React Native · API Integration',
      outcome:
        'Improved accessibility and mobile productivity.'
    },

    // 🔹 WEBSITES / LANDING
    {
      title: 'Digital Marketing Portfolio',
      tag: 'Business Website',
      problem:
        'A marketing consultant needed a professional online presence to attract international clients.',
      solution:
        'Developed a fast, conversion-focused website with clear messaging.',
      tech: 'React · Vite',
      outcome:
        'Improved credibility and global client readiness.'
    },
    {
      title: 'Startup Landing Website',
      tag: 'Landing Page',
      problem:
        'A startup needed a clean landing page to validate an early-stage idea.',
      solution:
        'Created a high-performance landing experience optimized for outreach.',
      tech: 'React · Vite',
      outcome:
        'Enabled faster validation and early traction.'
    }
  ]

  return (
    <section style={styles.section} id="casestudies">
      <div style={styles.container}>
        <h2 style={styles.heading}>Case Studies</h2>
        <p style={styles.subheading}>
          Representative web and mobile application projects demonstrating our
          approach to building scalable, production-ready products.
        </p>

        <div style={styles.grid}>
          {cases.map((c, i) => (
            <article key={i} style={styles.card}>
              <div style={styles.header}>
                <span style={styles.tag}>
                  {c.tag === 'Mobile Application' && (
                    <Smartphone size={14} style={{ marginRight: 6 }} />
                  )}
                  {c.tag}
                </span>
                <ArrowUpRight size={18} style={styles.icon} />
              </div>

              <h3 style={styles.title}>{c.title}</h3>

              <div style={styles.block}>
                <strong>Problem</strong>
                <p>{c.problem}</p>
              </div>

              <div style={styles.block}>
                <strong>Solution</strong>
                <p>{c.solution}</p>
              </div>

              <div style={styles.footer}>
                <span style={styles.tech}>{c.tech}</span>
                <span style={styles.outcome}>{c.outcome}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles: any = {
  section: {
    padding: '50px 20px',
    backgroundColor: '#FFFFFF'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  heading: {
    textAlign: 'center',
    fontSize: '34px',
    fontWeight: 700,
    marginBottom: '12px'
  },
  subheading: {
    textAlign: 'center',
    maxWidth: '760px',
    margin: '0 auto 72px',
    color: 'var(--text-muted)',
    lineHeight: '1.6'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '36px'
  },

  card: {
    padding: '32px',
    borderRadius: '18px',
    border: '1px solid var(--border-light)',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px'
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 12px',
    fontSize: '12.5px',
    borderRadius: '999px',
    backgroundColor: 'var(--bg-light)',
    border: '1px solid var(--border-light)',
    color: 'var(--secondary)',
    fontWeight: 500
  },
  icon: {
    color: 'var(--text-muted)'
  },

  title: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '16px',
    color: 'var(--secondary)'
  },

  block: {
    marginBottom: '16px'
  },

  footer: {
    marginTop: 'auto',
    paddingTop: '18px',
    borderTop: '1px solid var(--border-light)',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  tech: {
    fontSize: '13.5px',
    fontWeight: 500,
    color: 'var(--primary)'
  },
  outcome: {
    fontSize: '13.5px',
    color: 'var(--text-muted)'
  }
}

export default CaseStudies
