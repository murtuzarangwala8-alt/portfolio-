// Type definitions for the portfolio project

export interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
  category: 'Finance' | 'Analytics' | 'AI/ML';
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  color: string;
  skills: Skill[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string | null;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export type Theme = 'light' | 'dark';

export interface TimelineItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  year: string;
}
