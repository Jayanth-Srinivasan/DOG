"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const TaskDetails = () => {
  const router = useRouter();
  const [submissions, setSubmissions] = useState([
    { id: 1, contributor: "Alice", work: "UI bug fixes", selected: false },
    {
      id: 2,
      contributor: "Bob",
      work: "UI design improvement",
      selected: false,
    },
    {
      id: 3,
      contributor: "Charlie",
      work: "Resolved audit issues",
      selected: false,
    },
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(
    null
  );

  const handleSelectSubmission = (submissionId: number) => {
    setSelectedSubmission(submissionId);
    setSubmissions((prev) =>
      prev.map((submission) =>
        submission.id === submissionId
          ? { ...submission, selected: true }
          : { ...submission, selected: false }
      )
    );
  };

  const handleDeliverBounty = () => {
    if (selectedSubmission !== null) {
      alert(`Bounty delivered to submission #${selectedSubmission}`);
      // You can add logic here to deliver the bounty (e.g., via a smart contract)
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white font-mont">
      <section className="p-4 md:px-16 lg:max-w-5xl lg:mx-auto py-[50px] md:py-[80px]">
        <div className="flex justify-between items-center pb-8">
          <h2 className="text-3xl lg:text-5xl font-bold">Task Submissions</h2>
          <Button
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600"
            onClick={() => router.push("/dao/[daoId]/admin/tasks")}
          >
            Back to Tasks
          </Button>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className={`p-4 bg-gray-800 rounded-lg shadow-lg ${
                submission.selected ? "border border-emerald-500" : ""
              }`}
            >
              <h4 className="text-xl font-bold">{submission.contributor}</h4>
              <p className="text-gray-300">{submission.work}</p>
              <Button
                className={`mt-2 ${
                  submission.selected ? "bg-emerald-500" : "bg-blue-500"
                } text-white px-4 py-2 rounded-lg`}
                onClick={() => handleSelectSubmission(submission.id)}
              >
                {submission.selected ? "Selected" : "Select"}
              </Button>
            </div>
          ))}
        </div>

        {/* Deliver Bounty Button */}
        {selectedSubmission && (
          <Button
            onClick={handleDeliverBounty}
            className="mt-8 bg-amber-400 text-black px-6 py-2 hover:bg-amber-500"
          >
            Deliver Bounty to Submission #{selectedSubmission}
          </Button>
        )}
      </section>
    </main>
  );
};

export default TaskDetails;
