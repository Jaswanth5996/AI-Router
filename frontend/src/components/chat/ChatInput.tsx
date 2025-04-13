import React from "react";
import { SendIcon } from "lucide-react";

export interface ChatInputProps {
  onSend: (message: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
  currentMessage: string;
  onMessageChange: (value: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  isDisabled = false,
  placeholder = "Type a message...",
  currentMessage,
  onMessageChange,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;
    onSend(currentMessage);
    onMessageChange(""); // Clear input
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center bg-zinc-800 rounded-xl px-4 py-3"
    >
      <input
        type="text"
        className="flex-1 bg-transparent outline-none text-white placeholder-zinc-400"
        placeholder={placeholder}
        value={currentMessage}
        onChange={(e) => onMessageChange(e.target.value)}
        disabled={isDisabled}
      />
      <button
        type="submit"
        className="ml-3 text-zinc-300 hover:text-white disabled:opacity-50"
        disabled={isDisabled}
      >
        <SendIcon size={20} />
      </button>
    </form>
  );
};
