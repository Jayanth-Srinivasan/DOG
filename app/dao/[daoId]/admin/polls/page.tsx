"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const AdminPollsManagementPage = () => {
  const router = useRouter();

  // Polls list with options and votes
  const [polls, setPolls] = useState([
    {
      id: 1,
      question: "Should we expand the DAO?",
      options: [
        { id: 1, option: "Yes", votes: 10 },
        { id: 2, option: "No", votes: 5 },
      ],
    },
  ]);

  const [newPoll, setNewPoll] = useState({
    question: "",
    options: [{ id: 1, option: "", votes: 0 }],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    optionId?: number
  ) => {
    const { value } = e.target;

    if (optionId !== undefined) {
      setNewPoll((prev) => ({
        ...prev,
        options: prev.options.map((opt) =>
          opt.id === optionId ? { ...opt, option: value } : opt
        ),
      }));
    } else {
      setNewPoll((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAddOption = () => {
    setNewPoll((prev) => ({
      ...prev,
      options: [
        ...prev.options,
        { id: prev.options.length + 1, option: "", votes: 0 },
      ],
    }));
  };

  const handleAddPoll = () => {
    setPolls((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        question: newPoll.question,
        options: newPoll.options,
      },
    ]);
    setNewPoll({ question: "", options: [{ id: 1, option: "", votes: 0 }] });
  };

  const handleDeletePoll = (pollId: number) => {
    setPolls((prev) => prev.filter((poll) => poll.id !== pollId));
  };

  const handleViewResponses = (pollId: number) => {
    router.push(`/dao/[daoId]/admin/polls/${pollId}`);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white font-mont">
      <section className="p-4 md:px-16 lg:max-w-5xl lg:mx-auto py-[50px] md:py-[80px]">
        <div className="flex justify-between items-center pb-8">
          <h2 className="text-3xl lg:text-5xl font-bold">Polls Management</h2>
          <Button
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600"
            onClick={() => router.push("/dao/[daoId]/admin")}
          >
            Back to Admin Dashboard
          </Button>
        </div>

        {/* Existing Polls */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Existing Polls</h3>
          <ul className="space-y-4">
            {polls.map((poll) => (
              <li
                key={poll.id}
                className="p-4 bg-gray-800 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xl font-bold">{poll.question}</h4>
                    <ul className="mt-2 space-y-2">
                      {poll.options.map((opt) => (
                        <li key={opt.id} className="flex justify-between">
                          <p className="text-gray-300">{opt.option}</p>
                          <p className="text-gray-400">{opt.votes} votes</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      onClick={() => handleViewResponses(poll.id)}
                    >
                      View Responses
                    </Button>
                    <Button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      onClick={() => handleDeletePoll(poll.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add New Poll Form */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Create New Poll</h3>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="question">Poll Question</Label>
              <Input
                id="question"
                name="question"
                value={newPoll.question}
                onChange={(e) => handleInputChange(e, "question")}
                placeholder="Enter poll question"
                className="h-12"
              />
            </div>

            {newPoll.options.map((opt) => (
              <div key={opt.id} className="grid gap-1.5">
                <Label htmlFor={`option-${opt.id}`}>Option {opt.id}</Label>
                <Input
                  id={`option-${opt.id}`}
                  name={`option-${opt.id}`}
                  value={opt.option}
                  onChange={(e) => handleInputChange(e, "option", opt.id)}
                  placeholder={`Enter option ${opt.id}`}
                  className="h-12"
                />
              </div>
            ))}

            <Button
              className="mt-2 bg-blue-500 text-white"
              onClick={handleAddOption}
            >
              Add Option
            </Button>

            <Button
              onClick={handleAddPoll}
              className="mt-4 bg-amber-400 text-black hover:bg-amber-500"
            >
              Add Poll
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminPollsManagementPage;
