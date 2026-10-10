import type { Metadata } from "next";
import { fr } from "@features/landing/content/fr";
import { LandingPage } from "@features/landing/LandingPage";
import { getFounderOffer, getSavedGarments } from "@/server/landing";

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

export default async function HomePage() {
  const [offer, savedGarments] = await Promise.all([getFounderOffer(), getSavedGarments()]);

  return <LandingPage copy={fr} offer={offer} savedGarments={savedGarments} />;
}
