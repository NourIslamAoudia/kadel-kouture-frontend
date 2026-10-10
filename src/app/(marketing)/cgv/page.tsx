import type { Metadata } from "next";
import { terms } from "@features/legal/content";
import { LegalPage } from "@features/legal/LegalPage";

export const metadata: Metadata = {
  title: `${terms.title} — Kadel Kouture`,
  // Brouillon à valider juridiquement : pas d'indexation pour l'instant.
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}
