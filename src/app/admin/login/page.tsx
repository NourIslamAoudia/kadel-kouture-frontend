import type { Metadata } from "next";
import AdminLoginPage from "@features/admin/components/AdminLoginPage";

export const metadata: Metadata = {
  title: "Connexion admin · Kadel Kouture",
  robots: { index: false, follow: false },
};

export default function AdminLoginRoute() {
  return <AdminLoginPage />;
}
