import EventCard from "./EventCard";

export default function AllEvents({
  events = [],
  loading,
  page,
  totalPages,
  onPageChange,
}) {
  return (
    <section className="border-t-2 py-4">
      <h2 className="mb-4 text-xl font-bold">All Events</h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : events.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="rounded border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {"<"}
            </button>

            <span className="text-sm font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="rounded border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        </>
      ) : (
        <p>No events available.</p>
      )}
    </section>
  );
}
