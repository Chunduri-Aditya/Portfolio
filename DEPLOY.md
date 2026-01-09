# Quick Deployment Guide

Your portfolio is ready to deploy! Here are the easiest options:

## Option 1: Deploy with Vercel CLI (Fastest - ~2 minutes)

1. **Run the deployment command:**
   ```bash
   npx vercel
   ```

2. **Follow the prompts:**
   - Login to Vercel (will open browser)
   - Link to existing project? **No** (first time)
   - Project name: **portfolio** (or press Enter)
   - Directory: **./** (press Enter)
   - Override settings? **No** (press Enter)

3. **Your site will be live!** 
   - You'll get a URL like: `https://portfolio-xxxxx.vercel.app`
   - Production URL will be shown after deployment

4. **For production deployment:**
   ```bash
   npx vercel --prod
   ```

## Option 2: Deploy via GitHub + Vercel (Recommended for continuous deployment)

1. **Push to GitHub:**
   ```bash
   git init  # if not already a git repo
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/Portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite settings ✅
   - Click "Deploy"
   - **Future updates:** Just push to GitHub and Vercel auto-deploys!

## Option 3: Deploy with Netlify

1. **Install Netlify CLI:**
   ```bash
   npx netlify-cli login
   npx netlify-cli deploy --prod --dir=dist
   ```

## What's Already Configured

✅ `vercel.json` - Vercel configuration file created
✅ Build tested and working
✅ All TypeScript errors fixed
✅ Production build ready in `dist/` folder

## Your Portfolio URL

After deployment, you'll get a URL like:
- Vercel: `https://portfolio-xxxxx.vercel.app`
- Netlify: `https://xxxxx.netlify.app`

You can add a custom domain later in the platform's dashboard!

---

**Ready to deploy? Run:**
```bash
npx vercel
```
