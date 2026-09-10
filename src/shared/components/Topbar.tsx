interface Props {
  step: number;
  totalSteps: number;
  onBack: () => void;
  canGoBack: boolean;
}

export default function Topbar({ step, totalSteps, onBack, canGoBack }: Props) {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-10 bg-[rgba(253,251,248,0.96)] backdrop-blur-md">
      <div className="relative flex items-center justify-between px-[18px] py-3">
        {canGoBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] uppercase tracking-[0.08em] text-ink-3 transition hover:bg-gold-pale hover:text-gold"
          >
            <BackIcon />
            Retour
          </button>
        ) : (
          <span />
        )}

        {canGoBack ? (
          <img
            src="/logo.png"
            alt="Kadel Kouture"
            className="absolute left-1/2 h-9 w-auto max-w-[150px] -translate-x-1/2 object-contain"
          />
        ) : (
          <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-lg italic text-gold">
            Kadel Kouture
          </span>
        )}

        <span className="text-[11px] uppercase tracking-[0.1em] text-ink-3">
          {step} / {totalSteps}
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
