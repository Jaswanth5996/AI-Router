
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  // State for the intro animation
  const [showIntro, setShowIntro] = useState(true);
  const [animatedText, setAnimatedText] = useState<string[]>([]);
  
  // References for scrolling animations
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  
  // Brand name to animate
  const brandName = "AIR";
  
  // Setup intro animation
  useEffect(() => {
    const timer = setTimeout(() => {
      brandName.split('').forEach((letter, index) => {
        setTimeout(() => {
          setAnimatedText(prev => [...prev, letter]);
        }, index * 300);
      });
      
      setTimeout(() => {
        setShowIntro(false);
      }, brandName.length * 300 + 1000);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Setup intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.transition-all-scroll, .transition-left, .transition-right');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [showIntro]);
  
  // AI models data
  const aiModels = [
    {
      name: "ChatGPT",
      description: "Developed by OpenAI, ChatGPT excels at natural language understanding, creative content generation, and assisting with a wide range of general tasks. It's particularly strong at writing, explaining concepts, and maintaining conversational context.",
      strengths: ["General knowledge", "Creative writing", "Explanations", "Conversational ability"],
      image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
    },
    {
      name: "Claude",
      description: "Created by Anthropic, Claude is designed with a focus on helpfulness, harmlessness, and honesty. It excels at nuanced reasoning, understanding complex instructions, and producing thoughtful, longer-form content while maintaining context.",
      strengths: ["Nuanced reasoning", "Long-form content", "Task following", "Safety alignment"],
      image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Anthropic_logo.svg"
    },
    {
      name: "Llama",
      description: "Meta's Llama is an open-source large language model designed for flexibility and customization. It's particularly strong at adapting to specific domains when fine-tuned, making it versatile for specialized applications.",
      strengths: ["Customizability", "Open-source foundation", "Domain specialization", "Efficient deployment"],
      image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png"
    },
    {
      name: "Gemini",
      description: "Google's Gemini is a multimodal AI system that can understand and reason across text, images, video, audio, and code. It excels at complex problem solving, coding tasks, and working with multiple types of information simultaneously.",
      strengths: ["Multimodal reasoning", "Code understanding", "Mathematical problem-solving", "Logical reasoning"],
      image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini_advanced_logo.max-1500x1500.png"
    },
    {
      name: "DeepSeek",
      description: "DeepSeek's models are specifically designed for deep technical understanding and specialized knowledge domains. They excel at code generation, scientific reasoning, and technical problem-solving with high accuracy.",
      strengths: ["Code generation", "Scientific reasoning", "Technical documentation", "Specialized knowledge"],
      image: "https://avatars.githubusercontent.com/u/123207580?s=280&v=4"
    }
  ];
  
  if (showIntro) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <h1 className="text-6xl font-bold">
          {animatedText.map((letter, index) => (
            <span 
              key={index} 
              className="letter-animation animate-letter"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="h-24"></div> {/* Spacer for fixed navbar */}
      
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">About AIR</h1>
          <p className="text-xl text-gray-600 transition-all-scroll">
            AIR (AI Reader) is an innovative platform that analyzes your prompts and routes them to the most suitable AI model to get you the best possible response.
          </p>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center transition-all-scroll">How AIR Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all-scroll">
              <div className="w-12 h-12 bg-air-100 rounded-full flex items-center justify-center mb-4 text-air-600 font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Submit Your Request</h3>
              <p className="text-gray-600">
                Enter any question, task or request in the chat interface.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all-scroll" style={{ transitionDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-air-100 rounded-full flex items-center justify-center mb-4 text-air-600 font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                AIR analyzes your request to determine which AI model would provide the optimal response.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all-scroll" style={{ transitionDelay: '0.4s' }}>
              <div className="w-12 h-12 bg-air-100 rounded-full flex items-center justify-center mb-4 text-air-600 font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Best Response Delivered</h3>
              <p className="text-gray-600">
                The selected AI model generates your response and AIR delivers it through a natural typing animation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Models */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center transition-all-scroll">AI Models Powering AIR</h2>
          
          {aiModels.map((model, index) => (
            <div 
              key={model.name}
              className="mb-20 flex flex-col md:flex-row items-center"
            >
              <div 
                className={`md:w-1/2 mb-6 md:mb-0 ${index % 2 === 0 ? 'md:pr-10 transition-left' : 'md:pl-10 md:order-2 transition-right'}`}
              >
                <h3 className="text-2xl font-bold mb-4">{model.name}</h3>
                <p className="text-gray-600 mb-6">{model.description}</p>
                <div>
                  <h4 className="font-semibold mb-2">Key Strengths:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {model.strengths.map((strength, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2 h-2 bg-air-500 rounded-full mr-2"></span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div 
                className={`md:w-1/2 flex justify-center ${index % 2 === 0 ? 'md:order-2 transition-right' : 'transition-left'}`}
              >
                <div className="w-40 h-40 bg-white rounded-full shadow-sm flex items-center justify-center p-4">
                  <img 
                    src={model.image} 
                    alt={`${model.name} logo`} 
                    className="max-w-full max-h-full"
                    style={{ filter: "grayscale(0.5)" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-air-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 transition-all-scroll">Experience the Future of AI Assistance</h2>
          <p className="text-xl text-gray-600 mb-10 transition-all-scroll">
            Try AIR today and discover how intelligent routing to specialized AI models can transform your productivity.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 transition-all-scroll">
            <Link 
              to="/" 
              className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-50 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/chat" 
              className="px-6 py-3 bg-air-600 rounded-lg text-white hover:bg-air-700 transition-colors"
            >
              Start Chatting
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
