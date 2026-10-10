import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@features/landing/i18n/config";
import { LOCALES, isLocale } from "@features/landing/i18n/locales";
import { LandingPage } from "@features/landing/LandingPage";
import type { LandingStats } from "@features/landing/types";
import { API_URL } from "@shared/lib/api";

// Une page statique par langue ; le compteur de l'offre fondateur se rafraîchit chaque minute.
export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);

  return {
    // URL publique du site (balises hreflang, Open Graph) — à définir en production.
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(LOCALES.map((code) => [code, `/${code}`])),
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      locale: t.meta.ogLocale,
      type: "website",
      images: [
        { url: "/media/kadel-hero-poster.jpg", width: 848, height: 480 },
      ],
    },
  };
}

/** Si le backend ne répond pas, la page s'affiche sans chiffres (jamais de faux chiffre). */
async function getStats(): Promise<LandingStats | null> {
  try {
    const response = await fetch(`${API_URL}/api/landing/stats`, {
      next: { revalidate: 60 },
    });
    return response.ok ? ((await response.json()) as LandingStats) : null;
  } catch {
    return null;
  }
}

export default async function LocalizedLandingPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const stats = await getStats();

  return (
    <LandingPage
      locale={lang}
      t={getDictionary(lang)}
      offer={stats?.founderOffer ?? null}
    />
  );
}
