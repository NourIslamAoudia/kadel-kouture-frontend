import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@features/auth/components/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <LoginPage />, // temporaire, en attendant les autres routes
  },
]);
