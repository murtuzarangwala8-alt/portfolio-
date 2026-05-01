import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Database, TrendingUp, Brain, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { t } = useLanguage();

  const skillCategories = [
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data & Analytics",
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "Python (Pandas, NumPy)", level: 95 },
        { name: "R & RStudio", level: 90 },
        { name: "SQL", level: 88 },
        { name: "Excel (Advanced)", level: 92 },
        { name: "Power BI", level: 85 },
        { name: "Tableau", level: 80 }
      ]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Quantitative & Finance",
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Econometrics", level: 92 },
        { name: "Time-Series Analysis", level: 90 },
        { name: "Regression Modeling", level: 88 },
        { name: "Financial Forecasting", level: 85 },
        { name: "DCF & Valuation", level: 87 },
        { name: "Capital Markets", level: 90 }
      ]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI & Machine Learning",
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "Machine Learning", level: 85 },
        { name: "Scikit-learn", level: 82 },
        { name: "LLM Integration", level: 80 },
        { name: "RAG Systems", level: 75 },
        { name: "Prompt Engineering", level: 88 },
        { name: "NLP Basics", level: 78 }
      ]
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Business & Strategy",
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Market Research", level: 90 },
        { name: "Strategic Analysis", level: 88 },
        { name: "KPI Tracking", level: 92 },
        { name: "Process Optimization", level: 85 },
        { name: "Stakeholder Management", level: 87 },
        { name: "Business Intelligence", level: 90 }
      ]
    }
  ];

  return (
    <section id="skills" className="section-container">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t.skills.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass-card p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 bg-gradient-to-br ${category.color} rounded-xl text-white`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm font-medium text-primary-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {t.skills.techTools}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Python', 'R', 'SQL', 'JavaScript', 'TypeScript', 'React', 'Git',
              'Jupyter', 'Stata', 'SPSS', 'Bloomberg Terminal', 'AWS', 'Docker'
            ].map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1 + index * 0.05 }}
                className="px-4 py-2 bg-gradient-to-r from-primary-500/10 to-accent-500/10 
                         border border-primary-500/30 rounded-full text-sm font-medium
                         text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
