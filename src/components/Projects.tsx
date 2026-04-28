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
      title: "Household Financial Market Participation Analysis",
      description: "Comprehensive econometric analysis of household investment behavior using panel data regression and probit models. Examined factors influencing stock market participation across European households.",
      tags: ["R", "Stata", "Econometrics", "Panel Data", "Regression"],
      category: "Finance",
    },
    {
      title: "SME Growth & Credit Market Analysis",
      description: "World Bank data analysis examining the relationship between SME growth and credit market accessibility. Applied time-series forecasting and multivariate regression techniques.",
      tags: ["R", "World Bank Data", "Time-Series", "Forecasting"],
      category: "Finance",
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
      <div className="max-w-7xl mx-auto" ref={ref}>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      className="glass-card p-6 hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="mb-4">
        <div className="w-full h-48 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-6xl opacity-20">📊</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
          >
            <GithubIcon size={16} />
            Code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
          >
            <ExternalLink size={16} />
            Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;
