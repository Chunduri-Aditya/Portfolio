import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { CASE_STUDY_IDS } from './src/lib/caseStudies'

// GitHub Pages base path - update this to match your repository name
// If your repo is "Portfolio", keep it as "/Portfolio/"
// If your repo is "my-portfolio", change to "/my-portfolio/"
// For user/organization pages (username.github.io), use "/"
const REPO_NAME = 'Portfolio' // Change this to your actual repository name

const SITE_ORIGIN = 'https://chunduri-aditya.github.io'

/**
 * Every case-study route, derived from the data rather than from a committed
 * list, so a new project cannot ship with a sitemap that has never heard of it.
 *
 * This used to scrape `^\s{6}id: "..."` out of content.ts as raw text. That was
 * brittle in two ways: it broke on any reindent of the file, and it could only
 * see ids, not which projects actually have a page. `src/lib/caseStudies.ts`
 * imports cleanly here because content.ts's one import is `import type`, so
 * esbuild strips it and nothing pulls React into the config.
 */
function caseStudyIds(): string[] {
  if (CASE_STUDY_IDS.length === 0) throw new Error('sitemap: no case-study ids in content.ts')
  return CASE_STUDY_IDS
}

export default defineConfig({
  base: `/${REPO_NAME}/`, // Always use base path for GitHub Pages
  plugins: [
    react(),
    {
      name: 'copy-nojekyll',
      closeBundle() {
        copyFileSync(join(__dirname, '.nojekyll'), join(__dirname, 'dist', '.nojekyll'))
      },
    },
    {
      /**
       * Give every case-study route a real file, so GitHub Pages answers 200.
       *
       * Pages serves static files only, so /work/agent-shield had nothing to
       * match and fell through to 404.html, whose redirect restores the route
       * for anyone running JavaScript. That is fine for a reader and useless
       * for a crawler: the response is still HTTP 404, so the twelve URLs in
       * the sitemap were all advertised as missing. Verified on the live site
       * before this existed: status 404, while the page itself rendered as
       * "Agent Shield — Aditya Chunduri".
       *
       * Copying the built index.html to each route is enough, because assets
       * are referenced from the base path and so resolve at any depth. The
       * 404.html fallback stays for genuinely unknown paths.
       */
      name: 'emit-route-pages',
      closeBundle() {
        const html = readFileSync(join(__dirname, 'dist', 'index.html'), 'utf8')
        for (const id of caseStudyIds()) {
          const dir = join(__dirname, 'dist', 'work', id)
          mkdirSync(dir, { recursive: true })
          writeFileSync(join(dir, 'index.html'), html)
        }
      },
    },
    {
      name: 'generate-sitemap',
      closeBundle() {
        const base = `${SITE_ORIGIN}/${REPO_NAME}/`
        // Trailing slash matches the emitted directory index, so the canonical
        // URL is the one Pages serves directly rather than one it redirects to.
        const urls = ['', ...caseStudyIds().map((id) => `work/${id}/`)]
        const body = urls
          .map((path) => `  <url>\n    <loc>${base}${path}</loc>\n  </url>`)
          .join('\n')
        writeFileSync(
          join(__dirname, 'dist', 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
        )
      },
    },
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
})
