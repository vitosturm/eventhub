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
    <main className="max-w-5xl mx-auto px-4 py-10">

      {/* Hero section */}
      <div className="relative rounded-2xl mb-10 overflow-hidden">
        {/* Background photo */}
        <img
          src="/hero-bg.jpg"
          alt="Event"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Purple overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700/90 to-purple-500/75" />

        {/* Content on top */}
        <div className="relative z-10 p-6 flex items-center justify-between text-white">
          <div>
            <h1 className="text-4xl font-bold mb-2">Discover Amazing Events</h1>
            <p className="text-purple-100 text-lg">Find and join the best events around you</p>
          </div>
          <img
            src="/final_logo_1.png"
            alt="EventHub"
            className="h-40 w-40 object-contain hidden sm:block shrink-0 drop-shadow-lg"
          />
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

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
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-3xl text-white shadow-xl transition hover:scale-105 hover:bg-purple-700"
      >
        +
      </Link>
    </main>
  );
}
