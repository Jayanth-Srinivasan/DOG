"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PollResponses = () => {
  const router = useRouter();

  // Sample poll options with votes
  const [poll] = useState({
    id: 1,
    question: "Should we expand the DAO?",
    options: [
      { id: 1, option: "Yes", votes: 10 },
      { id: 2, option: "No", votes: 5 },
    ],
  });

  // Sort the options by votes in descending order
  const sortedOptions = [...poll.options].sort((a, b) => b.votes - a.votes);

  return (
    <main className="min-h-screen bg-gray-900 text-white font-mont">
      <section className="p-4 md:px-16 lg:max-w-5xl lg:mx-auto py-[50px] md:py-[80px]">
        <div className="flex justify-between items-center pb-8">
          <h2 className="text-3xl lg:text-5xl font-bold">{poll.question}</h2>
          <Button
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600"
            onClick={() => router.push("/dao/[daoId]/admin/polls")}
          >
            Back to Polls
          </Button>
        </div>

        {/* Display Poll Responses */}
        <div className="mt-6 space-y-4">
          {sortedOptions.map((opt) => (
            <div
              key={opt.id}
              className="p-4 bg-gray-800 rounded-lg shadow-lg flex justify-between"
            >
              <p className="text-xl">{opt.option}</p>
              <p className="text-gray-400">{opt.votes} votes</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PollResponses;
