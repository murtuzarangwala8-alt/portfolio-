'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setVisible(v > 0.02 && v < 0.98)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <motion.div
      className="fixed right-0 top-0 bottom-0 w-[3px] z-[100] origin-top"
      style={{ scaleY, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full h-full bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500" />
    </motion.div>
  )
}
