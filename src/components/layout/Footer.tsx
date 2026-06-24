'use client'

import { Mail, ExternalLink, MessageCircle } from 'lucide-react'
import { personalInfo } from '@/lib/data'

const socials = [
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
  { icon: ExternalLink, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: ExternalLink, href: personalInfo.github, label: 'GitHub' },
  { icon: MessageCircle, href: personalInfo.whatsapp, label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="text-2xl font-bold font-display">
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              {personalInfo.initials}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-3 rounded-full border border-white/10 bg-white/[0.03] text-white/50 hover:text-primary-500 hover:border-primary-500/30 transition-all duration-300"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 pt-8 border-t border-white/5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/20 border border-green-700/30">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-medium">
              Open to Work — {personalInfo.openToLocations.join(' · ')}
            </span>
          </div>
          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
