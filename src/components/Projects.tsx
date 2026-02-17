const Projects = () => {
  const projects = [
    {
      name: 'Digital Marketing Portfolio',
      tech: 'React, HTML, CSS',
      desc: 'A professional portfolio website for digital marketing services.'
    },
    {
      name: 'Books Buy & Sell Platform',
      tech: 'React, Node.js, MongoDB',
      desc: 'A web platform to buy and sell books with user authentication.'
    },
    {
      name: 'Mobile App UI Demo',
      tech: 'React Native CLI',
      desc: 'A clean mobile UI demo showcasing app layout and navigation.'
    }
  ]

  return (
    <section style={styles.section} id="projects">
      <h2 style={styles.heading}>Projects</h2>

      <div style={styles.grid}>
        {projects.map((project, index) => (
          <div key={index} style={styles.card}>
            <h3>{project.name}</h3>
            <p style={styles.tech}>{project.tech}</p>
            <p>{project.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const styles: any = {
  section: {
    padding: '80px 40px'
  },
  heading: {
    textAlign: 'center',
    fontSize: '32px',
    marginBottom: '40px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
    maxWidth: '1100px',
    margin: '0 auto'
  },
  card: {
    background: '#fff',
    padding: '24px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb'
  },
  tech: {
    fontSize: '14px',
    color: '#2563EB',
    marginBottom: '8px'
  }
}

export default Projects
