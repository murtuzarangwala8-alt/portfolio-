import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Code as GithubIcon } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
  category: string;
}

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState('All');

  const projects: Project[] = [
    {
      title: "Personal Portfolio Website",
      description: "Modern, responsive portfolio website built with React, TypeScript, and TailwindCSS. Features real-time S&P 500 widget, AI trading chatbot, dark/light theme, and smooth animations with Framer Motion.",
      tags: ["React", "TypeScript", "TailwindCSS", "Framer Motion", "Vite"],
      category: "Web Development",
      demo: "https://murtuzarangwala8-alt.github.io/portfolio-/",
      github: "https://github.com/murtuzarangwala8-alt/portfolio-",
    },
    {
      title: "AI Trading Assistant",
      description: "Intelligent trading assistant powered by Google Gemini AI. Provides real-time market analysis, trading insights, and financial advice. Features conversational interface with context-aware responses.",
      tags: ["Python", "Gemini AI", "React", "Trading", "NLP"],
      category: "AI/ML",
      github: "https://github.com/murtuzarangwala8-alt/portfolio-/blob/main/api/chat.js",
      demo: "https://murtuzarangwala8-alt.github.io/portfolio-/",
    },
    {
      title: "Household Financial Market Participation Analysis",
      description: "Comprehensive econometric analysis of household investment behavior using panel data regression and probit models. Examined factors influencing stock market participation across European households.",
      tags: ["R", "Stata", "Econometrics", "Panel Data", "Regression"],
      category: "Finance",
      github: "https://github.com/murtuzarangwala8-alt/household-stock-market-participation-italy",
    },
    {
      title: "Constant GDP per Capita Analysis (1970–2022)",
      description: "A MATLAB-based time-series analysis of constant GDP per capita for the U.S., Italy, Germany, Spain, and France from 1970–2022. Includes visualizations, descriptive statistics, and confidence intervals.",
      tags: ["MATLAB", "Time-Series", "GDP", "Descriptive Statistics", "Data Visualization"],
      category: "Finance",
      github: "https://github.com/murtuzarangwala8-alt/Constant-GDP-per-Capita-Analysis-1970-2022-",
      demo: "/gdp-analysis.html",
    },
    {
      title: "SME Growth & Credit Market Analysis",
      description: "World Bank data analysis examining the relationship between SME growth and credit market accessibility. Applied time-series forecasting and multivariate regression techniques.",
      tags: ["Python", "World Bank Data", "ARIMA", "OLS Regression", "Time-Series"],
      category: "Finance",
      github: "https://github.com/murtuzarangwala8-alt/sme-growth-credit-analysis-",
    },
    {
      title: "Financial Forecasting Model",
      description: "Built ARIMA and VAR models for financial time-series prediction. Implemented backtesting framework to validate model performance on historical data.",
      tags: ["R", "ARIMA", "VAR", "Time-Series", "Forecasting"],
      category: "Finance",
    },
    {
      title: "Stock Valuation & Comparable Analysis",
      description: "Developed comprehensive DCF and comparable company analysis models for equity valuation. Created automated Excel templates with sensitivity analysis and scenario modeling.",
      tags: ["Excel", "DCF", "Valuation", "Financial Modeling"],
      category: "Finance",
    },
    {
      title: "Customer & Sales Analytics Dashboard",
      description: "Interactive Power BI dashboard analyzing customer behavior, sales trends, and KPIs. Integrated multiple data sources and implemented real-time data refresh.",
      tags: ["Python", "Power BI", "SQL", "Data Visualization"],
      category: "Analytics",
    },
    {
      title: "RAG-based Financial Knowledge Assistant",
      description: "Built a Retrieval-Augmented Generation system for querying financial reports and documents. Integrated LLM with vector database for context-aware responses.",
      tags: ["Python", "LangChain", "OpenAI", "RAG", "Vector DB"],
      category: "AI/ML",
      // github: "https://github.com/yourusername/rag-assistant", // TODO: Add your GitHub link
    },
    {
      title: "Market Sentiment Analysis Tool",
      description: "NLP-based sentiment analysis of financial news and social media. Used for predicting short-term market movements and generating trading signals.",
      tags: ["Python", "NLP", "Sentiment Analysis", "Machine Learning"],
      category: "AI/ML",
    },
    {
      title: "XAU/USD Markov Chain Predictor",
      description: "First-order Markov Chain model for predicting gold price movements using historical and live data. Features state discretization and Monte Carlo simulation.",
      tags: ["Python", "Markov Chains", "Time-Series", "Forecasting"],
      category: "Finance",
      github: "https://github.com/yourusername/xau-predictor", // TODO: Update with actual link
    }
  ];

  const categories = ['All', 'Web Development', 'Finance', 'Analytics', 'AI/ML'];
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section-container bg-gray-50 dark:bg-gray-900/50">
      <div className="w-full max-w-screen-2xl mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            A selection of data analysis, financial modeling, and AI projects
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const categoryEmoji: Record<string, string> = {
  'Finance': '📈',
  'AI/ML': '🤖',
  'Analytics': '📊',
  'Web Development': '🌐',
};

const getProjectIcon = (title: string): string => {
  if (title.includes('GDP')) return '🌍';
  if (title.includes('SME') || title.includes('Credit')) return '🏦';
  if (title.includes('Household') || title.includes('Participation')) return '🏠';
  if (title.includes('Trading') || title.includes('AI')) return '🤖';
  if (title.includes('Markov') || title.includes('XAU') || title.includes('Gold')) return '🥇';
  if (title.includes('RAG') || title.includes('Knowledge')) return '🧠';
  if (title.includes('Sentiment')) return '📰';
  if (title.includes('Forecasting') || title.includes('ARIMA')) return '🔮';
  if (title.includes('Valuation') || title.includes('DCF')) return '💹';
  if (title.includes('Dashboard') || title.includes('Sales')) return '📊';
  if (title.includes('Portfolio') || title.includes('Website')) return '🌐';
  return categoryEmoji['Finance'];
};

const ProjectCard = ({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full cursor-pointer"
      style={{ perspective: '1200px', height: '380px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          transition: 'transform 0.6s cubic-bezier(0.4,0.2,0.2,1)',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {/* FRONT */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="absolute inset-0 glass-card flex flex-col rounded-2xl overflow-hidden min-h-[380px]"
        >
          {/* Graphic area */}
          <div className="w-full h-40 bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-7xl">{getProjectIcon(project.title)}</span>
          </div>
          {/* Info area */}
          <div className="flex flex-col justify-between flex-1 p-5">
            <div>
              <span className="text-xs font-medium px-2 py-0.5 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 leading-snug line-clamp-2">
                {project.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full text-xs">+{project.tags.length - 3}</span>
              )}
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-right">Hover to flip →</p>
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-2xl min-h-[380px]"
        >
          <div>
            <span className="text-3xl mb-3 block">{getProjectIcon(project.title)}</span>
            <h3 className="text-base font-bold mb-3 leading-snug">{project.title}</h3>
            <p className="text-sm text-white/90 leading-relaxed line-clamp-5">{project.description}</p>
          </div>
          <div className="flex gap-3 mt-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-all"
              >
                <GithubIcon size={14} /> Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-all"
              >
                <ExternalLink size={14} /> Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
