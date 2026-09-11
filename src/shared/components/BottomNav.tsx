interface Props {
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  loading?: boolean;
  totalPrice?: number;
  itemsCount?: number;
}

export default function BottomNav({
  onNext,
  nextLabel = "Continuer →",
  nextDisabled,
  loading,
  totalPrice,
  itemsCount,
}: Props) {
  return (
    <div className="sticky bottom-0 border-t border-gold/10 bg-[rgba(253,251,248,0.97)] px-[22px] pb-7 pt-3 backdrop-blur-md">
      {totalPrice !== undefined && totalPrice > 0 && (
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-ink-3">
            Total estimé
            {itemsCount !== undefined &&
              itemsCount > 0 &&
              ` (${itemsCount} ${itemsCount > 1 ? "pièces" : "pièce"})`}
          </span>
          <span className="font-serif text-base font-semibold text-ink">
            {totalPrice} €
          </span>
        </div>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled || loading}
        className="w-full rounded-full bg-gold py-[15px] text-[13px] font-medium uppercase tracking-[0.08em] text-white shadow-[0_4px_14px_rgba(184,147,90,0.26)] transition hover:-translate-y-px hover:bg-[#9a7b48] disabled:pointer-events-none disabled:opacity-40"
      >
        {loading ? "Envoi en cours…" : nextLabel}
      </button>
    </div>
  );
}
