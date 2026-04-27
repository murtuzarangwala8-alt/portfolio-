# 🚀 Quick Start Guide

## Running the Portfolio Website

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Navigate to the portfolio directory**
   ```bash
   cd c:\Users\murta\Desktop\pro\website\portfolio
   ```

2. **Install dependencies** (if not already done)
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The site will be available at: `http://localhost:5173`
   - The terminal will show the exact URL

### Available Commands

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint to check code quality
```

### What You'll See

✅ **Hero Section** - Full-screen cinematic intro with 3D background
✅ **About Section** - Your story and timeline
✅ **Skills Section** - Categorized skills with progress bars
✅ **Projects Section** - Filterable project cards with 3D tilt effect
✅ **Experience Section** - Professional timeline
✅ **AI Chat Section** - Interactive chat interface (mock responses for now)
✅ **Contact Section** - Contact form and information

### Features to Test

1. **Theme Toggle** - Click the sun/moon icon in the navbar
2. **Custom Cursor** - Move your mouse around (desktop only)
3. **Smooth Scrolling** - Click navbar links to scroll to sections
4. **3D Background** - Move your mouse to see parallax effect
5. **AI Chat** - Try asking about skills, experience, or projects
6. **Responsive Design** - Resize your browser or test on mobile

### Next Steps

1. **Customize Content**
   - Update personal information in each component
   - Add your resume PDF to `public/resume.pdf`
   - Add project links and images

2. **Integrate APIs**
   - Connect AI chat to real LLM endpoint
   - Set up contact form backend

3. **Deploy**
   - Build: `npm run build`
   - Deploy `dist` folder to Vercel, Netlify, or your hosting

### Troubleshooting

**Port already in use?**
```bash
# Vite will automatically try the next available port
# Or specify a custom port:
npm run dev -- --port 3000
```

**Build errors?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3D scene not loading?**
- Check browser console for errors
- Ensure WebGL is supported in your browser
- Try a different browser (Chrome/Firefox recommended)

### Performance Tips

- The 3D scene is lazy-loaded for better initial load time
- Custom cursor is disabled on mobile devices
- Images and heavy components use lazy loading

---

**Need help?** Check the main README.md for detailed documentation.
