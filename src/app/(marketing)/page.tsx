import type { Metadata } from "next";
import { fr } from "@features/landing/content/fr";
import { LandingPage } from "@features/landing/LandingPage";
import type { LandingStats } from "@features/landing/types";
import { API_URL } from "@shared/lib/api";

// Le compteur du tarif fondateur se met à jour au plus toutes les minutes.
export const revalidate = 60;

export const metadata: Metadata = {
  title: fr.meta.title,
  description: fr.meta.description,
  openGraph: {
    title: fr.meta.title,
    description: fr.meta.description,
    locale: "fr_FR",
    type: "website",
  },
};

/** Si le backend ne répond pas, la page s'affiche sans chiffres (jamais de faux chiffre). */
async function getStats(): Promise<LandingStats | null> {
  try {
    const response = await fetch(`${API_URL}/api/landing/stats`, { next: { revalidate: 60 } });
    return response.ok ? ((await response.json()) as LandingStats) : null;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const stats = await getStats();

  return (
    <LandingPage
      copy={fr}
      offer={stats?.founderOffer ?? null}
      savedGarments={stats?.savedGarments ?? null}
    />
  );
}
