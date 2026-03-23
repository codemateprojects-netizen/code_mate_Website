import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.container}>

        {/* Eyebrow */}
        <motion.span
          style={styles.eyebrow}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Full-Stack Developer · AI Solutions Builder
        </motion.span>

        {/* Headline */}
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Build Scalable Applications <br /> for Real-World Use
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          style={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          I design and develop web, mobile, desktop, and AI-powered applications 
          with a focus on performance, scalability, and real-world impact.
        </motion.p>

        {/* Services Line */}
        <p style={styles.services}>
          Web Apps · Mobile Apps · Desktop Apps · AI Systems · Full-Stack Development
        </p>

        {/* CTA */}
        <div style={styles.buttons}>
          <a href="#contact" style={styles.primary}>
            Start a Project
          </a>

          <a href="#casestudies" style={styles.secondary}>
            View Case Studies
          </a>
        </div>

        {/* Trust Line */}
        <p style={styles.trust}>
          Building scalable products with modern technologies
        </p>

      </div>
    </section>
  );
};


const styles: any = {
  hero: {
  padding: '60px 20px 120px',
  background: 'linear-gradient(to bottom, #ffffff, #f8fafc)'
},

  container: {
    maxWidth: '960px',
    margin: '0 auto',
    textAlign: 'center'
  },

  /* Small intro line */
  eyebrow: {
  display: 'inline-block',
  marginBottom: '16px',
  fontSize: '13px',
  fontWeight: 600,
  color: '#0ea5e9',
  letterSpacing: '0.6px',
  textTransform: 'uppercase'
},


  /* Main headline */
 title: {
  fontSize: 'clamp(42px, 6vw, 60px)',
  fontWeight: 800,
  lineHeight: '1.1',
  marginBottom: '24px',
  background: 'linear-gradient(90deg, #0ea5e9, #2563eb)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
},

subtitle: {
  fontSize: '18px',
  color: '#475569',
  maxWidth: '720px',
  margin: '0 auto 24px',
  lineHeight: '1.7'
},

 services: {
  fontSize: '14.5px',
  color: '#64748b',
  marginBottom: '40px'
},
buttons: {
  display: 'flex',
  justifyContent: 'center',
  gap: '18px',
  flexWrap: 'wrap'
},

primary: {
  textDecoration: 'none',
  padding: '14px 30px',
  background: 'linear-gradient(90deg, #0ea5e9, #2563eb)',
  color: '#fff',
  borderRadius: '12px',
  fontWeight: 600,
  fontSize: '15px',
  boxShadow: '0 10px 25px rgba(14,165,233,0.3)'
},

secondary: {
  textDecoration: 'none',
  padding: '14px 30px',
  border: '1px solid #e2e8f0',
  color: '#0f172a',
  borderRadius: '12px',
  fontWeight: 600,
  fontSize: '15px'
},

trust: {
  marginTop: '30px',
  fontSize: '13px',
  color: '#94a3b8'
}
}

export default Hero
