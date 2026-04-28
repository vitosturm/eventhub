// * Base URL — reads from .env or falls back to the local dev server
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// * Central fetch wrapper — used by all API files (auth.js, users.js, ...)
export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL + endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      // ? Only adds the Authorization header when the user is logged in
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  // ! Request failed — read the error message from the API and throw it
  if (!response.ok) {
    const errorData = await response.json();
    console.error("API ERROR:", errorData);
    const message = errorData.error || errorData.message || "API error";
    throw new Error(message);
  }

  // * DELETE returns 204 No Content — no JSON body to read
  if (response.status === 204) {
    return null;
  }

  // * All other successful responses return JSON
  return response.json();
}
