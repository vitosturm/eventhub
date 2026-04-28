// * User API calls — fetch, update and delete users
import { apiFetch } from "./api";

// ? GET /api/users — returns a paginated list of all registered users
// ? Response: { totalCount, totalPages, currentPage, results: [...] }
export function getUsers() {
  return apiFetch("/users");
}

// ? PUT /api/users/{id} — updates name, email, password or isActive
// ? data: { name?, email?, password?, isActive? }
export function updateUser(id, data) {
  return apiFetch(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// ? DELETE /api/users/{id} — permanently removes the user account
// ! Returns 204 No Content — no response body to parse
export function deleteUser(id) {
  return apiFetch(`/users/${id}`, { method: "DELETE" });
}
