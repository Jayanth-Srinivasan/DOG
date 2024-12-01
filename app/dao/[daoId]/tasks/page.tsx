"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import { ClipboardCheckIcon, PencilAltIcon } from "@heroicons/react/outline"; // Importing Heroicons

const ContributorTasks = () => {
  const [tasks] = useState([
    {
      id: 1,
      title: "Fix UI Bugs",
      description:
        "Contribute by fixing UI bugs in the dashboard and components.",
      reward: "100 DAO tokens",
    },
    {
      id: 2,
      title: "Write Documentation",
      description: "Help document the features and APIs of the DAO project.",
      reward: "200 DAO tokens",
    },
  ]);

  return (
    <main className="min-h-screen tracking-widest text-white font-lond">
      <section className="p-4 md:px-16 lg:max-w-5xl lg:mx-auto py-[50px] md:py-[80px]">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-5xl font-bold">Available Tasks</h2>
          <p className="text-gray-400 mt-2 text-lg">
            Select a task to contribute and earn rewards.
          </p>
        </div>

        <ul className="space-y-6">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-6 bg-gray-800 rounded-lg shadow-lg flex items-center justify-between hover:bg-gray-700 transition-all cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                {/* Task Details */}
                <div>
                  <h4 className="text-xl font-bold">{task.title}</h4>
                  <p className="text-gray-400">{task.description}</p>
                  <p className="text-gray-300 mt-2">Reward: {task.reward}</p>
                </div>
              </div>

              {/* Participate Button */}
              <Button className="bg-emerald-500 text-white">Participate</Button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ContributorTasks;
