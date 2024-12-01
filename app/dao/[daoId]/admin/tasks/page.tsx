"use client"; // Ensures this is a client-side component

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const AdminTaskPage = () => {
  const router = useRouter();

  // Temporary state for tasks with bounty and submission count
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Fix UI Bugs",
      description: "Resolve issues with the UI",
      bounty: 100,
      submissions: 3,
    },
    {
      id: 2,
      title: "Smart Contract Audit",
      description: "Perform audit on contracts",
      bounty: 500,
      submissions: 5,
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    bounty: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    setTasks((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: newTask.title,
        description: newTask.description,
        bounty: Number(newTask.bounty),
        submissions: 0,
      },
    ]);
    setNewTask({ title: "", description: "", bounty: "" }); // Reset form
  };

  const handleTaskClick = (taskId: number) => {
    // Navigate to the task details page
    router.push(`/dao/[daoId]/admin/tasks/${taskId}`);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white font-mont">
      <section className="p-4 md:px-16 lg:max-w-5xl lg:mx-auto py-[50px] md:py-[80px]">
        <div className="flex justify-between items-center pb-8">
          <h2 className="text-3xl lg:text-5xl font-bold">Task Management</h2>
          <Button className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600">
            Back to Admin Dashboard
          </Button>
        </div>

        {/* Existing Tasks */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Existing Tasks</h3>
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                onClick={() => handleTaskClick(task.id)}
                className="p-4 bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xl font-bold">{task.title}</h4>
                    <p className="text-gray-300">{task.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">Bounty: ${task.bounty}</p>
                    <p className="text-gray-400">
                      Submissions: {task.submissions}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add New Task Form */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Create New Task</h3>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                placeholder="Enter task title"
                className="h-12"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="description">Task Description</Label>
              <Input
                id="description"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                placeholder="Enter task description"
                className="h-12"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="bounty">Bounty Amount</Label>
              <Input
                id="bounty"
                name="bounty"
                value={newTask.bounty}
                onChange={handleInputChange}
                placeholder="Enter bounty amount (e.g., 100)"
                className="h-12"
                type="number"
              />
            </div>
            <Button
              onClick={handleAddTask}
              className="mt-4 bg-amber-400 text-black hover:bg-amber-500"
            >
              Add Task
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminTaskPage;
