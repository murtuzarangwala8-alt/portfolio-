import { useState, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAllyoPmvVb70eDecaY16HoRUkFxicN6h8';
const MAX_MESSAGES = 10;
const COOLDOWN_MS = 5000;
const MAX_CHARS = 150;

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const FloatingAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Murtuza's AI Assistant. Ask me about his skills, projects, or experience!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [lastSentAt, setLastSentAt] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMsg = (role: 'user' | 'assistant', content: string) =>
    setMessages(prev => [...prev, { role, content, timestamp: new Date() }]);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    if (userMessage.length > MAX_CHARS) {
      addMsg('assistant', `Please keep your message under ${MAX_CHARS} characters.`);
      return;
    }

    if (userMsgCount >= MAX_MESSAGES) {
      addMsg('assistant', 'You have reached the maximum of 10 questions per session. Please refresh to start a new session.');
      return;
    }

    const now = Date.now();
    if (now - lastSentAt < COOLDOWN_MS) {
      addMsg('assistant', `Please wait ${Math.ceil((COOLDOWN_MS - (now - lastSentAt)) / 1000)}s before sending another message.`);
      return;
    }

    addMsg('user', userMessage);
    setInput('');
    setIsLoading(true);
    setUserMsgCount(prev => prev + 1);
    setLastSentAt(Date.now());

    try {
      const systemInstruction = `You are the AI assistant for Murtuza Rangwala's portfolio website. Answer professionally and briefly in 2-3 sentences max. Help recruiters understand his skills in finance, data analytics, investment banking, Python, SQL, financial modeling, machine learning, consulting, resume, projects, and contact details. Context: MSc Economics & Data Analysis from University of Verona (2023-2026), BSc Computer Science from University of Mumbai (2019-2022). Worked as Business Analyst at Dimitra International (Oct 2025 - Jan 2026), Operations & Business Analyst at Mohamedally Akbarally & Co. (Sep 2019 - Dec 2021), Equity Dealer at Motilal Oswal (2020). Projects: Household Financial Market Participation Analysis, SME Growth & Credit Market Analysis, Constant GDP per Capita Analysis, RAG-based Financial Knowledge Assistant, XAU/USD Markov Chain Predictor.`;

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
            generationConfig: { temperature: 0.7, maxOutputTokens: 150 }
          })
        }
      );

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
      addMsg('assistant', aiResponse);
    } catch (error) {
      console.error('Chat error:', error);
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

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} className="sm:w-7 sm:h-7" /> : <MessageCircle size={24} className="sm:w-7 sm:h-7" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[70vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 text-white">
              <h3 className="font-bold text-lg">AI Assistant</h3>
              <p className="text-sm opacity-90">{MAX_MESSAGES - userMsgCount} questions remaining</p>
              <p className="text-xs opacity-75 mt-1">⚠️ For educational purposes only. Not financial advice. Not liable for any financial losses.</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-accent-500' 
                      : 'bg-primary-500'
                  }`}>
                    {message.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                  </div>
                  <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-3 rounded-2xl text-xs sm:text-sm break-words max-w-[85%] ${
                      message.role === 'user'
                        ? 'bg-accent-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    }`}>
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

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={isLoading || userMsgCount >= MAX_MESSAGES}
                  />
                  <span className={`absolute right-4 top-2 text-xs ${ input.length >= MAX_CHARS ? 'text-red-500' : 'text-gray-400' }`}>
                    {input.length}/{MAX_CHARS}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim() || userMsgCount >= MAX_MESSAGES}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingAIChat;
