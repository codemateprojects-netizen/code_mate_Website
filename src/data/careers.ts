import { BrainCircuit, Code2, Megaphone, PenTool, type LucideIcon } from 'lucide-react'

/**
 * Careers content.
 *
 * `openings` must only contain real, currently open positions. While it is
 * empty, the Careers page shows a general expression-of-interest form.
 */
export interface Opening {
  id: string
  title: string
  area: string
  location: string
  type: string
  summary: string
}

export const openings: Opening[] = []

export const workAreas: { title: string; description: string; icon: LucideIcon; skills: string[] }[] = [
  {
    title: 'Engineering',
    description: 'Build web, mobile, and backend systems that clients rely on.',
    icon: Code2,
    skills: ['React & TypeScript', 'Node.js / Python', 'Mobile', 'Cloud & DevOps', 'QA automation'],
  },
  {
    title: 'AI & Data',
    description: 'Design retrieval systems, agents, and data pipelines — and evaluate them rigorously.',
    icon: BrainCircuit,
    skills: ['LLM applications', 'RAG & search', 'Machine learning', 'Data engineering', 'Evaluation'],
  },
  {
    title: 'Design',
    description: 'Shape product experiences, design systems, and brand identities.',
    icon: PenTool,
    skills: ['Product design', 'UX research', 'Design systems', 'Brand & visual design'],
  },
  {
    title: 'Marketing',
    description: 'Help clients reach their audiences through strategy, content, and campaigns.',
    icon: Megaphone,
    skills: ['SEO', 'Performance marketing', 'Content & social', 'Lead generation', 'Analytics'],
  },
]
