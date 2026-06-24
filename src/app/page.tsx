'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/layout/ScrollProgress'
import AnimatedCursor from '@/components/layout/AnimatedCursor'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Timeline from '@/components/sections/Timeline'
import Contact from '@/components/sections/Contact'
import AIChat from '@/components/sections/AIChat'
import GradientMesh from '@/components/effects/GradientMesh'

const SmoothScroll = dynamic(
  () => import('@/components/providers/SmoothScroll'),
  { ssr: false }
)

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#030712] text-white overflow-hidden">
        <GradientMesh />
        <AnimatedCursor />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Timeline />
          <Contact />
        </main>
        <Footer />
        <AIChat />
      </div>
    </SmoothScroll>
  )
}
