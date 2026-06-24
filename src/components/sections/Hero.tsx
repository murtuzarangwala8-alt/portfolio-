'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, ExternalLink } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import TextScramble from '@/components/ui/TextScramble'
import { personalInfo } from '@/lib/data'

const roles = [
  'Data Analyst',
  'Financial Analyst',
  'Data Scientist',
  'Business Analyst',
  'AI & Automation',
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    const mouse = { x: W / 2, y: H / 2 }

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)

    const gridSize = 40
    const cols = Math.ceil(W / gridSize) + 1
    const rows = Math.ceil(H / gridSize) + 1
    const baseDots: { x: number; y: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        baseDots.push({ x: c * gridSize, y: r * gridSize })
      }
    }

    let time = 0

    const animate = () => {
      time += 0.005
      ctx.clearRect(0, 0, W, H)

      baseDots.forEach((dot) => {
        const dx = dot.x - mouse.x
        const dy = dot.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const wave = Math.sin(time + dot.x * 0.02 + dot.y * 0.02) * 5

        let x = dot.x
        let y = dot.y

        if (dist < 120) {
          const force = (120 - dist) / 120
          x += (dx / dist) * force * 30
          y += (dy / dist) * force * 30
        }

        y += wave

        const alpha = dist < 120 ? 0.6 : 0.15 + Math.sin(time * 2 + dot.x * 0.03 + dot.y * 0.03) * 0.1
        const size = dist < 120 ? 2 : 0.8

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(254, 179, 0, ${Math.max(0, alpha)})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030712] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold font-display leading-[0.9] tracking-tight mb-6"
          >
            <span className="text-white/30">Building</span>
            <br />
            <span className="bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
              Future Digital
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 bg-clip-text text-transparent">
              Experiences
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <span className="text-lg text-white/40">I&apos;m</span>
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              {personalInfo.name}
            </h2>
            <span className="hidden sm:inline text-white/20">·</span>
            <div className="text-lg sm:text-xl text-primary-400 font-mono">
              <TextScramble texts={roles} />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-base sm:text-lg text-white/40 max-w-xl leading-relaxed mb-12"
          >
            Data analyst and financial analyst specializing in econometrics,
            machine learning, and quantitative finance. Turning complex data
            into actionable intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold text-sm shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-shadow">
                <Download size={16} />
                Download Resume
              </span>
            </MagneticButton>

            <MagneticButton onClick={scrollToProjects}>
              <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/80 font-semibold text-sm hover:bg-white/5 transition-colors">
                View Projects
                <ExternalLink size={16} />
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown size={20} className="text-white/20" />
      </motion.div>
    </section>
  )
}
