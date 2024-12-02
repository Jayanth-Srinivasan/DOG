"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const event = {
  id: "1",
  title: "DAO Expansion Webinar",
  type: "online",
  date: "2024-09-30",
  description: "Join us to discuss the DAO expansion.",
  banner: "https://noun.pics/90.svg",
};

const EventDetails = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-900 text-white font-mont">
      <section className="p-4 md:px-16 lg:max-w-5xl lg:mx-auto py-[50px] md:py-[80px]">
        <div className="flex justify-between items-center pb-8">
          <h2 className="text-3xl lg:text-5xl font-bold">{event.title}</h2>
          <Button
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600"
            onClick={() => router.push("/dao/[daoId]/admin/events")}
          >
            Back to Events
          </Button>
        </div>

        {/* Event Banner */}
        {event.banner && (
          <div className="mb-10">
            <Image
              src={event.banner}
              alt={event.title}
              width={1200}
              height={400}
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Event Details */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-lg mb-4">
            <strong>Event Type:</strong>{" "}
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </p>
          <p className="text-lg mb-4">
            <strong>Event Date:</strong> {event.date}
          </p>
          <p className="text-lg">
            <strong>Description:</strong> {event.description}
          </p>
        </div>
      </section>
    </main>
  );
};

// Assuming this is passed as prop or fetched in getStaticProps/getServerSideProps
export default EventDetails;
