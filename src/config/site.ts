/**
 * Central, editable company configuration.
 *
 * Everything a non-developer may need to change — contact details, service
 * area, booking link, social profiles, company profile PDF — lives here.
 * Values that differ per deployment come from environment variables
 * (see .env.example). Leave a value empty to hide the related UI.
 */

const env = import.meta.env

export interface SocialLink {
  label: 'LinkedIn' | 'Instagram' | 'Facebook' | 'YouTube' | 'X' | 'GitHub'
  href: string
}

export const site = {
  name: 'Syjen Code',
  tagline: 'Your Project Is Our Project. Your Success Is Our Mission.',
  secondaryTagline: 'From Idea to Development. From Launch to Market.',
  closingMessage: 'Your Project Is Our Project. Your Success Is Our Mission. From Development to Market, We Grow Together.',
  description:
    'Syjen Code combines software engineering, AI innovation, and digital marketing to help businesses build products, reach customers, and grow with confidence.',

  /** Public origin, e.g. https://www.example.com — used for canonical URLs and the sitemap. */
  url: (env.VITE_SITE_URL as string | undefined)?.replace(/\/+$/, '') ?? '',

  contact: {
    email: 'info@syjencode.in',
    /** Displayed as-is. Leave empty to hide. */
    phone: '8790899459',
    phoneLabel: 'Phone / WhatsApp',
    /** Leave empty — no office address is published. */
    address: '',
  },

  /** The geographic area the company actually serves. Used in copy and structured data. */
  serviceArea: 'Worldwide (remote-first)',
  serviceAreaSchema: 'Worldwide',

  /** Booking service (Calendly, Cal.com, Google Calendar appointment page…). Empty = hidden. */
  bookingUrl: (env.VITE_BOOKING_URL as string | undefined) ?? '',

  /** Path or URL to a downloadable company profile PDF (e.g. /syjen-code-profile.pdf). Empty = hidden. */
  companyProfileUrl: (env.VITE_COMPANY_PROFILE_URL as string | undefined) ?? '',

  /** Add real profiles only. Empty array = no social icons rendered. */
  social: [] as SocialLink[],

  /** POST endpoint for all forms. Defaults to the bundled Express API. */
  formEndpoint: (env.VITE_FORM_ENDPOINT as string | undefined) || '/api/inquiries',

  responseTimeNote: 'We aim to reply within one business day.',
} as const

export type SiteConfig = typeof site
