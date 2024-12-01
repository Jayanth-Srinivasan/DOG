import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EventData {
  title: string;
  type: string;
  date: string;
  description: string;
  banner: string;
}

interface EventFormProps {
  addEvent: (event: EventData) => void;
}

const EventForm: React.FC<EventFormProps> = ({ addEvent }) => {
  const [eventData, setEventData] = useState({
    title: "",
    type: "online",
    date: "",
    description: "",
    banner: "", // Add event banner URL field
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent(eventData);
    setEventData({
      title: "",
      type: "online",
      date: "",
      description: "",
      banner: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Create New Event</h3>

      <div className="grid gap-4 mb-4">
        {/* Event Title */}
        <div className="grid gap-1.5">
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            placeholder="Enter event title"
            className="h-12"
          />
        </div>

        {/* Event Type */}
        <div className="grid gap-1.5">
          <Label htmlFor="type">Event Type</Label>
          <select
            id="type"
            name="type"
            value={eventData.type}
            onChange={handleInputChange}
            className="h-12 bg-gray-700 text-white p-2 rounded-lg"
          >
            <option value="online">Online Event</option>
            <option value="irl">IRL Event</option>
            <option value="giveaway">Giveaway</option>
            <option value="airdrop">Airdrop</option>
          </select>
        </div>

        {/* Event Date */}
        <div className="grid gap-1.5">
          <Label htmlFor="date">Event Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={eventData.date}
            onChange={handleInputChange}
            className="h-12"
          />
        </div>

        {/* Event Description */}
        <div className="grid gap-1.5">
          <Label htmlFor="description">Event Description</Label>
          <Input
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
            className="h-12"
          />
        </div>

        {/* Event Banner (Image URL) */}
        <div className="grid gap-1.5">
          <Label htmlFor="banner">Event Banner URL</Label>
          <Input
            id="banner"
            name="banner"
            value={eventData.banner}
            onChange={handleInputChange}
            placeholder="Enter banner image URL"
            className="h-12"
          />
        </div>
      </div>

      <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600">
        Create Event
      </Button>
    </form>
  );
};

export default EventForm;
