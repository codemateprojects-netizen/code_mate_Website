import { Cloud, Database, Lock } from 'lucide-react'
import type { ServiceDetail } from './types'

export const cloudServices: ServiceDetail[] = [
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    shortName: 'Cloud & DevOps',
    group: 'cloud',
    icon: Cloud,
    summary: 'Cloud architecture, CI/CD, containers, infrastructure as code, and monitoring for reliable releases.',
    seo: {
      title: 'Cloud and DevOps Services',
      description:
        'Cloud and DevOps services on AWS, Azure, and Google Cloud: Docker, Kubernetes, Terraform, CI/CD pipelines, cloud migration, infrastructure automation, monitoring, and release engineering.',
    },
    hero: {
      eyebrow: 'Cloud & DevOps',
      title: 'Infrastructure That Lets You Ship Without Fear.',
      description:
        'We set up cloud environments, automated pipelines, and monitoring so your team can release frequently, recover quickly, and keep costs under control.',
    },
    problem: {
      title: 'Manual infrastructure slows everyone down',
      body: 'When deployments depend on one person and a checklist, releases are rare and risky. Environments drift, costs creep, and outages are discovered by customers.',
      points: [
        'Manual, error-prone deployments',
        'No staging environment that matches production',
        'Rising cloud bills without visibility',
        'Limited alerting when things go wrong',
      ],
    },
    deliverables: [
      { title: 'Cloud architecture', description: 'Environment design matched to your workload, security, and budget.' },
      { title: 'CI/CD pipelines', description: 'Automated build, test, and deploy with approvals where needed.' },
      { title: 'Infrastructure as code', description: 'Reproducible environments defined in version-controlled code.' },
      { title: 'Monitoring & alerting', description: 'Dashboards, logs, and alerts for availability, errors, and cost.' },
    ],
    capabilities: [
      {
        title: 'Cloud & DevOps',
        items: [
          'AWS',
          'Azure',
          'Google Cloud',
          'Docker',
          'Kubernetes',
          'Terraform',
          'CI/CD',
          'Cloud migration',
          'Infrastructure automation',
          'Monitoring',
          'Deployment and release engineering',
        ],
      },
    ],
    approach: [
      { title: 'Assess', description: 'Review current hosting, deployment process, costs, and risks.' },
      { title: 'Design', description: 'Target architecture and a migration or improvement plan.' },
      { title: 'Codify', description: 'Infrastructure as code and pipelines, reviewed like application code.' },
      { title: 'Migrate safely', description: 'Staged cut-overs with rollback plans.' },
      { title: 'Observe & optimise', description: 'Monitoring, alerting, and periodic cost reviews.' },
    ],
    technologies: [
      { group: 'Cloud', items: ['AWS', 'Azure', 'Google Cloud', 'Vercel / Netlify'] },
      { group: 'Containers', items: ['Docker', 'Kubernetes'] },
      { group: 'Automation', items: ['Terraform', 'GitHub Actions', 'GitLab CI'] },
      { group: 'Observability', items: ['Prometheus', 'Grafana', 'Cloud-native logging'] },
    ],
    useCases: [
      { title: 'CI/CD setup', description: 'From manual uploads to automated, tested deployments on every merge.' },
      { title: 'Cloud migration', description: 'Move from shared hosting or on-premise servers to managed cloud services.' },
      { title: 'Containerisation', description: 'Package services in containers for consistent environments.' },
      { title: 'Cost review', description: 'Identify idle resources and right-size infrastructure.' },
    ],
    faqs: [
      { question: 'Which cloud provider should we use?', answer: 'It depends on your existing tools, team skills, compliance needs, and services required. We compare options and recommend one; we don’t have a commission arrangement with any provider.' },
      { question: 'Do we need Kubernetes?', answer: 'Often not. Many products run well on managed container or platform services. We recommend Kubernetes only when its operational overhead is justified.' },
      { question: 'Can you manage our infrastructure ongoing?', answer: 'Yes, through an agreed maintenance or DevOps retainer covering monitoring, updates, and incident response.' },
    ],
    related: ['software-development', 'cybersecurity', 'data-engineering'],
    cta: {
      title: 'Want faster, safer releases?',
      description: 'Tell us how you deploy today. We’ll suggest the highest-impact improvements.',
      label: 'Discuss Your Infrastructure',
      to: '/contact?type=project&service=Cloud%20and%20DevOps',
    },
  },
  {
    slug: 'data-engineering',
    name: 'Data Engineering & Analytics',
    shortName: 'Data Engineering',
    group: 'cloud',
    icon: Database,
    summary: 'Pipelines, warehouses, and dashboards that turn scattered data into reliable business insight.',
    seo: {
      title: 'Data Engineering and Analytics Services',
      description:
        'Data engineering services: data pipelines, ETL and ELT, SQL and NoSQL databases, data warehouses, data lakes, stream processing, analytics, and business intelligence dashboards.',
    },
    hero: {
      eyebrow: 'Data Engineering',
      title: 'Reliable Data, Ready for Decisions and AI.',
      description:
        'We build the pipelines, storage, and models that bring data together from your systems — so reports are trustworthy and AI projects have a solid foundation.',
    },
    problem: {
      title: 'Data that can’t be trusted isn’t used',
      body: 'Numbers differ between reports, exports are stitched together manually, and analysts spend more time cleaning data than analysing it.',
      points: [
        'Metrics that disagree across teams',
        'Manual exports and spreadsheet joins',
        'No single source of truth for customers or orders',
        'AI projects blocked by data quality',
      ],
    },
    deliverables: [
      { title: 'Data architecture', description: 'Sources, storage, models, and access designed together.' },
      { title: 'Pipelines', description: 'Tested, scheduled ETL/ELT or streaming pipelines with monitoring.' },
      { title: 'Warehouse & models', description: 'Clean, documented data models for analytics and AI.' },
      { title: 'Dashboards', description: 'BI dashboards built on agreed metric definitions.' },
    ],
    capabilities: [
      {
        title: 'Data Engineering',
        items: [
          'Data pipelines',
          'ETL and ELT',
          'SQL and NoSQL',
          'Data warehouses',
          'Data lakes',
          'Stream processing',
          'Analytics',
          'Business intelligence',
        ],
      },
    ],
    approach: [
      { title: 'Define the questions', description: 'Start with the decisions and metrics that matter.' },
      { title: 'Inventory sources', description: 'Map systems, data quality, ownership, and privacy constraints.' },
      { title: 'Build incrementally', description: 'Deliver one reliable domain at a time.' },
      { title: 'Test & document', description: 'Data tests, lineage, and definitions everyone can find.' },
      { title: 'Operate', description: 'Monitoring and alerting for pipeline failures and data freshness.' },
    ],
    technologies: [
      { group: 'Storage', items: ['PostgreSQL', 'BigQuery', 'Snowflake', 'MongoDB'] },
      { group: 'Processing', items: ['Python', 'dbt', 'Apache Airflow', 'Kafka'] },
      { group: 'BI', items: ['Metabase', 'Looker Studio', 'Power BI'] },
    ],
    useCases: [
      { title: 'Single customer view', description: 'Combine CRM, billing, and product data into one model.' },
      { title: 'Executive dashboard', description: 'Consistent KPIs refreshed automatically.' },
      { title: 'AI-ready data', description: 'Clean, well-described data for ML and RAG projects.' },
      { title: 'Event analytics', description: 'Track product usage to guide roadmap decisions.' },
    ],
    faqs: [
      { question: 'Do we need a data warehouse?', answer: 'If you combine data from several systems for reporting, usually yes. Smaller needs may be met by a well-designed operational database and BI tool.' },
      { question: 'Can you work with our existing BI tool?', answer: 'Yes. We can improve the data feeding your current tool rather than replacing it.' },
      { question: 'How do you handle personal data?', answer: 'We minimise what is collected, restrict access, and design retention with you. Specific regulatory obligations should be confirmed with your legal advisers.' },
    ],
    related: ['ai-solutions', 'cloud-devops', 'software-development'],
    cta: {
      title: 'Ready to trust your numbers?',
      description: 'Tell us which decisions you need data for. We’ll propose a practical first step.',
      label: 'Discuss Your Data',
      to: '/contact?type=project&service=Data%20Engineering',
    },
  },
  {
    slug: 'cybersecurity',
    name: 'Application & AI Security',
    shortName: 'Security',
    group: 'cloud',
    icon: Lock,
    summary: 'Secure architecture, API and identity security, vulnerability assessment, and AI access controls.',
    seo: {
      title: 'Application Security Services',
      description:
        'Application security services: secure software architecture, API security, identity and access management, vulnerability assessment, data privacy practices, AI access controls, and prompt injection mitigation.',
    },
    hero: {
      eyebrow: 'Security',
      title: 'Security Built Into the Software, Not Bolted On.',
      description:
        'We help teams design and build applications, APIs, and AI systems with security in mind — from authentication and access control to vulnerability assessment and AI-specific risks.',
    },
    problem: {
      title: 'Most breaches start with ordinary mistakes',
      body: 'Exposed keys, over-permissive access, unvalidated inputs, and outdated dependencies are common in fast-moving products. AI features add new risks such as prompt injection and data leakage.',
      points: [
        'Secrets committed to code or exposed in the browser',
        'APIs without proper authorization checks',
        'Shared admin accounts and no access reviews',
        'AI features that can be manipulated by untrusted content',
      ],
    },
    deliverables: [
      { title: 'Security review', description: 'Architecture and code review focused on practical, prioritised risks.' },
      { title: 'Vulnerability assessment', description: 'Testing of applications and APIs with clear remediation guidance.' },
      { title: 'Identity & access', description: 'Authentication, authorization, and role design following least privilege.' },
      { title: 'AI safeguards', description: 'Access controls, input handling, and output validation for AI features.' },
    ],
    capabilities: [
      {
        title: 'Security',
        items: [
          'Application security',
          'API security',
          'Identity management',
          'Secure software architecture',
          'Vulnerability assessment',
          'Data privacy',
          'AI access controls',
          'Prompt injection risk mitigation',
        ],
      },
    ],
    approach: [
      { title: 'Threat model', description: 'Identify what you’re protecting, from whom, and the likely attack paths.' },
      { title: 'Review', description: 'Assess architecture, code, configuration, and dependencies.' },
      { title: 'Prioritise', description: 'Rank findings by real-world impact and effort to fix.' },
      { title: 'Remediate', description: 'Fix issues ourselves or guide your team.' },
      { title: 'Verify', description: 'Retest and add automated checks to prevent regressions.' },
    ],
    technologies: [
      { group: 'Practices', items: ['OWASP Top 10', 'OWASP API Security Top 10', 'Least privilege', 'Secure SDLC'] },
      { group: 'Identity', items: ['OAuth 2.0', 'OpenID Connect', 'Role-based access control'] },
      { group: 'Tooling', items: ['Dependency scanning', 'Static analysis', 'Secret scanning'] },
    ],
    useCases: [
      { title: 'Pre-launch review', description: 'Check a new product for common vulnerabilities before going live.' },
      { title: 'API hardening', description: 'Tighten authentication, authorization, and rate limiting.' },
      { title: 'AI feature review', description: 'Assess an LLM feature for data exposure and injection risks.' },
      { title: 'Access clean-up', description: 'Replace shared accounts with role-based access and audit trails.' },
    ],
    faqs: [
      { question: 'Are you a certified security auditor?', answer: 'We provide practical application security engineering and assessment. We do not issue formal certifications or compliance attestations; if you need those, we can work alongside an accredited auditor.' },
      { question: 'Can you help us become compliant with a regulation?', answer: 'We can implement technical controls that support your compliance programme. Whether you meet a specific regulation should be confirmed by qualified legal or compliance professionals.' },
      { question: 'What is prompt injection?', answer: 'It’s when untrusted text — in a document, email, or web page — tries to instruct an AI system to ignore its rules. We mitigate it by treating such content as data, restricting tools, and validating outputs.' },
    ],
    related: ['cloud-devops', 'ai-agents', 'software-development'],
    cta: {
      title: 'Concerned about a specific risk?',
      description: 'Tell us about your application and what worries you. We’ll suggest a focused review.',
      label: 'Discuss Security',
      to: '/contact?type=consultation',
    },
  },
]
