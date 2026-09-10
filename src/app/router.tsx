// src/app/router.tsx
import { createBrowserRouter } from "react-router-dom";
import OrderFlow from "@features/submission/components/OrderFlow";
import AdminLoginPage from "../features/admin/components/AdminLoginPage";
import AdminPage from "../features/admin/components/AdminPage";

export const router = createBrowserRouter([
  { path: "/", element: <OrderFlow /> },
  { path: "/admin/login", element: <AdminLoginPage /> },
  { path: "/admin", element: <AdminPage /> },
]);
