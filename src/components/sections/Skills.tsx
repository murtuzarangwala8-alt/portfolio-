'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Database, TrendingUp, Brain, Briefcase } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import TextReveal from '@/components/ui/TextReveal'
import Marquee from '@/components/ui/Marquee'
import { skillCategories, techStack } from '@/lib/data'

const iconMap: Record<string, React.ReactNode> = {
  'database': <Database size={24} />,
  'trending-up': <TrendingUp size={24} />,
  'brain': <Brain size={24} />,
  'briefcase': <Briefcase size={24} />,
}

const tierColors: Record<string, string> = {
  Expert: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
  Proficient: 'border-primary-500/30 text-primary-400 bg-primary-500/5',
  Familiar: 'border-white/10 text-white/40 bg-white/5',
}

const tierDots: Record<string, string> = {
  Expert: 'bg-emerald-400',
  Proficient: 'bg-primary-400',
  Familiar: 'bg-white/30',
}

const tierOrder = ['Expert', 'Proficient', 'Familiar']

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-150px' })

  return (
    <section id="skills" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary-500 font-medium">
            Expertise
          </span>
          <TextReveal
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mt-4 mb-6"
          >
            Skills & Technologies
          </TextReveal>

          <div className="flex flex-wrap items-center gap-4">
            {tierOrder.map((tier) => (
              <div key={tier} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${tierDots[tier]}`} />
                <span className="text-xs text-white/40">{tier}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                    {iconMap[category.icon]}
                  </div>
                  <h3 className="text-lg font-bold font-display text-white">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {tierOrder.map((tier) => {
                    const tierSkills = category.skills.filter((s) => s.tier === tier)
                    if (tierSkills.length === 0) return null
                    return (
                      <div key={tier}>
                        <p className={`text-[10px] font-semibold uppercase tracking-widest mb-2 ${tierDots[tier].replace('bg-', 'text-')}`}>
                          {tier}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {tierSkills.map((skill) => (
                            <span
                              key={skill.name}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${tierColors[tier]}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${tierDots[tier]}`} />
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <Marquee items={techStack} speed={30} />
      </div>
    </section>
  )
}
