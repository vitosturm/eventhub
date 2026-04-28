// * Application router — defines all routes and wraps protected ones
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import EventDetails from "../pages/EventDetails";
import CreateEvent from "../pages/CreateEvent";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Users from "../pages/Users";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    // * Layout is the root — its <Outlet> renders the matching child route
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/events/:id", element: <EventDetails /> },

      {
        // * /create is protected — users must be logged in to access it
        path: "/create",
        element: (
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        ),
      },

      // ? Public auth pages — accessible without a token
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },

      // ? Public — anyone can view the user list; edit/delete require a token
      { path: "/users", element: <Users /> },

      // ! Catch-all — shown for any URL that doesn't match a route above
      { path: "*", element: <h1>404 - Page not found</h1> },
    ],
  },
]);
