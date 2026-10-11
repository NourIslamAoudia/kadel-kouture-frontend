import { useOrderT } from "@features/submission/i18n";

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
  nextLabel,
  nextDisabled,
  loading,
  totalPrice,
  itemsCount,
}: Props) {
  const t = useOrderT();
  return (
    <div className="sticky bottom-0 border-t border-gold/10 bg-[rgba(247,244,238,0.97)] px-[22px] pb-7 pt-3 backdrop-blur-md">
      {totalPrice !== undefined && totalPrice > 0 && (
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-ink-3">
            {t.nav.total}
            {itemsCount !== undefined &&
              itemsCount > 0 &&
              ` (${t.nav.pieces(itemsCount)})`}
          </span>
          <span className="font-serif text-base font-semibold text-ink">
            {t.price(totalPrice)}
          </span>
        </div>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled || loading}
        className="w-full rounded-none bg-gold py-[15px] text-[13px] font-medium uppercase tracking-[0.08em] text-white transition hover:-translate-y-px hover:bg-[#171715] disabled:pointer-events-none disabled:opacity-40"
      >
        {loading ? t.nav.sending : (nextLabel ?? `${t.nav.next} →`)}
      </button>
    </div>
  );
}
