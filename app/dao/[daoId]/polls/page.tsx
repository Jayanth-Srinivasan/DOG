"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import { CheckCircleIcon } from "@heroicons/react/solid";
// import { ChartPieIcon } from "@heroicons/react/outline";

const ContributorPolls = () => {
  const [polls] = useState([
    { id: 1, question: "Should the DAO expand?", options: ["Yes", "No"] },
    {
      id: 2,
      question: "Should we increase the bounty for tasks?",
      options: ["Yes", "No"],
    },
  ]);

  return (
    <main className="min-h-screen tracking-widest text-white font-lond">
      <section className="p-6 md:px-16 lg:max-w-5xl lg:mx-auto py-[50px] md:py-[80px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold">Active Polls</h2>
          <p className="text-gray-400 mt-4 text-lg">
            Participate in decision-making by voting on active proposals.
          </p>
        </div>

        <ul className="space-y-8">
          {polls.map((poll) => (
            <li
              key={poll.id}
              className="relative bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                {/* Poll Question */}
                <div className="flex-grow text-center md:text-left">
                  <h4 className="text-2xl font-semibold mb-2 text-gray-100">
                    {poll.question}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Your vote counts! Choose an option below.
                  </p>
                </div>

                {/* Poll Options */}
                <div className="flex space-x-4 mt-6 md:mt-0">
                  {poll.options.map((option, index) => (
                    <Button
                      key={index}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ContributorPolls;
