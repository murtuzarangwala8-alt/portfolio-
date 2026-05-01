import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { t } = useLanguage();
  const experiences: Experience[] = [
    {
      role: "Business Analyst",
      company: "Dimitra International",
      location: "Berlin, Germany",
      period: "Oct 2025 - Jan 2026",
      responsibilities: [
        "Conducted comprehensive market research and competitive analysis to identify growth opportunities in agricultural technology sector",
        "Developed data-driven business strategies that improved operational efficiency by 25%",
        "Created interactive dashboards and reports for C-level executives using Power BI and Excel",
        "Collaborated with cross-functional teams to optimize business processes and reduce costs by 15%"
      ]
    },
    {
      role: "Operations & Business Analyst",
      company: "Mohamedally Akbarally & Co.",
      location: "Mumbai, India",
      period: "Sep 2020 - Dec 2022",
      responsibilities: [
        "Led end-to-end data analysis projects for supply chain optimization, resulting in 20% cost reduction",
        "Designed and implemented KPI tracking systems to monitor business performance across multiple departments",
        "Performed financial modeling and forecasting to support strategic planning and budgeting decisions",
        "Automated reporting processes using Python and SQL, saving 15+ hours per week"
      ]
    },
    {
      role: "Equity Dealer",
      company: "Motilal Oswal Financial Services Ltd.",
      location: "Mumbai, India",
      period: "2020 - 2020",
      responsibilities: [
        "Managed client portfolios worth $2M+, executing trades and providing market insights",
        "Conducted fundamental and technical analysis of stocks across multiple sectors",
        "Developed quantitative models for stock screening and portfolio optimization",
        "Maintained 95%+ client satisfaction through personalized investment strategies and timely market updates"
      ]
    }
  ];

  return (
    <section id="experience" className="section-container">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t.experience.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t.experience.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-accent-500 rounded-full" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full border-4 border-white dark:border-gray-950 z-10" />

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass-card p-6 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg text-white flex-shrink-0">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {exp.role}
                        </h3>
                        <p className="text-lg text-primary-500 font-medium mb-2">
                          {exp.company}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {exp.period}
                          </span>
                          <span>📍 {exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-primary-500 mt-1">▸</span>
                          <span className="text-sm">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
