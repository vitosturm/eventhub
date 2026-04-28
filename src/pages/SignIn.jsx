// * Sign In page — authenticates an existing user and stores the JWT token
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // * Send the form data to the API
      const data = await login(form);

      // * Save the token so future API requests are authenticated
      localStorage.setItem("token", data.token);

      // * Tell the Navbar to update its login/logout buttons
      window.dispatchEvent(new Event("authChange"));

      // * Redirect to the home page after successful login
      navigate("/");
    } catch (err) {
      // ! Show the error message returned by the API
      setError(err.message || "Login failed. Please try again.");
    } finally {
      // * Re-enable the button regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-16 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Sign In</h1>

      {/* ! Show error message below the heading when login fails */}
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
        {loading ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}
