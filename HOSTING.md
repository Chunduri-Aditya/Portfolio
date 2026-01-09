# Portfolio Hosting Instructions

This guide provides step-by-step instructions for hosting your portfolio on various platforms.

## Prerequisites

1. **Build your portfolio locally first:**
   ```bash
   npm install
   npm run build
   ```
   This creates a `dist` folder with production-ready files.

2. **Test the build locally:**
   ```bash
   npm run preview
   ```
   Visit `http://localhost:4173` to verify everything works.

---

## Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest option for React/Vite apps with automatic deployments.

### Steps:

1. **Install Vercel CLI (optional but recommended):**
   ```bash
   npm i -g vercel
   ```

2. **Deploy via CLI:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - It will detect Vite automatically
   - Your site will be live in ~30 seconds

3. **Or deploy via GitHub:**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

### Vercel Configuration (Optional)

Create `vercel.json` in your project root:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

**Pros:**
- ✅ Free tier with custom domains
- ✅ Automatic HTTPS
- ✅ Instant deployments on git push
- ✅ Preview deployments for PRs
- ✅ Zero configuration needed

**URL Format:** `your-portfolio.vercel.app`

---

## Option 2: Netlify

Netlify is another excellent option with similar features to Vercel.

### Steps:

1. **Install Netlify CLI (optional):**
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy via CLI:**
   ```bash
   netlify deploy --prod
   ```
   - First time: `netlify login` and `netlify init`
   - Follow prompts

3. **Or deploy via GitHub:**
   - Push your code to GitHub
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repo
   - Build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy site"

### Netlify Configuration (Optional)

Create `netlify.toml` in your project root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Pros:**
- ✅ Free tier with custom domains
- ✅ Automatic HTTPS
- ✅ Continuous deployment
- ✅ Form handling (if needed later)

**URL Format:** `your-portfolio.netlify.app`

---

## Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

### Steps:

1. **Install gh-pages package:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://YOUR_USERNAME.github.io/Portfolio"
   }
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

3. **Update `vite.config.js`:**
   ```js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/Portfolio/', // Replace 'Portfolio' with your repo name
     test: {
       globals: true,
       environment: 'jsdom',
     },
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: `gh-pages` branch
   - Save

**Pros:**
- ✅ Completely free
- ✅ Integrated with GitHub
- ✅ Custom domain support

**Cons:**
- ⚠️ Requires repo to be public (or GitHub Pro for private)
- ⚠️ Slightly more setup required

**URL Format:** `YOUR_USERNAME.github.io/Portfolio`

---

## Option 4: Cloudflare Pages

Fast, free hosting with excellent performance.

### Steps:

1. **Push code to GitHub/GitLab/Bitbucket**

2. **Go to Cloudflare Dashboard:**
   - Visit [dash.cloudflare.com](https://dash.cloudflare.com)
   - Workers & Pages → Create application → Pages

3. **Connect your Git provider:**
   - Select your repository
   - Build settings:
     - **Framework preset:** Vite
     - **Build command:** `npm run build`
     - **Build output directory:** `dist`
   - Click "Save and Deploy"

**Pros:**
- ✅ Free tier with generous limits
- ✅ Fast global CDN
- ✅ Automatic HTTPS
- ✅ Preview deployments

**URL Format:** `your-portfolio.pages.dev`

---

## Option 5: Traditional Web Hosting (cPanel, FTP)

If you have a traditional hosting account:

### Steps:

1. **Build your site:**
   ```bash
   npm run build
   ```

2. **Upload contents of `dist` folder:**
   - Use FTP client (FileZilla, Cyberduck) or cPanel File Manager
   - Upload all files from `dist/` to `public_html/` (or your web root)

3. **Ensure `index.html` is in the root:**
   - Your hosting should serve `index.html` automatically

**Note:** Make sure your hosting supports static sites and has proper `.htaccess` or server config for SPA routing.

---

## Custom Domain Setup

### For Vercel/Netlify/Cloudflare:

1. **Add domain in dashboard:**
   - Go to your project settings
   - Add your custom domain (e.g., `portfolio.yourdomain.com`)

2. **Update DNS:**
   - Add CNAME record pointing to:
     - Vercel: `cname.vercel-dns.com`
     - Netlify: `your-site.netlify.app`
     - Cloudflare: `your-site.pages.dev`

3. **Wait for SSL:**
   - HTTPS certificate is automatically provisioned (usually < 5 minutes)

---

## Environment Variables

If you need environment variables:

1. **Create `.env` file locally:**
   ```env
   VITE_API_URL=https://api.example.com
   ```

2. **Add to hosting platform:**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Cloudflare: Pages Settings → Environment Variables

3. **Rebuild:**
   - Variables are injected at build time
   - Access via `import.meta.env.VITE_API_URL`

---

## Troubleshooting

### Build Fails

- Check Node.js version (should be 16+)
- Run `npm install` again
- Check for TypeScript errors if using TS

### 404 Errors on Refresh

- Ensure your hosting platform has SPA routing configured
- For GitHub Pages, the `base` in `vite.config.js` is critical
- For Netlify, the `_redirects` file or `netlify.toml` is needed

### Assets Not Loading

- Check that `base` path in `vite.config.js` matches your deployment path
- Verify all assets are in the `dist` folder after build

### Performance Issues

- Run `npm run build` and check bundle size
- Consider code splitting if bundle is large
- Enable gzip/brotli compression on your hosting platform

---

## Recommended: Vercel

For this portfolio, **Vercel is recommended** because:
- Zero configuration needed
- Automatic deployments
- Best performance for React apps
- Free tier is generous
- Easy custom domain setup

**Quick Start:**
```bash
npm i -g vercel
vercel
```

That's it! Your portfolio will be live in under a minute.

---

## Next Steps After Deployment

1. ✅ Test all links and functionality
2. ✅ Check mobile responsiveness
3. ✅ Verify PDF downloads work (resume, papers)
4. ✅ Test FAQ bot functionality
5. ✅ Set up custom domain (optional)
6. ✅ Add analytics (optional - Google Analytics, Plausible, etc.)

---

## Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Vite Deployment Guide:** https://vitejs.dev/guide/static-deploy.html
