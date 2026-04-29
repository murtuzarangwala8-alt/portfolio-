# Vercel Deployment Guide with Gemini AI Chatbot

## 🚀 Complete Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository: `murtuzarangwala8-alt/portfolio-`
4. Configure project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click "Deploy"

#### Option B: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Step 3: Add Gemini API Key to Vercel (CRITICAL)

⚠️ **NEVER put your API key in code or GitHub!**

1. Go to your Vercel project dashboard
2. Click **Settings** tab
3. Click **Environment Variables** (in the left sidebar)
4. Add the following:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `AIzaSyBFFtr7slYD6wczGddNtCaWvJI7vvTWf0w`
   - **Environment:** Select all (Production, Preview, Development)
5. Click **Save**
6. **Redeploy:** Go to Deployments → Click ⋯ on latest → Redeploy

### Step 4: Verify Deployment

1. Wait for deployment to complete (1-2 minutes)
2. Visit your site: `https://your-project.vercel.app`
3. Test the AI chatbot:
   - Click the chat button (bottom right)
   - Send a message: "Tell me about Murtuza's skills"
   - You should get an AI response

### Step 5: Custom Domain (murtuza.online)

1. Go to **Settings** → **Domains**
2. Click **Add Domain**
3. Enter: `murtuza.online`
4. Add DNS records at your domain registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
5. Vercel will automatically provision SSL certificate

## 🔧 How It Works

### Architecture

```
User Browser (Frontend)
    ↓
    ↓ POST /api/chat
    ↓
Vercel Serverless Function (Backend)
    ↓
    ↓ Uses GEMINI_API_KEY from env
    ↓
Google Gemini API
    ↓
    ↓ Returns AI response
    ↓
User sees response in chat
```

### Security Features

✅ API key stored in Vercel environment variables (NOT in code)
✅ API key NEVER exposed to frontend
✅ CORS headers configured
✅ Message length validation (500 char max)
✅ Error handling with fallback messages
✅ Automatic HTTPS with Vercel

### Files Created

```
api/
  chat.js              ← Vercel serverless function (backend)
vercel.json            ← Vercel configuration
src/components/
  FloatingAIChat.tsx   ← Updated to call /api/chat
```

## 🧪 Testing Locally

To test the Vercel function locally:

```bash
# Install Vercel CLI
npm install -g vercel

# Create .env.local file (DO NOT COMMIT THIS)
echo "GEMINI_API_KEY=AIzaSyBFFtr7slYD6wczGddNtCaWvJI7vvTWf0w" > .env.local

# Run local dev server
vercel dev
```

Visit: http://localhost:3000

## 🐛 Troubleshooting

### Chatbot says "temporarily unavailable"

**Check:**
1. Is `GEMINI_API_KEY` added to Vercel environment variables?
2. Did you redeploy after adding the key?
3. Check Vercel function logs: Project → Deployments → Click deployment → Functions tab

### Function not found (404)

**Check:**
1. Is `api/chat.js` in the repository?
2. Is `vercel.json` configured correctly?
3. Redeploy the project

### API key exposed in code

**Fix:**
1. Remove API key from code immediately
2. Regenerate API key at: https://aistudio.google.com/app/apikey
3. Add new key to Vercel environment variables
4. Never commit `.env` or `.env.local` files

## 📊 Monitoring

### Check Function Logs

1. Vercel Dashboard → Your project
2. Click **Deployments** tab
3. Click on latest deployment
4. Click **Functions** tab
5. View real-time logs and errors

### Check Usage

- Vercel Hobby (Free): 100GB bandwidth, 100 serverless function executions/day
- Gemini free tier: 15 requests/minute, 1500 requests/day

## 🔒 Security Best Practices

✅ API key in environment variables only
✅ Never commit `.env` or `.env.local` files
✅ Use `.gitignore` to exclude sensitive files
✅ Regenerate API keys if exposed
✅ Monitor function logs for suspicious activity
✅ Enable Vercel deployment protection

## 📝 Environment Variables Checklist

Before going live, verify:

- [ ] `GEMINI_API_KEY` added to Vercel
- [ ] Environment variable set for all environments (Production, Preview, Development)
- [ ] Site redeployed after adding key
- [ ] Chatbot tested and working
- [ ] No API keys in GitHub code
- [ ] `.env.local` file in `.gitignore`

## 🎉 Success!

Your chatbot is now:
- ✅ Secure (API key hidden)
- ✅ Scalable (serverless functions)
- ✅ Fast (edge deployment)
- ✅ Professional (Gemini AI powered)
- ✅ Global CDN (Vercel edge network)

## 🌐 Vercel vs Netlify

**Why Vercel?**
- ✅ Faster edge network
- ✅ Better Next.js/React support
- ✅ Simpler serverless functions
- ✅ Automatic preview deployments
- ✅ Built-in analytics
- ✅ Zero-config deployment

## 📱 Vercel Features

- **Automatic HTTPS:** SSL certificates provisioned automatically
- **Preview Deployments:** Every git push gets a unique URL
- **Edge Network:** Content served from 100+ locations worldwide
- **Analytics:** Built-in web analytics (optional)
- **Instant Rollbacks:** One-click rollback to previous deployments

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Gemini API Docs: https://ai.google.dev/docs
- Check function logs in Vercel dashboard
- Vercel Support: https://vercel.com/support
