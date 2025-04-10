
import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, X, MessageSquare, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// TypeWriter component for animated typing effect
const TypeWriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 10); // Speed of typing
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);
  
  return <span>{displayedText}</span>;
};

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  completed: boolean;
}

const ChatInterface = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Show intro animation on first load
  useEffect(() => {
    setTimeout(() => {
      setShowIntro(false);
    }, 2500);
  }, []);
  
  // Scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      completed: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAiThinking(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      setAiThinking(false);
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        sender: 'ai',
        completed: false
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Mark the message as completed after typing animation
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessage.id ? { ...msg, completed: true } : msg
          )
        );
      }, aiMessage.content.length * 10 + 500);
    }, 1500);
  };
  
  // Simulate AI response based on input
  const getAIResponse = (userInput: string): string => {
    const responses = [
      "Based on your query, I've analyzed that the best AI model to handle this is Claude by Anthropic. Here's what Claude says: ",
      "I've determined that ChatGPT would be the optimal model for this request. According to ChatGPT: ",
      "Your question is best answered by DeepSeek's specialized capabilities. DeepSeek responds: ",
      "For this particular task, Gemini provides the most accurate response. Here's Gemini's answer: ",
      "I've routed your request to Llama, which specializes in this type of query. Llama responds: "
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return randomResponse + "I've processed your request about '" + userInput + "' and here's a comprehensive response that addresses all aspects of your query. Is there anything specific about this topic you'd like me to explore further?";
  };
  
  if (showIntro) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <h1 className="text-6xl font-bold text-gradient">AIR</h1>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`fixed md:relative z-20 h-full w-64 bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="text-xl font-bold text-gradient">AIR</Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          <Link 
            to="/about" 
            className="flex items-center p-2 mb-4 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <MessageSquare size={18} className="mr-2" />
            <span>Explore AIR</span>
          </Link>
        </div>
        
        <div className="p-4 border-t">
          <h3 className="text-sm font-medium text-gray-500 mb-2">History</h3>
          {messages.length > 0 ? (
            <ul className="space-y-2">
              {messages.filter(msg => msg.sender === 'user').map((msg, index) => (
                <li 
                  key={msg.id}
                  className="p-2 text-sm truncate text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <div className="flex items-center">
                    <ChevronRight size={16} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{msg.content}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No history yet</p>
          )}
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-4 bg-white shadow-sm">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 text-gray-500 hover:text-gray-700 md:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-air-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare size={24} className="text-air-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">How can AIR help you today?</h2>
              <p className="text-gray-500 text-center max-w-md">
                AIR analyzes your prompt and selects the best AI model to answer your question.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-air-600 text-white' 
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    {message.sender === 'ai' && !message.completed ? (
                      <TypeWriter text={message.content} />
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {aiThinking && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Input */}
        <form onSubmit={handleSend} className="bg-white p-4 border-t">
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message AIR..."
              className="flex-1 bg-transparent border-none outline-none"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className={`ml-2 p-2 rounded-full ${
                input.trim() ? 'bg-air-600 text-white' : 'bg-gray-300 text-gray-500'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
