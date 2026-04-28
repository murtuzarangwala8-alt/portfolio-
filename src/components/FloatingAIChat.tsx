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
      content: "Hi! I'm Murtuza's Trading AI Assistant. Ask me about markets, trading strategies, technical analysis, or his finance projects!",
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
    
    // Trading & Market Analysis
    if (lowerMessage.includes('gold') || lowerMessage.includes('xau')) {
      return "Murtuza built an XAU/USD Markov Chain Predictor using first-order Markov models to forecast gold price movements. It analyzes historical patterns and predicts next state (Up/Down/Neutral) with transition probabilities.";
    }
    
    if (lowerMessage.includes('trading') || lowerMessage.includes('strategy')) {
      return "His trading expertise includes quantitative strategies, time-series forecasting, Markov Chain models, and technical analysis. He worked as an Equity Dealer at Motilal Oswal, executing trades and analyzing market trends.";
    }
    
    if (lowerMessage.includes('technical') || lowerMessage.includes('indicator')) {
      return "He uses technical indicators like moving averages, RSI, MACD, and Bollinger Bands. His projects incorporate statistical models (ARIMA, GARCH) and machine learning for price prediction.";
    }
    
    if (lowerMessage.includes('risk') || lowerMessage.includes('portfolio')) {
      return "Murtuza specializes in risk management, portfolio optimization, and quantitative finance. His MSc thesis analyzed household financial market participation using econometric models and risk assessment frameworks.";
    }
    
    if (lowerMessage.includes('market') || lowerMessage.includes('stock') || lowerMessage.includes('equity')) {
      return "He has hands-on experience in equity markets, having worked as an Equity Dealer. His analysis covers market microstructure, price discovery, volatility modeling, and behavioral finance patterns.";
    }
    
    if (lowerMessage.includes('python') || lowerMessage.includes('code')) {
      return "He codes trading algorithms in Python using pandas, numpy, scikit-learn, and statsmodels. His projects include API integration (GoldAPI, TwelveData), data preprocessing, and real-time market data analysis.";
    }
    
    if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
      return "He applies ML to finance: predictive models for price forecasting, NLP for sentiment analysis, RAG systems for financial knowledge retrieval, and LLMs for market insights. Check out his RAG-based Financial Knowledge Assistant!";
    }
    
    if (lowerMessage.includes('data') || lowerMessage.includes('analytics')) {
      return "Expert in financial data analytics using Python, R, SQL. Skills include time-series analysis, econometrics, statistical modeling, data visualization, and building ETL pipelines for market data.";
    }
    
    // Career & Background
    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return "Business Analyst at Dimitra International (Berlin), Operations Analyst at Mohamedally Akbarally & Co. (Mumbai), and Equity Dealer at Motilal Oswal. Strong background in finance, trading, and data-driven decision making.";
    }
    
    if (lowerMessage.includes('project')) {
      return "Key projects: XAU/USD Markov Chain Predictor, RAG-based Financial Knowledge Assistant, Household Financial Market Participation Analysis, and various quantitative trading models.";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('hire')) {
      return "📧 murtuzarangwala8@gmail.com | 💼 LinkedIn: linkedin.com/in/murtaza-rangwala-856456102 | Available for opportunities in Quantitative Finance, Trading, and Data Analytics!";
    }
    
    return "I can discuss trading strategies, market analysis, technical indicators, risk management, ML in finance, or Murtuza's projects. What interests you?";
  };

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    // Check message length
    if (userMessage.length > 500) {
      const errorMsg: Message = {
        role: 'assistant',
        content: 'Message too long. Please keep it under 500 characters.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
      return;
    }

    const userMsg: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Call Netlify function
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMsg: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: Message = {
        role: 'assistant',
        content: 'Sorry, the AI assistant is temporarily unavailable. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
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
              <h3 className="font-bold text-lg">Trading AI Assistant</h3>
              <p className="text-sm opacity-90">Markets • Strategies • Analysis</p>
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
