'use client'

import { motion } from 'framer-motion'

interface MarqueeProps {
  items: string[]
  direction?: 'left' | 'right'
  speed?: number
}

export default function Marquee({ items, direction = 'left', speed = 20 }: MarqueeProps) {

  return (
    <div className="relative overflow-hidden py-6">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-4 py-2 text-sm font-medium text-white/30 uppercase tracking-[0.2em]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
