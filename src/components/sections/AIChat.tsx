'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const rules: { patterns: RegExp[]; response: string }[] = [
  { patterns: [/^(hi|hello|hey|hiya)/i], response: "Hi there! 👋 I'm Murtuza's AI assistant. Ask me about his skills, experience, projects, or how to contact him!" },
  { patterns: [/who are you|what are you/i], response: "I'm Murtuza Rangwala's personal AI assistant. I can answer questions about his education, work experience, skills, and projects!" },
  { patterns: [/contact|email|reach|hire/i], response: "You can reach Murtuza at murtuzarangwala8@gmail.com or connect on LinkedIn: linkedin.com/in/murtaza-rangwala-856456102" },
  { patterns: [/skill|tech|python|sql|r |matlab|power bi/i], response: "Murtuza's skills include Python, R, SQL, MATLAB, Power BI, Excel. He specialises in Econometrics, Financial Modeling, Machine Learning, LLMs, and NLP." },
  { patterns: [/education|university|degree|msc|bsc|verona|mumbai/i], response: "Murtuza holds an MSc in Economics & Data Analysis from the University of Verona, Italy (2023–2026) and a BSc in Computer Science from the University of Mumbai, India (2019–2022)." },
  { patterns: [/experience|work|job|dimitra|motilal|artane/i], response: "Murtuza is currently an Investment Banking Analyst at Artane Partners in Dublin (Jun 2026–Present). Previously, he worked as a Business Analyst at Dimitra International in Berlin, Operations & Business Analyst at Mohamedally Akbarally & Co., and Equity Dealer at Motilal Oswal." },
  { patterns: [/project|gdp|sme|household|markov|rag|trading/i], response: "Key projects: Household Financial Market Participation, SME Growth Analysis, GDP per Capita Analysis, RAG-based Financial Assistant, and XAU/USD Markov Chain Predictor." },
  { patterns: [/machine learning|ml|ai|nlp|llm|rag/i], response: "Murtuza works with Machine Learning, LLMs, RAG pipelines, LangChain, and NLP. He has built AI-powered tools including a RAG-based Financial Knowledge Assistant." },
  { patterns: [/thanks|thank you/i], response: "You're welcome! 😊 Feel free to ask anything else about Murtuza." },
  { patterns: [/bye|goodbye/i], response: "Goodbye! 👋 Feel free to come back anytime." },
]

function getResponse(msg: string): string | null {
  for (const rule of rules) {
    if (rule.patterns.some((p) => p.test(msg))) return rule.response
  }
  return null
}

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! 👋 I'm Murtuza's AI Assistant. Ask me anything about his skills, projects, or experience!" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [aiCalls, setAiCalls] = useState(0)
  const MAX_AI = 4

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInput('')
    setLoading(true)

    const local = getResponse(text)
    if (local) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'assistant', content: local }])
        setLoading(false)
      }, 500)
      return
    }

    if (aiCalls >= MAX_AI) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "I've used my AI quota. Use the contact form to reach Murtuza directly! 👇" },
      ])
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response || data.error || 'Sorry, could not generate a response.' }])
      setAiCalls((c) => c + 1)
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, the AI assistant is temporarily unavailable.' }])
    }
    setLoading(false)
  }

  const limitReached = aiCalls >= MAX_AI

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 shadow-lg shadow-primary-500/20 flex items-center justify-center text-white hover:scale-105 transition-transform"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-24 right-6 z-40 w-[360px] max-w-[calc(100vw-32px)] h-[520px] max-h-[70vh]"
          >
            <GlassCard className="h-full flex flex-col overflow-hidden p-0">
              <div className="bg-gradient-to-r from-primary-500/20 to-accent-500/20 p-4 border-b border-white/5">
                <h3 className="font-bold text-white">AI Assistant</h3>
                <p className="text-xs text-white/50">
                  {limitReached ? 'Contact form available' : `${MAX_AI - aiCalls} AI questions remaining`}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-accent-500' : 'bg-primary-500'}`}>
                      {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
                    </div>
                    <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-accent-500 text-white' : 'bg-white/5 text-white/80'}`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                      <Bot size={14} className="text-white" />
                    </div>
                    <div className="bg-white/5 p-3 rounded-2xl">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {limitReached ? (
                <div className="p-4 border-t border-white/5">
                  <a
                    href={`mailto:murtuzarangwala8@gmail.com`}
                    className="block w-full text-center py-3 rounded-xl bg-primary-500 text-black font-semibold text-sm hover:bg-primary-400 transition-colors"
                  >
                    ✉️ Email Murtuza Directly
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
                  className="p-4 border-t border-white/5 flex gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary-500/50"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-4 py-2.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-black disabled:opacity-50 transition-all"
                  >
                    <Send size={16} />
                  </button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
