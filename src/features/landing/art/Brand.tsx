import { cx } from "../lib/cx";

/**
 * Monogramme KK : deux K en miroir. Leurs bras dessinent un losange,
 * le motif le plus simple du bogolan — et un point de couture au centre.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
    >
      <path d="M4 4v20M24 4v20" strokeWidth="1.5" />
      <path d="M4 14 13 4M4 14l9 10M24 14 15 4m9 10-9 10" strokeWidth="1.2" />
      <circle cx="14" cy="14" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Logotype de la landing : monogramme et KADEL KOUTURE en capitales espacées. */
export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cx("inline-flex items-center gap-3", className)}>
      <Monogram className="h-6 w-6 shrink-0" />
      <span
        className={cx(
          "font-display leading-none whitespace-nowrap uppercase",
          compact
            ? "text-[0.82rem] tracking-[0.26em]"
            : "text-[0.95rem] tracking-[0.3em]",
        )}
      >
        Kadel Kouture
      </span>
    </span>
  );
}
