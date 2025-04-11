"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Lightbulb, Zap, AlertTriangle, MessageSquare, Code, Image, Heart, Brain } from "lucide-react";
import { APP_DESCRIPTION, SAMPLE_PROMPTS, DETAILED_SAMPLES } from "@/lib/constants";
import { slideUp, staggerContainer, fadeIn } from "@/lib/animations";

// Custom component for detailed sample cards
interface SampleCardProps {
  title: string;
  examples: {
    prompt: string;
    description: string;
    model: string;
  }[];
  icon: React.ReactNode;
  delay: number;
}

// Map icon strings to actual components
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Code": return <Code className="h-5 w-5 text-cyan-400" />;
    case "Image": return <Image className="h-5 w-5 text-purple-400" />;
    case "Heart": return <Heart className="h-5 w-5 text-red-400" />;
    case "Brain": return <Brain className="h-5 w-5 text-yellow-400" />;
    default: return <MessageSquare className="h-5 w-5 text-blue-400" />;
  }
};

function SampleCard({ title, examples, icon, delay }: SampleCardProps) {
  return (
    <motion.div
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-zinc-800 rounded-md">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <div className="space-y-4">
        {examples.map((example, idx) => (
          <div key={idx} className="border-l-2 border-zinc-700 pl-4">
            <div className="text-sm font-medium mb-1 text-zinc-400">Example Prompt:</div>
            <div className="text-sm mb-2 text-white">"{example.prompt}"</div>

            <div className="text-xs font-medium mb-1 text-zinc-500">Result:</div>
            <div className="text-xs text-zinc-400">{example.description}</div>

            <div className="flex items-center mt-2">
              <span className="text-xs text-zinc-500">Handled by </span>
              <span className={`ml-1 text-xs font-medium ${
                example.model === "chatgpt" ? "text-emerald-400" :
                example.model === "gemini" ? "text-blue-400" :
                example.model === "claude" ? "text-purple-400" :
                example.model === "deepseek" ? "text-orange-400" :
                "text-yellow-400"
              }`}>
                {example.model === "chatgpt" ? "ChatGPT" :
                 example.model === "gemini" ? "Gemini" :
                 example.model === "claude" ? "Claude" :
                 example.model === "deepseek" ? "DeepSeek" :
                 "Llama"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto w-full">
          {/* Header Logo */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-4">AIR</h1>
            <p className="text-lg text-zinc-400">{APP_DESCRIPTION}</p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/chat"
              className="w-full sm:w-auto flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 bg-white text-zinc-950 font-medium rounded-lg hover:bg-zinc-200 transition-colors text-center"
            >
              Chat Now
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/about"
              className="w-full sm:w-auto flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-white font-medium rounded-lg border border-zinc-700 hover:bg-zinc-800 transition-colors text-center"
            >
              Learn About AIR
            </Link>
          </motion.div>

          {/* Three Column Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Examples */}
            <motion.div
              className="flex flex-col items-center gap-3"
              variants={fadeIn}
            >
              <div className="bg-zinc-900 w-10 h-10 rounded-full flex items-center justify-center mb-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
              </div>
              <h2 className="text-lg font-semibold">Examples</h2>
              <div className="space-y-3 w-full">
                {SAMPLE_PROMPTS.slice(0, 3).map((prompt, index) => (
                  <div
                    key={`examples-${prompt.text.substring(0, 15).replace(/\s+/g, '-')}-${index}`}
                    className="p-3 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition-colors text-sm text-zinc-300 cursor-pointer"
                  >
                    "{prompt.text.slice(0, 40)}..."
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Capabilities */}
            <motion.div
              className="flex flex-col items-center gap-3"
              variants={fadeIn}
            >
              <div className="bg-zinc-900 w-10 h-10 rounded-full flex items-center justify-center mb-2">
                <Zap className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-lg font-semibold">Capabilities</h2>
              <div className="space-y-3 w-full">
                <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900 text-sm text-zinc-300">
                  Routes to different AI models based on your query
                </div>
                <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900 text-sm text-zinc-300">
                  Remembers previous messages in your conversation
                </div>
                <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900 text-sm text-zinc-300">
                  Shows which AI model powered each answer
                </div>
              </div>
            </motion.div>

            {/* Limitations */}
            <motion.div
              className="flex flex-col items-center gap-3"
              variants={fadeIn}
            >
              <div className="bg-zinc-900 w-10 h-10 rounded-full flex items-center justify-center mb-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className="text-lg font-semibold">Limitations</h2>
              <div className="space-y-3 w-full">
                <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900 text-sm text-zinc-300">
                  May occasionally generate incorrect information
                </div>
                <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900 text-sm text-zinc-300">
                  Limited knowledge of events after training cutoff
                </div>
                <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900 text-sm text-zinc-300">
                  May not always route to the optimal AI model
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Detailed AI Capability Samples */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-center mb-8">What AIR Can Do</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SampleCard
                title={DETAILED_SAMPLES.codeGeneration.title}
                examples={DETAILED_SAMPLES.codeGeneration.examples}
                icon={getIconComponent(DETAILED_SAMPLES.codeGeneration.icon)}
                delay={0.4}
              />

              <SampleCard
                title={DETAILED_SAMPLES.imageGeneration.title}
                examples={DETAILED_SAMPLES.imageGeneration.examples}
                icon={getIconComponent(DETAILED_SAMPLES.imageGeneration.icon)}
                delay={0.5}
              />

              <SampleCard
                title={DETAILED_SAMPLES.humanTouch.title}
                examples={DETAILED_SAMPLES.humanTouch.examples}
                icon={getIconComponent(DETAILED_SAMPLES.humanTouch.icon)}
                delay={0.6}
              />

              <SampleCard
                title={DETAILED_SAMPLES.logicalReasoning.title}
                examples={DETAILED_SAMPLES.logicalReasoning.examples}
                icon={getIconComponent(DETAILED_SAMPLES.logicalReasoning.icon)}
                delay={0.7}
              />
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="text-center text-xs text-zinc-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            AIR Version 0.1 • Universal AI Chatbot Platform
          </motion.div>
        </div>
      </main>
    </div>
  );
}
