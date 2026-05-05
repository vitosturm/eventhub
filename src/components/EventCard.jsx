import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/events/${event.id}`);
  };

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div
      onClick={handleViewDetails}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer border border-gray-100 overflow-hidden"
    >
      <div className="h-1.5 bg-gradient-to-r from-purple-500 to-cyan-400" />
      <div className="p-6">
        <p className="text-sm text-purple-500 font-medium mb-1">
          {formatDate(event.date)}
        </p>
        <h3 className="text-xl font-bold mb-1">{event.title}</h3>
        <p className="text-sm text-gray-400 mb-3">📍 {event.location}</p>
        <span className="text-sm text-purple-600 font-medium hover:underline">
          View Details →
        </span>
      </div>
    </div>
  );
}
