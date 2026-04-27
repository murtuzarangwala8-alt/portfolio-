import { motion, useAnimation } from 'framer-motion';
import { Download, Briefcase, TrendingUp, Sparkles, ExternalLink, GripVertical } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [spData, setSpData] = useState<number[]>([45, 52, 48, 65, 58, 72, 68, 85, 78, 92]);
  const [currentPrice, setCurrentPrice] = useState<number>(4500.25);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const controls = useAnimation();
  
  useEffect(() => {
    // Animate bars on load
    controls.start(i => ({
      height: `${spData[i]}%`,
      transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" }
    }));

    // Fetch real S&P 500 data
    const fetchSPData = async () => {
      try {
        // Using Alpha Vantage API (free tier)
        // TODO: Replace with your API key from https://www.alphavantage.co/support/#api-key
        const API_KEY = 'demo'; // Replace with your actual API key
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=SPY&interval=5min&apikey=${API_KEY}`
        );
        const data = await response.json();
        
        if (data['Time Series (5min)']) {
          const timeSeries = data['Time Series (5min)'];
          const prices = Object.values(timeSeries).slice(0, 10).map((entry: any) => 
            parseFloat(entry['4. close'])
          ).reverse();
          
          // Normalize prices to percentage for chart
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          const normalized = prices.map(price => 
            40 + ((price - minPrice) / (maxPrice - minPrice)) * 55
          );
          
          setSpData(normalized);
          setCurrentPrice(prices[prices.length - 1]);
          setPriceChange(((prices[prices.length - 1] - prices[0]) / prices[0]) * 100);
        }
      } catch (error) {
        console.log('Using demo data - Add your Alpha Vantage API key for live S&P 500 data');
        // Fallback to simulated data
        simulateLiveData();
      }
    };

    // Simulate live data if API fails
    const simulateLiveData = () => {
      const interval = setInterval(() => {
        setSpData(prev => {
          const newData = [...prev.slice(1), Math.min(95, Math.max(40, prev[prev.length - 1] + (Math.random() - 0.48) * 8))];
          return newData;
        });
        setCurrentPrice(prev => prev + (Math.random() - 0.5) * 2);
        setPriceChange(prev => prev + (Math.random() - 0.5) * 0.1);
      }, 3000);
      
      return interval;
    };

    // Initial fetch
    fetchSPData();
    
    // Update every 30 seconds
    const fetchInterval = setInterval(fetchSPData, 30000);
    const simulateInterval = simulateLiveData();
    
    return () => {
      clearInterval(fetchInterval);
      clearInterval(simulateInterval);
    };
  }, [controls]);

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-beige via-white to-pink/10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
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

      {/* Draggable Live S&P 500 Card */}
      <motion.div
        drag
        dragConstraints={{
          top: -300,
          left: -400,
          right: 400,
          bottom: 300,
        }}
        dragElastic={0.1}
        whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
        initial={{ opacity: 0, scale: 0.8, x: 100, y: -100 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed top-24 right-8 z-50 cursor-grab"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border-2 border-primary-500/50 backdrop-blur-sm w-72"
        >
          {/* Drag Handle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GripVertical size={20} className="text-gray-400 cursor-grab" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-gray-900 dark:text-white">LIVE S&P 500</span>
              </div>
            </div>
            <TrendingUp size={18} className={priceChange >= 0 ? 'text-green-500' : 'text-red-500'} />
          </div>

          {/* Current Price */}
          <div className="mb-4">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              ${currentPrice.toFixed(2)}
            </div>
            <div className={`text-sm font-medium ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}% Today
            </div>
          </div>

          {/* Animated Bar Chart */}
          <div className="flex items-end gap-1 h-32 mb-4">
            {spData.map((height, index) => (
              <motion.div
                key={index}
                custom={index}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-primary-500 via-accent-500 to-accent-400 rounded-t-lg shadow-lg"
              />
            ))}
          </div>

          {/* Chart Label */}
          <div className="text-center border-t border-gray-200 dark:border-gray-700 pt-3">
            <p className="text-xs font-bold text-gray-900 dark:text-white mb-1">
              Real-time Market Data
            </p>
            <p className="text-[10px] text-gray-600 dark:text-gray-400">
              Drag me anywhere • Updates every 30s
            </p>
          </div>

          {/* External Link */}
          <motion.a
            href="https://finance.yahoo.com/quote/%5EGSPC"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="mt-3 flex items-center justify-center gap-2 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors"
          >
            View Full Chart
            <ExternalLink size={12} />
          </motion.a>
        </motion.div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Photo */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md mx-auto"
            >
              {/* Photo Container */}
              <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-primary-500 shadow-2xl bg-gradient-to-br from-primary-100 to-accent-100">
                <img 
                  src="/profile-photo.jpg" 
                  alt="Murtuza Rangwala" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23feb300" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="140" fill="white"%3EMR%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Open to Opportunities Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-5 left-1/2 transform -translate-x-1/2"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(254,179,0,0.3)',
                        '0 0 30px rgba(255,94,108,0.4)',
                        '0 0 20px rgba(254,179,0,0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl border-2 border-white dark:border-gray-900 cursor-pointer"
                  >
                    <Sparkles size={16} className="animate-pulse" />
                    Open to Opportunities
                  </motion.div>

                  {showTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs whitespace-nowrap shadow-xl z-50"
                    >
                      Available for internships, consulting, and analyst roles
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              {/* Decorative Glow Effects */}
              <div className="absolute -z-10 top-1/4 -left-12 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl" />
              <div className="absolute -z-10 bottom-1/4 -right-12 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Heading with Proper Top Spacing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-400 font-normal block mb-2">
                  Hi, I'm
                </span>
                <span className="block">
                  <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-accent-600 bg-clip-text text-transparent font-extrabold">
                    Murtuza
                  </span>
                </span>
                <span className="block text-gray-800 dark:text-gray-200 font-bold">
                  Rangwala
                </span>
              </h1>
            </motion.div>

            {/* Subtitle with Clean Spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Data & AI Analyst | Business Strategist
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
            </motion.div>

            {/* Description with Highlighted Keywords */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl"
            >
              Transforming complex data into actionable insights. I blend{' '}
              <span className="font-bold text-primary-600 dark:text-primary-400">
                quantitative finance
              </span>
              ,{' '}
              <span className="font-bold text-accent-600 dark:text-accent-400">
                machine learning
              </span>
              , and{' '}
              <span className="font-bold text-primary-600 dark:text-primary-400">
                business strategy
              </span>
              {' '}to build data-driven solutions that scale. From equity markets to AI systems, 
              I turn messy data into clear decisions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(254,179,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all"
              >
                <Download size={20} />
                Download Resume
              </motion.a>
              
              <motion.button
                onClick={() => scrollToSection('#projects')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-xl font-bold hover:bg-primary-500 hover:text-white transition-all"
              >
                <Briefcase size={20} />
                View Projects
                <ExternalLink size={16} />
              </motion.button>
            </motion.div>

            {/* Tech Stack Pills */}
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
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-primary-500/30 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium shadow-sm hover:shadow-md hover:border-primary-500 transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
    </section>
  );
};

export default Hero;
