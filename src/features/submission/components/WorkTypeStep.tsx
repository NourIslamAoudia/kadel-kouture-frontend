import type { GarmentType, WorkType } from "../types";
import { getGarmentPrice, getWorkPrice } from "../../../common/pricing";
import { em, useOrderT } from "../i18n";
import { WorkIcon } from "./StepIcons";

const OPTIONS: WorkType[] = [
  "retouche",
  "reparation",
  "personnalisation",
  "upcycling",
];

interface Props {
  value: WorkType | null;
  garmentType?: GarmentType | null;
  itemIndex?: number;
  itemComment?: string;
  onChange: (value: WorkType) => void;
  onItemCommentChange?: (comment: string) => void;
}

export default function WorkTypeStep({
  value,
  garmentType,
  itemIndex,
  itemComment = "",
  onChange,
  onItemCommentChange,
}: Props) {
  const garmentPrice = getGarmentPrice(garmentType);
  const selectedWorkPrice = getWorkPrice(value);
  const pieceTotal = garmentPrice + selectedWorkPrice;
  const t = useOrderT();

  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <span className="h-px w-[18px] bg-gold" />
        {t.work.eyebrow((itemIndex ?? 0) + 1)}
      </p>

      <h2 className="mb-2 font-serif text-3xl font-light leading-tight text-ink">
        {em(t.work.title)}
      </h2>

      <p className="mb-6 text-[13px] leading-relaxed text-ink-3">
        {t.work.subtitle(t.price(garmentPrice))}
      </p>

      <div className="flex flex-col gap-2.5">
        {OPTIONS.map((option) => {
          const selected = value === option;
          const workPrice = getWorkPrice(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={selected}
              className={`group flex items-center gap-4 border px-4 py-4 text-left transition duration-300 ${
                selected
                  ? "border-ink bg-gold-pale"
                  : "border-ink/12 bg-white hover:border-ink/45"
              }`}
            >
              <WorkIcon
                type={option}
                className="h-11 w-11 shrink-0 text-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-0.5"
              />

              <span className="flex-1">
                <span className="block font-serif text-[17px] leading-tight text-ink">
                  {t.works[option].label}
                </span>
                <span className="mt-1 block text-[12px] text-ink-3">
                  {t.works[option].description}
                </span>
              </span>

              <div className="flex items-center gap-2">
                <span className="font-serif text-[16px] whitespace-nowrap text-ink">
                  + {t.price(workPrice)}
                </span>
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-white ${
                    selected ? "flex" : "hidden"
                  }`}
                >
                  <CheckIcon />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {value && (
        <div className="mt-4 border border-ink/12 bg-gold-pale/50 px-4 py-3 text-xs text-ink">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span>
              <strong>
                {garmentType ? t.garments[garmentType] : t.work.product}
              </strong>{" "}
              ({t.price(garmentPrice)}){" + "}
              <strong>{t.works[value].label}</strong> (
              {t.price(selectedWorkPrice)})
            </span>
            <span className="font-serif text-[15px] whitespace-nowrap text-ink">
              {t.work.pieceTotal} {t.price(pieceTotal)}
            </span>
          </div>
        </div>
      )}

      {value && onItemCommentChange && (
        <div className="mt-4 border border-ink/12 bg-white p-4">
          <label className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-ink-3">
            {t.work.detailLabel}
          </label>
          <input
            type="text"
            value={itemComment}
            onChange={(e) => onItemCommentChange(e.target.value)}
            placeholder={t.work.detailPlaceholder}
            className="w-full rounded-lg border border-gold/20 bg-bg px-3 py-2 text-xs text-ink outline-none transition focus:border-gold"
          />
        </div>
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
