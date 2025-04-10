
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-32 pb-20 px-6 md:px-20">
        <h1 className="text-5xl md:text-7xl font-bold text-center max-w-5xl leading-tight mb-8">
          Introducing <span className="text-gradient">AIR</span>
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl text-gray-600 mb-12">
          The AI reader that analyzes your request and sends it to the most suitable AI model for optimal response.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <Link 
            to="/chat" 
            className="flex items-center justify-between px-6 py-4 bg-air-600 hover:bg-air-700 transition-colors rounded-lg text-white"
          >
            <span className="text-lg font-medium">Chat now</span>
            <ArrowRight size={20} />
          </Link>
          
          <Link 
            to="/about" 
            className="flex items-center justify-between px-6 py-4 bg-white border border-gray-300 hover:border-air-400 transition-colors rounded-lg"
          >
            <span className="text-lg font-medium">Learn about AI Reader</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
      
      {/* Sample Use Cases */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What can you do with AIR?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sample Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Advanced Mathematical Solutions</h3>
              <p className="text-gray-600 mb-4">
                "Solve the partial differential equation ∂²u/∂x² + ∂²u/∂y² = 0"
              </p>
              <p className="text-sm text-gray-500 italic">
                AIR routes to the best math-focused AI for accurate solutions
              </p>
            </div>
            
            {/* Sample Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Creative Content Generation</h3>
              <p className="text-gray-600 mb-4">
                "Write a poem about a falcon soaring through a thunderstorm"
              </p>
              <p className="text-sm text-gray-500 italic">
                AIR selects the most creative AI for engaging, original content
              </p>
            </div>
            
            {/* Sample Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Code Optimization</h3>
              <p className="text-gray-600 mb-4">
                "Optimize this recursive function to reduce time complexity"
              </p>
              <p className="text-sm text-gray-500 italic">
                AIR sends coding tasks to specialized AI models for precise solutions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
