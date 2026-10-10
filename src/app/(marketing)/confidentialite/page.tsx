import type { Metadata } from "next";
import { privacy } from "@features/legal/content";
import { LegalPage } from "@features/legal/LegalPage";

export const metadata: Metadata = {
  title: `${privacy.title} — Kadel Kouture`,
  // Brouillon à valider juridiquement : pas d'indexation pour l'instant.
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
