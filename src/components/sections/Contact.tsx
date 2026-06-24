'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import TextReveal from '@/components/ui/TextReveal'
import MagneticButton from '@/components/ui/MagneticButton'
import { personalInfo } from '@/lib/data'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-150px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mnjwable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary-500 font-medium">
            Connect
          </span>
          <TextReveal
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mt-4 mb-6"
          >
            Get In Touch
          </TextReveal>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold font-display text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white/30">Email</p>
                    <p className="text-sm text-white/80 group-hover:text-primary-400 transition-colors">
                      {personalInfo.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02]">
                  <div className="p-3 rounded-lg bg-primary-500/10 text-primary-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white/30">Location</p>
                    <p className="text-sm text-white/80">{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h3 className="text-xl font-bold font-display text-white mb-6">
                Open to Opportunities
              </h3>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/20 border border-green-700/30 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-medium">
                  Available for roles in {personalInfo.openToLocations.join(' · ')}
                </span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                I&apos;m currently open to Data Analyst, Financial Analyst,
                Business Analyst, and Data Scientist positions. Let&apos;s discuss
                how I can contribute to your team.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold font-display text-white mb-6">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-white/50 mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-white/50 mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-white/50 mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>
                <MagneticButton>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-black font-semibold text-sm disabled:opacity-50 transition-all"
                  >
                    {status === 'sending' ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </MagneticButton>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-400 text-sm"
                  >
                    <CheckCircle size={16} /> Message sent successfully!
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm"
                  >
                    <AlertCircle size={16} /> Something went wrong. Please try again.
                  </motion.div>
                )}
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
