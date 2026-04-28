// * Guards any route that requires authentication
import { Navigate } from "react-router-dom";

// ? Wraps a page component — if no token exists, redirects to /signin
// ? Usage: <ProtectedRoute><CreateEvent /></ProtectedRoute>
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // ! No token = not authenticated → send user to Sign In
  if (!token) {
    return <Navigate to="/signin" />;
  }

  // * Token present — render the protected page normally
  return children;
}
