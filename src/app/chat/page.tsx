"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatInput } from "@/components/chat/ChatInput";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { slideUp, fadeIn } from "@/lib/animations";
import { PlusIcon, MenuIcon } from "lucide-react";

// Message interface for the chat
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  aiModel?: "chatgpt" | "gemini" | "claude" | "deepseek" | "llama";
}

// Conversation interface for chat history
interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
}

export default function ChatPage() {
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isInitialView, setIsInitialView] = useState(true);
  const [currentModel, setCurrentModel] = useState<"chatgpt" | "gemini" | "claude" | "deepseek" | "llama">("gemini");
  const [currentMessage, setCurrentMessage] = useState("");

  // Ref to track the messages div for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarVisible(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize messages when changing conversation
  useEffect(() => {
    if (currentConversationId) {
      const conversation = conversations.find(conv => conv.id === currentConversationId);
      if (conversation) {
        setMessages(conversation.messages);
        setIsInitialView(false);
      }
    }
  }, [currentConversationId, conversations]);

  // Function to simulate AI response
  const simulateAIResponse = async (prompt: string) => {
    setIsProcessing(true);

    // Choose a random AI model for the response based on the prompt
    const models: ("chatgpt" | "gemini" | "claude" | "deepseek" | "llama")[] = ["chatgpt", "gemini", "claude", "deepseek", "llama"];
    const selectedModel = models[Math.floor(Math.random() * models.length)];
    setCurrentModel(selectedModel);

    let responseText = "";

    // Simulate different responses based on the selected model
    switch (selectedModel) {
      case "chatgpt":
        responseText = `I understand you're asking about "${prompt}". This is a simulated response from ChatGPT. I'm designed to provide detailed and helpful information on a wide range of topics, with a focus on clarity and context.`;
        break;
      case "gemini":
        responseText = `Analyzing your query: "${prompt}". This is a simulated response from Gemini. I excel at reasoning tasks and can help with mathematical problems, logical puzzles, and generating code.`;
        break;
      case "claude":
        responseText = `Looking at your question: "${prompt}". This is a simulated response from Claude. I'm particularly good at nuanced interpretation and providing balanced perspectives on complex topics.`;
        break;
      case "deepseek":
        responseText = `Processing your technical request: "${prompt}". This is a simulated response from DeepSeek. I specialize in coding challenges and technical problem-solving, especially for advanced programming topics.`;
        break;
      case "llama":
        responseText = `Examining your prompt: "${prompt}". This is a simulated response from Llama. I'm an open-source large language model with strong capabilities in both technical and creative tasks.`;
        break;
      default:
        responseText = `Thanks for your message. I'm processing your request about "${prompt}" and will provide an answer shortly.`;
    }

    // Simulate typing effect by setting the AI response character by character
    setAiResponse("");
    let tempResponse = "";

    for (let i = 0; i < responseText.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 20)); // Delay between characters
      tempResponse += responseText[i];
      setAiResponse(tempResponse);
    }

    // Create AI response message
    const newAiMessage: Message = {
      id: `ai-${Date.now()}`,
      content: responseText,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      aiModel: selectedModel,
    };

    // Add to messages and update conversations
    setTimeout(() => {
      // Get the current messages from state to ensure we don't lose any messages
      // This is crucial to keep all previous messages including the user's prompt
      setMessages(currentMessages => {
        const updatedMessages = [...currentMessages, newAiMessage];

        // Also update the conversation
        if (currentConversationId) {
          updateConversation(currentConversationId, updatedMessages);
        }

        return updatedMessages;
      });

      setAiResponse("");
      setIsProcessing(false);
    }, 300);
  };

  // Create a new conversation from the first message
  const createNewConversation = (userMessage: Message) => {
    const title = userMessage.content.length > 30
      ? `${userMessage.content.substring(0, 30)}...`
      : userMessage.content;

    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title,
      messages: [userMessage],
      lastUpdated: new Date(),
    };

    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);

    return newConversation.id;
  };

  // Update an existing conversation with new messages
  const updateConversation = (conversationId: string, updatedMessages: Message[]) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, messages: updatedMessages, lastUpdated: new Date() }
          : conv
      )
    );
  };

  // Handle sending a new message
  const handleSendMessage = (message: string) => {
    if (isProcessing || !message.trim()) return;

    try {
      // Create user message
      const newUserMessage: Message = {
        id: `user-${Date.now()}`,
        content: message,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      console.log("Adding user message:", newUserMessage);

      // Handle the message differently based on whether we're in a new conversation or existing one
      if (isInitialView || !currentConversationId) {
        // Start a new conversation with just the user message
        setMessages([newUserMessage]);
        setIsInitialView(false);

        // Create a new conversation and set it as current
        const newConvId = createNewConversation(newUserMessage);
        setCurrentConversationId(newConvId);
      } else {
        // Add to existing conversation using functional update to ensure latest state
        setMessages(currentMessages => {
          const updatedMessages = [...currentMessages, newUserMessage];

          // Update the conversation with the new message list
          if (currentConversationId) {
            updateConversation(currentConversationId, updatedMessages);
          }

          return updatedMessages;
        });
      }

      // Generate AI response after a short delay to ensure message rendering
      setTimeout(() => {
        simulateAIResponse(message);
      }, 500); // Increased delay to ensure message rendering
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle new chat button click
  const handleNewChat = () => {
    setMessages([]);
    setCurrentConversationId(null);
    setIsInitialView(true);
    setCurrentMessage(""); // Clear current message
    if (isMobile) {
      setSidebarVisible(false);
    }
  };

  // Handle switching to a different conversation
  const handleSelectConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
    setCurrentMessage(""); // Clear current message when switching conversations
    if (isMobile) {
      setSidebarVisible(false);
    }
  };

  // Handle prompt click from history
  const handlePromptClick = (content: string) => {
    setCurrentMessage(content);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        isVisible={sidebarVisible}
        onToggle={toggleSidebar}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onPromptClick={handlePromptClick} // Add prompt click handler
        isMobile={isMobile}
      />

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden relative ${sidebarVisible && !isMobile ? 'ml-72' : ''}`}>
        {/* Mobile Top Bar */}
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

        {/* Chat Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence mode="wait">
            {isInitialView ? (
              // Initial View with App Name
              <motion.div
                key="initial-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold text-white/80"
                >
                  AIR
                </motion.h1>
              </motion.div>
            ) : (
              // Messages View
              <motion.div
                key="messages-view"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                className="space-y-6 pb-20 min-h-full"
              >
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    content={message.content}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                    aiModel={message.aiModel}
                  />
                ))}

                {/* Typing Indicator */}
                {isProcessing && aiResponse && (
                  <MessageBubble
                    content={aiResponse}
                    isUser={false}
                    isTyping={true}
                  />
                )}
                <div ref={messagesEndRef} /> {/* Invisible element for scrolling */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Chat Input Component */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pt-20">
          <ChatInput
            onSendMessage={handleSendMessage}
            isDisabled={isProcessing}
            placeholder={isInitialView ? "Message AIR..." : "Continue the conversation..."}
            currentMessage={currentMessage}
            onMessageChange={setCurrentMessage}
          />
        </div>
      </div>
    </div>
  );
}
