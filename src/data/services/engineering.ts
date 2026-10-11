import { Code2, Globe, Smartphone, PenTool, ShieldCheck } from 'lucide-react'
import type { ServiceDetail } from './types'

export const engineeringServices: ServiceDetail[] = [
  {
    slug: 'software-development',
    name: 'Custom Software Development',
    shortName: 'Software Development',
    group: 'engineering',
    icon: Code2,
    summary: 'Business software, SaaS platforms, backends, and integrations built around how your organisation actually works.',
    seo: {
      title: 'Custom Software Development Company',
      description:
        'Custom software development for startups and businesses: SaaS platforms, enterprise applications, workflow systems, backend and API engineering, integrations, and legacy modernization.',
    },
    hero: {
      eyebrow: 'Custom Software Development',
      title: 'Software Shaped Around Your Business, Not the Other Way Around.',
      description:
        'We design and build business software, SaaS products, and backend systems that reduce manual work, connect your tools, and support the workflows that make your organisation different.',
    },
    problem: {
      title: 'When off-the-shelf tools stop fitting',
      body: 'Generic software works until your process doesn’t match its assumptions. Teams compensate with spreadsheets, copy-paste between systems, and manual approvals — and that hidden work grows with every new customer.',
      points: [
        'Data re-entered across several disconnected tools',
        'Approvals and hand-offs tracked over email or chat',
        'Legacy systems that are risky to change and hard to integrate',
        'SaaS subscriptions that cover 70% of the need and block the rest',
      ],
    },
    deliverables: [
      { title: 'Discovery & solution design', description: 'Process mapping, scope definition, and an architecture that fits your scale and budget.' },
      { title: 'Production-ready application', description: 'Web, backend, and database layers built with tests, code review, and documentation.' },
      { title: 'Integrations', description: 'Connections to CRMs, ERPs, payment providers, and internal tools through APIs and webhooks.' },
      { title: 'Deployment & handover', description: 'Cloud deployment, monitoring, runbooks, and source code ownership as agreed in your contract.' },
    ],
    capabilities: [
      {
        title: 'Custom Software',
        items: [
          'Business software',
          'Enterprise applications',
          'Workflow systems',
          'SaaS development',
          'Microservices',
          'Backend systems',
          'Legacy modernization',
          'Third-party integrations',
          'Custom business platforms',
        ],
      },
      {
        title: 'Backend & API Engineering',
        items: [
          'REST API development',
          'Authentication and authorization',
          'Database architecture',
          'Payment integration',
          'Real-time applications',
          'Webhooks',
          'Third-party integrations',
          'API documentation',
          'Performance optimization',
        ],
      },
    ],
    approach: [
      { title: 'Map the workflow', description: 'We document how work moves today — who does what, which systems are involved, and where time is lost.' },
      { title: 'Design the smallest useful system', description: 'We prioritise the features that remove the most manual effort first, and plan the rest as a roadmap.' },
      { title: 'Build in short iterations', description: 'Working software is demonstrated regularly so you can steer priorities with real feedback.' },
      { title: 'Harden and launch', description: 'Testing, security review, performance checks, and a staged rollout to real users.' },
      { title: 'Support and evolve', description: 'Maintenance, monitoring, and new features under an agreed support arrangement.' },
    ],
    technologies: [
      { group: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS'] },
      { group: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'Python', 'FastAPI'] },
      { group: 'Data', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
      { group: 'Infrastructure', items: ['Docker', 'AWS', 'Google Cloud', 'Azure', 'CI/CD pipelines'] },
    ],
    useCases: [
      { title: 'Operations platform', description: 'Replace spreadsheets and email threads with a single system for orders, approvals, and reporting.' },
      { title: 'SaaS MVP', description: 'Launch a focused first version of a subscription product with authentication, billing, and an admin panel.' },
      { title: 'System integration', description: 'Sync customers, invoices, or inventory between tools that don’t talk to each other today.' },
      { title: 'Legacy modernization', description: 'Move a fragile legacy application onto a maintainable stack incrementally, without a risky big-bang rewrite.' },
    ],
    faqs: [
      { question: 'Do we own the source code?', answer: 'Code ownership, licensing, and handover terms are defined in your project agreement. Our standard approach is for clients to own the custom code written for their project.' },
      { question: 'How do you estimate cost and timeline?', answer: 'After a discovery conversation we break the scope into features, estimate each one, and share a proposal with assumptions stated clearly. Pricing and timelines depend on the agreed scope.' },
      { question: 'Can you work with our existing codebase?', answer: 'Yes. We start with a code and architecture review, identify risks, and agree on whether to extend, refactor, or gradually replace parts of the system.' },
      { question: 'Do you provide support after launch?', answer: 'Ongoing maintenance, monitoring, and feature development are available through an agreed support or retainer arrangement.' },
    ],
    related: ['web-development', 'cloud-devops', 'quality-assurance'],
    cta: {
      title: 'Tell us about the workflow you want to fix.',
      description: 'Share how things work today and where it hurts. We’ll suggest a practical first version and a roadmap.',
      label: 'Discuss Your Software Project',
      to: '/contact?type=project&service=Software%20Development',
    },
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    shortName: 'Web Development',
    group: 'engineering',
    icon: Globe,
    summary: 'Fast, accessible websites, web applications, portals, dashboards, and e-commerce platforms.',
    seo: {
      title: 'Web Application Development Services',
      description:
        'Web development services: corporate websites, web applications, SaaS platforms, admin dashboards, customer portals, e-commerce stores, marketplaces, and progressive web apps.',
    },
    hero: {
      eyebrow: 'Web Development',
      title: 'Websites and Web Applications Built to Perform.',
      description:
        'From a company website that earns trust to a SaaS platform customers rely on daily — we build fast, accessible, search-friendly web experiences with clean, maintainable code.',
    },
    problem: {
      title: 'Your website is often the first sales meeting',
      body: 'Slow pages, unclear messaging, and clunky dashboards cost leads and frustrate users. Many sites are built once and never improved because the codebase is hard to change.',
      points: [
        'Pages that load slowly on mobile networks',
        'Portals and dashboards that users avoid',
        'Content that is hard for the team to update',
        'Little or no conversion tracking to learn from',
      ],
    },
    deliverables: [
      { title: 'Information architecture & UX', description: 'Page structure, user flows, and content hierarchy aligned to your goals.' },
      { title: 'Responsive, accessible build', description: 'Semantic, keyboard-friendly interfaces that work across devices and browsers.' },
      { title: 'SEO & performance foundations', description: 'Metadata, structured content, image optimisation, and Core Web Vitals in mind from day one.' },
      { title: 'Analytics & conversion tracking', description: 'Events and goals configured so you can measure what visitors actually do.' },
    ],
    capabilities: [
      {
        title: 'Web Development',
        items: [
          'Corporate websites',
          'Business websites',
          'Web applications',
          'Admin dashboards',
          'Customer portals',
          'SaaS platforms',
          'E-commerce websites',
          'Marketplaces',
          'Progressive web applications',
          'API-driven applications',
        ],
      },
      {
        title: 'E-commerce & Marketplaces',
        items: [
          'Online stores',
          'Multi-vendor marketplaces',
          'Product catalogs',
          'Checkout and payment integration',
          'Order management',
          'Inventory integration',
          'Customer accounts',
          'Admin dashboards',
          'Marketing integration',
        ],
      },
    ],
    approach: [
      { title: 'Goals & audience', description: 'Define who the site is for, what they need to do, and how success will be measured.' },
      { title: 'Structure & design', description: 'Wireframes and interface design reviewed with you before development starts.' },
      { title: 'Component-based build', description: 'Reusable components and a design system that keep future changes fast and consistent.' },
      { title: 'Test & optimise', description: 'Cross-browser, accessibility, and performance testing before launch.' },
      { title: 'Launch & learn', description: 'Deployment, analytics review, and iterative improvements based on real usage.' },
    ],
    technologies: [
      { group: 'Frameworks', items: ['React', 'Next.js', 'Vite', 'TypeScript'] },
      { group: 'Styling & UI', items: ['Tailwind CSS', 'Design systems', 'Motion'] },
      { group: 'Backend & CMS', items: ['Node.js', 'Headless CMS', 'REST APIs'] },
      { group: 'Commerce & payments', items: ['Stripe', 'Razorpay', 'Shopify (headless)', 'Custom checkout'] },
    ],
    useCases: [
      { title: 'Company website', description: 'A credible, fast website that explains what you do and turns visitors into conversations.' },
      { title: 'Customer portal', description: 'Let customers track orders, download documents, and raise requests without emailing your team.' },
      { title: 'Marketplace MVP', description: 'Connect buyers and sellers with listings, search, checkout, and seller dashboards.' },
      { title: 'Internal dashboard', description: 'Give teams one place to see operational data and act on it.' },
    ],
    faqs: [
      { question: 'Will the website be SEO-friendly?', answer: 'We build with technical SEO foundations — semantic HTML, metadata, sitemaps, fast loading, and accessible markup. Search rankings depend on many factors, including content and competition, so we don’t guarantee positions.' },
      { question: 'Can our team edit content without a developer?', answer: 'Yes, if needed. We can integrate a headless CMS or build simple admin tools so your team can update content safely.' },
      { question: 'Do you build e-commerce stores?', answer: 'Yes — from focused online stores to multi-vendor marketplaces, including payments, orders, inventory integration, and admin dashboards.' },
      { question: 'Which payment providers do you support?', answer: 'We integrate the provider that suits your market and business model, such as Stripe or Razorpay. Final choice depends on your region and requirements.' },
    ],
    related: ['ui-ux-design', 'seo', 'software-development'],
    cta: {
      title: 'Planning a website or web platform?',
      description: 'Tell us what it needs to achieve. We’ll recommend the right scope, stack, and launch plan.',
      label: 'Start Your Web Project',
      to: '/contact?type=project&service=Web%20Development',
    },
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    shortName: 'Mobile Apps',
    group: 'engineering',
    icon: Smartphone,
    summary: 'Android, iOS, and cross-platform apps — from first prototype to App Store and Play Store release.',
    seo: {
      title: 'Mobile Application Development Services',
      description:
        'Mobile app development for Android and iOS: cross-platform React Native apps, API integration, push notifications, analytics, performance optimization, and store release support.',
    },
    hero: {
      eyebrow: 'Mobile App Development',
      title: 'Mobile Apps People Actually Keep on Their Phones.',
      description:
        'We build Android, iOS, and cross-platform apps with clean interfaces, reliable performance, and the backend, analytics, and release process needed to support them.',
    },
    problem: {
      title: 'Mobile is unforgiving',
      body: 'Users uninstall apps that feel slow or confusing, and store reviews are public. A successful app needs thoughtful UX, solid APIs, and a release process — not just screens.',
      points: [
        'Two native codebases are expensive to build and maintain',
        'Offline and poor-network behaviour is often an afterthought',
        'Store submission and review can delay launch',
        'Without analytics, it’s hard to know what to improve',
      ],
    },
    deliverables: [
      { title: 'App UX & interface design', description: 'Platform-appropriate patterns, prototypes, and a component library.' },
      { title: 'Cross-platform or native build', description: 'React Native for shared code across platforms, or native where the use case requires it.' },
      { title: 'Backend & API integration', description: 'Secure APIs, authentication, push notifications, and data sync.' },
      { title: 'Store release support', description: 'Builds, store listings, review guidelines, and staged rollouts.' },
    ],
    capabilities: [
      {
        title: 'Mobile App Development',
        items: [
          'Android applications',
          'iOS applications',
          'Cross-platform applications',
          'React Native development',
          'Mobile API integration',
          'Push notifications',
          'App analytics',
          'App performance optimization',
          'App Store and Play Store release support',
        ],
      },
    ],
    approach: [
      { title: 'Define the core journey', description: 'Identify the one or two things users must be able to do brilliantly in version one.' },
      { title: 'Prototype on device', description: 'Clickable prototypes tested on real phones before development.' },
      { title: 'Build & integrate', description: 'App, API, and notification services built and tested together.' },
      { title: 'Beta & release', description: 'TestFlight / internal testing tracks, feedback, and store submission.' },
      { title: 'Measure & iterate', description: 'Crash reporting and analytics guide the next releases.' },
    ],
    technologies: [
      { group: 'App', items: ['React Native', 'TypeScript', 'Expo', 'Swift / Kotlin (when needed)'] },
      { group: 'Services', items: ['Node.js APIs', 'Firebase Cloud Messaging', 'Push notifications'] },
      { group: 'Quality', items: ['Crash reporting', 'App analytics', 'Device testing'] },
    ],
    useCases: [
      { title: 'Customer app', description: 'Bookings, orders, loyalty, or account management in your customers’ pockets.' },
      { title: 'Field operations app', description: 'Let staff capture data, photos, and signatures on site — with offline support where needed.' },
      { title: 'Creator or community app', description: 'Content sharing, profiles, and engagement features for a mobile-first audience.' },
      { title: 'Companion app', description: 'A mobile front end for an existing web platform or SaaS product.' },
    ],
    faqs: [
      { question: 'Should we build native or cross-platform?', answer: 'For most business apps, cross-platform (React Native) offers a good balance of quality, speed, and cost. We recommend native when an app relies heavily on platform-specific features or performance.' },
      { question: 'Do you handle App Store and Play Store submission?', answer: 'Yes. We prepare builds, help with store listings, and guide you through review requirements. Approval decisions rest with Apple and Google.' },
      { question: 'Can you add features to an existing app?', answer: 'Yes, after a code review to understand its architecture, dependencies, and release setup.' },
    ],
    related: ['ui-ux-design', 'software-development', 'quality-assurance'],
    cta: {
      title: 'Have an app idea?',
      description: 'Tell us who it’s for and what it should do. We’ll help you shape a focused first release.',
      label: 'Discuss Your App',
      to: '/contact?type=project&service=Mobile%20App%20Development',
    },
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX and Product Design',
    shortName: 'UI/UX Design',
    group: 'engineering',
    icon: PenTool,
    summary: 'User research, journeys, wireframes, prototypes, and design systems that make products easy to use.',
    seo: {
      title: 'UI/UX and Product Design Services',
      description:
        'UI/UX design services: user research, journey mapping, wireframes, Figma prototypes, design systems, responsive design, usability improvements, and accessibility.',
    },
    hero: {
      eyebrow: 'UI/UX & Product Design',
      title: 'Design That Makes Complex Products Feel Simple.',
      description:
        'We turn requirements into clear user journeys, tested prototypes, and design systems your developers can build from — so products are easier to use and faster to evolve.',
    },
    problem: {
      title: 'Usability problems are expensive to fix late',
      body: 'When design decisions are made during development, teams build the wrong thing, rework screens, and ship inconsistent interfaces. Users notice.',
      points: [
        'Inconsistent screens built ad hoc by different developers',
        'Onboarding that loses users before they see value',
        'Features that exist but users can’t find',
        'Accessibility gaps that exclude users and create risk',
      ],
    },
    deliverables: [
      { title: 'Research & journey maps', description: 'Interviews, task analysis, and journey maps that show where users struggle.' },
      { title: 'Wireframes & prototypes', description: 'Low- to high-fidelity Figma prototypes reviewed and tested before build.' },
      { title: 'Design system', description: 'Tokens, components, and usage guidelines that keep the product consistent.' },
      { title: 'Developer handoff', description: 'Annotated specs, states, and responsive behaviour ready for implementation.' },
    ],
    capabilities: [
      {
        title: 'UI/UX & Product Design',
        items: [
          'User research',
          'User journey mapping',
          'Wireframes',
          'Figma prototypes',
          'Design systems',
          'Responsive design',
          'Product usability improvements',
          'Accessibility',
        ],
      },
    ],
    approach: [
      { title: 'Understand', description: 'Stakeholder goals, user needs, and constraints.' },
      { title: 'Map', description: 'Journeys, flows, and information architecture.' },
      { title: 'Sketch & prototype', description: 'Explore options quickly, then refine the strongest direction.' },
      { title: 'Validate', description: 'Usability sessions with representative users where possible.' },
      { title: 'Systemise', description: 'Document components and patterns for consistent delivery.' },
    ],
    technologies: [
      { group: 'Design', items: ['Figma', 'FigJam', 'Design tokens'] },
      { group: 'Validation', items: ['Clickable prototypes', 'Usability testing', 'Analytics review'] },
      { group: 'Standards', items: ['WCAG accessibility guidelines', 'Platform UI guidelines'] },
    ],
    useCases: [
      { title: 'New product design', description: 'Go from idea to a tested prototype before committing development budget.' },
      { title: 'UX audit', description: 'Identify and prioritise usability issues in an existing product.' },
      { title: 'Design system', description: 'Bring consistency to a product that has grown screen by screen.' },
      { title: 'Dashboard redesign', description: 'Make data-heavy interfaces easier to scan and act on.' },
    ],
    faqs: [
      { question: 'Do you only design, or also build?', answer: 'Both. Design can be a standalone engagement, but it works best when the same team carries it through development.' },
      { question: 'What do we receive at the end?', answer: 'Typically Figma files with flows, screens, components, and prototypes, plus handoff documentation. Exact deliverables are agreed in the proposal.' },
      { question: 'How do you approach accessibility?', answer: 'We design with WCAG guidelines in mind — colour contrast, focus states, readable type, and keyboard flows — and verify during implementation.' },
    ],
    related: ['web-development', 'mobile-app-development', 'software-development'],
    cta: {
      title: 'Want users to love using your product?',
      description: 'Share your product and audience. We’ll suggest where design can make the biggest difference.',
      label: 'Talk to Our Design Team',
      to: '/contact?type=project&service=Product%20Development',
    },
  },
  {
    slug: 'quality-assurance',
    name: 'Quality Assurance & Testing',
    shortName: 'Quality Assurance',
    group: 'engineering',
    icon: ShieldCheck,
    summary: 'Manual, automated, API, and performance testing so every release ships with confidence.',
    seo: {
      title: 'Software Testing and Quality Assurance Services',
      description:
        'Quality assurance services: manual testing, functional and regression testing, API testing, test automation, performance testing, cross-device testing, and release readiness.',
    },
    hero: {
      eyebrow: 'Quality Assurance',
      title: 'Release With Confidence, Every Time.',
      description:
        'We plan and run the right mix of manual and automated testing so bugs are caught before your users find them — and releases stop being stressful.',
    },
    problem: {
      title: 'Bugs found by customers cost the most',
      body: 'Without a test strategy, every release risks breaking something that used to work. Teams slow down, users lose trust, and fixes interrupt planned work.',
      points: [
        'Regressions appearing after unrelated changes',
        'No repeatable checklist for releases',
        'APIs changing without anyone noticing downstream impact',
        'Performance problems discovered under real traffic',
      ],
    },
    deliverables: [
      { title: 'Test strategy', description: 'What to test, how, and when — matched to your risk and release cadence.' },
      { title: 'Test cases & execution', description: 'Functional, regression, and exploratory testing with clear bug reports.' },
      { title: 'Automation suites', description: 'UI, API, and integration tests running in your CI pipeline.' },
      { title: 'Release readiness report', description: 'A clear go / no-go view of open issues and risk before each release.' },
    ],
    capabilities: [
      {
        title: 'Quality Assurance',
        items: [
          'Manual testing',
          'Functional testing',
          'Regression testing',
          'API testing',
          'Automation testing',
          'Performance testing',
          'Cross-device testing',
          'Release readiness',
        ],
      },
    ],
    approach: [
      { title: 'Assess risk', description: 'Identify critical journeys and the areas most likely to break.' },
      { title: 'Plan coverage', description: 'Balance manual exploration with automation where it pays back.' },
      { title: 'Automate the repeatable', description: 'Regression and API suites wired into CI.' },
      { title: 'Report clearly', description: 'Reproducible bug reports with severity and evidence.' },
      { title: 'Improve continuously', description: 'Track escaped defects and strengthen coverage over time.' },
    ],
    technologies: [
      { group: 'Automation', items: ['Playwright', 'Cypress', 'Jest', 'Vitest'] },
      { group: 'API & performance', items: ['Postman', 'k6', 'JMeter'] },
      { group: 'Process', items: ['CI/CD integration', 'Test management', 'Bug tracking'] },
    ],
    useCases: [
      { title: 'Pre-launch QA', description: 'A structured test pass before a product goes live.' },
      { title: 'Regression automation', description: 'Stop old bugs from returning with an automated suite in CI.' },
      { title: 'API contract testing', description: 'Catch breaking API changes before they reach mobile or partner clients.' },
      { title: 'Load testing', description: 'Understand how your system behaves before a launch or campaign spike.' },
    ],
    faqs: [
      { question: 'Can you test software built by another team?', answer: 'Yes. We start by understanding the product, its users, and its release process, then propose a test plan.' },
      { question: 'Should everything be automated?', answer: 'No. Automation is best for stable, repeated checks. Exploratory and usability testing still need people. We recommend a balance based on your product.' },
      { question: 'Do you provide QA as an ongoing service?', answer: 'Yes, QA can be part of a dedicated team or retainer, aligned with your release schedule.' },
    ],
    related: ['software-development', 'cloud-devops', 'cybersecurity'],
    cta: {
      title: 'Ready to make releases boring — in a good way?',
      description: 'Tell us about your product and release cadence. We’ll suggest a practical testing approach.',
      label: 'Discuss Your QA Needs',
      to: '/contact?type=project&service=Software%20Development',
    },
  },
]
