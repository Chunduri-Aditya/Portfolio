# Fixed Authentication Issue ✅

## Problem
You were getting a 403 error because HTTPS authentication wasn't configured.

## Solution
I've switched your remote from HTTPS to SSH, which uses your existing SSH keys.

**Changed from:**
```
https://github.com/Chunduri-Aditya/Portfolio.git
```

**Changed to:**
```
git@github.com:Chunduri-Aditya/Portfolio.git
```

## Now You Can Push!

Run this command:
```bash
git push -u origin main
```

This should work now! Your SSH keys are already set up and authenticated.

## After Pushing, Deploy to GitHub Pages:

```bash
npm run deploy
```

Then enable GitHub Pages in your repository settings:
1. Go to: https://github.com/Chunduri-Aditya/Portfolio
2. Settings → Pages
3. Source: `gh-pages` branch
4. Save

Your site will be live at: https://chunduri-aditya.github.io/Portfolio/
