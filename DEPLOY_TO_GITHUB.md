# Deploy Your Portfolio to GitHub Pages

Your repository is configured! Follow these steps:

## ✅ Already Done:
- ✅ Git repository initialized
- ✅ GitHub Pages configuration set up
- ✅ `gh-pages` package installed
- ✅ Deployment scripts added
- ✅ Base path configured for "Portfolio" repository

## 🚀 Next Steps:

### Step 1: Push Code to GitHub

```bash
git push -u origin main
```

This will upload all your code to GitHub.

### Step 2: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build your site
2. Deploy to the `gh-pages` branch
3. Take about 1-2 minutes

### Step 3: Enable GitHub Pages

1. Go to: https://github.com/Chunduri-Aditya/Portfolio
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**:
   - Branch: Select `gh-pages`
   - Folder: Select `/ (root)`
5. Click **Save**

### Step 4: Access Your Live Site

Your portfolio will be live at:
```
https://chunduri-aditya.github.io/Portfolio/
```

⏱️ **Note:** It may take 1-5 minutes for GitHub Pages to become active after enabling.

## 🔄 Future Updates

Whenever you make changes:

```bash
# 1. Commit your changes
git add .
git commit -m "Update portfolio"

# 2. Push to GitHub
git push

# 3. Deploy to GitHub Pages
npm run deploy
```

## 📝 Quick Reference

**Repository:** https://github.com/Chunduri-Aditya/Portfolio  
**Live Site:** https://chunduri-aditya.github.io/Portfolio/  
**Deploy Command:** `npm run deploy`

---

**Ready? Run these commands:**
```bash
git push -u origin main
npm run deploy
```

Then enable GitHub Pages in your repository settings!
