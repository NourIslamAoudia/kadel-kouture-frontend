import type { GarmentType } from "../types";
import { getGarmentPrice } from "../../../common/pricing";
import { em, useOrderT } from "../i18n";

const OPTIONS: GarmentType[] = [
  "pantalon",
  "veste",
  "robe",
  "chemise",
  "manteau",
  "autre",
];

interface Props {
  value: GarmentType | null;
  otherValue: string;
  itemIndex?: number;
  onChange: (value: GarmentType) => void;
  onOtherChange: (value: string) => void;
}

export default function GarmentTypeStep({
  value,
  otherValue,
  itemIndex,
  onChange,
  onOtherChange,
}: Props) {
  const t = useOrderT();
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <span className="h-px w-[18px] bg-gold" />
        {t.garment.eyebrow((itemIndex ?? 0) + 1)}
      </p>

      <h2 className="mb-2 font-serif text-3xl font-light leading-tight text-ink">
        {em(t.garment.title)}
      </h2>

      <p className="mb-6 text-[13px] leading-relaxed text-ink-3">
        {t.garment.subtitle}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {OPTIONS.map((option) => {
          const selected = value === option;
          const garmentPrice = getGarmentPrice(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={selected}
              className={`group flex flex-col items-center gap-3 border px-3 pt-5 pb-4 text-center transition duration-300 ${
                selected
                  ? "border-ink bg-gold-pale"
                  : "border-ink/12 bg-white hover:border-ink/45"
              }`}
            >
              <GarmentIcon
                type={option}
                className="h-14 w-14 text-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-0.5"
              />
              <span className="font-serif text-[17px] leading-none text-ink">
                {t.garments[option]}
              </span>
              <span className="text-[11px] tracking-[0.04em] text-ink-3">
                {t.garment.from} {t.price(garmentPrice)}
              </span>
            </button>
          );
        })}
      </div>

      {value === "autre" && (
        <div className="mt-4">
          <label className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-ink-3">
            {t.garment.otherLabel}
          </label>
          <input
            type="text"
            value={otherValue}
            onChange={(e) => onOtherChange(e.target.value)}
            placeholder={t.garment.otherPlaceholder}
            className="w-full rounded-none border-[1.5px] border-gold/20 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold focus:shadow-[0_0_0_3px_rgba(23,23,21,0.11)]"
          />
        </div>
      )}
    </div>
  );
}

/* Dessins techniques au trait fin : silhouette, coutures en pointillés, détails de confection. */
const LINE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.15,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const STITCH = { ...LINE, strokeDasharray: "1.6 1.9", strokeOpacity: 0.7 };
const SOFT = { ...LINE, strokeOpacity: 0.35 };

function GarmentIcon({
  type,
  className,
}: {
  type: GarmentType;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {type === "pantalon" && (
        <g>
          <path {...LINE} d="M21 9h22v5H21z" />
          <path {...LINE} d="M21 14 18.5 57h10.5L32 25l3 32h10.5L43 14" />
          <path {...STITCH} d="M32 14v11M24 14q5 2 6.5 9M40 14q-5 2-6.5 9" />
          <path {...SOFT} d="m24 30-.8 24M40 30l.8 24" />
          <path {...LINE} d="M24.5 9v5M32 9v5M39.5 9v5" />
        </g>
      )}
      {type === "veste" && (
        <g>
          <path
            {...LINE}
            d="M24 8 15 12l-3.5 38 5.5 1 3-25v30h24V26l3 25 5.5-1L49 12l-9-4"
          />
          <path {...LINE} d="m24 8 3.5 11-3 2.5L32 34l7.5-12.5-3-2.5L40 8" />
          <path {...LINE} d="M24 8q8 3 16 0" />
          <circle cx="32" cy="40" r="1" fill="currentColor" />
          <circle cx="32" cy="47" r="1" fill="currentColor" />
          <path {...LINE} d="M22.5 46h6M35.5 46h6" />
          <path {...STITCH} d="m13 46 4.5.6M51 46l-4.5.6" />
        </g>
      )}
      {type === "robe" && (
        <g>
          <path {...LINE} d="M27 5v7M37 5v7" />
          <path
            {...LINE}
            d="M26 12q6 3.5 12 0l-.5 14 11 30q-16.5 3.5-33 0l11-30z"
          />
          <path {...LINE} d="M26.5 26q5.5 2 11 0" />
          <path {...STITCH} d="m29 28-1.5 8M35 28l1.5 8M32 15v10" />
          <path {...SOFT} d="m27 32-6 21M37 32l6 21M32 30v26" />
        </g>
      )}
      {type === "chemise" && (
        <g>
          <path
            {...LINE}
            d="M25 9 15 13l-4 33 5.5 1L19 25v31h26V25l2.5 22 5.5-1-4-33-10-4"
          />
          <path {...LINE} d="m25 9 3.5 7.5L32 13l3.5 3.5L39 9" />
          <path {...LINE} d="M25 9q7 2.5 14 0" />
          <path {...STITCH} d="M32 13v43" />
          {[21, 29, 37, 45].map((y) => (
            <circle key={y} cx="33.6" cy={y} r=".8" fill="currentColor" />
          ))}
          <path {...LINE} d="M36.5 24h6v6.5h-6z" />
          <path {...LINE} d="m11.6 41 5.4.8M52.4 41l-5.4.8" />
        </g>
      )}
      {type === "manteau" && (
        <g>
          <path
            {...LINE}
            d="M24 5 15 9l-4 39 5.5 1L19 23l-1 37h28l-1-37 2.5 26 5.5-1-4-39-9-4"
          />
          <path {...LINE} d="m24 5 4.5 15-3 2L34 30l6.5-10.5L37 18l3-13" />
          <path {...LINE} d="M24 5q8 3 16 0" />
          <path {...LINE} d="M18.6 35h26.8M30 33.5h4v3h-4z" />
          {[
            [27.5, 27],
            [36.5, 27],
            [27.5, 43],
            [36.5, 43],
          ].map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r=".9"
              fill="currentColor"
            />
          ))}
          <path {...STITCH} d="M32 38v22" />
        </g>
      )}
      {type === "autre" && (
        <g>
          <path {...LINE} d="M32 17v-2.5a3.2 3.2 0 1 1 3.2-3.2" />
          <path {...LINE} d="M32 17 10 30h44z" />
          <path {...STITCH} d="M18 30v6q14 6 28 0v-6" />
          <path {...LINE} d="m25 47 14-8" />
          <ellipse
            cx="38.4"
            cy="39.4"
            rx=".6"
            ry="1.7"
            transform="rotate(60 38.4 39.4)"
            {...LINE}
          />
          <path {...STITCH} d="M39.5 38.8q6-2 7 3t-6 6" />
        </g>
      )}
    </svg>
  );
}
