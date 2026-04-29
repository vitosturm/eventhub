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
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-2">{formatDate(event.date)}</p>
      <p className="text-gray-600 mb-4">{event.location}</p>
      <button
        onClick={handleViewDetails}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        View Details
      </button>
    </div>
  );
}
