import { Megaphone, Search, Share2, Target, UserPlus } from 'lucide-react'
import type { ServiceDetail } from './types'

const proposal = '/contact?type=marketing'

export const growthServices: ServiceDetail[] = [
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    shortName: 'Digital Marketing',
    group: 'growth',
    icon: Megaphone,
    summary: 'Strategy, creative, campaigns, and measurement to strengthen your presence and reach the right audience.',
    seo: {
      title: 'Digital Marketing Services',
      description:
        'Digital marketing services: SEO, social media marketing, performance marketing, content marketing, branding, lead generation, email marketing, analytics, and influencer marketing.',
    },
    hero: {
      eyebrow: 'Digital Marketing',
      title: 'Build Your Brand. Reach Your Audience. Grow Your Business.',
      description:
        'Syjen Code combines digital strategy, creative execution, marketing technology, and performance measurement to help businesses strengthen their online presence and reach their target audiences.',
    },
    problem: {
      title: 'Great products still need to be found',
      body: 'Launching is only the beginning. Without a clear audience, message, and channel plan, budgets are spread thin across tactics and results are hard to measure.',
      points: [
        'Activity across many channels without a strategy tying them together',
        'Ad spend without reliable conversion tracking',
        'Inconsistent brand and messaging',
        'Leads that arrive but aren’t followed up systematically',
      ],
    },
    deliverables: [
      { title: 'Marketing strategy', description: 'Audience, positioning, channels, and a measurable plan aligned with your goals.' },
      { title: 'Creative & content', description: 'Brand assets, campaign creatives, articles, and short-form video.' },
      { title: 'Campaign execution', description: 'SEO, social, paid media, email, and outreach run as an integrated programme.' },
      { title: 'Measurement', description: 'Tracking, dashboards, and regular reviews to decide what to do next.' },
    ],
    capabilities: [
      { title: 'Search Engine Optimization', items: ['Technical SEO', 'On-page SEO', 'Off-page SEO', 'Keyword research', 'Local SEO', 'Website audits', 'Content optimization', 'Search performance monitoring'] },
      { title: 'Social Media Marketing', items: ['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'Social media strategy', 'Content calendars', 'Community engagement', 'Social media management'] },
      { title: 'Performance Marketing', items: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'YouTube Ads', 'Retargeting', 'Conversion tracking', 'Landing page optimization', 'Campaign analytics'] },
      { title: 'Content Marketing', items: ['Blogs', 'Articles', 'Website content', 'Social media posts', 'Carousels', 'Reels and short-form video', 'Explainer videos', 'AI-assisted creative production'] },
      { title: 'Branding and Creative Design', items: ['Brand identity', 'Logo design', 'Visual guidelines', 'Marketing creatives', 'Presentation design', 'Product branding', 'Campaign assets'] },
      { title: 'Lead Generation', items: ['B2B prospect research', 'Lead capture pages', 'LinkedIn outreach', 'Email outreach', 'Lead qualification workflows', 'CRM integrations', 'Sales funnel development'] },
      { title: 'Email Marketing', items: ['Newsletters', 'Campaign planning', 'Segmentation', 'Automated follow-ups', 'Lead nurturing', 'Email performance reporting'] },
      { title: 'Analytics and Growth', items: ['Google Analytics 4', 'Google Search Console', 'Campaign dashboards', 'Conversion analysis', 'Funnel analysis', 'A/B testing', 'Customer acquisition measurement'] },
      { title: 'Influencer and Creator Marketing', items: ['Creator discovery', 'Collaboration strategy', 'Influencer campaigns', 'User-generated content', 'Partnership coordination'] },
    ],
    approach: [
      { title: 'Audit & goals', description: 'Review your current presence, competitors, and analytics; agree goals and metrics.' },
      { title: 'Strategy', description: 'Define audiences, messages, channels, and budget allocation.' },
      { title: 'Foundations', description: 'Fix tracking, landing pages, and brand assets before scaling spend.' },
      { title: 'Execute', description: 'Run campaigns and publish content on an agreed calendar.' },
      { title: 'Review & optimise', description: 'Regular reports and decisions based on what the data shows.' },
    ],
    technologies: [
      { group: 'Analytics', items: ['Google Analytics 4', 'Google Search Console', 'Google Tag Manager', 'Looker Studio'] },
      { group: 'Advertising', items: ['Google Ads', 'Meta Ads Manager', 'LinkedIn Campaign Manager'] },
      { group: 'SEO', items: ['Ahrefs / Semrush', 'Screaming Frog', 'PageSpeed Insights'] },
      { group: 'CRM & email', items: ['HubSpot', 'Zoho CRM', 'Mailchimp', 'Brevo'] },
    ],
    useCases: [
      { title: 'Product launch', description: 'Coordinated content, outreach, and paid campaigns around a new product release.' },
      { title: 'B2B pipeline', description: 'Prospect research, outreach, and nurturing to create sales conversations.' },
      { title: 'Local visibility', description: 'Local SEO and social presence for location-based businesses.' },
      { title: 'Brand refresh', description: 'Updated identity and messaging rolled out across channels.' },
    ],
    faqs: [
      { question: 'Can you guarantee rankings, leads, or sales?', answer: 'No. Results depend on your market, competition, offer, budget, and many external factors. We commit to a clear strategy, disciplined execution, transparent reporting, and continuous optimisation.' },
      { question: 'Do you work with the products you build?', answer: 'Yes — that’s one of our differentiators. When we build your product, we can plan marketing alongside development so analytics, SEO, and launch content are ready when you are.' },
      { question: 'How are marketing engagements structured?', answer: 'Usually as a monthly retainer with an agreed scope of channels and deliverables, or as a project for launches and audits. Ad spend is typically paid directly to the platforms.' },
      { question: 'How often will we get reports?', answer: 'Reporting cadence is agreed up front — commonly monthly, with campaign check-ins more often during launches.' },
    ],
    features: ['marketing-funnel'],
    related: ['seo', 'performance-marketing', 'lead-generation'],
    cta: {
      title: 'Ready to grow your audience?',
      description: 'Tell us about your business, goals, and current marketing. We’ll prepare a proposal tailored to you.',
      label: 'Request a Marketing Proposal',
      to: proposal,
    },
  },
  {
    slug: 'seo',
    name: 'Search Engine Optimization',
    shortName: 'SEO',
    group: 'growth',
    icon: Search,
    summary: 'Technical, on-page, and content SEO to improve how search engines understand and present your site.',
    seo: {
      title: 'SEO Services — Technical, On-Page & Content SEO',
      description:
        'SEO services: technical SEO, on-page optimisation, keyword research, local SEO, website audits, content optimisation, off-page SEO, and search performance monitoring.',
    },
    hero: {
      eyebrow: 'Search Engine Optimization',
      title: 'Be Found by the People Already Searching for You.',
      description:
        'We combine technical fixes, content strategy, and steady optimisation to improve your visibility in search — with engineering skills to fix issues at the source.',
    },
    problem: {
      title: 'Invisible in search means invisible to buyers',
      body: 'Many sites have technical issues that limit how they are crawled and indexed, and content that doesn’t match what customers search for.',
      points: [
        'Slow pages and poor Core Web Vitals',
        'Missing or duplicate titles and descriptions',
        'Content that targets the wrong keywords',
        'No visibility into search performance',
      ],
    },
    deliverables: [
      { title: 'SEO audit', description: 'Technical, on-page, and content audit with a prioritised fix list.' },
      { title: 'Keyword & content plan', description: 'Topics mapped to search intent and the buyer journey.' },
      { title: 'Technical fixes', description: 'Implemented by engineers — not just recommended.' },
      { title: 'Monthly reporting', description: 'Search Console and analytics trends with next actions.' },
    ],
    capabilities: [
      { title: 'Search Engine Optimization', items: ['Technical SEO', 'On-page SEO', 'Off-page SEO', 'Keyword research', 'Local SEO', 'Website audits', 'Content optimization', 'Search performance monitoring'] },
    ],
    approach: [
      { title: 'Audit', description: 'Crawl the site, review Search Console, and benchmark competitors.' },
      { title: 'Fix foundations', description: 'Resolve indexing, speed, structure, and metadata issues.' },
      { title: 'Plan content', description: 'Prioritise topics by intent, relevance, and opportunity.' },
      { title: 'Publish & optimise', description: 'Create and improve pages on a steady cadence.' },
      { title: 'Measure', description: 'Track impressions, clicks, and conversions; adjust the plan.' },
    ],
    technologies: [
      { group: 'Research', items: ['Google Search Console', 'Ahrefs / Semrush', 'Google Keyword Planner'] },
      { group: 'Technical', items: ['Screaming Frog', 'PageSpeed Insights', 'Structured data'] },
      { group: 'Measurement', items: ['Google Analytics 4', 'Looker Studio'] },
    ],
    useCases: [
      { title: 'New website launch', description: 'Get SEO foundations right before launch rather than retrofitting later.' },
      { title: 'Traffic plateau', description: 'Diagnose why organic traffic has stalled and build a plan to move forward.' },
      { title: 'Local business', description: 'Improve visibility in local search and map results.' },
      { title: 'SaaS content engine', description: 'Content targeting problems your product solves.' },
    ],
    faqs: [
      { question: 'How long does SEO take?', answer: 'Technical fixes can show effects within weeks; content-led growth usually takes months. Timelines vary by competition and the site’s starting point.' },
      { question: 'Do you guarantee first-page rankings?', answer: 'No — no one can honestly guarantee rankings. We focus on the factors within our control and report transparently on progress.' },
      { question: 'Do you build backlinks?', answer: 'We focus on earning links through useful content, partnerships, and digital PR. We avoid link schemes that violate search engine guidelines.' },
    ],
    related: ['digital-marketing', 'web-development', 'performance-marketing'],
    cta: {
      title: 'Want to know what’s holding your site back?',
      description: 'Request an SEO-focused proposal and we’ll start with an audit of your current site.',
      label: 'Request an SEO Proposal',
      to: proposal,
    },
  },
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    shortName: 'Social Media',
    group: 'growth',
    icon: Share2,
    summary: 'Strategy, content calendars, and community management across Instagram, LinkedIn, Facebook, and YouTube.',
    seo: {
      title: 'Social Media Marketing Services',
      description:
        'Social media marketing services for Instagram, Facebook, LinkedIn, and YouTube: strategy, content calendars, creative production, community engagement, and social media management.',
    },
    hero: {
      eyebrow: 'Social Media Marketing',
      title: 'Show Up Consistently Where Your Audience Spends Time.',
      description:
        'We plan, create, and manage social content that reflects your brand, educates your audience, and builds a community over time.',
    },
    problem: {
      title: 'Posting isn’t a strategy',
      body: 'Irregular posts, inconsistent visuals, and no clear purpose make social channels feel abandoned. It’s hard to justify the time when results aren’t measured.',
      points: [
        'Inconsistent posting and brand presentation',
        'Content that doesn’t speak to the target audience',
        'Comments and messages left unanswered',
        'No link between social activity and business goals',
      ],
    },
    deliverables: [
      { title: 'Social strategy', description: 'Platforms, audiences, content pillars, and goals.' },
      { title: 'Content calendar', description: 'Planned posts, carousels, and short-form video.' },
      { title: 'Creative production', description: 'Designs and edits consistent with your brand.' },
      { title: 'Community & reporting', description: 'Engagement management and monthly insights.' },
    ],
    capabilities: [
      { title: 'Social Media Marketing', items: ['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'Social media strategy', 'Content calendars', 'Community engagement', 'Social media management'] },
    ],
    approach: [
      { title: 'Audit', description: 'Review your channels, competitors, and audience.' },
      { title: 'Define pillars', description: 'Choose the themes and formats that fit your brand and goals.' },
      { title: 'Produce', description: 'Create content in batches for review and approval.' },
      { title: 'Publish & engage', description: 'Schedule posts and respond to the community.' },
      { title: 'Learn', description: 'Review performance and refine the content mix.' },
    ],
    technologies: [
      { group: 'Platforms', items: ['Instagram', 'Facebook', 'LinkedIn', 'YouTube'] },
      { group: 'Creative', items: ['Figma', 'Canva', 'Video editing', 'AI-assisted production'] },
      { group: 'Management', items: ['Meta Business Suite', 'Scheduling tools', 'Native analytics'] },
    ],
    useCases: [
      { title: 'B2B thought leadership', description: 'LinkedIn content for founders and teams.' },
      { title: 'Consumer brand', description: 'Instagram and short-form video to build awareness.' },
      { title: 'Product education', description: 'Explainers and tutorials that show your product in action.' },
      { title: 'Launch campaign', description: 'A coordinated content push around a launch.' },
    ],
    faqs: [
      { question: 'Do we need to be on every platform?', answer: 'No. We recommend the platforms where your audience is most active and where you can show up consistently.' },
      { question: 'Who approves content?', answer: 'You do. Content is shared for review on an agreed schedule before publishing.' },
      { question: 'Can you guarantee follower growth?', answer: 'No. We focus on consistent, relevant content and report honestly on reach and engagement trends.' },
    ],
    related: ['digital-marketing', 'performance-marketing', 'lead-generation'],
    cta: {
      title: 'Ready to bring your social channels to life?',
      description: 'Tell us your audience and goals. We’ll propose a content plan.',
      label: 'Request a Social Media Proposal',
      to: proposal,
    },
  },
  {
    slug: 'performance-marketing',
    name: 'Performance Marketing',
    shortName: 'Performance Marketing',
    group: 'growth',
    icon: Target,
    summary: 'Google, Meta, LinkedIn, and YouTube ads with conversion tracking and landing page optimisation.',
    seo: {
      title: 'Performance Marketing & Paid Advertising Services',
      description:
        'Performance marketing services: Google Ads, Meta Ads, LinkedIn Ads, YouTube Ads, retargeting, conversion tracking, landing page optimization, and campaign analytics.',
    },
    hero: {
      eyebrow: 'Performance Marketing',
      title: 'Paid Campaigns Measured by What Matters.',
      description:
        'We plan, launch, and optimise paid campaigns with accurate tracking and purpose-built landing pages — so every decision is based on data, not guesswork.',
    },
    problem: {
      title: 'Ad spend without clarity',
      body: 'Campaigns are often launched without reliable tracking, sending traffic to generic pages. It becomes impossible to tell what’s working.',
      points: [
        'Conversions not tracked or double-counted',
        'Traffic sent to the homepage instead of a focused landing page',
        'Audiences too broad or too narrow',
        'Budgets not reallocated based on results',
      ],
    },
    deliverables: [
      { title: 'Tracking setup', description: 'Conversion events, tags, and attribution configured and verified.' },
      { title: 'Campaign structure', description: 'Audiences, creatives, and budgets organised for testing.' },
      { title: 'Landing pages', description: 'Focused pages built and tested by our developers.' },
      { title: 'Optimisation & reporting', description: 'Ongoing bid, creative, and audience adjustments with clear reports.' },
    ],
    capabilities: [
      { title: 'Performance Marketing', items: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'YouTube Ads', 'Retargeting', 'Conversion tracking', 'Landing page optimization', 'Campaign analytics'] },
    ],
    approach: [
      { title: 'Measure first', description: 'Fix tracking before spending on traffic.' },
      { title: 'Plan tests', description: 'Hypotheses for audiences, offers, and creatives.' },
      { title: 'Launch small', description: 'Start with controlled budgets to learn quickly.' },
      { title: 'Scale what works', description: 'Shift budget towards proven combinations.' },
      { title: 'Report', description: 'Transparent reporting on spend, conversions, and cost per result.' },
    ],
    technologies: [
      { group: 'Ad platforms', items: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'YouTube Ads'] },
      { group: 'Tracking', items: ['Google Tag Manager', 'GA4', 'Meta Pixel & Conversions API'] },
      { group: 'Optimisation', items: ['A/B testing', 'Landing page builds', 'Looker Studio dashboards'] },
    ],
    useCases: [
      { title: 'Lead generation campaigns', description: 'Generate enquiries with search and social ads.' },
      { title: 'E-commerce sales', description: 'Shopping and retargeting campaigns for online stores.' },
      { title: 'App installs', description: 'Campaigns optimised for installs and in-app actions.' },
      { title: 'Event or launch promotion', description: 'Time-bound campaigns for a specific goal.' },
    ],
    faqs: [
      { question: 'What budget do we need?', answer: 'It depends on your market, competition, and goals. We recommend a test budget that’s large enough to learn from, then scale based on results.' },
      { question: 'Who owns the ad accounts?', answer: 'You should. We work inside accounts you own so data and history stay with your business.' },
      { question: 'Can you guarantee a return on ad spend?', answer: 'No. We commit to disciplined testing, accurate measurement, and transparent reporting, but returns depend on many factors outside anyone’s control.' },
    ],
    related: ['digital-marketing', 'lead-generation', 'seo'],
    cta: {
      title: 'Planning a paid campaign?',
      description: 'Tell us your goal and current setup. We’ll suggest a measured way to start.',
      label: 'Request a Campaign Proposal',
      to: proposal,
    },
  },
  {
    slug: 'lead-generation',
    name: 'Lead Generation',
    shortName: 'Lead Generation',
    group: 'growth',
    icon: UserPlus,
    summary: 'B2B prospect research, outreach, lead capture, qualification workflows, and CRM integration.',
    seo: {
      title: 'B2B Lead Generation Services',
      description:
        'B2B lead generation services: prospect research, lead capture pages, LinkedIn and email outreach, lead qualification workflows, CRM integrations, and sales funnel development.',
    },
    hero: {
      eyebrow: 'Lead Generation',
      title: 'A Steady Flow of Qualified Conversations.',
      description:
        'We combine research, outreach, and marketing automation to help you reach the right prospects — and make sure every lead is captured, qualified, and followed up.',
    },
    problem: {
      title: 'Pipeline depends on referrals and luck',
      body: 'Many growing businesses rely on word of mouth. When it slows down, there’s no repeatable system to create new conversations — and inbound leads slip through the cracks.',
      points: [
        'No defined ideal customer profile',
        'Outreach that feels generic and gets ignored',
        'Leads captured in forms but not followed up',
        'No CRM, or a CRM no one updates',
      ],
    },
    deliverables: [
      { title: 'Ideal customer profile', description: 'Who to target, why, and what they care about.' },
      { title: 'Prospect lists', description: 'Researched accounts and contacts that match your profile.' },
      { title: 'Outreach sequences', description: 'Personalised LinkedIn and email sequences.' },
      { title: 'Funnel & CRM automation', description: 'Capture pages, qualification, and CRM workflows connected end to end.' },
    ],
    capabilities: [
      { title: 'Lead Generation', items: ['B2B prospect research', 'Lead capture pages', 'LinkedIn outreach', 'Email outreach', 'Lead qualification workflows', 'CRM integrations', 'Sales funnel development'] },
    ],
    approach: [
      { title: 'Define the target', description: 'Ideal customer profile and value proposition by segment.' },
      { title: 'Research', description: 'Build and verify prospect lists.' },
      { title: 'Engage', description: 'Run personalised outreach respecting platform rules and recipient preferences.' },
      { title: 'Qualify', description: 'Score and route leads to the right next step.' },
      { title: 'Refine', description: 'Improve messaging and targeting based on replies and outcomes.' },
    ],
    technologies: [
      { group: 'CRM', items: ['HubSpot', 'Zoho CRM', 'Pipedrive'] },
      { group: 'Outreach', items: ['LinkedIn', 'Email sequencing tools'] },
      { group: 'Automation', items: ['Zapier / Make', 'Custom webhooks', 'AI-assisted research'] },
    ],
    useCases: [
      { title: 'B2B services firm', description: 'Book discovery calls with decision-makers in a target industry.' },
      { title: 'SaaS startup', description: 'Generate early demos and pilot customers.' },
      { title: 'Recruitment agency', description: 'Reach hiring managers with relevant candidate offers.' },
      { title: 'Inbound clean-up', description: 'Make sure every website enquiry is captured and followed up.' },
    ],
    faqs: [
      { question: 'Do you guarantee a number of leads?', answer: 'No. Lead volume depends on your market, offer, and targeting. We share transparent activity and response metrics so you can judge progress.' },
      { question: 'Is cold outreach compliant?', answer: 'We follow platform rules and applicable email regulations, include opt-out options, and respect recipient preferences. Requirements vary by country, so we confirm the approach with you.' },
      { question: 'Can you connect leads to our CRM?', answer: 'Yes. We integrate capture forms and outreach tools with your CRM so leads are recorded and routed automatically.' },
    ],
    related: ['digital-marketing', 'performance-marketing', 'ai-agents'],
    cta: {
      title: 'Want a more predictable pipeline?',
      description: 'Tell us who you sell to. We’ll suggest a lead generation plan.',
      label: 'Request a Lead Generation Proposal',
      to: proposal,
    },
  },
]
