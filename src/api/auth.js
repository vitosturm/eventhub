// * Authentication API calls — register, login, profile
import { apiFetch } from "./api";

// ? POST /api/users — creates a new user account
// ? data: { name, email, password }
export function register(data) {
  return apiFetch("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ? POST /api/auth/login — authenticates an existing user
// ? data: { email, password }
// * Returns { token, user } on success — the token is stored by the caller
export function login(data) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ? GET /api/auth/profile — returns the currently logged-in user's data
// * Requires a valid token (apiFetch attaches it automatically)
export function getProfile() {
  return apiFetch("/auth/profile");
}
