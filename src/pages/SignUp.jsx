// * Sign Up page — registers a new user account and redirects to Sign In
// ! The API only saves email + password — name can be set later via the Users page (Edit)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // * Send the form data to the API to create the account
      await register(form);

      // * Registration successful — redirect to Sign In so the user can log in
      navigate("/signin");
    } catch (err) {
      // ! Show the error message returned by the API (e.g. "User Already Exist")
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      // * Re-enable the button regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-16 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      {/* ! Show error message below the heading when registration fails */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        className="border rounded p-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        className="border rounded p-2"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      {/* * Button is disabled while the request is running to prevent double clicks */}
      <button
        type="submit"
        disabled={loading}
        className="bg-gray-900 text-white rounded p-2 disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
