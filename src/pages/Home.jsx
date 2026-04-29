// * Home page — public landing page showing upcoming events and all events
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents, getUpcomingEvents } from "../api/events";
import UpcomingEvents from "../components/UpcomingEvents";
import AllEvents from "../components/AllEvents";

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [events, setEvents] = useState([]);

  const [upcomingLoading, setUpcomingLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);

  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadUpcomingEvents();
  }, []);

  useEffect(() => {
    loadEvents();
  }, [page]);

  async function loadUpcomingEvents() {
    try {
      setUpcomingLoading(true);
      setError(null);

      const data = await getUpcomingEvents();

      setUpcomingEvents(data.results || []);
    } catch (err) {
      setError(err.message || "Failed to load upcoming events");
    } finally {
      setUpcomingLoading(false);
    }
  }

  async function loadEvents() {
    try {
      setEventsLoading(true);
      setError(null);

      const data = await getEvents(page);

      setEvents(data.results || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message || "Failed to load events");
    } finally {
      setEventsLoading(false);
    }
  }

  if (error) return <p>{error}</p>;

  return (
    <main className="mt-8">
      <h1 className="text-2xl font-bold mb-6">Home Page</h1>

      {error && <p>{error}</p>}

      <UpcomingEvents events={upcomingEvents} loading={upcomingLoading} />

      <AllEvents
        events={events}
        loading={eventsLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <Link
        to="/create"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-3xl text-white shadow-xl transition hover:scale-105 hover:bg-black"
      >
        +
      </Link>
    </main>
  );
}
