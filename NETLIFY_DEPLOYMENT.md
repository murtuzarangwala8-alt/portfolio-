# Netlify Deployment Guide with Gemini AI Chatbot

## 🚀 Complete Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
```

This will install `node-fetch` needed for the Netlify function.

### Step 2: Deploy to Netlify

#### Option A: Deploy via Netlify Dashboard (Recommended)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Select your repository: `murtuzarangwala8-alt/portfolio-`
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
6. Click "Deploy site"

#### Option B: Deploy via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Step 3: Add Gemini API Key to Netlify (CRITICAL)

⚠️ **NEVER put your API key in code or GitHub!**

1. Go to your Netlify site dashboard
2. Click **Site settings** (in the top menu)
3. Click **Environment variables** (in the left sidebar)
4. Click **Add a variable** button
5. Add the following:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `AIzaSyBFFtr7slYD6wczGddNtCaWvJI7vvTWf0w`
   - **Scopes:** Check "Same value for all deploy contexts"
6. Click **Create variable**
7. **Redeploy your site** (Netlify → Deploys → Trigger deploy → Deploy site)

### Step 4: Verify Deployment

1. Wait for deployment to complete (2-3 minutes)
2. Visit your site: `https://your-site-name.netlify.app`
3. Test the AI chatbot:
   - Click the chat button (bottom right)
   - Send a message: "Tell me about Murtuza's skills"
   - You should get an AI response

### Step 5: Custom Domain (Optional)

If using `murtuza.online`:

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter: `murtuza.online`
4. Follow DNS configuration instructions
5. Add these DNS records at your domain registrar:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: your-site-name.netlify.app
   ```

## 🔧 How It Works

### Architecture

```
User Browser (Frontend)
    ↓
    ↓ POST /.netlify/functions/chat
    ↓
Netlify Function (Backend)
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

✅ API key stored in Netlify environment variables (NOT in code)
✅ API key NEVER exposed to frontend
✅ CORS headers configured
✅ Message length validation (500 char max)
✅ Error handling with fallback messages
✅ Rate limiting via Netlify (automatic)

### Files Created

```
netlify/
  functions/
    chat.js          ← Serverless function (backend)
netlify.toml         ← Netlify configuration
src/components/
  FloatingAIChat.tsx ← Updated to call Netlify function
package.json         ← Added node-fetch dependency
```

## 🧪 Testing Locally

To test the Netlify function locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Create .env file (DO NOT COMMIT THIS)
echo "GEMINI_API_KEY=AIzaSyBFFtr7slYD6wczGddNtCaWvJI7vvTWf0w" > .env

# Run local dev server with functions
netlify dev
```

Visit: http://localhost:8888

## 🐛 Troubleshooting

### Chatbot says "temporarily unavailable"

**Check:**
1. Is `GEMINI_API_KEY` added to Netlify environment variables?
2. Did you redeploy after adding the key?
3. Check Netlify function logs: Site → Functions → chat → View logs

### Function not found (404)

**Check:**
1. Is `netlify.toml` in the root directory?
2. Is `functions = "netlify/functions"` set correctly?
3. Redeploy the site

### API key exposed in code

**Fix:**
1. Remove API key from code immediately
2. Regenerate API key at: https://aistudio.google.com/app/apikey
3. Add new key to Netlify environment variables
4. Never commit `.env` files (add to `.gitignore`)

## 📊 Monitoring

### Check Function Logs

1. Netlify Dashboard → Your site
2. Click **Functions** tab
3. Click **chat** function
4. View real-time logs and errors

### Check Usage

- Netlify free tier: 125,000 function requests/month
- Gemini free tier: 15 requests/minute, 1500 requests/day

## 🔒 Security Best Practices

✅ API key in environment variables only
✅ Never commit `.env` files
✅ Use `.gitignore` to exclude sensitive files
✅ Regenerate API keys if exposed
✅ Monitor function logs for suspicious activity
✅ Set up Netlify notifications for failed deploys

## 📝 Environment Variables Checklist

Before going live, verify:

- [ ] `GEMINI_API_KEY` added to Netlify
- [ ] Site redeployed after adding key
- [ ] Chatbot tested and working
- [ ] No API keys in GitHub code
- [ ] `.env` file in `.gitignore`

## 🎉 Success!

Your chatbot is now:
- ✅ Secure (API key hidden)
- ✅ Scalable (serverless functions)
- ✅ Fast (edge deployment)
- ✅ Professional (Gemini AI powered)

---

**Need Help?**
- Netlify Docs: https://docs.netlify.com
- Gemini API Docs: https://ai.google.dev/docs
- Check function logs in Netlify dashboard
