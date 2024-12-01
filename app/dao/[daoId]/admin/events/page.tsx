"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import EventForm from "@/components/events/EventForm";
import EventList from "@/components/events/EventsList";

const AdminEventsPage = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "DAO Expansion Webinar",
      type: "online",
      date: "2024-09-30",
      description: "Join us to discuss the DAO expansion.",
      banner: "https://noun.pics/90.svg",
    },
    {
      id: "2",
      title: "DAO IRL Meetup",
      type: "irl",
      date: "2024-10-05",
      description: "An in-person event for DAO members.",
      banner: "https://noun.pics/90.svg",
    },
    {
      id: "3",
      title: "Exclusive Merch Giveaway",
      type: "giveaway",
      date: "2024-10-10",
      description: "Get your hands on DAO-exclusive merch!",
      banner: "https://noun.pics/90.svg",
    },
  ]);

  const addEvent = (newEvent: {
    id: number;
    title: string;
    type: string;
    date: string;
    description: string;
  }) => {
    setEvents([
      ...events,
      {
        ...newEvent,
        id: (events.length + 1).toString(),
        banner: "https://noun.pics/90.svg",
      },
    ]);
  };

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white font-mont">
      <section className="p-4 md:px-16 lg:max-w-5xl lg:mx-auto py-[50px] md:py-[80px]">
        <div className="flex justify-between items-center pb-8">
          <h2 className="text-3xl lg:text-5xl font-bold">Events Management</h2>
          <Button className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600">
            Back to Admin Dashboard
          </Button>
        </div>

        {/* Event Form for Creating New Event */}
        <EventForm
          addEvent={(event) => addEvent({ ...event, id: events.length + 1 })}
        />

        {/* Event List */}
        <EventList events={events} onDelete={deleteEvent} />
      </section>
    </main>
  );
};

export default AdminEventsPage;
