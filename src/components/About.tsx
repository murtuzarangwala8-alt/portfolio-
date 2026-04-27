import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, TrendingUp } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "MSc Economics & Data Analysis",
      subtitle: "University of Verona, Italy",
      description: "Specialized in econometrics, quantitative finance, and advanced data analytics.",
      year: "2022-2024"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Business & Data Analyst",
      subtitle: "Multiple Organizations",
      description: "Led data-driven decision making, market research, and strategic analysis across finance and operations.",
      year: "2019-2022"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "BSc Computer Science",
      subtitle: "University of Mumbai, India",
      description: "Built strong foundation in programming, algorithms, and software development.",
      year: "2016-2019"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Equity Dealer",
      subtitle: "Motilal Oswal Financial Services",
      description: "Managed client portfolios, executed trades, and provided market insights.",
      year: "2018-2019"
    }
  ];

  return (
    <section id="about" className="section-container bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">About Me</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A unique blend of economics, computer science, and real-world business experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-2xl overflow-hidden border-4 border-primary-500 dark:border-accent-500 shadow-2xl">
                {/* TODO: Add your photo to public/profile-photo.jpg */}
                <img 
                  src="/profile-photo.jpg" 
                  alt="Murtuza Rangwala" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320"%3E%3Crect fill="%233b82f6" width="320" height="320"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="120" fill="white"%3EMR%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl -z-10 opacity-50" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-accent-500 to-pink rounded-2xl -z-10 opacity-50" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-card p-8">
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                From Markets to Models
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                I started my journey in the fast-paced world of equity trading, where split-second decisions 
                and data interpretation were everything. That experience taught me the value of turning raw 
                information into actionable insights.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                My academic path took me from Computer Science in Mumbai to Economics & Data Analysis in Verona, 
                where I deepened my expertise in econometrics, time-series forecasting, and quantitative methods.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Today, I bridge the gap between business strategy and technical execution—whether it's building 
                predictive models, designing dashboards, or architecting AI systems that help organizations make 
                smarter decisions at scale.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            My Journey
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="glass-card p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg text-white inline-flex mb-4">
                  {item.icon}
                </div>
                <div className="mb-2">
                  <span className="text-sm text-accent-500 dark:text-pink font-medium">
                    {item.year}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {item.subtitle}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
