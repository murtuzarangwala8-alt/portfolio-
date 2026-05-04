import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Database, TrendingUp, Brain, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type Tier = 'Expert' | 'Proficient' | 'Familiar';

interface SkillItem {
  name: string;
  tier: Tier;
}

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  color: string;
  bgColor: string;
  skills: SkillItem[];
}

const TIER_CONFIG: Record<Tier, { label: string; color: string; dot: string }> = {
  Expert:     { label: 'Expert',     color: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  Proficient: { label: 'Proficient', color: 'text-primary-600 dark:text-primary-400', dot: 'bg-primary-500' },
  Familiar:   { label: 'Familiar',   color: 'text-gray-500 dark:text-gray-400',       dot: 'bg-gray-400' },
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  const skillCategories: SkillCategory[] = [
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Data & Analytics',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      skills: [
        { name: 'Python (Pandas, NumPy)', tier: 'Expert' },
        { name: 'SQL',                    tier: 'Expert' },
        { name: 'Excel (Advanced)',        tier: 'Expert' },
        { name: 'R & RStudio',            tier: 'Proficient' },
        { name: 'Power BI',               tier: 'Proficient' },
        { name: 'Tableau',                tier: 'Familiar' },
      ],
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Quantitative & Finance',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      skills: [
        { name: 'Econometrics',           tier: 'Expert' },
        { name: 'Financial Modeling',     tier: 'Expert' },
        { name: 'Capital Markets',        tier: 'Expert' },
        { name: 'Time-Series Analysis',   tier: 'Proficient' },
        { name: 'DCF & Valuation',        tier: 'Proficient' },
        { name: 'Financial Forecasting',  tier: 'Proficient' },
      ],
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI & Machine Learning',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
      skills: [
        { name: 'Machine Learning',       tier: 'Proficient' },
        { name: 'Prompt Engineering',     tier: 'Proficient' },
        { name: 'Scikit-learn',           tier: 'Proficient' },
        { name: 'LLM Integration',        tier: 'Proficient' },
        { name: 'RAG Systems',            tier: 'Familiar' },
        { name: 'NLP',                    tier: 'Familiar' },
      ],
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Business & Strategy',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30',
      skills: [
        { name: 'Market Research',        tier: 'Expert' },
        { name: 'KPI Tracking',           tier: 'Expert' },
        { name: 'Business Intelligence',  tier: 'Expert' },
        { name: 'Strategic Analysis',     tier: 'Proficient' },
        { name: 'Process Optimization',   tier: 'Proficient' },
        { name: 'Stakeholder Management', tier: 'Proficient' },
      ],
    },
  ];

  const tierOrder: Tier[] = ['Expert', 'Proficient', 'Familiar'];

  return (
    <section id="skills" className="section-container bg-white dark:bg-gray-950">
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

          {/* Tier legend */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {tierOrder.map((tier) => (
              <div key={tier} className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${TIER_CONFIG[tier].dot}`} />
                <span className={`text-sm font-medium ${TIER_CONFIG[tier].color}`}>
                  {TIER_CONFIG[tier].label}
                </span>
              </div>
            ))}
          </div>
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

              {/* Group skills by tier */}
              <div className="space-y-5">
                {tierOrder.map((tier) => {
                  const tierSkills = category.skills.filter((s) => s.tier === tier);
                  if (tierSkills.length === 0) return null;
                  const cfg = TIER_CONFIG[tier];
                  return (
                    <div key={tier}>
                      <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${cfg.color}`}>
                        {cfg.label}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tierSkills.map((skill, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.3, delay: 0.4 + categoryIndex * 0.1 + i * 0.04 }}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                              border ${category.bgColor}
                              ${tier === 'Expert'
                                ? 'border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300'
                                : tier === 'Proficient'
                                ? 'border-primary-300 dark:border-primary-700 text-primary-800 dark:text-primary-300'
                                : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                              }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                            {skill.name}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  );
                })}
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
              'Jupyter', 'Stata', 'SPSS', 'Bloomberg Terminal', 'AWS', 'Docker',
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
