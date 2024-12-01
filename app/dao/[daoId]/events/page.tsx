"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import { CalendarIcon } from "@heroicons/react/solid";
// import { LocationMarkerIcon } from "@heroicons/react/outline";

const ContributorEvents = () => {
  const [events] = useState([
    {
      id: 1,
      title: "DAO Webinar",
      date: "15 Sep 2024",
      description: "Join us for the DAO expansion webinar.",
      location: "Online",
    },
    {
      id: 2,
      title: "IRL Meetup",
      date: "22 Sep 2024",
      description: "In-person meetup for DAO members.",
      location: "New York City, NY",
    },
  ]);

  return (
    <main className="min-h-screen tracking-widest text-white font-lond">
      <section className="p-6 md:px-16 lg:max-w-5xl lg:mx-auto py-[50px] md:py-[80px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold">Upcoming Events</h2>
          <p className="text-gray-400 mt-4 text-lg">
            Stay updated with the latest DAO events and meetups.
          </p>
        </div>

        <ul className="space-y-8">
          {events.map((event) => (
            <li
              key={event.id}
              className="relative bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                {/* Event Info */}
                <div className="flex-grow text-center md:text-left">
                  <h4 className="text-2xl font-semibold mb-2 text-gray-100">
                    {event.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{event.description}</p>
                  <p className="text-gray-300 mt-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>

                    {event.location}
                  </p>
                </div>
                <div className="absolute top-4 right-4  flex items-center space-x-2">
                  {/* <CalendarIcon className="h-6 w-6" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>

                  <span>{event.date}</span>
                </div>

                {/* Join Button */}
                <div className="mt-6 md:mt-0">
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg">
                    Join Event
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ContributorEvents;
