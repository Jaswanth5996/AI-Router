"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ZapIcon, HomeIcon, MessageSquare } from "lucide-react";
import { AI_MODELS } from "@/lib/constants";
import { letterAnimation } from "@/lib/animations";

// ModelSection component defined outside of the main component
interface ModelSectionProps {
  model: {
    id: string;
    name: string;
    description: string;
    specialty: string;
    reason: string;
  };
  isEven: boolean;
  index: number;
}

function ModelSection({ model, isEven, index }: ModelSectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const getModelColor = (id: string) => {
    switch (id) {
      case "chatgpt": return "from-emerald-500 to-emerald-700";
      case "gemini": return "from-blue-500 to-blue-700";
      case "claude": return "from-purple-500 to-purple-700";
      case "deepseek": return "from-orange-500 to-orange-700";
      case "llama": return "from-yellow-500 to-yellow-700";
      default: return "from-zinc-500 to-zinc-700";
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Model Icon/Logo */}
      <div className="w-full md:w-2/5">
        <div
          className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br ${getModelColor(model.id)} p-6 mx-auto flex items-center justify-center shadow-lg`}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            {model.name.charAt(0)}
          </motion.span>
        </div>
      </div>

      {/* Model Description */}
      <div className="w-full md:w-3/5 space-y-4">
        <motion.div
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <ZapIcon className={`h-5 w-5 ${
            model.id === "chatgpt" ? "text-emerald-500" :
            model.id === "gemini" ? "text-blue-500" :
            model.id === "claude" ? "text-purple-500" :
            model.id === "deepseek" ? "text-orange-500" :
            model.id === "llama" ? "text-yellow-500" :
            "text-zinc-500"
          }`} />
          <h2 className="text-2xl md:text-3xl font-bold">
            {model.name}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-zinc-400"
        >
          {model.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-zinc-900 p-4 rounded-lg border border-zinc-800"
        >
          <h3 className="font-medium mb-2">Specialty</h3>
          <p className="text-zinc-300">{model.specialty}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="font-medium mb-2">When AIR chooses this model</h3>
          <p className="text-zinc-300">{model.reason}</p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    // Start the scroll content animation after the initial AIR animation
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 overflow-hidden">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-zinc-900/80 backdrop-blur-md"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>

        <Link
          href="/chat"
          className="px-4 py-2 rounded-md bg-white text-zinc-900 hover:bg-zinc-100 transition-colors text-sm font-medium"
        >
          Try AIR Chat
        </Link>
      </motion.header>

      <main className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          {/* Initial AIR Animation */}
          <AnimatePresence>
            {!animationComplete && (
              <motion.div
                className="h-[80vh] flex items-center justify-center"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center space-x-4">
                  {['A', 'I', 'R'].map((letter, index) => (
                    <motion.div
                      key={letter}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.3,
                        ease: "easeOut"
                      }}
                      className="text-8xl md:text-9xl font-bold text-white"
                    >
                      {letter}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scrollable Sections */}
          <AnimatePresence>
            {animationComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                ref={containerRef}
                className="space-y-32 md:space-y-40 mb-20"
              >
                {/* Intro Section */}
                <motion.section className="text-center max-w-3xl mx-auto py-10">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-bold mb-6"
                  >
                    About AIR
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-zinc-400 leading-relaxed"
                  >
                    AIR is an intelligent routing system that automatically selects the most appropriate AI model for your specific query, ensuring you always get the best possible response.
                  </motion.p>
                </motion.section>

                {/* Model Sections */}
                {AI_MODELS.map((model, index) => (
                  <ModelSection
                    key={model.id}
                    model={model}
                    isEven={index % 2 === 0}
                    index={index}
                  />
                ))}

                {/* Navigation Buttons */}
                <motion.div
                  className="w-full flex flex-col md:flex-row gap-4 justify-center items-center pt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    href="/"
                    className="w-full md:w-auto px-6 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 text-white"
                  >
                    <HomeIcon className="h-5 w-5" />
                    <span>Return to Home</span>
                  </Link>

                  <Link
                    href="/chat"
                    className="w-full md:w-auto px-6 py-4 rounded-lg bg-white text-zinc-900 hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Start Chatting</span>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
