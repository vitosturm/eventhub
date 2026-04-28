// * Create Event page — protected route, only accessible when logged in
// ? This page will contain a form to POST a new event to the API
// * Create Event page — protected, only accessible when logged in
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // API integration pending — Ali will hook this up
    console.log("Event submitted:", form);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate("/")}
        className="text-purple-600 hover:underline text-sm mb-6 block"
      >
        ← Back to Events
      </button>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
        <p className="text-gray-400 text-sm mb-8">Fill in the details to create a new event</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Event Title</label>
            <input
              type="text"
              placeholder="Enter event title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Description</label>
            <textarea
              placeholder="Describe your event..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Location</label>
            <input
              type="text"
              placeholder="Enter event location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl p-3 transition mt-2"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
