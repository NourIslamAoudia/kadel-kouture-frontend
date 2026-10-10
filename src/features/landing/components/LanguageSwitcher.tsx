import Link from "next/link";
import { LOCALES, LOCALE_LABELS, type Locale } from "../i18n/locales";
import { cx } from "../lib/cx";

/** ES · EN · CA · FR — la langue active est soulignée. */
export function LanguageSwitcher({
  locale,
  label,
  className,
  onNavigate,
}: {
  locale: Locale;
  label: string;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.18em] uppercase">
        {LOCALES.map((code) => (
          <li key={code}>
            <Link
              href={`/${code}`}
              hrefLang={code}
              lang={code}
              aria-current={code === locale ? "true" : undefined}
              // Le nom accessible contient le texte visible (« EN · English ») : utile à la commande vocale.
              aria-label={`${code.toUpperCase()} · ${LOCALE_LABELS[code]}`}
              onClick={onNavigate}
              className={cx(
                "kk-navlink",
                code === locale
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100",
              )}
            >
              {code}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
