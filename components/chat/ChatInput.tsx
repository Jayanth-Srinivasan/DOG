import React, { useState } from "react";
import { Input } from "../ui/input";

interface ChatInputProps {
  sendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="p-4 border-t border-gray-700 bg-gray-800"
    >
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
      />
    </form>
  );
};

export default ChatInput;
