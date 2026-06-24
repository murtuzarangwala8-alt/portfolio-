'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, TrendingUp } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import TextReveal from '@/components/ui/TextReveal'
import { timelineItems } from '@/lib/data'

const iconMap: Record<string, React.ReactNode> = {
  'briefcase': <Briefcase size={18} />,
  'graduation-cap': <GraduationCap size={18} />,
  'trending-up': <TrendingUp size={18} />,
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-150px' })

  return (
    <section id="timeline" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary-500 font-medium">
            Journey
          </span>
          <TextReveal
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mt-4"
          >
            Interactive Timeline
          </TextReveal>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-accent-500/30 to-transparent" />

          <div className="space-y-12">
            {timelineItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="hidden md:block flex-1" />

                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#030712] border-2 border-primary-500 flex items-center justify-center z-10">
                  <div className="text-primary-500">
                    {iconMap[item.icon]}
                  </div>
                </div>

                <div className="flex-1 pl-14 md:pl-0">
                  <GlassCard className="p-6">
                    <span className="text-xs font-mono text-primary-400 mb-2 block">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-bold font-display text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/40 mb-3">{item.subtitle}</p>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {item.description}
                    </p>
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
