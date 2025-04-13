"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { typingVariants } from "@/lib/animations";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  showCursor?: boolean;
  className?: string;
}

export function TypingAnimation({
  text,
  speed = 30, // ms per character
  onComplete,
  showCursor = true,
  className = "",
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const textRef = useRef(text);
  const indexRef = useRef(0);

  useEffect(() => {
    // Reset if text changes
    if (textRef.current !== text) {
      textRef.current = text;
      setDisplayedText("");
      setIsComplete(false);
      indexRef.current = 0;
    }

    if (isComplete) return;

    const timeout = setTimeout(() => {
      if (indexRef.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(indexRef.current));
        indexRef.current += 1;
      } else {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [isComplete, onComplete, speed, text]);

  return (
    <div className={`relative ${className}`}>
      <div className="whitespace-pre-wrap break-words">
        {displayedText}
        <AnimatePresence>
          {showCursor && !isComplete && (
            <motion.span
              className="inline-block h-4 w-2 bg-white"
              variants={typingVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
