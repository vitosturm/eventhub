// * Home page — public landing page showing the event list (API integration pending)
import { useNavigate } from "react-router-dom";
const mockEvents = [
  {
    id: 1,
    title: "React Workshop",
    date: "2026-05-10",
    location: "Berlin",
    description: "A hands-on workshop covering React hooks and best practices.",
  },
  {
    id: 2,
    title: "Gaming Day",
    date: "2026-08-26",
    location: "Köln",
    description: "One of the largest gaming exhibitions in the world.",
  },
  {
    id: 3,
    title: "Tech Meetup",
    date: "2026-05-20",
    location: "Rotterdam",
    description: "Monthly meetup for developers to share ideas and projects.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition cursor-pointer border border-gray-100"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            <p className="text-sm text-purple-500 font-medium mb-1">{event.date}</p>
            <h2 className="text-xl font-bold mb-1">{event.title}</h2>
            <p className="text-sm text-gray-400 mb-3">📍 {event.location}</p>
            <p className="text-gray-600 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}