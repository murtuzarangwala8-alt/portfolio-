'use client'

import { useEffect, useState, useRef } from 'react'

interface TextScrambleProps {
  texts: string[]
  className?: string
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________'

export default function TextScramble({ texts, className }: TextScrambleProps) {
  const [currentText, setCurrentText] = useState('')
  const [index, setIndex] = useState(0)
  const frameRef = useRef(0)
  const frame = useRef(0)

  useEffect(() => {
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = []
    const from = currentText
    const to = texts[index]
    const length = Math.max(from.length, to.length)

    for (let i = 0; i < length; i++) {
      const fromChar = from[i] || ''
      const toChar = to[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      queue.push({ from: fromChar, to: toChar, start, end })
    }

    const animate = () => {
      let output = ''
      let complete = 0
      for (let i = 0, l = queue.length; i < l; i++) {
        const q = queue[i]
        if (frame.current >= q.end) {
          complete++
          output += q.to
        } else if (frame.current >= q.start) {
          if (!q.char || Math.random() < 0.28) {
            q.char = CHARS[Math.floor(Math.random() * CHARS.length)]
          }
          output += q.char
        } else {
          output += q.from
        }
      }
      setCurrentText(output)
      if (complete === queue.length) {
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % texts.length)
        }, 2000)
      } else {
        frame.current++
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frame.current = 0
    frameRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frameRef.current)
    }
  }, [index])

  return (
    <span className={className} aria-label={texts[index]}>
      {currentText}
    </span>
  )
}
