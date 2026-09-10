// src/app/router.tsx
import { createBrowserRouter } from "react-router-dom";
import OrderFlow from "@features/submission/components/OrderFlow";

export const router = createBrowserRouter([
  { path: "/", element: <OrderFlow /> },
]);
