'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const isInteractive = el.tagName === 'A' || el.tagName === 'BUTTON' || el.closest('a') || el.closest('button')
      if (cursorRef.current) {
        cursorRef.current.style.width = isInteractive ? '48px' : '16px'
        cursorRef.current.style.height = isInteractive ? '48px' : '16px'
        cursorRef.current.style.background = isInteractive
          ? 'radial-gradient(circle, rgba(254,179,0,0.15) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(254,179,0,0.6) 0%, rgba(254,179,0,0.2) 70%, transparent 100%)'
        cursorRef.current.style.border = isInteractive ? '1px solid rgba(254,179,0,0.3)' : 'none'
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15
      if (cursorRef.current) {
        cursorRef.current.style.left = `${pos.current.x}px`
        cursorRef.current.style.top = `${pos.current.y}px`
      }
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
      style={{
        width: '16px',
        height: '16px',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(254,179,0,0.6) 0%, rgba(254,179,0,0.2) 70%, transparent 100%)',
        transition: 'width 0.3s, height 0.3s, background 0.3s',
      }}
    />
  )
}
