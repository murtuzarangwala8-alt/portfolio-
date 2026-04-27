# Murtuza Rangwala - Portfolio Website

A modern, cinematic, and fully responsive portfolio website built with React, TypeScript, Three.js, and Framer Motion.

## 🚀 Features

- **Cinematic UI/UX**: Custom cursor, smooth animations, and parallax effects
- **3D Visuals**: Interactive Three.js background with mouse-reactive elements
- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **AI Chat Interface**: Talk to an AI assistant about skills, projects, and experience
- **Fully Responsive**: Mobile-first design that works on all devices
- **Performance Optimized**: Lazy loading, code splitting, and smooth 60fps animations
- **Accessible**: Semantic HTML, ARIA labels, and keyboard navigation

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS with custom theme
- **3D Graphics**: React Three Fiber + Three.js + Drei
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter + Space Grotesk (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   cd c:\Users\murta\Desktop\pro\website\portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── About.tsx          # About section with timeline
│   │   ├── AIChat.tsx         # AI chat interface
│   │   ├── Contact.tsx        # Contact form and info
│   │   ├── CustomCursor.tsx   # Custom mouse cursor
│   │   ├── Experience.tsx     # Professional experience timeline
│   │   ├── Hero.tsx           # Hero section with CTA
│   │   ├── Navbar.tsx         # Navigation bar
│   │   ├── Projects.tsx       # Project showcase
│   │   ├── Scene3D.tsx        # Three.js 3D background
│   │   └── Skills.tsx         # Skills visualization
│   ├── context/
│   │   └── ThemeContext.tsx   # Dark/light theme management
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles + Tailwind
├── public/
│   └── resume.pdf             # TODO: Add your resume here
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── package.json               # Dependencies
```

## 🎨 Customization Guide

### 1. Personal Information

Update the following files with your information:

**Hero Section** (`src/components/Hero.tsx`):
- Name, title, tagline
- Resume download link (line 32)

**About Section** (`src/components/About.tsx`):
- Timeline entries
- Personal narrative

**Experience Section** (`src/components/Experience.tsx`):
- Job roles, companies, dates
- Responsibilities and achievements

**Projects Section** (`src/components/Projects.tsx`):
- Project details, descriptions, tags
- GitHub and demo links (lines 20-80)

**Contact Section** (`src/components/Contact.tsx`):
- Email, LinkedIn, website, location
- Form submission endpoint (line 45)

### 2. AI Chat Integration

**Current State**: Mock responses based on keywords

**To integrate real LLM**:

1. Open `src/components/AIChat.tsx`
2. Find the `sendMessage` function (line 60)
3. Replace the mock implementation with your API call:

```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    message: userMessage,
    history: messages 
  })
});

const data = await response.json();
const assistantMsg: Message = {
  role: 'assistant',
  content: data.response,
  timestamp: new Date()
};
setMessages(prev => [...prev, assistantMsg]);
```

### 3. Contact Form Integration

**Current State**: Console logs form data

**To integrate real form submission**:

1. Open `src/components/Contact.tsx`
2. Find the `handleSubmit` function (line 30)
3. Options:
   - **EmailJS**: Sign up at emailjs.com and use their SDK
   - **Formspree**: Sign up at formspree.io and use their endpoint
   - **Custom Backend**: Create your own API endpoint

Example with fetch:
```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

### 4. Theme Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: { /* Your primary color shades */ },
  accent: { /* Your accent color shades */ }
}
```

### 5. Resume Download

1. Add your resume PDF to the `public/` folder
2. Name it `resume.pdf` or update the link in `Hero.tsx`

## 🎯 TODO Checklist

- [ ] Add your resume PDF to `public/resume.pdf`
- [ ] Update all personal information in components
- [ ] Add real project links (GitHub, demos)
- [ ] Integrate AI chat with LLM API
- [ ] Set up contact form backend
- [ ] Add project screenshots/images
- [ ] Configure SEO meta tags in `index.html`
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Deploy to hosting (Vercel, Netlify, AWS, etc.)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the `dist` folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push the `dist` folder to gh-pages branch
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Issues

- Custom cursor disabled on touch devices (by design)
- 3D scene may have reduced performance on low-end devices

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and customize for your own use!

## 📧 Contact

Murtuza Rangwala - murtuzarangwala8@gmail.com

---

Built with ❤️ using React, TypeScript, and Three.js
