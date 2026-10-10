import type { Metadata } from "next";
import AdminPage from "@features/admin/components/AdminPage";

export const metadata: Metadata = {
  title: "Administration · Kadel Kouture",
  robots: { index: false, follow: false },
};

export default function AdminRoute() {
  return <AdminPage />;
}
