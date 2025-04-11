"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypingAnimation } from "@/components/ui/TypingAnimation";
import { ModelLabel } from "./ModelLabel";

interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp?: string;
  aiModel?: "chatgpt" | "gemini" | "claude" | "deepseek" | "llama";
  isTyping?: boolean;
}

export function MessageBubble({
  content,
  isUser,
  timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  aiModel,
  isTyping = false,
}: MessageProps) {
  const [showModelLabel, setShowModelLabel] = useState(false);

  useEffect(() => {
    if (!isUser && !isTyping && aiModel) {
      const timer = setTimeout(() => {
        setShowModelLabel(true);
      }, content.length * 10 + 500); // Delay based on message length

      return () => clearTimeout(timer);
    }
  }, [content.length, isTyping, isUser, aiModel]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] px-2 py-1 ${
          isUser
            ? "text-white"
            : "text-zinc-200"
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap break-words">{content}</div>
        ) : (
          <>
            {isTyping ? (
              <TypingAnimation text={content} />
            ) : (
              <div className="whitespace-pre-wrap break-words">{content}</div>
            )}
          </>
        )}

        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-zinc-400">{timestamp}</div>

          {!isUser && aiModel && showModelLabel && (
            <ModelLabel model={aiModel} className="ml-2" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
