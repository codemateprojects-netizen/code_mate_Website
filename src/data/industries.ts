import {
  Briefcase,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Rocket,
  ShoppingBag,
  Store,
  Truck,
  UserSearch,
  type LucideIcon,
} from 'lucide-react'
import type { ServiceSlug } from './routes'

/**
 * Industries describe potential solutions — not claims of domain certification
 * or prior work in every sector.
 */
export interface Industry {
  id: string
  name: string
  icon: LucideIcon
  summary: string
  useCases: string[]
  services: ServiceSlug[]
}

export const industries: Industry[] = [
  {
    id: 'education',
    name: 'Education & EdTech',
    icon: GraduationCap,
    summary: 'Digital learning experiences, assessment tools, and AI study assistance.',
    useCases: ['Learning management portals', 'Online examinations and assessments', 'AI tutoring and coding practice', 'Student and course administration'],
    services: ['web-development', 'ai-solutions', 'mobile-app-development'],
  },
  {
    id: 'recruitment',
    name: 'Recruitment & HRTech',
    icon: UserSearch,
    summary: 'Tools that help recruiters and HR teams manage candidates and workflows.',
    useCases: ['Applicant tracking and hiring pipelines', 'AI-assisted resume analysis', 'HR policy knowledge assistants', 'Onboarding workflows'],
    services: ['ai-solutions', 'rag-development', 'software-development'],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: ShoppingBag,
    summary: 'Online stores and marketplaces built to sell — and marketed to be found.',
    useCases: ['Online stores and marketplaces', 'Product recommendations', 'Order and inventory integration', 'Performance marketing and retargeting'],
    services: ['web-development', 'performance-marketing', 'ai-solutions'],
  },
  {
    id: 'logistics',
    name: 'Logistics',
    icon: Truck,
    summary: 'Visibility and automation for shipments, fleets, and operations.',
    useCases: ['Shipment tracking portals', 'Driver and field apps', 'Document processing for delivery paperwork', 'Operations dashboards'],
    services: ['software-development', 'mobile-app-development', 'data-engineering'],
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    icon: Briefcase,
    summary: 'Client portals, knowledge tools, and lead generation for service firms.',
    useCases: ['Client portals and document sharing', 'Internal knowledge assistants', 'Proposal and report automation', 'B2B lead generation'],
    services: ['rag-development', 'ai-agents', 'lead-generation'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: HeartPulse,
    summary: 'Patient-facing and operational software, built with privacy in mind.',
    useCases: ['Appointment booking and reminders', 'Patient information portals', 'Operational dashboards', 'Administrative document workflows'],
    services: ['web-development', 'mobile-app-development', 'cybersecurity'],
  },
  {
    id: 'fintech',
    name: 'Financial Technology',
    icon: Landmark,
    summary: 'Secure applications, integrations, and data-driven insights for financial products.',
    useCases: ['Customer onboarding flows', 'Payment integrations', 'Reporting and analytics dashboards', 'Document extraction and review'],
    services: ['software-development', 'cybersecurity', 'data-engineering'],
  },
  {
    id: 'saas',
    name: 'SaaS Startups',
    icon: Rocket,
    summary: 'From MVP to product-market fit — engineering and growth together.',
    useCases: ['MVP development', 'Subscription billing and admin panels', 'AI features inside the product', 'Launch marketing and SEO'],
    services: ['software-development', 'ai-solutions', 'digital-marketing'],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    summary: 'Digitising operations, quality, and reporting on the shop floor and beyond.',
    useCases: ['Production and quality tracking', 'Inventory and supplier portals', 'Predictive maintenance analytics', 'Operations dashboards'],
    services: ['software-development', 'data-engineering', 'ai-solutions'],
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: Store,
    summary: 'Connecting in-store and online experiences, and reaching local customers.',
    useCases: ['Omnichannel storefronts', 'Loyalty and customer apps', 'Local SEO and social campaigns', 'Sales and inventory reporting'],
    services: ['web-development', 'seo', 'social-media-marketing'],
  },
]
