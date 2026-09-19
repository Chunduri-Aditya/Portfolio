import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// GitHub Pages base path - update this to match your repository name
// If your repo is "Portfolio", keep it as "/Portfolio/"
// If your repo is "my-portfolio", change to "/my-portfolio/"
// For user/organization pages (username.github.io), use "/"
const REPO_NAME = 'Portfolio' // Change this to your actual repository name

const SITE_ORIGIN = 'https://chunduri-aditya.github.io'

/**
 * Every project id in src/data/content.ts, which is also every case-study route.
 *
 * Read out of the source at build time rather than kept in a committed
 * sitemap, so a new project cannot ship with a sitemap that has never heard
 * of it. Ids are simple string literals on the Project objects, so a regex is
 * enough and there is no need to run the TypeScript.
 */
function projectIds(): string[] {
  const source = readFileSync(join(__dirname, 'src/data/content.ts'), 'utf8')
  const ids = [...source.matchAll(/^\s{6}id: "([a-z0-9-]+)",$/gm)].map((m) => m[1])
  if (ids.length === 0) throw new Error('sitemap: no project ids found in content.ts')
  return ids
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
        for (const id of projectIds()) {
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
        const urls = ['', ...projectIds().map((id) => `work/${id}/`)]
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
