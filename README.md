# Syjen Code — Website

> **Your Project Is Our Project. Your Success Is Our Mission.**
> From Development to Market, We Grow Together.

The marketing and sales website for Syjen Code: software development, AI solutions (RAG, agents), digital marketing, and the company's products (SyjenHire, SyjenEvilo, Buddy AI). It is built to work both as a lead-generation site and as an interactive presentation during client meetings (see `/solutions`).

---

## Stack

| Layer | Choice |
|---|---|
| Frontend | React 19, TypeScript, Vite 7 |
| Styling | Tailwind CSS 4 (design tokens in `src/index.css`) |
| Animation | Motion for React (`framer-motion`), CSS keyframes, SVG |
| Routing | React Router 7, every page lazy-loaded |
| Icons | Lucide React |
| Forms API | Node.js + Express 5 (`server/index.ts`), run directly with Node's built-in TypeScript support |

**Deliberately not included:** GSAP and Three.js. Motion's `useScroll` handles all scroll-linked scenes (partnership journey, timelines, progress bar), so a second animation library would compete with it. The hero visual is SVG/CSS, which avoids a ~600 KB 3D bundle and stays smooth on mobile and during screen sharing.

Requires **Node.js 22.18+**.

---

## Quick start

```bash
npm install
cp .env.example .env        # then edit values (all optional for local dev)

# Terminal 1 — website (http://localhost:5173)
npm run dev

# Terminal 2 — forms API (http://localhost:8787, proxied at /api by Vite)
npm run dev:api
```

### Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with hot reload |
| `npm run dev:api` | Forms API with auto-restart; loads `.env` |
| `npm run build` | Type-checks (app, server, config), builds to `dist/` (incl. `sitemap.xml`, `robots.txt`) and bundles the Vercel function |
| `npm start` | Production server: serves `dist/` **and** the API from one process |
| `npm run lint` | ESLint (React hooks + React Compiler rules) |
| `npm run typecheck` | TypeScript only |

---

## Editing content — no React knowledge needed

| What | Where |
|---|---|
| Company name, taglines, **email, phone**, service area, booking link, company-profile PDF, social links | `src/config/site.ts` |
| Service pages (16) — hero, problem, deliverables, capabilities, approach, technologies, use cases, FAQs, CTA | `src/data/services/*.ts` |
| **Products** (SyjenHire, SyjenEvilo, Buddy AI) — copy, features, status, screenshots, roadmap | `src/data/products.ts` |
| Portfolio projects | `src/data/portfolio.ts` |
| Insights articles | `src/data/insights.ts` |
| Partnership journey, process stages, engagement models, differentiators, mission, vision, values | `src/data/company.ts` |
| Industries | `src/data/industries.ts` |
| Job openings (empty → expression-of-interest form only) | `src/data/careers.ts` |
| AI demo sample data (RAG questions, agent trace) | `src/data/demos.ts` |
| Colours, fonts, motion tokens | `src/index.css` (`@theme`) |

Service and product URLs are listed in `src/data/routes.ts`. Adding a slug there without content shows a console error in development.

### Content honesty rules built into the site
- Every simulated interface, chart, and AI response shows a visible **Demonstration / Sample data** label. No live model is called.
- Product features show "availability confirmed during your demo" until `featuresVerified: true` is set.
- Product roadmaps render only when `roadmap.approved` is `true`.
- No testimonials, ratings, client logos, or company statistics are shown, because none were supplied.
- Contact details, social links, and booking links render only when they are configured.

---

## Forms and the API

All five forms (project, consultation, product demo, marketing proposal, careers) POST JSON to `VITE_FORM_ENDPOINT`, which defaults to `/api/inquiries`.

- **One shared schema** (`shared/inquiry.ts`) validates on both the browser and the server.
- **Spam protection:** a honeypot field, a minimum fill time (clock-independent), and a per-IP rate limit (5 per 10 minutes by default).
- **Delivery:** each submission is appended to `server/data/inquiries.jsonl`. It is also emailed via Resend and/or posted to a webhook when those are configured.
- **Honest success state:** the "Thank you" message appears **only** when the endpoint replies with JSON `{ "ok": true }`. If the API can't be reached, visitors see an error with a pre-filled email fallback.
- Secrets (`RESEND_API_KEY` etc.) live only on the server. Only `VITE_*` variables reach the browser.

> The JSONL file is fine for low volume on a server with persistent disk. For ephemeral hosts, configure email/webhook delivery or replace `store()` in `server/index.ts` with a database insert (e.g. PostgreSQL).

## Environment variables

See [`.env.example`](.env.example) for the full annotated list. The essentials:

| Variable | Side | Purpose |
|---|---|---|
| `VITE_SITE_URL` | build | Canonical URLs, Open Graph URLs, **sitemap.xml** (not generated if empty) |
| `VITE_FORM_ENDPOINT` | build | Form POST URL (default `/api/inquiries`) |
| `VITE_BOOKING_URL` | build | Shows "Open booking calendar" buttons |
| `VITE_COMPANY_PROFILE_URL` | build | Shows "Download company profile" buttons |
| `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL` | server | Email notifications |
| `INQUIRY_WEBHOOK_URL` | server | Forward submissions to Slack, Zapier, a CRM… |
| `TRUST_PROXY` | server | `true` behind a proxy/load balancer, so rate limits see real IPs |

---

## Deployment

### Vercel (current setup)
The repo is ready for Vercel with zero extra configuration — `vercel.json` sets the build, SPA routing, security headers, and asset caching.

- **Pages** are served from `dist/`; every non-`/api` URL falls back to `index.html`.
- **Forms** go to a serverless function at `/api/inquiries` (`api/inquiries.js`, generated from `server/vercel.ts` by `npm run build:api` and committed). After changing anything in `server/` or `shared/`, run `npm run build` (or `npm run build:api`) and commit the regenerated file.
- Vercel's filesystem is temporary, so the function delivers by **email and/or webhook**. In *Project → Settings → Environment Variables* add either:
  - `RESEND_API_KEY`, `INQUIRY_TO_EMAIL=info@syjencode.in`, `INQUIRY_FROM_EMAIL=website@syjencode.in` (domain verified in Resend), and/or
  - `INQUIRY_WEBHOOK_URL` (Slack, Zapier, Make, a CRM…).
  Until one is set, forms show a friendly "please email us" message with a pre-filled email link — never a false success.
- `VITE_SITE_URL` should be your custom domain (e.g. `https://www.syjencode.in`). If unset, the build falls back to Vercel's production domain for canonical URLs and the sitemap.
- Pushes to `main` deploy to production; other branches get preview URLs.
- Rate limiting in serverless functions is per instance (best effort). For stricter limits, add Vercel Firewall rate-limit rules for `/api/inquiries`.

### Any Node host (Render, Railway, Fly.io, VPS)

```bash
npm ci
VITE_SITE_URL=https://www.your-domain.com npm run build
npm start            # serves the site + /api on $PORT, also stores submissions in server/data/
```
Set `TRUST_PROXY=true` behind the host's proxy.

## Project structure

```
server/            Form handling core, Express server, Vercel function source
api/               Generated Vercel function bundle (do not edit)
shared/            Validation schema shared by browser and server
public/            favicon, app icons, manifest, og-image.png
src/
  config/site.ts   ← company details & feature toggles
  data/            ← all page content (services, products, portfolio, …)
  components/
    layout/        Navbar (mega menu, mobile menu), Footer, Layout
    ui/            Buttons, Section, Reveal, PageHero, Dialog, Accordion, Seo, …
    sections/      Hero, PartnershipJourney, ServicesOverview, AiShowcase, …
    visuals/       HeroVisual, RagPipeline, AgentWorkflow, Marketing (funnel, charts)
    mockups/       Product and AI interface mockups
    forms/         InquiryForm (all five forms)
  hooks/ lib/      Media queries, focus trap, scroll lock, motion presets, SEO helpers
  pages/           One file per route (lazy-loaded)
legacy/            Previous single-page site components (kept for reference; not built)
```

## Accessibility & motion
- Semantic landmarks, one `<h1>` per page, skip link, visible focus rings, labelled forms with announced errors.
- Menus and dialogs support keyboard use, Escape to close, focus trapping, and scroll locking.
- `prefers-reduced-motion` is respected globally. Motion animations reduce automatically, CSS loops stop, and demos don't autoplay.
- On `/solutions`, the **← / →** keys move between chapters during presentations.

## SEO
Per-route title, description, canonical, Open Graph, and Twitter tags; JSON-LD for Organization, Service, FAQPage, BreadcrumbList, SoftwareApplication, and Article; a build-time `sitemap.xml` and `robots.txt`. This is a client-rendered SPA. Google renders JavaScript, but if you need metadata visible to crawlers that don't, add prerendering (e.g. `vite-plugin-prerender`) later.
