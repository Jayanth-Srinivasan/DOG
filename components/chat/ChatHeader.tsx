import React from "react";

interface ChatHeaderProps {
  channelName: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ channelName }) => {
  return (
    <div className="p-4 font-lond tracking-widest text-white flex justify-between items-center shadow-lg">
      <h2 className="text-xl font-semibold">{channelName}</h2>
      <button className="text-sm bg-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors duration-200">
        Create Space
      </button>
    </div>
  );
};

export default ChatHeader;
