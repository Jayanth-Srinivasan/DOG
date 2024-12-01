import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
}

interface EventListProps {
  events: Event[];
  onDelete: (eventId: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onDelete }) => {
  const router = useRouter();

  const handleViewDetails = (eventId: string) => {
    router.push(`/dao/[daoId]/admin/events/${eventId}`);
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold mb-4">Existing Events</h3>

      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="p-4 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xl font-bold">{event?.title}</h4>
                <p className="text-gray-400">{event?.description}</p>
                <p className="text-gray-400">{event?.date}</p>
                <p className="text-gray-400 capitalize">{event?.type}</p>
              </div>
              <div className="flex space-x-4">
                <Button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => handleViewDetails(event.id)}
                >
                  View Details
                </Button>
                <Button
                  onClick={() => onDelete(event.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
