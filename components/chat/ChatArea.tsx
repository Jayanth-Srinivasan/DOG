import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

interface ChatAreaProps {
  selectedChannel: { name: string };
  messages: { sender: string; content: string }[];
  sendMessage: (message: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  selectedChannel,
  messages,
  sendMessage,
}) => {
  return (
    <div className="flex flex-col h-full font-lond tracking-widest">
      <ChatHeader channelName={selectedChannel.name} />

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="bg-gray-800 p-3 rounded-lg">
            <div className="text-sm font-bold">{message.sender}</div>
            <div className="text-sm">{message.content}</div>
          </div>
        ))}
      </div>

      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatArea;
