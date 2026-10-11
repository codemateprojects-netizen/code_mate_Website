/**
 * Portfolio entries. Keep this file free of React imports — vite.config.ts
 * reads the slugs to build the sitemap.
 *
 * To add a project: append an entry below. Add screenshot files to
 * /public/portfolio/<slug>/ and reference them as `/portfolio/<slug>/file.webp`.
 * Only fill `outcome` with results the client has approved for publication.
 */

export type PortfolioCategory = 'web' | 'mobile' | 'ai' | 'saas' | 'ecommerce' | 'marketing'

export const portfolioCategories: { id: PortfolioCategory; label: string }[] = [
  { id: 'web', label: 'Web Development' },
  { id: 'mobile', label: 'Mobile Applications' },
  { id: 'ai', label: 'AI Solutions' },
  { id: 'saas', label: 'SaaS' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'marketing', label: 'Digital Marketing' },
]

export interface PortfolioScreenshot {
  src: string
  alt: string
}

export interface PortfolioProject {
  slug: string
  name: string
  /** Short label shown on cards, e.g. "AI Application". */
  type: string
  industry: string
  categories: PortfolioCategory[]
  summary: string
  problem: string
  solution: string
  features: string[]
  servicesDelivered: string[]
  stack: string[]
  /** Optional high-level data / request flow. */
  workflow?: string[]
  outcome?: string
  screenshots: PortfolioScreenshot[]
  /** When true, a confidentiality notice is shown instead of a live link. */
  confidential: boolean
  liveUrl?: string
}

export const portfolio: PortfolioProject[] = [
  {
    slug: 'ai-customer-support-chatbot',
    name: 'AI Customer Support Chatbot',
    type: 'AI Application',
    industry: 'Customer Support',
    categories: ['ai', 'saas'],
    summary: 'An AI assistant that answers repetitive support questions using FAQ-based retrieval and conversation context.',
    problem: 'Businesses needed automated customer support to handle repetitive queries and reduce response time.',
    solution: 'Built an AI chatbot using the OpenAI API with context handling and an FAQ-based retrieval system.',
    features: ['Context-aware conversation handling', 'FAQ-based retrieval system', 'OpenAI API integration'],
    servicesDelivered: ['AI Solutions', 'Backend & API Engineering', 'Retrieval design'],
    stack: ['Python', 'FastAPI', 'OpenAI API', 'MongoDB'],
    workflow: ['User query', 'API', 'Context retrieval', 'OpenAI processing', 'Response'],
    outcome: 'Reduced manual support workload and improved response times for common queries.',
    screenshots: [],
    confidential: true,
  },
  {
    slug: 'ai-content-generator',
    name: 'AI Content Generator',
    type: 'AI Tool',
    industry: 'Marketing & Content',
    categories: ['ai', 'saas', 'marketing'],
    summary: 'A prompt-driven tool for drafting blogs, captions, and marketing copy with tone control.',
    problem: 'Content creators needed faster ways to generate blogs, captions, and marketing content.',
    solution: 'Developed an AI-powered content generator with customizable prompts and tone control.',
    features: ['Customizable prompts', 'Tone control', 'Rapid content generation'],
    servicesDelivered: ['AI Solutions', 'Web Development', 'Prompt engineering'],
    stack: ['React', 'Node.js', 'OpenAI API'],
    workflow: ['User input', 'Prompt engineering', 'OpenAI API', 'Content output'],
    outcome: 'Enabled rapid content creation with consistent quality and tone.',
    screenshots: [],
    confidential: true,
  },
  {
    slug: 'ai-feedback-summarization',
    name: 'AI Feedback Summarization System',
    type: 'AI Automation',
    industry: 'Business Intelligence',
    categories: ['ai'],
    summary: 'An NLP pipeline that condenses large volumes of user feedback into themes and actionable insights.',
    problem: 'Companies struggled to analyze large volumes of user feedback manually.',
    solution: 'Built an NLP-based summarization tool to extract key insights from feedback data.',
    features: ['NLP-based summarization', 'Key insight extraction', 'Automated feedback processing'],
    servicesDelivered: ['AI Solutions', 'Data processing', 'Backend & API Engineering'],
    stack: ['Python', 'NLP', 'OpenAI API', 'FastAPI'],
    workflow: ['Feedback data', 'Preprocessing', 'NLP model', 'Summary & insights'],
    outcome: 'Improved decision-making by converting raw feedback into actionable insights.',
    screenshots: [],
    confidential: true,
  },
  {
    slug: 'ai-analytics-dashboard',
    name: 'AI Analytics Dashboard',
    type: 'AI Dashboard',
    industry: 'Business Intelligence',
    categories: ['ai', 'web', 'saas'],
    summary: 'A dashboard that pairs data visualisation with AI-generated insights.',
    problem: 'Businesses lacked insights from raw data for better decision-making.',
    solution: 'Created a dashboard integrating AI insights with data visualization tools.',
    features: ['Data visualization', 'AI-driven insights', 'Chart.js dashboard UI'],
    servicesDelivered: ['AI Solutions', 'Web Development', 'Data Engineering'],
    stack: ['React', 'Chart.js', 'FastAPI', 'AI APIs'],
    workflow: ['Data source', 'Backend', 'AI analysis', 'Dashboard visualization'],
    outcome: 'Delivered timely insights and improved business intelligence.',
    screenshots: [],
    confidential: true,
  },
  {
    slug: 'ai-developer-terminal',
    name: 'AI Developer Terminal (CLI Assistant)',
    type: 'AI Tool',
    industry: 'Developer Tools',
    categories: ['ai'],
    summary: 'A command-line AI assistant for coding and debugging help without leaving the terminal.',
    problem: 'Developers needed fast AI help for coding and debugging without leaving the terminal.',
    solution: 'Built a CLI-based AI assistant in Python with intelligent response processing.',
    features: ['CLI-based AI assistant', 'Instant coding help', 'Terminal-native workflow'],
    servicesDelivered: ['AI Solutions', 'Developer tooling', 'Prompt engineering'],
    stack: ['Python', 'OpenAI API', 'CLI'],
    workflow: ['User command', 'CLI input', 'OpenAI API', 'Terminal output'],
    outcome: 'Improved developer productivity by enabling instant AI assistance in terminal workflows.',
    screenshots: [],
    confidential: true,
  },
  {
    slug: 'books-marketplace',
    name: 'Books Marketplace Platform',
    type: 'Web Application',
    industry: 'E-commerce',
    categories: ['web', 'ecommerce'],
    summary: 'A marketplace MVP where independent sellers can list and sell books online.',
    problem: 'Independent sellers needed a simple, scalable way to sell books online.',
    solution: 'Designed and developed a secure marketplace with authentication and a modular architecture.',
    features: ['User authentication', 'Product listings', 'Secure transaction flow'],
    servicesDelivered: ['Web Development', 'E-commerce & Marketplaces', 'Backend & API Engineering'],
    stack: ['React', 'Node.js'],
    outcome: 'Production-ready MVP built for scalability and long-term maintainability.',
    screenshots: [],
    confidential: true,
  },
  {
    slug: 'service-booking-platform',
    name: 'Service Booking Platform',
    type: 'Web Platform',
    industry: 'Local Services',
    categories: ['web', 'saas'],
    summary: 'A booking and client-management platform for local service providers.',
    problem: 'Local service providers needed a digital platform to manage bookings and clients.',
    solution: 'Built a service-based platform with clean workflows and user management.',
    features: ['Booking management', 'Client workflows', 'Multi-category support'],
    servicesDelivered: ['Web Development', 'UI/UX Design', 'Backend & API Engineering'],
    stack: ['React', 'Node.js'],
    outcome: 'A ready-to-scale foundation supporting multiple service categories.',
    screenshots: [],
    confidential: true,
  },
  {
    slug: 'creator-support-app',
    name: 'Creator Support Mobile App',
    type: 'Mobile Application',
    industry: 'Creator Economy',
    categories: ['mobile'],
    summary: 'A cross-platform app for creators to share content and connect with supporters.',
    problem: 'Creators needed a mobile-first way to share content and connect with supporters.',
    solution: 'Developed a cross-platform mobile app with a clean UI, authentication, and a scalable architecture.',
    features: ['Cross-platform mobile UI', 'Authentication', 'Scalable architecture'],
    servicesDelivered: ['Mobile App Development', 'UI/UX Design'],
    stack: ['React Native', 'TypeScript'],
    outcome: 'A mobile-ready product designed for future feature expansion.',
    screenshots: [],
    confidential: true,
  },
  {
    slug: 'business-management-app',
    name: 'Business Management Mobile App',
    type: 'Mobile Application',
    industry: 'SMB Operations',
    categories: ['mobile'],
    summary: 'A lightweight app that lets small businesses manage daily operations on the go.',
    problem: 'Small businesses required a mobile app to manage daily operations on the go.',
    solution: 'Built a lightweight, performance-focused mobile application with intuitive navigation.',
    features: ['Lightweight mobile UI', 'API integration', 'On-the-go operations management'],
    servicesDelivered: ['Mobile App Development', 'Backend & API Engineering'],
    stack: ['React Native', 'REST APIs'],
    outcome: 'Improved accessibility and mobile productivity.',
    screenshots: [],
    confidential: true,
  },
  {
    slug: 'startup-landing-website',
    name: 'Startup Landing Website',
    type: 'Landing Page',
    industry: 'Startups',
    categories: ['web', 'marketing'],
    summary: 'A fast landing experience built to validate an early-stage idea through outreach.',
    problem: 'A startup needed a clean landing page to validate an early-stage idea.',
    solution: 'Created a high-performance landing experience optimized for outreach campaigns.',
    features: ['Fast-loading landing experience', 'Outreach-optimized layout', 'Lightweight build'],
    servicesDelivered: ['Web Development', 'Landing page optimization'],
    stack: ['React', 'Vite'],
    outcome: 'Enabled faster validation and early traction.',
    screenshots: [],
    confidential: true,
  },
  {
    slug: 'marketing-consultant-website',
    name: 'Digital Marketing Consultant Website',
    type: 'Business Website',
    industry: 'Professional Services',
    categories: ['web', 'marketing'],
    summary: 'A conversion-focused portfolio site for a marketing consultant targeting international clients.',
    problem: 'A marketing consultant needed a professional online presence to attract international clients.',
    solution: 'Developed a fast, conversion-focused website with clear messaging.',
    features: ['Conversion-focused design', 'Fast performance', 'Clear messaging'],
    servicesDelivered: ['Web Development', 'Content structure'],
    stack: ['React', 'Vite'],
    outcome: 'Improved credibility and readiness for international clients.',
    screenshots: [],
    confidential: true,
  },
]

export const getProject = (slug: string) => portfolio.find((p) => p.slug === slug)
