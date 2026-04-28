// * Users page — shows all registered users, with edit/delete actions for logged-in users
import { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "../api/users";

// * Modal component — a centered popup with a dark background overlay
// ? Props: title (heading text), onClose (called when Cancel is clicked), children (form inside)
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="text-lg font-bold mb-4">{title}</h2>

        {children}

        <button
          onClick={onClose}
          className="mt-3 w-full text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // * True when the user is logged in — controls whether action buttons are shown
  const isLoggedIn = !!localStorage.getItem("token");

  // ── Edit modal state ────────────────────────────────────────────────────
  // ? editingUser is the user we are currently editing, or null if closed
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editError, setEditError] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  // ── Change password modal state ─────────────────────────────────────────
  // ? passwordUser is the user whose password we are changing, or null if closed
  const [passwordUser, setPasswordUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // * Load the user list when the page first opens
  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    setLoading(true);
    getUsers()
      .then((data) => setUsers(data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  // ── Edit ────────────────────────────────────────────────────────────────

  function openEditModal(user) {
    // * Fill the form fields with the selected user's current data
    setEditingUser(user);
    setEditName(user.name || "");
    setEditEmail(user.email);
    setEditError(null);
  }

  async function handleEdit(e) {
    e.preventDefault();
    setEditError(null);
    setEditLoading(true);

    try {
      const updatedUser = await updateUser(editingUser.id, {
        name: editName,
        email: editEmail,
      });

      // * Update only the edited user in the list without reloading everything
      const updatedList = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );

      setUsers(updatedList);
      setEditingUser(null);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  }

  // ── Change Password ─────────────────────────────────────────────────────

  function openPasswordModal(user) {
    setPasswordUser(user);
    setNewPassword("");
    setPasswordError(null);
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    setPasswordError(null);
    setPasswordLoading(true);

    try {
      await updateUser(passwordUser.id, { password: newPassword });
      setPasswordUser(null);
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setPasswordLoading(false);
    }
  }

  // ── Delete ──────────────────────────────────────────────────────────────

  async function handleDelete(user) {
    const confirmed = window.confirm(
      'Delete "' + (user.name || user.email) + '"? This cannot be undone.'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(user.id);

      // * Remove the deleted user from the list without reloading the page
      const updatedList = users.filter((u) => u.id !== user.id);

      setUsers(updatedList);
    } catch (err) {
      alert(err.message);
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────

  if (loading) {
    return <p className="text-center mt-16">Loading users...</p>;
  }

  if (error) {
    return <p className="text-center mt-16 text-red-500">{error}</p>;
  }

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-6">Registered Users</h1>

      {users.length === 0 && <p className="text-gray-500">No users found.</p>}

      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-900 text-white text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Registered</th>
                {/* ? Only show the Actions column when logged in */}
                {isLoggedIn && <th className="p-3"></th>}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                // * Format the date once per row
                const registeredDate = new Date(user.createdAt).toLocaleDateString();

                // * Choose badge color based on active status
                const badgeColor = user.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500";

                return (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{user.name || "—"}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <span className={"px-2 py-1 rounded text-xs font-medium " + badgeColor}>
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-3 text-gray-500">{registeredDate}</td>

                    {/* * Action buttons — only visible when logged in */}
                    {isLoggedIn && (
                      <td className="p-3 flex gap-2 justify-end">
                        <button
                          onClick={() => openEditModal(user)}
                          className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openPasswordModal(user)}
                          className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        >
                          Change PW
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="px-2 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Edit Modal ─────────────────────────────────────────────────── */}
      {editingUser && (
        <Modal title="Edit User" onClose={() => setEditingUser(null)}>
          <form onSubmit={handleEdit} className="flex flex-col gap-3">
            {editError && <p className="text-red-500 text-sm">{editError}</p>}

            <input
              placeholder="Name"
              value={editName}
              className="border rounded p-2 text-sm"
              onChange={(e) => setEditName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={editEmail}
              className="border rounded p-2 text-sm"
              onChange={(e) => setEditEmail(e.target.value)}
            />

            <button
              type="submit"
              disabled={editLoading}
              className="bg-gray-900 text-white rounded p-2 text-sm disabled:opacity-50"
            >
              {editLoading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </Modal>
      )}

      {/* ── Change Password Modal ──────────────────────────────────────── */}
      {passwordUser && (
        <Modal title="Change Password" onClose={() => setPasswordUser(null)}>
          <form onSubmit={handlePasswordChange} className="flex flex-col gap-3">
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

            <p className="text-sm text-gray-500">
              New password for <strong>{passwordUser.name || passwordUser.email}</strong>
            </p>

            <input
              type="password"
              placeholder="New password (min. 8 characters)"
              value={newPassword}
              className="border rounded p-2 text-sm"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={passwordLoading}
              className="bg-gray-900 text-white rounded p-2 text-sm disabled:opacity-50"
            >
              {passwordLoading ? "Saving..." : "Update Password"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
