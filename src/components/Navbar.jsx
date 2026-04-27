import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        EventHub
      </Link>

      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/create">Create Event</Link>

        {!token ? (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}