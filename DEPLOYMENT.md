# 🚀 Deployment Guide

## Overview

This guide covers deploying your portfolio to popular hosting platforms. All platforms offer free tiers suitable for static sites.

---

## 1. Vercel (Recommended) ⭐

**Why Vercel?**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Instant deployments
- Free custom domain support

### Steps:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Build your project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow prompts**
   - Link to your Vercel account
   - Confirm project settings
   - Get your live URL!

### Custom Domain:
```bash
vercel --prod
vercel domains add yourdomain.com
```

### Environment Variables:
Add in Vercel dashboard under Settings → Environment Variables

---

## 2. Netlify

**Why Netlify?**
- Drag-and-drop deployment
- Form handling built-in
- Serverless functions
- Free SSL

### Option A: Drag & Drop

1. Build your project:
   ```bash
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com)

3. Drag the `dist` folder to the deploy zone

### Option B: CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

### Custom Domain:
Add in Netlify dashboard under Domain Settings

---

## 3. GitHub Pages

**Why GitHub Pages?**
- Free hosting from GitHub
- Easy integration with Git workflow
- Custom domain support

### Steps:

1. **Install gh-pages**
   ```bash
   npm install -D gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/portfolio",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/portfolio/', // Your repo name
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repo Settings → Pages
   - Source: gh-pages branch
   - Save

---

## 4. AWS Amplify

**Why AWS Amplify?**
- Full AWS integration
- CI/CD pipeline
- Backend services available

### Steps:

1. Push code to GitHub/GitLab/Bitbucket

2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)

3. Click "New app" → "Host web app"

4. Connect your repository

5. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

6. Deploy!

---

## 5. Cloudflare Pages

**Why Cloudflare Pages?**
- Fastest global CDN
- Unlimited bandwidth
- Built-in analytics

### Steps:

1. Push code to GitHub/GitLab

2. Go to [Cloudflare Pages](https://pages.cloudflare.com)

3. Create a new project

4. Connect your repository

5. Configure build:
   - Build command: `npm run build`
   - Build output directory: `dist`

6. Deploy!

---

## Pre-Deployment Checklist

Before deploying, ensure you've completed:

- [ ] Updated all personal information
- [ ] Added resume PDF to `public/resume.pdf`
- [ ] Updated project links (GitHub, demos)
- [ ] Tested on multiple browsers
- [ ] Tested responsive design on mobile
- [ ] Optimized images (if any)
- [ ] Set up analytics (optional)
- [ ] Configured custom domain (optional)
- [ ] Set up contact form backend
- [ ] Integrated AI chat API (optional)

---

## Environment Variables

If you need environment variables (for APIs, etc.):

### Vercel:
```bash
vercel env add VITE_API_KEY
```

### Netlify:
Add in dashboard: Site settings → Environment variables

### GitHub Pages:
Use GitHub Secrets and GitHub Actions

### Example .env file:
```env
VITE_AI_API_KEY=your_api_key_here
VITE_CONTACT_API_URL=https://api.example.com/contact
```

**Important**: Prefix all variables with `VITE_` for Vite to expose them to the client.

---

## Custom Domain Setup

### 1. Purchase Domain
- Namecheap, GoDaddy, Google Domains, Cloudflare

### 2. Configure DNS

**For Vercel/Netlify:**
- Add A record: `@` → Platform IP
- Add CNAME: `www` → Platform domain

**For GitHub Pages:**
- Add A records to GitHub IPs:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- Add CNAME: `www` → `yourusername.github.io`

### 3. Enable HTTPS
Most platforms enable HTTPS automatically. Wait 24-48 hours for DNS propagation.

---

## Performance Optimization

### Before Deployment:

1. **Optimize Images**
   ```bash
   npm install -D vite-plugin-imagemin
   ```

2. **Enable Compression**
   Most platforms do this automatically

3. **Analyze Bundle**
   ```bash
   npm run build -- --mode analyze
   ```

4. **Lazy Load Components**
   Already implemented for 3D scene

---

## Monitoring & Analytics

### Google Analytics
Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Plausible (Privacy-friendly)
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist .vite
npm install
npm run build
```

### 404 on Refresh
Add `_redirects` file to `public/`:
```
/*    /index.html   200
```

### Environment Variables Not Working
- Ensure they start with `VITE_`
- Restart dev server after adding
- Check platform-specific docs

---

## Post-Deployment

1. **Test Everything**
   - All links work
   - Forms submit correctly
   - Mobile responsive
   - Theme toggle works
   - AI chat functions

2. **Submit to Search Engines**
   - Google Search Console
   - Bing Webmaster Tools

3. **Share Your Portfolio**
   - LinkedIn
   - Twitter
   - GitHub profile
   - Resume

---

**Need help?** Check platform-specific documentation or open an issue.

Good luck with your deployment! 🚀
