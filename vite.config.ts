import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { serviceSlugs, productSlugs, staticPaths } from './src/data/routes'
import { portfolio } from './src/data/portfolio'
import { insights } from './src/data/insights'

/**
 * Emits sitemap.xml and robots.txt at build time from the route data.
 * A sitemap needs absolute URLs, so it is only generated when VITE_SITE_URL
 * is set — otherwise robots.txt is emitted without a Sitemap line.
 */
function seoFiles(siteUrl: string | undefined): Plugin {
  return {
    name: 'syjen-seo-files',
    apply: 'build',
    generateBundle() {
      const base = siteUrl?.replace(/\/+$/, '')
      const paths = [
        ...staticPaths,
        ...serviceSlugs.map((s) => `/services/${s}`),
        ...productSlugs.map((s) => `/products/${s}`),
        ...portfolio.map((p) => `/portfolio/${p.slug}`),
        ...insights.map((p) => `/insights/${p.slug}`),
      ]

      let robots = 'User-agent: *\nAllow: /\nDisallow: /api/\n'
      if (base) {
        const today = new Date().toISOString().slice(0, 10)
        const urls = paths
          .map((p) => `  <url><loc>${base}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`)
          .join('\n')
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        })
        robots += `\nSitemap: ${base}/sitemap.xml\n`
      } else {
        this.warn('VITE_SITE_URL is not set — sitemap.xml was not generated.')
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL)],
    server: {
      // Forward form submissions to the local Express API during development.
      proxy: { '/api': `http://localhost:${env.PORT || 8787}` },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion'],
          },
        },
      },
    },
  }
})
