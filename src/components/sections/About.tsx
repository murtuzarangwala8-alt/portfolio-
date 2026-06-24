'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import TextReveal from '@/components/ui/TextReveal'
import StatsCounter from '@/components/ui/StatsCounter'
import { stats } from '@/lib/data'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-150px' })

  return (
    <section id="about" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary-500 font-medium">
            About
          </span>
          <TextReveal
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mt-4 mb-6"
          >
            From Markets to Models
          </TextReveal>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 text-white/60 leading-relaxed"
          >
            <p className="text-lg">
              I started my journey in the fast-paced world of equity trading,
              where split-second decisions and data interpretation were
              everything. That experience taught me the value of turning raw
              information into actionable insights.
            </p>
            <p className="text-lg">
              My academic path took me from Computer Science in Mumbai to
              Economics & Data Analysis in Verona, where I deepened my expertise
              in econometrics, time-series forecasting, and quantitative methods.
            </p>
            <p className="text-lg">
              Today, I bridge the gap between business strategy and technical
              execution — whether it&apos;s building predictive models, designing
              dashboards, or architecting AI systems that help organizations
              make smarter decisions at scale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            <GlassCard className="p-6 flex flex-col items-center justify-center min-h-[140px]">
              <div className="text-4xl mb-2 opacity-60">🎓</div>
              <div className="text-sm font-medium text-white/80 text-center">MSc Economics<br />& Data Analysis</div>
              <div className="text-xs text-white/30 mt-1">Univ. of Verona</div>
            </GlassCard>
            <GlassCard className="p-6 flex flex-col items-center justify-center min-h-[140px]">
              <div className="text-4xl mb-2 opacity-60">💼</div>
              <div className="text-sm font-medium text-white/80 text-center">Business &amp;<br />Data Analyst</div>
              <div className="text-xs text-white/30 mt-1">3+ Years Exp.</div>
            </GlassCard>
            <GlassCard className="p-6 flex flex-col items-center justify-center min-h-[140px]">
              <div className="text-4xl mb-2 opacity-60">💻</div>
              <div className="text-sm font-medium text-white/80 text-center">BSc Computer<br />Science</div>
              <div className="text-xs text-white/30 mt-1">Univ. of Mumbai</div>
            </GlassCard>
            <GlassCard className="p-6 flex flex-col items-center justify-center min-h-[140px]">
              <div className="text-4xl mb-2 opacity-60">📈</div>
              <div className="text-sm font-medium text-white/80 text-center">Equity<br />Dealer</div>
              <div className="text-xs text-white/30 mt-1">Motilal Oswal</div>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5"
        >
          {stats.map((stat) => (
            <StatsCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
