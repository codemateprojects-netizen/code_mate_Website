import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { insightCategories, insights, type InsightCategory } from '../data/insights'
import { cn } from '../lib/cn'
import { ease } from '../lib/motion'
import { formatDate } from '../lib/format'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { Seo } from '../components/ui/Seo'

export default function Insights() {
  const [cat, setCat] = useState<InsightCategory | 'all'>('all')
  const posts = [...insights].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).filter((p) => cat === 'all' || p.category === cat)

  return (
    <>
      <Seo title="Insights — AI, RAG, Software & Growth" description="Practical articles from Syjen Code on AI engineering, RAG, AI automation, software development, product engineering, startup technology, and digital marketing." />
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Insights' }]}
        eyebrow="Insights"
        title={
          <>
            Practical thinking on <span className="text-gradient">AI, software, and growth.</span>
          </>
        }
        description="Clear explanations and lessons from building products — written for founders, operators, and technical teams."
      />

      <section className="pb-20" aria-label="Articles">
        <div className="container-site">
          <div role="group" aria-label="Filter by topic" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
            {(['all', ...insightCategories] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={cn(
                  'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  cat === c ? 'border-brand bg-brand text-white' : 'border-line text-muted hover:border-line-strong hover:text-fg',
                )}
              >
                {c === 'all' ? 'All topics' : c}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {posts.map((p) => (
                <motion.article key={p.slug} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }} className="card-glow group relative flex flex-col rounded-2xl border border-line bg-ink-900/70 p-6">
                  <p className="text-xs font-medium text-aqua">{p.category}</p>
                  <h2 className="mt-3 text-xl font-semibold leading-snug text-fg">
                    <Link to={`/insights/${p.slug}`} className="after:absolute after:inset-0">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                  <p className="mt-6 flex items-center justify-between text-xs text-subtle">
                    <span>
                      <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time> · <Clock className="inline size-3" aria-hidden /> {p.readingMinutes} min read
                    </span>
                    <ArrowRight className="size-4 text-brand transition-transform group-hover:translate-x-1" aria-hidden />
                  </p>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {posts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-line-strong p-10 text-center">
              <p className="text-lg font-medium text-fg">No articles in this topic yet.</p>
              <p className="mt-2 text-muted">New articles are on the way.</p>
            </div>
          )}
        </div>
      </section>

      <CtaBand title="Have a question we haven’t covered?" description="We’re happy to talk through your situation — no preparation needed." primary={{ label: 'Book a Consultation', to: '/contact?type=consultation' }} secondary={null} />
    </>
  )
}
