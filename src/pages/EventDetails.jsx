// * Event Details page — shows full information for a single event
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getEvent, updateEvent, deleteEvent } from "../api/events";
import EventMap from "../components/EventMap";
import LocationPicker from "../components/LocationPicker";

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">{title}</h2>

        {children}

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoggedIn = !!localStorage.getItem("token");

  // Edit modal state
  const [editingEvent, setEditingEvent] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editLatitude, setEditLatitude] = useState("");
  const [editLongitude, setEditLongitude] = useState("");
  const [editError, setEditError] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  // Delete modal state
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadEvent();
  }, [id]);

  async function loadEvent() {
    try {
      setLoading(true);
      setError(null);

      const data = await getEvent(id);
      setEvent(data);
    } catch (err) {
      setError(err.message || "Failed to load event details");
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    navigate("/");
  }

  function formatDate(dateString) {
    if (!dateString) return "—";

    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatDateForInput(dateString) {
    if (!dateString) return "";

    return new Date(dateString).toISOString().slice(0, 16);
  }

  function openEditModal() {
    setEditingEvent(event);
    setEditTitle(event.title || "");
    setEditDescription(event.description || "");
    setEditDate(formatDateForInput(event.date));
    setEditLocation(event.location || "");
    setEditLatitude(event.latitude ?? "");
    setEditLongitude(event.longitude ?? "");
    setEditError(null);
  }

  async function handleEdit(e) {
    e.preventDefault();

    if (
      !editTitle ||
      !editDescription ||
      !editDate ||
      !editLocation ||
      editLatitude === "" ||
      editLongitude === ""
    ) {
      setEditError(
        "Please fill in all fields and choose a location on the map.",
      );
      return;
    }

    try {
      setEditError(null);
      setEditLoading(true);

      const updatedEvent = await updateEvent(editingEvent.id, {
        title: editTitle,
        description: editDescription,
        date: new Date(editDate).toISOString(),
        location: editLocation,
        latitude: Number(editLatitude),
        longitude: Number(editLongitude),
      });

      setEvent(updatedEvent);
      setEditingEvent(null);
    } catch (err) {
      setEditError(err.message || "Failed to update event");
    } finally {
      setEditLoading(false);
    }
  }

  function openDeleteModal() {
    setDeletingEvent(event);
    setDeleteError(null);
  }

  async function handleDelete(e) {
    e.preventDefault();

    try {
      setDeleteError(null);
      setDeleteLoading(true);

      await deleteEvent(deletingEvent.id);
      navigate("/");
    } catch (err) {
      setDeleteError(err.message || "Failed to delete event");
    } finally {
      setDeleteLoading(false);
    }
  }

  if (loading) {
    return <p className="mt-16 text-center">Loading event details...</p>;
  }

  if (error) {
    return <p className="mt-16 text-center text-red-500">{error}</p>;
  }

  if (!event) {
    return <p className="mt-16 text-center">Event not found.</p>;
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <button type="button" onClick={handleBack} className="text-sm underline">
        ← Back to Home
      </button>

      <section className="mt-6 space-y-6 rounded-2xl border p-6">
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="mt-3 text-gray-600">{event.description}</p>
        </div>

        <div className="grid gap-4 border-t pt-4 sm:grid-cols-2">
          <p>
            <span className="font-semibold">Date:</span>
            <br />
            {formatDate(event.date)}
          </p>

          <p>
            <span className="font-semibold">Location:</span>
            <br />
            {event.location}
          </p>

          <p>
            <span className="font-semibold">Organizer ID:</span>
            <br />
            {event.organizerId}
          </p>

          <p>
            <span className="font-semibold">Event ID:</span>
            <br />
            {event.id}
          </p>
        </div>

        <div className="border-t pt-4">
          <h2 className="mb-3 text-xl font-bold">Event Location</h2>

          <EventMap latitude={event.latitude} longitude={event.longitude} />

          <p className="mt-2 text-xs text-gray-500">
            Lat: {Number(event.latitude).toFixed(6)} | Lng:{" "}
            {Number(event.longitude).toFixed(6)}
          </p>
        </div>

        <div className="border-t pt-4 text-sm text-gray-500">
          <p>Created: {formatDate(event.createdAt)}</p>
          <p>Updated: {formatDate(event.updatedAt)}</p>
        </div>

        {isLoggedIn && (
          <div className="flex gap-2 border-t pt-4">
            <button
              type="button"
              onClick={openEditModal}
              className="rounded bg-blue-100 px-3 py-2 text-sm text-blue-700 hover:bg-blue-200"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={openDeleteModal}
              className="rounded bg-red-100 px-3 py-2 text-sm text-red-700 hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        )}
      </section>

      {editingEvent && (
        <Modal title="Edit Event" onClose={() => setEditingEvent(null)}>
          <form onSubmit={handleEdit} className="flex flex-col gap-3">
            {editError && <p className="text-sm text-red-500">{editError}</p>}

            <input
              placeholder="Title"
              value={editTitle}
              className="rounded border p-2 text-sm"
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
              placeholder="Description"
              value={editDescription}
              className="min-h-24 rounded border p-2 text-sm"
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <input
              type="datetime-local"
              value={editDate}
              className="rounded border p-2 text-sm"
              onChange={(e) => setEditDate(e.target.value)}
            />

            <input
              placeholder="Location name"
              value={editLocation}
              className="rounded border p-2 text-sm"
              onChange={(e) => setEditLocation(e.target.value)}
            />

            <div>
              <label className="mb-1 block text-sm font-medium">
                Choose location
              </label>

              <LocationPicker
                latitude={editLatitude}
                longitude={editLongitude}
                onChange={({ latitude, longitude }) => {
                  setEditLatitude(latitude);
                  setEditLongitude(longitude);
                }}
              />
            </div>

            <button
              type="submit"
              disabled={editLoading}
              className="rounded bg-gray-900 p-2 text-sm text-white disabled:opacity-50"
            >
              {editLoading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </Modal>
      )}

      {deletingEvent && (
        <Modal title="Delete Event" onClose={() => setDeletingEvent(null)}>
          <form onSubmit={handleDelete} className="flex flex-col gap-3">
            {deleteError && (
              <p className="text-sm text-red-500">{deleteError}</p>
            )}

            <p className="text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <strong>{deletingEvent.title}</strong>? This cannot be undone.
            </p>

            <button
              type="submit"
              disabled={deleteLoading}
              className="rounded bg-red-600 p-2 text-sm text-white disabled:opacity-50"
            >
              {deleteLoading ? "Deleting..." : "Delete Event"}
            </button>
          </form>
        </Modal>
      )}
    </main>
  );
}
