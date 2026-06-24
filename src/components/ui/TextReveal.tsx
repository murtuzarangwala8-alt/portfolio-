'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TextRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  delay?: number
  stagger?: number
}

export default function TextReveal({ children, as: Tag = 'p', className, delay = 0, stagger = 0.03 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const words = children.split(' ')

  return (
    <div ref={ref} className="overflow-hidden">
      <Tag className={className}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              className="inline-block"
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: delay + i * stagger,
                ease: [0.25, 0.1, 0, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  )
}
