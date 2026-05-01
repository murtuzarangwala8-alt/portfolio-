import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const timeline = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: t.about.msc,
      subtitle: t.about.mscSub,
      description: t.about.mscDesc,
      year: "2023-2026"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: t.about.analyst,
      subtitle: t.about.analystSub,
      description: t.about.analystDesc,
      year: "2019-2022"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: t.about.bsc,
      subtitle: t.about.bscSub,
      description: t.about.bscDesc,
      year: "2019-2022"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t.about.equity,
      subtitle: t.about.equitySub,
      description: t.about.equityDesc,
      year: "2020-2020"
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
          <h2 className="section-title">{t.about.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t.about.subtitle}
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
                <img
                  src="/profile-photo-2.jpeg"
                  alt="Murtuza Rangwala"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320"%3E%3Crect fill="%23feb300" width="320" height="320"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="120" fill="white"%3EMR%3C/text%3E%3C/svg%3E';
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
                {t.about.heading}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{t.about.p1}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{t.about.p2}</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{t.about.p3}</p>
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
            {t.about.journey}
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
                  <span className="text-sm text-accent-500 dark:text-pink font-medium">{item.year}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.subtitle}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
