import { apiFetch } from "./api";

export function getEvents(page = 1, limit = 10) {
  return apiFetch(`/events?page=${page}&limit=${limit}`);
}

export function getUpcomingEvents() {
  return apiFetch("/events/upcoming");
}

export function getEvent(id) {
  return apiFetch(`/events/${id}`);
}

export function createEvent(data) {
  return apiFetch("/events", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateEvent(id, data) {
  return apiFetch(`/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteEvent(id) {
  return apiFetch(`/events/${id}`, { method: "DELETE" });
}
