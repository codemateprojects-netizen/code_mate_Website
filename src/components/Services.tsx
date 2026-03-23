import { Code, Smartphone, Bug, LifeBuoy } from 'lucide-react'
import { motion } from 'framer-motion'
const Services = () => {
  const services = [
    {
      icon: <Code size={20} />,
      title: 'AI Application Development',
      desc: 'Build intelligent applications using OpenAI, automation workflows, and scalable backend systems.',
    },
    {
      icon: <Smartphone size={20} />,
      title: 'AI SaaS & Web Platforms',
      desc: 'Develop full-stack AI-powered SaaS products with clean UI, APIs, and production-ready architecture.',
    },
    {
      icon: <Bug size={20} />,
      title: 'AI Automation & Integrations',
      desc: 'Automate workflows using APIs, LLMs, and backend logic to reduce manual work and improve efficiency.',
    },
    {
      icon: <LifeBuoy size={20} />,
      title: 'AI Maintenance & Scaling',
      desc: 'Optimize AI systems, improve performance, and scale infrastructure for real-world usage.',
    }, {
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
            <motion.div
              key={index}
              style={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
              }}
            >
              <div style={styles.icon}>{service.icon}</div>
              <h3 style={styles.title}>{service.title}</h3>
              <p style={styles.desc}>{service.desc}</p>

              <p style={styles.highlight}>
                AI-powered solutions for real-world impact
              </p>
            </motion.div>
          ))}
        </div>
        <div style={styles.ctaSection}>
  <h3 style={styles.ctaTitle}>
    Have an idea or need an AI solution?
  </h3>

  <p style={styles.ctaText}>
    I build AI-powered applications, automation systems, and scalable products.
    Let’s work together to bring your idea to life.
  </p>

  <a
    href="https://wa.me/your-number"
    target="_blank"
    style={styles.ctaButton}
  >
    Hire Me →
  </a>
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
  },
  highlight: {
    marginTop: '14px',
    fontSize: '13px',
    color: '#0ea5e9',
    fontWeight: 500
  },ctaSection: {
  marginTop: '80px',
  padding: '40px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
  color: '#fff',
  textAlign: 'center'
},

ctaTitle: {
  fontSize: '24px',
  fontWeight: 700,
  marginBottom: '12px'
},

ctaText: {
  fontSize: '15px',
  maxWidth: '600px',
  margin: '0 auto 20px',
  lineHeight: '1.6'
},

ctaButton: {
  display: 'inline-block',
  padding: '12px 24px',
  background: '#fff',
  color: '#0ea5e9',
  borderRadius: '8px',
  fontWeight: 600,
  textDecoration: 'none'
}
}

export default Services
