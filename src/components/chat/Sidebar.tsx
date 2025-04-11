"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PlusIcon, XIcon, MenuIcon, HomeIcon, InfoIcon, ClockIcon } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  aiModel?: string;
}

interface Conversation {
  id: string;
  title: string;
  lastUpdated?: Date;
  messages: Message[]; // Make messages required
}

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  isVisible: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onSelectConversation: (conversationId: string) => void;
  onPromptClick?: (content: string) => void; // New prop for handling prompt clicks
  isMobile?: boolean;
}

export function Sidebar({
  conversations = [],
  currentConversationId,
  isVisible,
  onToggle,
  onNewChat,
  onSelectConversation,
  onPromptClick,
  isMobile = false,
}: SidebarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle conversation click with optional prompt click
  const handleConversationClick = (conversationId: string) => {
    onSelectConversation(conversationId);

    // If onPromptClick is provided and we have a conversation, find the first user message
    if (onPromptClick) {
      const conversation = conversations.find(conv => conv.id === conversationId);
      if (conversation?.messages?.length) {
        // Find the first user message in the conversation
        const firstUserMessage = conversation.messages.find(msg => msg.isUser);
        if (firstUserMessage) {
          onPromptClick(firstUserMessage.content);
        }
      }
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Toggle button for mobile */}
      {isMobile && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-zinc-800 text-white"
        >
          {isVisible ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      )}

      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 left-0 z-40 h-full w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col ${
              isMobile ? "shadow-2xl" : ""
            }`}
          >
            {/* Sidebar header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <Link href="/" className="text-xl font-bold text-white">
                AIR
              </Link>
              {isMobile && (
                <button
                  onClick={onToggle}
                  className="p-1 rounded-md hover:bg-zinc-800"
                >
                  <XIcon size={20} />
                </button>
              )}
            </div>

            {/* New Chat Button */}
            <button
              onClick={onNewChat}
              className="m-4 flex items-center gap-2 p-3 rounded-md border border-zinc-700 hover:bg-zinc-800 transition-colors text-white"
            >
              <PlusIcon size={16} />
              <span>New Chat</span>
            </button>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto py-2 px-2">
              {conversations.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-xs font-medium text-zinc-500 flex items-center gap-1">
                    <ClockIcon size={12} />
                    <span>Chat History</span>
                  </div>
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => handleConversationClick(conv.id)}
                      className={`w-full text-left px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-sm ${
                        currentConversationId === conv.id
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-300"
                      }`}
                    >
                      {conv.title}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 text-sm text-zinc-500">
                  No conversations yet
                </div>
              )}
            </div>

            {/* Bottom navigation */}
            <div className="p-4 border-t border-zinc-800 space-y-2">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-zinc-300"
              >
                <HomeIcon size={16} />
                <span>Home</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-zinc-300"
              >
                <InfoIcon size={16} />
                <span>About AIR</span>
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isMobile && isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
}
