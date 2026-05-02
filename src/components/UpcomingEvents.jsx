import EventCard from "./EventCard";

export default function UpcomingEvents({ events, loading }) {
  if (loading) return <div className="flex justify-center py-10"><div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <section className="border-t-2 py-4">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      {events.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p>No upcoming events.</p>
      )}
    </section>
  );
}
