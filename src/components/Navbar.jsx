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
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        EventHub
      </Link>

      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/create">Create Event</Link>
        <Link to="/users">Users</Link>

        {/* ? Show Sign In / Sign Up when logged out, Logout when logged in */}
        {!token ? (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}
