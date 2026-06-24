'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; alpha: number; life: number; maxLife: number
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    const particles: Particle[] = []
    const mouse = { x: W / 2, y: H / 2 }

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)

    const addParticle = () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.2 + Math.random() * 0.5
      particles.push({
        x: mouse.x + (Math.random() - 0.5) * 50,
        y: mouse.y + (Math.random() - 0.5) * 50,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 2,
        alpha: 0.6 + Math.random() * 0.4,
        life: 0,
        maxLife: 100 + Math.random() * 150,
      })
    }

    let particleTimer = 0

    const animate = () => {
      ctx.clearRect(0, 0, W, H)

      particleTimer++
      if (particleTimer % 3 === 0 && particles.length < 120) addParticle()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.99
        p.vy *= 0.99
        p.life++
        p.alpha *= 0.995

        if (p.life > p.maxLife || p.alpha < 0.01) {
          particles.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(254, 179, 0, ${p.alpha * 0.5})`
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 80) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(254, 179, 0, ${(1 - dist / 80) * 0.08})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}
