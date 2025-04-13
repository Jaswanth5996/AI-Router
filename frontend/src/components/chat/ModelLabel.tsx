"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ModelLabelProps {
  answeredBy?: string;
  className?: string;
}

export function ModelLabel({ answeredBy, className = "" }: ModelLabelProps) {
  const [colorClass, setColorClass] = useState("");

  useEffect(() => {
    if (!answeredBy) return;

    const modelName = answeredBy.toLowerCase();

    if (modelName.includes("chatgpt")) {
      setColorClass("bg-emerald-500/10 text-emerald-400 border-emerald-500/20");
    } else if (modelName.includes("gemini") && !modelName.includes("llama")) {
      setColorClass("bg-blue-500/10 text-blue-400 border-blue-500/20");
    } else if (modelName.includes("claude")) {
      setColorClass("bg-purple-500/10 text-purple-400 border-purple-500/20");
    } else if (modelName.includes("deepseek")) {
      setColorClass("bg-orange-500/10 text-orange-400 border-orange-500/20");
    } else if (modelName.includes("llama")) {
      setColorClass("bg-pink-500/10 text-pink-400 border-pink-500/20");
    } else if (modelName.includes("dall-e")) {
      setColorClass("bg-yellow-500/10 text-yellow-400 border-yellow-500/20");
    } else {
      setColorClass("bg-zinc-500/10 text-zinc-400 border-zinc-500/20");
    }
  }, [answeredBy]);

  if (!answeredBy || answeredBy.trim() === "---") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${colorClass} ${className}`}
    >
      {answeredBy}
    </motion.div>
  );
}
