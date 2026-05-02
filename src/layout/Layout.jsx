// * Root layout — wraps every page with the Navbar and a centered content area
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Particles from "../components/Particles";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <Particles />

      {/* Animated background blobs */}
      <div className="fixed inset-0 bg-white/80 pointer-events-none z-0" />

      {/* * Navbar is always visible regardless of which page is active */}
      <Navbar />

      {/* * Outlet renders the matched child route (Home, SignIn, CreateEvent, …) */}
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full relative z-10">
        <Outlet />
      </main>

    </div>
  );
}
