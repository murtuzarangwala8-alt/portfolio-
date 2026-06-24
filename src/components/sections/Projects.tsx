'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import TextReveal from '@/components/ui/TextReveal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import { projects } from '@/lib/data'
import { cn } from '@/lib/utils'

const categories = ['All', 'Finance', 'AI/ML', 'Analytics', 'Web Development']

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-150px' })
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary-500 font-medium">
            Portfolio
          </span>
          <TextReveal
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mt-4 mb-8"
          >
            Featured Projects
          </TextReveal>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  filter === cat
                    ? 'bg-primary-500 text-black'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <SpotlightCard>
                <GlassCard tilt hover className="p-0 overflow-hidden group h-full">
                  <div className="p-6 pb-0">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-400">
                        {project.category}
                      </span>
                      {project.year && (
                        <span className="text-xs text-white/30">{project.year}</span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/40 line-clamp-3 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/5 text-white/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-primary-400 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={14} /> Code
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-primary-400 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={14} /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
