"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ModelLabelProps {
  model: "chatgpt" | "gemini" | "claude" | "deepseek";
  className?: string;
}

export function ModelLabel({ model, className = "" }: ModelLabelProps) {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    switch (model) {
      case "chatgpt":
        setDisplayName("ChatGPT");
        break;
      case "gemini":
        setDisplayName("Gemini");
        break;
      case "claude":
        setDisplayName("Claude");
        break;
      case "deepseek":
        setDisplayName("DeepSeek");
        break;
      default:
        setDisplayName("AI");
    }
  }, [model]);

  const getColor = () => {
    switch (model) {
      case "chatgpt":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "gemini":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "claude":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "deepseek":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getColor()} ${className}`}
    >
      Powered by: {displayName}
    </motion.div>
  );
}
