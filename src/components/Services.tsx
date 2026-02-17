import { Code, Smartphone, Bug, LifeBuoy } from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: <Code size={20} />,
      title: 'Web Development',
      desc: 'Modern, fast, and scalable web applications built with a clean, maintainable architecture.'
    },
    {
      icon: <Smartphone size={20} />,
      title: 'Mobile App Development',
      desc: 'Cross-platform mobile applications using React Native, designed for performance and usability.'
    },
    {
      icon: <Bug size={20} />,
      title: 'Testing & Bug Fixing',
      desc: 'Manual testing, bug fixing, and performance improvements to ensure reliability.'
    },
    {
      icon: <LifeBuoy size={20} />,
      title: 'Maintenance & Support',
      desc: 'Ongoing support, updates, and feature enhancements for long-term success.'
    }
  ]

  return (
    <section style={styles.section} id="services">
      <div style={styles.container}>
        <h2 style={styles.heading}>Services</h2>
        <p style={styles.subheading}>
          End-to-end development services focused on quality, scalability,
          and long-term product success.
        </p>

        <div style={styles.grid}>
          {services.map((service, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.icon}>{service.icon}</div>
              <h3 style={styles.title}>{service.title}</h3>
              <p style={styles.desc}>{service.desc}</p>
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
    backgroundColor: 'var(--app-bg)'
  },

  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    textAlign: 'center'
  },

  heading: {
    fontSize: '34px',
    fontWeight: 700,
    marginBottom: '12px',
    color: 'var(--secondary)'
  },

  subheading: {
    maxWidth: '640px',
    margin: '0 auto 64px',
    fontSize: '16px',
    lineHeight: '1.6',
    color: 'var(--text-muted)'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '32px'
  },

  card: {
    backgroundColor: 'var(--section-bg)',
    padding: '32px',
    borderRadius: '18px',
    border: '1px solid var(--border-light)',
    textAlign: 'left',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
  },

  icon: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    backgroundColor: 'var(--bg-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--primary)',
    marginBottom: '18px'
  },

  title: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '10px',
    color: 'var(--secondary)'
  },

  desc: {
    fontSize: '14.5px',
    lineHeight: '1.6',
    color: 'var(--text-muted)'
  }
}

export default Services
