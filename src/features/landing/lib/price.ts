import { INTL_LOCALE, type Locale } from "../i18n/locales";

/** « 12 € » en français et en espagnol, « €12 » en anglais. */
export function formatPrice(locale: Locale, amount: number) {
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
