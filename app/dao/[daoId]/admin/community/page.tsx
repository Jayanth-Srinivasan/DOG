"use client";

import React, { useState } from "react";

import Sidebar from "@/components/chat/Sidebar";
import ChatArea from "@/components/chat/ChatArea";

const AdminCommunityPage = () => {
  const [channels] = useState([
    { id: "1", name: "General" },
    { id: "2", name: "Announcements" },
    { id: "3", name: "Support" },
    { id: "4", name: "One-on-One" }, // Example private channel
  ]);

  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [messages, setMessages] = useState([
    { sender: "Alice", content: "Welcome to the general chat!", channelId: 1 },
    { sender: "Bob", content: "Hey everyone!", channelId: 1 },
  ]);

  const sendMessage = (messageContent: string) => {
    setMessages([
      ...messages,
      {
        sender: "You",
        content: messageContent,
        channelId: Number(selectedChannel.id),
      },
    ]);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        channels={channels}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
      />

      {/* Chat Area */}
      <div className="flex-1">
        <ChatArea
          selectedChannel={selectedChannel}
          messages={messages.filter(
            (msg) => msg.channelId === Number(selectedChannel.id)
          )}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default AdminCommunityPage;
