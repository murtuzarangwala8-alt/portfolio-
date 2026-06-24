'use client'

import { useEffect, useRef } from 'react'

export default function GradientMesh() {
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

    const animate = () => {
      ctx.clearRect(0, 0, W, H)

      const cx = mouse.x + (W / 2 - mouse.x) * 0.02
      const cy = mouse.y + (H / 2 - mouse.y) * 0.02

      const g1 = ctx.createRadialGradient(cx - 200, cy - 200, 0, cx - 200, cy - 200, 600)
      g1.addColorStop(0, 'rgba(254,179,0,0.06)')
      g1.addColorStop(0.5, 'rgba(59,130,246,0.03)')
      g1.addColorStop(1, 'transparent')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, W, H)

      const g2 = ctx.createRadialGradient(cx + 300, cy + 200, 0, cx + 300, cy + 200, 500)
      g2.addColorStop(0, 'rgba(245,158,11,0.04)')
      g2.addColorStop(1, 'transparent')
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, W, H)

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
