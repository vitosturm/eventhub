import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/events";
import LocationPicker from "../components/LocationPicker";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !date ||
      !location ||
      !latitude ||
      !longitude
    ) {
      setError("Please fill in all fields and choose a location on the map.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const newEvent = await createEvent({
        title,
        description,
        date: new Date(date).toISOString(),
        location,
        latitude: Number(latitude),
        longitude: Number(longitude),
      });

      navigate(`/events/${newEvent.id}`);
    } catch (err) {
      setError(err.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Create Event</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border p-6"
      >
        {error && <p className="text-sm text-red-500">{error}</p>}

        <div>
          <label className="mb-1 block font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="Tech Conference"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-28 w-full rounded border p-2"
            placeholder="A conference about the latest in tech"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Date</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Location name</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="Convention Center"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Choose location</label>
          <LocationPicker
            latitude={latitude}
            longitude={longitude}
            onChange={({ latitude, longitude }) => {
              setLatitude(latitude);
              setLongitude(longitude);
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-gray-900 p-2 text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </main>
  );
}
