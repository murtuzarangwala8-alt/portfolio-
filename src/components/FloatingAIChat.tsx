import { useState, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAllyoPmvVb70eDecaY16HoRUkFxicN6h8';
const MAX_MESSAGES = 4;
const MAX_CHARS = 150;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:murtuzarangwala8@gmail.com?subject=Portfolio Inquiry from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.name}%0AEmail: ${formData.email}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="text-center p-4">
      <p className="text-2xl mb-2">✅</p>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Thanks! Your email client should have opened.</p>
    </div>
  );

  return (
    <div className="p-4">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">
        Want to know more? Send Murtuza a message!
      </p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Your name"
          required
          value={formData.name}
          onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
          className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          type="email"
          placeholder="Your email"
          required
          value={formData.email}
          onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
          className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <textarea
          placeholder="Your message..."
          required
          rows={3}
          value={formData.message}
          onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
          className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

const FloatingAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Murtuza's AI Assistant. Ask me anything about his skills, projects, or experience! (4 questions max)"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMsg = (role: 'user' | 'assistant', content: string) =>
    setMessages(prev => [...prev, { role, content }]);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || userMsgCount >= MAX_MESSAGES) return;

    addMsg('user', userMessage);
    setInput('');
    setIsLoading(true);
    setUserMsgCount(prev => prev + 1);

    try {
      const systemInstruction = `You are Murtuza Rangwala's personal AI assistant on his portfolio website. Only answer questions about Murtuza. If asked anything unrelated, say: "I can only answer questions about Murtuza and his work."

FACTS ABOUT MURTUZA:
Education: MSc Economics and Data Analysis, University of Verona Italy (2023-2026). BSc Computer Science, University of Mumbai India (2019-2022).
Experience: Business Analyst at Dimitra International Berlin (Oct 2025 - Jan 2026). Operations and Business Analyst at Mohamedally Akbarally and Co Mumbai (Sep 2019 - Dec 2021). Equity Dealer at Motilal Oswal Mumbai (2020).
Skills: Python, R, SQL, MATLAB, Power BI, Excel, Stata. Econometrics, Financial Modeling, DCF, ARIMA, Time-Series. Machine Learning, LLMs, RAG, LangChain, NLP.
Projects: Household Financial Market Participation Analysis, SME Growth and Credit Market Analysis, Constant GDP per Capita Analysis 1970-2022, RAG-based Financial Knowledge Assistant, XAU/USD Markov Chain Predictor, AI Trading Assistant.
Contact: murtuzarangwala8@gmail.com. LinkedIn: linkedin.com/in/murtaza-rangwala-856456102.

Be concise, friendly and professional. Never invent facts.`;

      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': API_KEY
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${systemInstruction}\n\nUser question: ${userMessage}` }] }],
            generationConfig: { temperature: 0.5 }
          })
        }
      );

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
      addMsg('assistant', aiResponse);
    } catch (error) {
      addMsg('assistant', 'Sorry, the AI assistant is temporarily unavailable. Please try again later.');
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const limitReached = userMsgCount >= MAX_MESSAGES;

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full shadow-2xl flex items-center justify-center text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-96 h-[520px] max-h-[75vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 text-white">
              <h3 className="font-bold text-lg">Murtuza's AI Assistant</h3>
              <p className="text-sm opacity-90">
                {limitReached ? 'Questions limit reached' : `${MAX_MESSAGES - userMsgCount} questions remaining`}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'user' ? 'bg-accent-500' : 'bg-primary-500'}`}>
                    {message.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                  </div>
                  <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-3 rounded-2xl text-xs sm:text-sm break-words max-w-[85%] ${message.role === 'user' ? 'bg-accent-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}>
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Contact form after limit OR input */}
            {limitReached ? (
              <div className="border-t border-gray-200 dark:border-gray-700">
                <ContactForm />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
                      placeholder="Ask me anything..."
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      disabled={isLoading}
                    />
                    <span className={`absolute right-4 top-2 text-xs ${input.length >= MAX_CHARS ? 'text-red-500' : 'text-gray-400'}`}>
                      {input.length}/{MAX_CHARS}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingAIChat;
