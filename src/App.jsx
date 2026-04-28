// * Application root — central place for global providers
// ? Add future providers here (e.g. AuthContext, ThemeContext) by wrapping RouterProvider
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

export default function App() {
  return <RouterProvider router={router} />;
}
