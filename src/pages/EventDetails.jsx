// * Event Details page — shows full information for a single event (API integration pending)
// ? Route param: /events/:id — the id is read via useParams()
// * Event Details page — shows full info about a single event
import { useNavigate } from "react-router-dom";

const mockEvent = {
  title: "React Workshop",
  date: "2026-05-10",
  location: "Berlin",
  description:
    "A hands-on workshop covering React hooks and best practices. Join us for a full day of learning, networking and building real projects with experienced developers.",
};

export default function EventDetails() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate("/")}
        className="text-purple-600 hover:underline text-sm mb-6 block"
      >
        ← Back to Events
      </button>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <p className="text-sm text-purple-500 font-medium mb-2">{mockEvent.date}</p>
        <h1 className="text-3xl font-bold mb-2">{mockEvent.title}</h1>
        <p className="text-gray-400 text-sm mb-6">📍 {mockEvent.location}</p>
        <p className="text-gray-600 leading-relaxed">{mockEvent.description}</p>

        <button className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-6 py-3 transition">
          Register for Event
        </button>
      </div>
    </div>
  );
}
