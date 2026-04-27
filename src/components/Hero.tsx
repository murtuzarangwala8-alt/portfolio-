import { motion } from 'framer-motion';
import { Download, Briefcase, Mail, TrendingUp, Code, BarChart3, Database, LineChart } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [chartData, setChartData] = useState([40, 65, 45, 80, 60, 90, 75]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => prev.map(() => Math.random() * 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: '5+', label: 'Years Experience', icon: <TrendingUp size={20} /> },
    { value: '50+', label: 'Projects Completed', icon: <BarChart3 size={20} /> },
    { value: '15+', label: 'Technologies', icon: <Code size={20} /> },
    { value: '100%', label: 'Client Satisfaction', icon: <Database size={20} /> },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-gradient-to-br from-beige via-white to-pink/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Icons */}
        <motion.div
          className="absolute top-20 left-10 text-primary-500/20"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <LineChart size={60} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-accent-500/20"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Code size={50} />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-1/4 text-primary-500/20"
          animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Database size={45} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-1/3 text-accent-500/20"
          animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 5.5, repeat: Infinity }}
        >
          <BarChart3 size={55} />
        </motion.div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(254,179,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(254,179,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Photo with Animated Chart */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative -mt-8"
          >
            {/* Main Photo Container */}
            <div className="relative">
              {/* Photo */}
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square rounded-3xl overflow-hidden border-4 border-primary-500 shadow-2xl bg-gradient-to-br from-primary-100 to-accent-100">
                  <img 
                    src="/profile-photo.jpg" 
                    alt="Murtuza Rangwala" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23feb300" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="140" fill="white"%3EMR%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                {/* Available Badge - Below Photo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl border-2 border-white dark:border-gray-900">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Available for opportunities
                  </div>
                </motion.div>

                {/* Animated Chart Overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 border-2 border-primary-500"
                >
                  <div className="flex items-end gap-1.5 h-24 w-40">
                    {chartData.map((height, index) => (
                      <motion.div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-primary-500 to-accent-500 rounded-t-lg"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <TrendingUp size={18} className="text-green-500" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Live Analytics</span>
                  </div>
                </motion.div>

                {/* Code Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="absolute top-4 left-4 bg-accent-500 text-white rounded-2xl shadow-2xl p-4 flex items-center gap-2"
                >
                  <Code size={24} />
                  <div>
                    <div className="text-xs opacity-80">Developer</div>
                    <div className="text-sm font-bold">& Analyst</div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-10 -left-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl" />
              <div className="absolute -z-10 bottom-10 -right-10 w-40 h-40 bg-accent-500/20 rounded-full blur-3xl" />
            </div>
          </motion.div>

          {/* Right Side - Intro Text */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold"
            >
              <span className="text-gray-900 dark:text-white">Hi, I'm</span>
              <br />
              <span className="gradient-text">Murtuza Rangwala</span>
            </motion.h1>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">
                Data & AI Analyst | Business Strategist
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Transforming complex data into actionable insights
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              I blend <span className="font-bold text-primary-500">quantitative finance</span>, 
              <span className="font-bold text-accent-500"> machine learning</span>, and 
              <span className="font-bold text-primary-500"> business strategy</span> to build 
              data-driven solutions that scale. From equity markets to AI systems, I turn 
              messy data into clear decisions.
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-primary-500">{stat.icon}</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/resume.pdf"
                download
                className="btn-primary flex items-center gap-2"
              >
                <Download size={20} />
                Download Resume
              </a>
              <button
                onClick={() => scrollToSection('#projects')}
                className="btn-secondary flex items-center gap-2"
              >
                <Briefcase size={20} />
                View Projects
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-secondary flex items-center gap-2"
              >
                <Mail size={20} />
                Contact Me
              </button>
            </motion.div>

            {/* Tech Stack Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex flex-wrap gap-2"
            >
              {['Python', 'R', 'SQL', 'Machine Learning', 'Power BI', 'React', 'Financial Modeling'].map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.05 }}
                  className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium border border-primary-500/20"
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
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-500 rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
