export interface Project {
  title: string
  description: string
  tags: string[]
  image?: string
  github?: string
  demo?: string
  category: string
  featured?: boolean
  year?: string
}

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  responsibilities: string[]
  type: 'work' | 'education'
}

export interface Skill {
  name: string
  level: number
  category: string
}

export interface SkillCategory {
  icon: string
  title: string
  color: string
  skills: { name: string; tier: string }[]
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface TimelineItem {
  year: string
  title: string
  subtitle: string
  description: string
  icon: string
}
