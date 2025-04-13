"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypingAnimation } from "@/components/ui/TypingAnimation";
import { ModelLabel } from "./ModelLabel";

interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp?: string;
  isTyping?: boolean;
  modelUsed?: string;
  modelLabel?: string;
}

// Improved code block formatter
const formatCodeBlocks = (text: string) => {
  if (!text.includes("```")) {
    return <div className="whitespace-pre-wrap break-words">{text}</div>;
  }

  const parts = [];
  let currentIndex = 0;
  const regex = /```([\w-]*)?\n([\s\S]*?)\n```/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > currentIndex) {
      parts.push(
        <div
          key={`text-${currentIndex}`}
          className="whitespace-pre-wrap break-words my-2"
        >
          {text.substring(currentIndex, match.index)}
        </div>
      );
    }

    const language = match[1] ? match[1].trim() : "";
    const code = match[2] ? match[2].trim() : "";

    parts.push(
      <pre
        key={`code-${match.index}`}
        className="whitespace-pre-wrap break-words bg-zinc-900/80 text-emerald-400 p-3 rounded-md text-sm overflow-x-auto my-2 border border-zinc-700"
      >
        {language && (
          <div className="text-xs text-zinc-400 mb-2">{language}</div>
        )}
        <code>{code}</code>
      </pre>
    );

    currentIndex = match.index + match[0].length;
  }

  if (currentIndex < text.length) {
    parts.push(
      <div
        key={`text-${currentIndex}`}
        className="whitespace-pre-wrap break-words my-2"
      >
        {text.substring(currentIndex)}
      </div>
    );
  }

  return <>{parts}</>;
};

// Extract image URL from content if present
const extractImageUrl = (content: string) => {
  const imageUrlMatch = content.match(/Image URL: (https:\/\/[^\s]+)/);
  return imageUrlMatch ? imageUrlMatch[1] : null;
};

// Handle specific OpenAI response patterns
const cleanResponseText = (content: string) => {
  let cleaned = content.trim();
  cleaned = cleaned.replace(
    /^(Task|task):\s*"([^"]+)"\s*,\s*(Response|response):\s*/,
    ""
  );
  cleaned = cleaned.replace(/^\{\s*"task":\s*"[^"]+",\s*"response":\s*"/, "");
  cleaned = cleaned.replace(/"\s*\}$/, "");
  cleaned = cleaned.replace(/\\n/g, "\n");
  cleaned = cleaned.replace(/\\"/g, '"');
  cleaned = cleaned.replace(/\\\\/g, "\\");
  return cleaned;
};

export function MessageBubble({
  content,
  isUser,
  timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
  modelUsed,
  modelLabel,
  isTyping = false,
}: MessageProps) {
  const [showModelLabel, setShowModelLabel] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false); // ✅ fix for TS error
  const imageUrl = !isUser ? extractImageUrl(content) : null;

  const cleanedContent = imageUrl
    ? content.replace(/Image URL: https:\/\/[^\s]+/, "").trim()
    : content;

  const processedContent = !isUser
    ? cleanResponseText(cleanedContent)
    : cleanedContent;

  useEffect(() => {
    if (!isUser && !isTyping && modelUsed) {
      const timer = setTimeout(() => {
        setShowModelLabel(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [content, isTyping, isUser, modelUsed]);

  let renderedContent;

  if (isUser) {
    renderedContent = (
      <div className="whitespace-pre-wrap break-words">{processedContent}</div>
    );
  } else if (isTyping) {
    renderedContent = <TypingAnimation text={processedContent} />;
  } else {
    renderedContent = formatCodeBlocks(processedContent);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] px-4 py-3 ${
          isUser
            ? "bg-zinc-800 text-white rounded-2xl rounded-br-none"
            : "bg-zinc-900/60 text-zinc-100 rounded-2xl rounded-bl-none backdrop-blur-sm border border-zinc-800/50"
        }`}
      >
        {renderedContent}

        {imageUrl && (
          <div className="mt-4 space-y-2">
            <div className="text-sm font-medium text-zinc-300">
              Generated Image:
            </div>

            {!imageLoaded && (
              <div className="w-full h-52 bg-zinc-800 rounded-md flex items-center justify-center border border-zinc-700 animate-pulse">
                <span className="text-zinc-500 text-sm">Loading image...</span>
              </div>
            )}

            <img
              src={imageUrl}
              alt="Generated Image"
              className={`rounded-md max-w-full border border-zinc-700 transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.currentTarget.src = "/api/placeholder/400/320";
                e.currentTarget.alt = "Image load failed";
                setImageLoaded(true);
              }}
            />
          </div>
        )}

        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-zinc-400">{timestamp}</div>
          {!isUser && modelLabel && showModelLabel && (
            <ModelLabel answeredBy={modelLabel} />
          )}
        </div>
      </div>
    </motion.div>
  );
}
