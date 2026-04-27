import { useState, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      content: "Hi! I'm Murtuza's AI assistant. Ask me about his skills, projects, or experience!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getMockResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('expertise')) {
      return "Murtuza specializes in Data Analytics (Python, R, SQL), Quantitative Finance (Econometrics, Time-Series), AI/ML (Machine Learning, LLMs, RAG), and Business Strategy.";
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return "Murtuza has worked as a Business Analyst at Dimitra International, Operations & Business Analyst at Mohamedally Akbarally & Co., and Equity Dealer at Motilal Oswal.";
    }
    
    if (lowerMessage.includes('education') || lowerMessage.includes('study')) {
      return "He holds an MSc in Economics & Data Analysis from University of Verona, Italy, and a BSc in Computer Science from University of Mumbai, India.";
    }
    
    if (lowerMessage.includes('project')) {
      return "Notable projects include Household Financial Market Participation Analysis, RAG-based Financial Knowledge Assistant, and XAU/USD Markov Chain Predictor.";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return "You can reach Murtuza at murtuzarangwala8@gmail.com or on LinkedIn at linkedin.com/in/murtaza-rangwala-856456102";
    }
    
    return "I can tell you about Murtuza's skills, experience, education, projects, or how to contact him. What would you like to know?";
  };

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    const userMsg: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const assistantMsg: Message = {
        role: 'assistant',
        content: getMockResponse(userMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsLoading(false);
      scrollToBottom();
    }, 1000);
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
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 text-white">
              <h3 className="font-bold text-lg">AI Assistant</h3>
              <p className="text-sm opacity-90">Ask me anything!</p>
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
                    <div className={`inline-block p-3 rounded-2xl text-sm ${
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
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
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
