"use client";

import { createContext, Fragment, useContext, type ReactNode } from "react";
import type { Locale } from "@features/landing/i18n/locales";
import { ca } from "./ca";
import { en } from "./en";
import { es } from "./es";
import { fr, type OrderDictionary } from "./fr";

const DICTIONARIES: Record<Locale, OrderDictionary> = { es, en, ca, fr };

const OrderI18n = createContext<OrderDictionary>(fr);

export function getOrderDictionary(locale: Locale): OrderDictionary {
  return DICTIONARIES[locale];
}

export function OrderI18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <OrderI18n.Provider value={DICTIONARIES[locale]}>
      {children}
    </OrderI18n.Provider>
  );
}

/** Textes du parcours de commande dans la langue courante. */
export function useOrderT() {
  return useContext(OrderI18n);
}

/** « Que souhaitez-vous *transformer* ? » → le mot entre astérisques en italique d'accent. */
export function em(text: string): ReactNode {
  return text.split("*").map((part, index) =>
    index % 2 === 1 ? (
      <em key={index} className="italic text-gold">
        {part}
      </em>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

/** Mémorise la langue choisie (lue par /commander au chargement). */
export function rememberLocale(locale: Locale) {
  document.cookie = `kk_lang=${locale}; path=/; max-age=31536000; samesite=lax`;
}
