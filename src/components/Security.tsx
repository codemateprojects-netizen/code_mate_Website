import { ShieldCheck, Lock, FileText, Database, CheckCircle } from 'lucide-react'

const Security = () => {
  const points = [
    {
      icon: <ShieldCheck size={18} />,
      title: 'NDA-Friendly Engagement',
      desc: 'Client confidentiality is respected from day one.'
    },
    {
      icon: <Lock size={18} />,
      title: 'Secure Code Practices',
      desc: 'Best practices followed to reduce risks and vulnerabilities.'
    },
    {
      icon: <Database size={18} />,
      title: 'Access-Controlled Repositories',
      desc: 'Only authorized access to code and infrastructure.'
    },
    {
      icon: <FileText size={18} />,
      title: 'Professional Documentation',
      desc: 'Clear documentation for maintainability and knowledge transfer.'
    },
    {
      icon: <CheckCircle size={18} />,
      title: 'Client Data Confidentiality',
      desc: 'Data privacy and integrity are treated as top priorities.'
    }
  ]

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Security & Compliance</h2>
        <p style={styles.text}>
          We follow responsible, industry-standard development practices to
          protect client data, code, and intellectual property.
        </p>

        <div style={styles.grid}>
          {points.map((p, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.icon}>{p.icon}</div>
              <div>
                <strong style={styles.title}>{p.title}</strong>
                <p style={styles.desc}>{p.desc}</p>
              </div>
            </div>
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
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center'
  },
  heading: {
    fontSize: '34px',
    fontWeight: 700,
    marginBottom: '14px'
  },
  text: {
    maxWidth: '720px',
    margin: '0 auto 60px',
    color: 'var(--text-muted)',
    lineHeight: '1.6'
  },

  /* Grid */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '28px'
  },

  /* Card */
  card: {
    display: 'flex',
    gap: '16px',
    padding: '26px',
    borderRadius: '16px',
    border: '1px solid var(--border-light)',
    backgroundColor: '#FFFFFF',
    textAlign: 'left',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
  },

  /* Icon */
  icon: {
    minWidth: '36px',
    height: '36px',
    borderRadius: '10px',
    backgroundColor: 'var(--bg-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--primary)'
  },

  title: {
    fontSize: '15.5px',
    fontWeight: 600,
    color: 'var(--secondary)'
  },
  desc: {
    marginTop: '4px',
    fontSize: '14px',
    color: 'var(--text-muted)',
    lineHeight: '1.5'
  }
}

export default Security
