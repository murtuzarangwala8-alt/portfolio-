import { motion } from 'framer-motion';
import { Download, Briefcase, Sparkles, ExternalLink, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showWidget, setShowWidget] = useState(true);
  
  useEffect(() => {
    if (showWidget) {
      // Clear any existing content
      const container = document.getElementById('tradingview-widget-container');
      if (container) {
        container.innerHTML = '';
        
        // Create widget wrapper
        const widgetDiv = document.createElement('div');
        widgetDiv.className = 'tradingview-widget-container__widget';
        container.appendChild(widgetDiv);
        
        // Load TradingView widget script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
          "symbol": "OANDA:SPX500USD",
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "dateRange": "1D",
          "colorTheme": "dark",
          "isTransparent": false,
          "autosize": true,
          "largeChartUrl": ""
        });
        
        widgetDiv.appendChild(script);
      }
    }
  }, [showWidget]);

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!showWidget) {
    return (
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-beige via-white to-pink/10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 pt-20">
        {/* Premium Grid Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(254,179,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(254,179,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,94,108,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(254,179,0,0.1),transparent_50%)]" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-500/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <HeroContent 
          showTooltip={showTooltip}
          setShowTooltip={setShowTooltip}
          scrollToSection={scrollToSection}
        />
      </section>
    );
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-beige via-white to-pink/10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 pt-20">
      {/* Premium Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(254,179,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(254,179,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,94,108,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(254,179,0,0.1),transparent_50%)]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Real TradingView S&P 500 Widget - Ultra Compact - Hidden on Mobile */}
      <motion.div
        drag
        dragConstraints={{
          top: -200,
          left: -300,
          right: 300,
          bottom: 200,
        }}
        dragElastic={0.1}
        whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
        initial={{ opacity: 0, scale: 0.95, x: 80, y: -40 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="hidden md:block fixed top-24 right-8 z-50 cursor-grab"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="w-[280px] bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Minimal Header */}
          <div className="px-3 py-1.5 flex items-center justify-between bg-gray-900/90">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-white/90">S&P 500</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowWidget(false)}
              className="p-0.5 hover:bg-white/10 rounded transition-colors"
            >
              <X size={14} className="text-white/60" />
            </motion.button>
          </div>

          {/* Ultra Compact Widget */}
          <div className="relative bg-gray-900" style={{ height: '140px', overflow: 'hidden' }}>
            <div 
              id="tradingview-widget-container"
              className="tradingview-widget-container w-full h-full"
              style={{ 
                border: 'none', 
                margin: 0, 
                padding: 0,
                transform: 'scale(1.15)',
                transformOrigin: 'center center'
              }}
            />
          </div>

          {/* Minimal Footer */}
          <div className="px-3 py-1 bg-gray-900/90 flex items-center justify-between">
            <span className="text-[8px] text-white/25">TradingView</span>
            <motion.a
              href="https://www.tradingview.com/symbols/SPX500USD/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-0.5 text-[8px] text-primary-400/80 hover:text-primary-300 transition-colors"
            >
              Chart
              <ExternalLink size={8} />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      <HeroContent 
        showTooltip={showTooltip}
        setShowTooltip={setShowTooltip}
        scrollToSection={scrollToSection}
      />
    </section>
  );
};

// Separate Hero Content Component
const HeroContent = ({ 
  showTooltip, 
  setShowTooltip, 
  scrollToSection 
}: { 
  showTooltip: boolean;
  setShowTooltip: (show: boolean) => void;
  scrollToSection: (id: string) => void;
}) => (
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 md:py-10">
    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
      {/* Left Side - Photo */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative order-1 lg:order-1 flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-10"
      >
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-[260px] sm:max-w-[340px] md:max-w-md mx-auto"
        >
          <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-3 sm:border-4 border-primary-500 shadow-2xl bg-gradient-to-br from-primary-100 to-accent-100">
            <img 
              src="/profile-photo.png" 
              alt="Murtuza Rangwala - Finance and Data Analyst specializing in Investment Banking and Financial Modeling" 
              className="w-full h-full object-cover"
              loading="eager"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23feb300" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="140" fill="white"%3EMR%3C/text%3E%3C/svg%3E';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute -bottom-3 sm:-bottom-4 md:-bottom-5 left-1/2 transform -translate-x-1/2 w-full px-2 sm:px-4"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <motion.div whileHover={{ scale: 1.05 }} className="relative flex justify-center">
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(254,179,0,0.3)',
                    '0 0 30px rgba(255,94,108,0.4)',
                    '0 0 20px rgba(254,179,0,0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-xl border-2 border-white dark:border-gray-900 cursor-pointer"
              >
                <Sparkles size={10} className="animate-pulse" />
                <span className="whitespace-nowrap">🟢 Open to Work</span>
              </motion.div>

              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hidden sm:block absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg text-xs shadow-xl z-50 w-72 text-center"
                >
                  <p className="font-semibold mb-1">Available for opportunities in:</p>
                  <p>🇮🇹 Italy &nbsp;·&nbsp; 🇩🇪 Germany &nbsp;·&nbsp; 🇳🇱 Netherlands</p>
                  <p className="mt-1">& across Europe — Remote or On-site</p>
                  <p className="mt-1 opacity-75">Internships · Analyst roles · Consulting</p>
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          <div className="hidden sm:block absolute -z-10 top-1/4 -left-12 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="hidden sm:block absolute -z-10 bottom-1/4 -right-12 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl" />
        </motion.div>
      </motion.div>

      {/* Right Side - Text Content */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-2 mt-6 sm:mt-8 lg:mt-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-0 md:mt-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 font-normal block mb-2">
              Hi, I'm Murtuza Rangwala
            </span>
            <span className="block">
              <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-accent-600 bg-clip-text text-transparent font-extrabold">
                Finance & Data Analytics
              </span>
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Data Science | Financial Modeling | Data Analytics
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl space-y-4"
        >
          <span className="block">
            I specialize in transforming complex data into actionable insights through a combination of data science, statistical modeling, and financial analysis.
          </span>
          
          <span className="block">
            With a strong foundation in machine learning, econometrics, and quantitative methods, I develop data-driven solutions across finance, consulting, and analytics-driven environments, including applications in investment banking.
          </span>
          
          <span className="block font-semibold text-gray-900 dark:text-white">
            My core expertise includes:
          </span>
          
          <span className="block ml-4">
            • Data Analysis & Machine Learning using{' '}
            <span className="font-bold text-primary-600 dark:text-primary-400">Python</span>
            <br />
            • <span className="font-bold text-accent-600 dark:text-accent-400">SQL</span> & Data Management
            <br />
            • Econometric & Statistical Modeling
            <br />
            • <span className="font-bold text-primary-600 dark:text-primary-400">Financial Modeling</span> & Valuation
          </span>
          
          <span className="block">
            I work with structured and real-world datasets to uncover patterns, build predictive models, and support decision-making with clear, data-backed insights.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
        >
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(254,179,0,0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all text-sm sm:text-base"
          >
            <Download size={18} className="sm:w-5 sm:h-5" />
            Download Resume
          </motion.a>
          
          <motion.button
            onClick={() => scrollToSection('#projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-xl font-bold hover:bg-primary-500 hover:text-white transition-all text-sm sm:text-base"
          >
            <Briefcase size={18} className="sm:w-5 sm:h-5" />
            View Projects
            <ExternalLink size={14} className="sm:w-4 sm:h-4" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap gap-2 max-w-xl"
        >
          {['Python', 'R', 'SQL', 'Machine Learning', 'Power BI', 'Financial Modeling', 'React'].map((tech, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-gray-800 border border-primary-500/30 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:shadow-md hover:border-primary-500 transition-all cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>

    {/* Scroll Indicator - Hidden on Mobile */}
    <motion.div
      className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
    >
      <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center p-2">
        <motion.div 
          className="w-1.5 h-3 bg-primary-500 rounded-full"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </motion.div>
  </div>
);

export default Hero;
