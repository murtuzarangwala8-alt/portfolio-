import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Murtuza's AI assistant. Ask me about his skills, projects, experience, or anything else you'd like to know!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // TODO: Replace this with actual API call to your LLM endpoint
  const getMockResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('expertise')) {
      return "Murtuza has expertise in Data Analytics (Python, R, SQL), Quantitative Finance (Econometrics, Time-Series), AI/ML (Machine Learning, LLMs, RAG), and Business Strategy. He combines technical skills with business acumen.";
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return "Murtuza has worked as a Business Analyst at Dimitra International, Operations & Business Analyst at Mohamedally Akbarally & Co., and Equity Dealer at Motilal Oswal. He has experience in data analysis, financial modeling, and strategic planning.";
    }
    
    if (lowerMessage.includes('education') || lowerMessage.includes('study')) {
      return "Murtuza holds an MSc in Economics & Data Analysis from the University of Verona, Italy, and a BSc in Computer Science from the University of Mumbai, India.";
    }
    
    if (lowerMessage.includes('project')) {
      return "Some notable projects include: Household Financial Market Participation Analysis, SME Growth & Credit Market Analysis, RAG-based Financial Knowledge Assistant, and XAU/USD Markov Chain Predictor. Check out the Projects section for more details!";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return "You can reach Murtuza at murtuzarangwala8@gmail.com or connect on LinkedIn at linkedin.com/in/murtaza-rangwala-856456102. Feel free to scroll down to the Contact section!";
    }
    
    return "That's a great question! I can tell you about Murtuza's skills, experience, education, projects, or how to contact him. What would you like to know?";
  };

  // TODO: Replace this function with actual API call
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

    // Simulate API delay
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

    /* 
    TODO: Replace the above with actual API call like this:
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          history: messages 
        })
      });
      
      const data = await response.json();
      const assistantMsg: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
    */
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <section id="ai-chat" className="section-container bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Talk to My AI Twin</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ask my AI assistant anything about my skills, projects, and experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card overflow-hidden"
        >
          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-br from-accent-500 to-accent-600' 
                    : 'bg-gradient-to-br from-primary-500 to-primary-600'
                }`}>
                  {message.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
                </div>
                <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-accent-500 to-accent-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl">
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

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-full 
                         text-gray-900 dark:text-gray-100 placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 
                         text-white rounded-full hover:shadow-lg transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AIChat;
