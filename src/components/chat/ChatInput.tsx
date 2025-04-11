"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SendIcon } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
  currentMessage?: string; // Add a prop to keep track of the current message
  onMessageChange?: (message: string) => void; // Add a prop to update the message
}

export function ChatInput({
  onSendMessage,
  isDisabled = false,
  placeholder = "Message AIR...",
  currentMessage = "", // Default to empty string
  onMessageChange, // Optional callback
}: ChatInputProps) {
  const [message, setMessage] = useState(currentMessage);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update local state when the prop changes
  useEffect(() => {
    setMessage(currentMessage);
    // Also adjust height when message changes
    if (textareaRef.current) {
      adjustHeight();
    }
  }, [currentMessage]);

  // Auto-resize the textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeightHandler = () => adjustHeight();

    // Add event listener for future changes
    textarea.addEventListener("input", adjustHeightHandler);
    return () => textarea.removeEventListener("input", adjustHeightHandler);
  }, []); // No dependencies needed

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "40px"; // Reset height
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = `${Math.min(scrollHeight, 160)}px`; // Max height: 160px
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (trimmedMessage && !isDisabled) {
      // Send the message to parent
      onSendMessage(trimmedMessage);

      // Let parent component handle the state
      if (onMessageChange) {
        onMessageChange(""); // Clear the message in parent state
      }

      // Reset the textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "40px";
      }
      setMessage(""); // Clear the input field after submission
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    if (onMessageChange) {
      onMessageChange(newMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto mb-4 px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="relative rounded-xl border border-zinc-700 bg-zinc-800 shadow-sm overflow-hidden"
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          placeholder={placeholder}
          className="w-full p-4 pr-12 outline-none bg-transparent resize-none max-h-40 text-white placeholder:text-zinc-400"
          rows={1}
        />

        <button
          type="submit"
          disabled={!message.trim() || isDisabled}
          className="absolute right-2 bottom-2 p-2 rounded-md bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity text-white hover:bg-zinc-600"
        >
          <SendIcon size={18} />
        </button>
      </form>
    </motion.div>
  );
}
