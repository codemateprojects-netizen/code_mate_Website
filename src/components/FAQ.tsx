import { useEffect, useRef } from 'react'

const FAQ = () => {
  const faqs = [
    {
      q: 'Do you work with international clients?',
      a: 'Yes. CodeMate is a remote-first studio working with clients worldwide.'
    },
    {
      q: 'How do you manage communication?',
      a: 'Clear timelines, regular updates, and structured communication.'
    },
    {
      q: 'Can you sign an NDA?',
      a: 'Yes. We are NDA-friendly and respect client confidentiality.'
    },
    {
      q: 'Do you provide support after launch?',
      a: 'Yes. We offer long-term maintenance and support.'
    }
  ]

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let scrollAmount = 0
    const speed = 0.3 // lower = slower, premium feel

    const scroll = () => {
      scrollAmount += speed
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0
      }
      container.scrollLeft = scrollAmount
    }

    const interval = setInterval(scroll, 16)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="faq" style={styles.section}>
      <h2 style={styles.heading}>Frequently Asked Questions</h2>
      <p style={styles.subheading}>
        Swipe or relax — the answers come to you.
      </p>

      <div
        style={styles.carousel}
        ref={scrollRef}
        onMouseEnter={() => (scrollRef.current!.style.animationPlayState = 'paused')}
        onMouseLeave={() => (scrollRef.current!.style.animationPlayState = 'running')}
      >
        {[...faqs, ...faqs].map((f, i) => (
          <div key={i} style={styles.card}>
            <h3 style={styles.question}>{f.q}</h3>
            <p style={styles.answer}>{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const styles: any = {
  section: {
    padding: '50px 20px',
    backgroundColor: 'var(--bg-light)'
  },

  heading: {
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--secondary)'
  },

  subheading: {
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '48px',
    fontSize: '15px',
    color: 'var(--text-muted)'
  },

  carousel: {
    display: 'flex',
    gap: '24px',
    overflow: 'hidden',
    maxWidth: '2100px',
    margin: '0 auto',
    cursor: 'grab'
  },

  card: {
    minWidth: '320px',
    backgroundColor: '#fff',
    border: '1px solid var(--border-light)',
    borderRadius: '18px',
    padding: '28px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    transition: 'transform 0.25s ease'
  },

  question: {
    fontSize: '17px',
    fontWeight: 600,
    marginBottom: '12px',
    color: 'var(--secondary)'
  },

  answer: {
    fontSize: '14.5px',
    lineHeight: '1.6',
    color: 'var(--text-muted)'
  }
}

export default FAQ
