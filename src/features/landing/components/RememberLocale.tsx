"use client";

import { useEffect } from "react";
import type { Locale } from "../i18n/locales";

/** Mémorise la langue de la landing : /commander s'ouvre ensuite dans la même langue. */
export function RememberLocale({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.cookie = `kk_lang=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [locale]);
  return null;
}
