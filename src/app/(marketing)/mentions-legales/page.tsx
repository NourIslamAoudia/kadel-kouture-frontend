import type { Metadata } from "next";
import { legalNotice } from "@features/legal/content";
import { LegalPage } from "@features/legal/LegalPage";

export const metadata: Metadata = {
  title: `${legalNotice.title} — Kadel Kouture`,
  // Brouillon à valider juridiquement : pas d'indexation pour l'instant.
  robots: { index: false, follow: true },
};

export default function LegalNoticePage() {
  return <LegalPage doc={legalNotice} />;
}
