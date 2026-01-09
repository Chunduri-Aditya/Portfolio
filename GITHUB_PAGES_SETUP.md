# GitHub Pages Deployment Guide

Complete guide to host your portfolio on GitHub Pages.

## Step 1: Update Repository Name

1. **Open `vite.config.ts`**
2. **Find this line:**
   ```typescript
   const REPO_NAME = 'Portfolio' // Change this to your actual repository name
   ```
3. **Replace `'Portfolio'` with your actual GitHub repository name**

   Examples:
   - If your repo is `my-portfolio` → `const REPO_NAME = 'my-portfolio'`
   - If your repo is `portfolio-website` → `const REPO_NAME = 'portfolio-website'`
   - If using user/organization page (`username.github.io`) → `const REPO_NAME = ''` (empty string)

## Step 2: Initialize Git Repository

If you haven't already:

```bash
git init
git add .
git commit -m "Initial commit - Portfolio website"
```

## Step 3: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `Portfolio` (or your chosen name)
4. Description: "Portfolio website"
5. Choose **Public** (required for free GitHub Pages)
6. **Don't** initialize with README, .gitignore, or license
7. Click **"Create repository"**

## Step 4: Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/Portfolio.git

# Replace YOUR_USERNAME with your actual GitHub username
# Replace Portfolio with your actual repository name

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 5: Deploy to GitHub Pages

Run this command:

```bash
npm run deploy
```

This will:
1. Build your site (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch
3. Take about 1-2 minutes

## Step 6: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

## Step 7: Access Your Site

Your portfolio will be live at:
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

For example:
- If username is `johndoe` and repo is `Portfolio`:
  → `https://johndoe.github.io/Portfolio/`

## Updating Your Site

Whenever you make changes:

```bash
# Make your changes, then:
git add .
git commit -m "Update portfolio"
git push

# Deploy the updated site:
npm run deploy
```

## Troubleshooting

### 404 Errors or Blank Page

1. **Check the base path in `vite.config.ts`**
   - Must match your repository name exactly
   - Case-sensitive!

2. **Verify GitHub Pages is enabled**
   - Settings → Pages → Source should be `gh-pages` branch

3. **Wait a few minutes**
   - GitHub Pages can take 1-5 minutes to update

### Assets Not Loading

- Ensure `base` path in `vite.config.ts` matches your repo name
- Check browser console for 404 errors
- Verify all files are in the `dist` folder after build

### Custom Domain (Optional)

1. Add a `CNAME` file in `public/` folder:
   ```
   yourdomain.com
   ```

2. Update DNS settings at your domain provider:
   - Type: `CNAME`
   - Name: `@` or `www`
   - Value: `YOUR_USERNAME.github.io`

3. In GitHub: Settings → Pages → Custom domain → Add your domain

## Quick Reference

```bash
# Initial setup (one time)
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/Portfolio.git
git push -u origin main
npm run deploy

# Future updates
git add .
git commit -m "Update"
git push
npm run deploy
```

## Important Notes

- ✅ Repository must be **Public** (or GitHub Pro for private)
- ✅ Base path in `vite.config.ts` must match repository name
- ✅ Always run `npm run deploy` after making changes
- ✅ GitHub Pages updates can take 1-5 minutes

---

**Your portfolio will be live at:** `https://YOUR_USERNAME.github.io/REPO_NAME/`
