"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import UserRequestList from "@/components/settings/UserRequestList";

const AdminSettingsPage = () => {
  const [userRequests, setUserRequests] = useState([
    { id: "1", username: "Alice", email: "alice@example.com" },
    { id: "2", username: "Bob", email: "bob@example.com" },
  ]);

  // Approve user request
  const handleApprove = (userId: string) => {
    setUserRequests(userRequests.filter((request) => request.id !== userId));
    alert(`User with ID ${userId} approved.`);
  };

  // Reject user request
  const handleReject = (userId: string) => {
    setUserRequests(userRequests.filter((request) => request.id !== userId));
    alert(`User with ID ${userId} rejected.`);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white font-mont">
      <section className="p-4 md:px-16 lg:max-w-5xl lg:mx-auto py-[50px] md:py-[80px]">
        <div className="flex justify-between items-center pb-8">
          <h2 className="text-3xl lg:text-5xl font-bold">Settings</h2>
          <Button className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600">
            Back to Admin Dashboard
          </Button>
        </div>

        {/* User Request List */}
        <UserRequestList
          requests={userRequests}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </section>
    </main>
  );
};

export default AdminSettingsPage;
