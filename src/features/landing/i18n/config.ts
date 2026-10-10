import "server-only";
import { ca } from "./ca";
import { en } from "./en";
import { es } from "./es";
import { fr, type LandingDictionary } from "./fr";
import type { Locale } from "./locales";

/** Typographie française : espace insécable avant ? ! : ; % € et dans les guillemets. */
function frenchSpacing<T>(value: T): T {
  if (typeof value === "string") {
    return value
      .replace(/ ([?!:;%€»])/g, "\u00A0$1")
      .replace(/« /g, "«\u00A0") as T;
  }
  if (Array.isArray(value)) return value.map(frenchSpacing) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, frenchSpacing(entry)]),
    ) as T;
  }
  return value;
}

const DICTIONARIES: Record<Locale, LandingDictionary> = {
  es,
  en,
  ca,
  fr: frenchSpacing(fr),
};

/** Textes d'une langue (côté serveur uniquement : les dictionnaires ne partent pas dans le bundle client). */
export function getDictionary(locale: Locale): LandingDictionary {
  return DICTIONARIES[locale];
}
