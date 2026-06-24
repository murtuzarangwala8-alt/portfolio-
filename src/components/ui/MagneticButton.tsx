'use client'

import { useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
}

export default function MagneticButton({ children, className, onClick, href, target, rel }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className={className}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return <a href={href} target={target} rel={rel} className="inline-block">{content}</a>
  }

  return (
    <button onClick={onClick} className="inline-block">
      {content}
    </button>
  )
}
