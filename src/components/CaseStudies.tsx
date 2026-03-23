import { useState } from 'react'
import { ArrowUpRight, Smartphone } from 'lucide-react'

const CaseStudies = () => {
  const [showAll, setShowAll] = useState(false)
 
  const cases = [
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
    },
    // 🔹 AI PROJECTS
    {
      title: 'AI Customer Support Chatbot',
      tag: 'AI Application',
      problem:
        'Businesses needed automated customer support to handle repetitive queries and reduce response time.',
      solution:
        'Built an AI chatbot using OpenAI API with context handling and FAQ-based retrieval system.',
      tech: 'Python · FastAPI · OpenAI API · MongoDB',
      outcome:
        'Reduced manual support workload by 60% and improved response time significantly.',
      workflow:
        'User Query → API → OpenAI Processing → Context Retrieval → Response Generation'
    },
    {
      title: 'AI Content Generator',
      tag: 'AI Tool',
      problem:
        'Content creators needed faster ways to generate blogs, captions, and marketing content.',
      solution:
        'Developed an AI-powered content generator with customizable prompts and tone control.',
      tech: 'React · Node.js · OpenAI API',
      outcome:
        'Enabled rapid content creation with consistent quality and tone.',
      workflow:
        'User Input → Prompt Engineering → OpenAI API → Generated Content Output'
    },
    {
      title: 'AI Feedback Summarization System',
      tag: 'AI Automation',
      problem:
        'Companies struggled to analyze large volumes of user feedback manually.',
      solution:
        'Built an NLP-based summarization tool to extract key insights from feedback data.',
      tech: 'Python · NLP · OpenAI · FastAPI',
      outcome:
        'Improved decision-making by converting raw feedback into actionable insights.',
      workflow:
        'Feedback Data → Preprocessing → NLP Model → Summary + Insights'
    },
    {
      title: 'AI Analytics Dashboard',
      tag: 'AI Dashboard',
      problem:
        'Businesses lacked insights from raw data for better decision-making.',
      solution:
        'Created a dashboard integrating AI insights with data visualization tools.',
      tech: 'React · Chart.js · FastAPI · AI APIs',
      outcome:
        'Delivered real-time insights and improved business intelligence.',
      workflow:
        'Data Source → Backend Processing → AI Analysis → Dashboard Visualization'
    },{
  title: 'AI Developer Terminal (CLI Assistant)',
  tag: 'AI Tool',
  problem:
    'Developers needed a fast way to interact with AI for coding help, debugging, and automation without leaving the terminal.',
  solution:
    'Built a CLI-based AI assistant using Python that processes user commands and returns intelligent responses using OpenAI API.',
  tech: 'Python · OpenAI API · CLI · Prompt Engineering',
  outcome:
    'Improved developer productivity by enabling instant AI assistance directly in terminal workflows.',
  workflow:
    'User Command → CLI Input → OpenAI API → Process Response → Terminal Output'
},
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
   
  ]
 const visibleCases = showAll ? cases : cases.slice(0, 6)
  return (
    <section style={styles.section} id="casestudies">
      <div style={styles.container}>
        <h2 style={styles.heading}>Case Studies</h2>
        <p style={styles.subheading}>
          Representative web and mobile application projects demonstrating our
          approach to building scalable, production-ready products.
        </p>

        <div style={styles.grid}>
         {visibleCases.map((c, i) => (
            <article key={i} style={styles.card}>
              <div style={styles.header}>
                <span style={styles.tag}>{c.tag}</span>
              </div>

              <h3 style={styles.title}>{c.title}</h3>

              {/* 🔴 PROBLEM */}
              <div style={styles.block}>
                <strong style={styles.label}>Problem</strong>
                <p>{c.problem}</p>
              </div>

              {/* 🟢 SOLUTION */}
              <div style={styles.block}>
                <strong style={styles.label}>Solution</strong>
                <p>{c.solution}</p>
              </div>

              {/* 🔵 WORKFLOW */}
              {c.workflow && (
                <div style={styles.workflowBox}>
                  <strong style={styles.label}>Workflow</strong>
                  <p>{c.workflow}</p>
                </div>
              )}

              {/* 🟣 TECH STACK */}
              <div style={styles.techStack}>
                <strong style={styles.label}>Tech</strong>
                <p>{c.tech}</p>
              </div>

              {/* 🟡 OUTCOME */}
              <div style={styles.outcomeBox}>
                <strong style={styles.label}>Outcome</strong>
                <p>{c.outcome}</p>
              </div>
            </article>
          ))}
        </div>
        <div style={styles.buttonWrapper}>
  <button
    style={styles.showButton}
    onClick={() => setShowAll(!showAll)}
  >
    {showAll ? 'Show Less' : 'View All Case Studies'}
  </button>
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
  workflow: {
    fontSize: '13px',
    color: '#0ea5e9',
    fontStyle: 'italic'
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
  label: {
  fontSize: '13px',
  color: '#94a3b8',
  display: 'block',
  marginBottom: '4px'
},

workflowBox: {
  background: 'rgba(56,189,248,0.1)',
  border: '1px solid rgba(56,189,248,0.3)',
  padding: '12px',
  borderRadius: '10px',
  marginBottom: '14px',
  fontSize: '13px',
  color: '#38bdf8'
},

techStack: {
  marginBottom: '12px',
  fontSize: '13px',
  color: '#22c55e'
},

outcomeBox: {
  background: 'rgba(34,197,94,0.1)',
  border: '1px solid rgba(34,197,94,0.3)',
  padding: '12px',
  borderRadius: '10px',
  fontSize: '13px',
  color: '#22c55e'
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
  buttonWrapper: {
  textAlign: 'center',
  marginTop: '50px'
},

showButton: {
  padding: '14px 28px',
  background: '#0ea5e9',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: '0.3s'
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
