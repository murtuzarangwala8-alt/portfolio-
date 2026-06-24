import type { Project, Experience, SkillCategory, TimelineItem } from '@/types'

export const personalInfo = {
  name: 'Murtuza Rangwala',
  initials: 'MR',
  title: 'Data Analyst & Financial Analyst',
  tagline: 'Building Future Digital Experiences',
  email: 'murtuzarangwala8@gmail.com',
  phone: '+39 350 962 9833',
  location: 'Verona, Italy',
  linkedin: 'https://linkedin.com/in/murtaza-rangwala-856456102',
  github: 'https://github.com/murtuzarangwala8-alt',
  whatsapp: 'https://wa.me/393509629833',
  website: 'https://www.murtuza.eu',
  resumeUrl: '/resume.pdf',
  openToWork: true,
  openToRoles: ['Data Analyst', 'Data Scientist', 'Financial Analyst', 'Business Analyst'],
  openToLocations: ['Italy', 'Germany', 'Netherlands', 'Remote Europe'],
}

export const projects: Project[] = [
  {
    title: "Personal Portfolio Website",
    description: "Modern, responsive portfolio website built with Next.js, TypeScript, and TailwindCSS. Features real-time S&P 500 widget, AI trading chatbot, dark/light theme, and smooth animations with Framer Motion.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Three.js"],
    category: "Web Development",
    featured: true,
    demo: "https://murtuza.eu",
    github: "https://github.com/murtuzarangwala8-alt/portfolio-",
    year: "2026",
  },
  {
    title: "AI Trading Assistant",
    description: "Intelligent trading assistant powered by Google Gemini AI. Provides real-time market analysis, trading insights, and financial advice. Features conversational interface with context-aware responses.",
    tags: ["Python", "Gemini AI", "React", "Trading", "NLP"],
    category: "AI/ML",
    featured: true,
    demo: "https://murtuza.eu",
    github: "https://github.com/murtuzarangwala8-alt",
    year: "2025",
  },
  {
    title: "Household Stock Market Participation in Italy",
    description: "Survey-weighted probit analysis of 9,617 Italian households from the 2022 Bank of Italy SHIW dataset. Finds that log income raises participation by 12.5 pp and university education by 13.6 pp vs primary.",
    tags: ["R", "Python", "Stata", "Probit", "Econometrics", "SHIW"],
    category: "Finance",
    featured: true,
    github: "https://github.com/murtuzarangwala8-alt/italy-stock-participation",
    demo: "https://murtuzarangwala8-alt.github.io/italy-stock-participation/presentation.html",
    year: "2025",
  },
  {
    title: "Constant GDP per Capita Analysis (1970–2022)",
    description: "A MATLAB-based time-series analysis of constant GDP per capita for the U.S., Italy, Germany, Spain, and France from 1970–2022. Includes visualizations, descriptive statistics, and confidence intervals.",
    tags: ["MATLAB", "Time-Series", "GDP", "Descriptive Statistics", "Data Visualization"],
    category: "Finance",
    github: "https://github.com/murtuzarangwala8-alt/Constant-GDP-per-Capita-Analysis-1970-2022-",
    year: "2024",
  },
  {
    title: "SME Growth & Credit Market Analysis",
    description: "World Bank data analysis examining the relationship between SME growth and credit market accessibility. Applied time-series forecasting and multivariate regression techniques.",
    tags: ["Python", "World Bank Data", "ARIMA", "OLS Regression", "Time-Series"],
    category: "Finance",
    github: "https://github.com/murtuzarangwala8-alt/sme-growth-credit-analysis-",
    year: "2024",
  },
  {
    title: "Time Series & Forecasting of Euro Area Real GDP Growth",
    description: "Complete time-series analysis and forecasting of Euro Area (19 countries) real GDP growth rate. ARIMA model identification, in-sample & out-of-sample forecasting across 3, 6, and 12-month horizons.",
    tags: ["R", "ARIMA", "ARMA", "Time-Series", "Forecasting", "Econometrics"],
    category: "Finance",
    github: "https://github.com/murtuzarangwala8-alt/Time-Series-and-Forecasting-of-Euro-Area-Real-GDP-Growth",
    year: "2024",
  },
  {
    title: "RAG-based Financial Knowledge Assistant",
    description: "Built a Retrieval-Augmented Generation system for querying financial reports and documents. Integrated LLM with vector database for context-aware responses.",
    tags: ["Python", "LangChain", "OpenAI", "RAG", "Vector DB"],
    category: "AI/ML",
    github: "https://github.com/murtuzarangwala8-alt",
    year: "2025",
  },
  {
    title: "Market Sentiment Analysis Tool",
    description: "NLP-based sentiment analysis of financial news and social media. Used for predicting short-term market movements and generating trading signals.",
    tags: ["Python", "NLP", "Sentiment Analysis", "Machine Learning"],
    category: "AI/ML",
    github: "https://github.com/murtuzarangwala8-alt",
    year: "2024",
  },
  {
    title: "XAU/USD Markov Chain Predictor",
    description: "First-order Markov Chain model for predicting gold price movements using historical and live data. Features state discretization and Monte Carlo simulation.",
    tags: ["Python", "Markov Chains", "Time-Series", "Forecasting"],
    category: "Finance",
    github: "https://github.com/murtuzarangwala8-alt",
    year: "2025",
  },
  {
    title: "Stock Valuation & Comparable Analysis",
    description: "Developed comprehensive DCF and comparable company analysis models for equity valuation. Created automated Excel templates with sensitivity analysis and scenario modeling.",
    tags: ["Excel", "DCF", "Valuation", "Financial Modeling"],
    category: "Finance",
    year: "2023",
  },
  {
    title: "Customer & Sales Analytics Dashboard",
    description: "Interactive Power BI dashboard analyzing customer behavior, sales trends, and KPIs. Integrated multiple data sources and implemented real-time data refresh.",
    tags: ["Python", "Power BI", "SQL", "Data Visualization"],
    category: "Analytics",
    year: "2024",
  },
]

export const experiences: Experience[] = [
  {
    role: "Investment Banking Analyst",
    company: "Artane Partners",
    location: "Dublin, Ireland",
    period: "Jun 2026 - Present",
    type: "work",
    responsibilities: [
      "Supporting a talented investment banking team on cross-border advisory, valuation, and capital-raising transactions",
      "Assisting in bridging capital flow by connecting the West to investment opportunities across the GCC (Gulf Cooperation Council) region",
      "Conducting quantitative financial analysis, valuation modeling, and industry research to support deal execution",
    ],
  },
  {
    role: "Business Analyst",
    company: "Dimitra International",
    location: "Berlin, Germany",
    period: "Oct 2025 - Jan 2026",
    type: "work",
    responsibilities: [
      "Conducted comprehensive market research and competitive analysis to identify growth opportunities in agricultural technology sector",
      "Developed data-driven business strategies that improved operational efficiency by 25%",
      "Created interactive dashboards and reports for C-level executives using Power BI and Excel",
      "Collaborated with cross-functional teams to optimize business processes and reduce costs by 15%",
    ],
  },
  {
    role: "Operations & Business Analyst",
    company: "Mohamedally Akbarally & Co.",
    location: "Mumbai, India",
    period: "Sep 2020 - Dec 2022",
    type: "work",
    responsibilities: [
      "Led end-to-end data analysis projects for supply chain optimization, resulting in 20% cost reduction",
      "Designed and implemented KPI tracking systems to monitor business performance across multiple departments",
      "Performed financial modeling and forecasting to support strategic planning and budgeting decisions",
      "Automated reporting processes using Python and SQL, saving 15+ hours per week",
    ],
  },
  {
    role: "Equity Dealer",
    company: "Motilal Oswal Financial Services Ltd.",
    location: "Mumbai, India",
    period: "2020 - 2020",
    type: "work",
    responsibilities: [
      "Managed client portfolios worth $2M+, executing trades and providing market insights",
      "Conducted fundamental and technical analysis of stocks across multiple sectors",
      "Developed quantitative models for stock screening and portfolio optimization",
      "Maintained 95%+ client satisfaction through personalized investment strategies and timely market updates",
    ],
  },
  {
    role: "MSc Economics & Data Analysis",
    company: "University of Verona",
    location: "Verona, Italy",
    period: "2023 - 2026",
    type: "education",
    responsibilities: [
      "Specialized in econometrics, quantitative finance, and advanced data analytics",
      "Thesis on financial market participation and household investment behavior",
      "Advanced coursework in time-series analysis, machine learning, and statistical modeling",
    ],
  },
  {
    role: "BSc Computer Science",
    company: "University of Mumbai",
    location: "Mumbai, India",
    period: "2019 - 2022",
    type: "education",
    responsibilities: [
      "Built strong foundation in programming, algorithms, and software development",
      "Coursework in data structures, databases, and web technologies",
    ],
  },
]

export const skillCategories: SkillCategory[] = [
  {
    icon: "database",
    title: "Data & Analytics",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "Python (Pandas, NumPy)", tier: "Expert" },
      { name: "SQL", tier: "Expert" },
      { name: "Excel (Advanced)", tier: "Expert" },
      { name: "R & RStudio", tier: "Proficient" },
      { name: "Power BI", tier: "Proficient" },
      { name: "Tableau", tier: "Familiar" },
    ],
  },
  {
    icon: "trending-up",
    title: "Quantitative & Finance",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Econometrics", tier: "Expert" },
      { name: "Financial Modeling", tier: "Expert" },
      { name: "Capital Markets", tier: "Expert" },
      { name: "Time-Series Analysis", tier: "Proficient" },
      { name: "DCF & Valuation", tier: "Proficient" },
      { name: "Financial Forecasting", tier: "Proficient" },
    ],
  },
  {
    icon: "brain",
    title: "AI & Machine Learning",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Machine Learning", tier: "Proficient" },
      { name: "Prompt Engineering", tier: "Proficient" },
      { name: "Scikit-learn", tier: "Proficient" },
      { name: "LLM Integration", tier: "Proficient" },
      { name: "RAG Systems", tier: "Familiar" },
      { name: "NLP", tier: "Familiar" },
    ],
  },
  {
    icon: "briefcase",
    title: "Business & Strategy",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Market Research", tier: "Expert" },
      { name: "KPI Tracking", tier: "Expert" },
      { name: "Business Intelligence", tier: "Expert" },
      { name: "Strategic Analysis", tier: "Proficient" },
      { name: "Process Optimization", tier: "Proficient" },
      { name: "Stakeholder Management", tier: "Proficient" },
    ],
  },
]

export const timelineItems: TimelineItem[] = [
  {
    year: "2026 - Present",
    title: "Investment Banking Analyst",
    subtitle: "Artane Partners · Dublin",
    description: "Supporting cross-border transactions and capital flow connecting the West to capital across the GCC.",
    icon: "briefcase",
  },
  {
    year: "2025-2026",
    title: "Business Analyst",
    subtitle: "Dimitra International · Berlin",
    description: "Led data-driven strategies, market research, and operational optimization in agricultural tech.",
    icon: "briefcase",
  },
  {
    year: "2023-2026",
    title: "MSc Economics & Data Analysis",
    subtitle: "University of Verona · Italy",
    description: "Specialized in econometrics, quantitative finance, and advanced data analytics.",
    icon: "graduation-cap",
  },
  {
    year: "2020-2022",
    title: "Operations & Business Analyst",
    subtitle: "Mohamedally Akbarally & Co. · Mumbai",
    description: "Led data analysis projects, KPI systems, and automated reporting saving 15+ hours weekly.",
    icon: "briefcase",
  },
  {
    year: "2019-2022",
    title: "BSc Computer Science",
    subtitle: "University of Mumbai · India",
    description: "Strong foundation in programming, algorithms, and software development.",
    icon: "graduation-cap",
  },
  {
    year: "2020",
    title: "Equity Dealer",
    subtitle: "Motilal Oswal Financial Services · Mumbai",
    description: "Managed $2M+ client portfolios, executed trades, provided quantitative market insights.",
    icon: "trending-up",
  },
]

export const techStack = [
  "Python", "R", "SQL", "JavaScript", "TypeScript", "React", "Next.js",
  "TailwindCSS", "Node.js", "Git", "Jupyter", "Stata", "MATLAB",
  "SPSS", "Power BI", "Tableau", "Excel", "AWS", "Docker",
]

export const testimonials = [
  {
    name: "LinkedIn Connection",
    role: "Data Science Professional",
    content: "Murtuza combines technical depth in data science with real financial market experience — a rare and valuable combination.",
  },
  {
    name: "Academic Reference",
    role: "University of Verona",
    content: "His work on econometric modeling and time-series analysis demonstrates strong analytical capabilities and attention to detail.",
  },
]

export const stats = [
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
  { label: "Languages", value: 3, suffix: "" },
]
