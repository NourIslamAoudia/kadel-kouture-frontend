import { Monogram, Wordmark } from "@features/landing/art/Brand";
import {
  LOCALES,
  LOCALE_LABELS,
  type Locale,
} from "@features/landing/i18n/locales";
import { useOrderT } from "@features/submission/i18n";

interface Props {
  step: number;
  totalSteps: number;
  onBack: () => void;
  canGoBack: boolean;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function Topbar({
  step,
  totalSteps,
  onBack,
  canGoBack,
  locale,
  onLocaleChange,
}: Props) {
  const progress = (step / totalSteps) * 100;
  const t = useOrderT();

  return (
    <div className="sticky top-0 z-10 bg-[rgba(247,244,238,0.96)] backdrop-blur-md">
      <div className="relative flex items-center justify-between px-[18px] py-3">
        {canGoBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-none px-3.5 py-1.5 text-[12px] uppercase tracking-[0.08em] text-ink-3 transition hover:bg-gold-pale hover:text-gold"
          >
            <BackIcon />
            <span className="sr-only sm:not-sr-only">{t.nav.back}</span>
          </button>
        ) : (
          <span />
        )}

        <span
          className="absolute left-1/2 -translate-x-1/2 text-ink"
          aria-label="Kadel Kouture"
        >
          <span className="flex sm:hidden">
            <Monogram className="h-6 w-6" />
          </span>
          <span className="hidden sm:flex">
            <Wordmark compact />
          </span>
        </span>

        <span className="flex items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.1em] text-ink-3">
            {step} / {totalSteps}
          </span>
          {/* Changer de langue garde toutes les réponses déjà saisies */}
          <label className="relative flex items-center">
            <span className="sr-only">{t.nav.language}</span>
            <select
              value={locale}
              onChange={(event) => onLocaleChange(event.target.value as Locale)}
              className="cursor-pointer appearance-none border border-ink/15 bg-transparent py-1 pr-6 pl-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink outline-none transition hover:border-ink/45 focus-visible:border-ink"
            >
              {LOCALES.map((code) => (
                <option
                  key={code}
                  value={code}
                  lang={code}
                  title={LOCALE_LABELS[code]}
                >
                  {code.toUpperCase()}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 10 6"
              width="8"
              height="5"
              aria-hidden="true"
              className="pointer-events-none absolute right-2 text-ink"
            >
              <path
                d="m1 1 4 4 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
          </label>
        </span>
      </div>

      <div className="h-[3px] bg-gold-pale">
        <div
          className="h-full rounded-r-[3px] bg-gold transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}
