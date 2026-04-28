// * Root layout — wraps every page with the Navbar and a centered content area
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* * Navbar is always visible regardless of which page is active */}
      <Navbar />

      {/* * Outlet renders the matched child route (Home, SignIn, CreateEvent, …) */}
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
