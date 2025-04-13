"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatInput } from "@/components/chat/ChatInput";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { fadeIn } from "@/lib/animations";
import { PlusIcon, MenuIcon } from "lucide-react";

// Message interface
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  modelUsed?: string; // Changed from aiModel to modelUsed to match API response
}

// Conversation interface
interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
}

export default function ChatPage() {
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isInitialView, setIsInitialView] = useState(true);
  const [currentModel, setCurrentModel] = useState<
    "chatgpt" | "gemini" | "claude" | "deepseek" | "gemini-llama"
  >("chatgpt");
  const [currentMessage, setCurrentMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if viewport is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarVisible(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, aiResponse]);

  const formatModelName = (model?: string): string => {
    if (!model) return "AI";

    // Handle combined model names like "gemini + Dall-E"
    if (model.includes("+")) {
      return model
        .split("+")
        .map((part) => formatModelName(part.trim()))
        .join(" + ");
    }

    switch (model.toLowerCase()) {
      case "chatgpt":
        return "ChatGPT";
      case "gemini":
        return "Gemini";
      case "claude":
        return "Claude";
      case "deepseek":
        return "DeepSeek";
      case "llama":
      case "gemini-llama":
        return "LLaMA";
      case "dall-e":
        return "DALL-E";
      default:
        return model; // Return as is if no match
    }
  };
  // Format the response content for better display
  const formatResponse = (text: string) => {
    if (!text) return "";

    let cleaned = text.trim();

    // Remove JSON wrappers that sometimes come with the ChatGPT responses
    cleaned = cleaned.replace(/^{\s*"Task details":\s*"|"\s*}$/g, "");
    cleaned = cleaned.replace(/^"?Task details"?:?/i, "").trim();
    cleaned = cleaned.replace(/^{\s*"Output":\s*"1"\s*"(.+)"\s*}$/g, "$1");
    cleaned = cleaned.replace(/^{\s*"Output":\s*"(.+)"\s*}$/g, "$1");

    return cleaned;
  };

  const fetchAIResponse = async (prompt: string) => {
    setIsProcessing(true);
    setAiResponse("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: currentModel }),
      });

      if (!res.ok)
        throw new Error(`Failed to fetch AI response: ${res.status}`);

      const data = await res.json();
      console.log("API Response:", data);
      console.log("Model from API:", data.model);

      // Get the model directly from the API response
      const modelUsed = data.model || currentModel;
      const formattedResponse = formatResponse(
        data.response || "No response from AI."
      );

      // Simulate typing effect
      let tempResponse = "";
      const typingSpeed = 10;
      for (let i = 0; i < formattedResponse.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, typingSpeed));
        tempResponse += formattedResponse[i];
        setAiResponse(tempResponse);
      }

      // Inside fetchAIResponse function — REPLACE the broken condition block with the corrected version below:

      let selectedModel: string = "ChatGPT"; // Default

      if (
        formattedResponse.includes("code") ||
        formattedResponse.includes("response") ||
        formattedResponse.includes("```")
      ) {
        selectedModel = "Claude";
      } else if (
        formattedResponse.toLowerCase().includes("sorry") ||
        formattedResponse.toLowerCase().includes("hey") ||
        formattedResponse.toLowerCase().includes("hello")
      ) {
        selectedModel = "ChatGPT";
      } else if (
        formattedResponse.toLowerCase().includes("km") ||
        formattedResponse.toLowerCase().includes("sec")
      ) {
        selectedModel = "LLaMA";
      } else if (
        formattedResponse.toLowerCase().includes("image") ||
        formattedResponse.toLowerCase().includes("create")
      ) {
        selectedModel = "Gemini + DALL-E";
      }

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: formattedResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        modelUsed: selectedModel,
      };

      setMessages((curr) => {
        const updated = [...curr, aiMessage];
        if (currentConversationId)
          updateConversation(currentConversationId, updated);
        return updated;
      });
    } catch (err) {
      console.error("AI Error:", err);
      setMessages((curr) => [
        ...curr,
        {
          id: `err-${Date.now()}`,
          content: `⚠️ Failed to get response from AI: ${
            err instanceof Error ? err.message : "Unknown error"
          }`,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          modelUsed: "error",
        },
      ]);
    } finally {
      setAiResponse("");
      setIsProcessing(false);
    }
  };

  const createNewConversation = (userMessage: Message) => {
    const title =
      userMessage.content.length > 30
        ? `${userMessage.content.slice(0, 30)}...`
        : userMessage.content;
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      title,
      messages: [userMessage],
      lastUpdated: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setCurrentConversationId(newConv.id);
    return newConv.id;
  };

  const updateConversation = (id: string, updated: Message[]) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, messages: updated, lastUpdated: new Date() } : c
      )
    );
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim() || isProcessing) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      content: message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    if (isInitialView || !currentConversationId) {
      setMessages([userMsg]);
      setIsInitialView(false);
      const newId = createNewConversation(userMsg);
      setCurrentConversationId(newId);
    } else {
      setMessages((curr) => {
        const updated = [...curr, userMsg];
        if (currentConversationId)
          updateConversation(currentConversationId, updated);
        return updated;
      });
    }

    fetchAIResponse(message);
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentConversationId(null);
    setIsInitialView(true);
    setCurrentMessage("");
    if (isMobile) setSidebarVisible(false);
  };

  const handleSelectConversation = (id: string) => {
    const selectedConversation = conversations.find((conv) => conv.id === id);
    if (selectedConversation) {
      setMessages(selectedConversation.messages);
      setCurrentConversationId(id);
      setIsInitialView(false);
    }
    setCurrentMessage("");
    if (isMobile) setSidebarVisible(false);
  };

  const handlePromptClick = (content: string) => {
    setCurrentMessage(content);
  };

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 overflow-hidden">
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        isVisible={sidebarVisible}
        onToggle={toggleSidebar}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onPromptClick={handlePromptClick}
        isMobile={isMobile}
      />

      <div
        className={`flex-1 flex flex-col h-full overflow-hidden relative ${
          sidebarVisible && !isMobile ? "ml-72" : ""
        }`}
      >
        <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-zinc-800"
          >
            <MenuIcon size={20} />
          </button>
          <span className="font-bold">AIR</span>
          <button
            onClick={handleNewChat}
            className="p-2 rounded-md hover:bg-zinc-800"
          >
            <PlusIcon size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence mode="wait">
            {isInitialView ? (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center flex-col"
              >
                <motion.h1 className="text-4xl md:text-6xl font-bold text-white/80">
                  AIR
                </motion.h1>
                <motion.p className="text-lg text-white/60 mt-4">
                  AI Router - The smart way to access multiple AI models
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                className="space-y-6 pb-20 min-h-full"
              >
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    content={msg.content}
                    isUser={msg.isUser}
                    timestamp={msg.timestamp}
                    modelUsed={msg.modelUsed}
                    modelLabel={
                      !msg.isUser
                        ? `${formatModelName(msg.modelUsed)} responded`
                        : undefined
                    }
                  />
                ))}
                {isProcessing && aiResponse && (
                  <MessageBubble
                    content={aiResponse}
                    isUser={false}
                    isTyping={true}
                    modelUsed={currentModel}
                    modelLabel={`${formatModelName(currentModel)} responded`}
                  />
                )}
                <div ref={messagesEndRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pt-20">
          <ChatInput
            onSend={handleSendMessage}
            isDisabled={isProcessing}
            placeholder={
              isInitialView ? "Message AIR..." : "Continue the conversation..."
            }
            currentMessage={currentMessage}
            onMessageChange={setCurrentMessage}
          />
        </div>
      </div>
    </div>
  );
}
