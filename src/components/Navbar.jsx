// * Navbar — shown on every page via Layout
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  // * Read initial token from localStorage when Navbar first mounts
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const syncToken = () => setToken(localStorage.getItem("token"));

    // ? "storage" fires when localStorage changes in ANOTHER browser tab
    window.addEventListener("storage", syncToken);

    // * "authChange" is our custom event — dispatched in the same tab after
    //   login or logout so the Navbar updates without a full page reload
    window.addEventListener("authChange", syncToken);

    return () => {
      window.removeEventListener("storage", syncToken);
      window.removeEventListener("authChange", syncToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    // * Notify all listeners (e.g. other components) that auth state changed
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-xl font-bold tracking-wide text-white hover:text-purple-400 transition">
        🎉 EventHub
      </Link>

      <div className="flex gap-6 items-center text-sm font-medium">
        <Link to="/" className="hover:text-purple-400 transition">Home</Link>
        <Link to="/create" className="hover:text-purple-400 transition">Create Event</Link>

        {!token ? (
          <>
            <Link to="/signin" className="hover:text-purple-400 transition">Sign In</Link>
            <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition">
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
