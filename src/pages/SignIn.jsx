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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl flex overflow-hidden">

        {/* Left side — illustration */}
        <div className="hidden md:flex w-1/2 bg-purple-50 items-center justify-center p-10">
          <div className="text-center">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-purple-700">EventHub</h2>
            <p className="text-gray-500 text-sm mt-2">Discover and create amazing events</p>
          </div>
        </div>

        {/* Right side — form */}
        <div className="w-full md:w-1/2 p-10">
          <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
          <p className="text-gray-400 text-sm mb-6">Sign in to your account</p>

          {error && (
            <p className="bg-red-50 text-red-500 text-sm rounded-lg px-4 py-2 mb-4 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                className="border border-gray-200 rounded-xl p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl p-3 transition disabled:opacity-50 mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-purple-600 font-medium hover:underline">
              Sign Up
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
