/** Langues de la landing (cahier des charges, section 12) : espagnol par défaut. */
export const LOCALES = ["es", "en", "ca", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_LABELS: Record<Locale, string> = {
  es: "Español",
  en: "English",
  ca: "Català",
  fr: "Français",
};

/** Locale BCP 47 pour les formats (prix, nombres). */
export const INTL_LOCALE: Record<Locale, string> = {
  es: "es-ES",
  en: "en-GB",
  ca: "ca-ES",
  fr: "fr-FR",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Choisit la langue d'après l'en-tête Accept-Language (« fr-FR,fr;q=0.9,en;q=0.8 »). */
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const quality = params.find((param) => param.trim().startsWith("q="));
      return {
        base: tag.split("-")[0],
        q: quality ? Number(quality.split("=")[1]) : 1,
      };
    })
    .filter((entry) => entry.base && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);
  const match = ranked.find((entry) => isLocale(entry.base));
  return match ? (match.base as Locale) : DEFAULT_LOCALE;
}
