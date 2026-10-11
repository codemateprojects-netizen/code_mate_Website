import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Info } from 'lucide-react'
import { getInsight, insights, type InsightBlock } from '../data/insights'
import { site } from '../config/site'
import { CtaBand } from '../components/ui/CtaBand'
import { HeroBackdrop, Breadcrumbs } from '../components/ui/PageHero'
import { Seo } from '../components/ui/Seo'
import { origin } from '../lib/seo'
import { formatDate } from '../lib/format'
import NotFound from './NotFound'

function Block({ block }: { block: InsightBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="mt-12 text-2xl font-semibold text-fg">{block.text}</h2>
    case 'p':
      return <p className="mt-5 text-[1.0625rem] leading-[1.8] text-muted">{block.text}</p>
    case 'ul':
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((i) => (
            <li key={i} className="flex gap-3 text-[1.0625rem] leading-relaxed text-muted">
              <span className="mt-3 size-1.5 shrink-0 rounded-full bg-aqua" aria-hidden />
              {i}
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="mt-5 space-y-3">
          {block.items.map((i, n) => (
            <li key={i} className="flex gap-3 text-[1.0625rem] leading-relaxed text-muted">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand/15 font-mono text-xs text-brand">{n + 1}</span>
              {i}
            </li>
          ))}
        </ol>
      )
    case 'callout':
      return (
        <p className="mt-8 flex gap-3 rounded-2xl border border-brand/30 bg-brand/[0.07] p-5 text-[1.0625rem] leading-relaxed text-fg">
          <Info className="mt-1 size-5 shrink-0 text-brand" aria-hidden />
          {block.text}
        </p>
      )
  }
}

export default function InsightDetail() {
  const { slug = '' } = useParams()
  const post = getInsight(slug)
  if (!post) return <NotFound />
  const others = insights.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: { '@type': 'Organization', name: site.name },
          publisher: { '@type': 'Organization', name: site.name },
          mainEntityOfPage: `${origin()}/insights/${post.slug}`,
        }}
      />
      <header className="relative overflow-hidden pt-32 pb-12 md:pt-40">
        <HeroBackdrop />
        <div className="container-site relative max-w-3xl">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Insights', to: '/insights' }, { label: post.category }]} />
          <h1 className="text-4xl font-semibold leading-[1.1] text-fg md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg text-muted">{post.excerpt}</p>
          <p className="mt-6 text-sm text-subtle">
            {post.author} · <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.readingMinutes} min read
          </p>
        </div>
      </header>

      <article className="container-site max-w-3xl pb-16">
        {post.body.map((b, i) => (
          <Block key={i} block={b} />
        ))}
        <Link to="/insights" className="mt-14 inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-aqua">
          <ArrowLeft className="size-4" aria-hidden /> All insights
        </Link>
      </article>

      {others.length > 0 && (
        <section className="border-t border-line bg-ink-900/40 py-16" aria-labelledby="more-insights">
          <div className="container-site">
            <h2 id="more-insights" className="text-xl font-semibold text-fg">
              Keep reading
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {others.map((o) => (
                <Link key={o.slug} to={`/insights/${o.slug}`} className="card-glow rounded-2xl border border-line bg-ink-950/60 p-6">
                  <p className="text-xs text-aqua">{o.category}</p>
                  <p className="mt-2 text-lg font-semibold text-fg">{o.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  )
}
