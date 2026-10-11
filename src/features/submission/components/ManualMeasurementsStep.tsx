import { MeasureIcon } from "./StepIcons";
import { em, useOrderT } from "../i18n";

interface ManualMeasurements {
  chest: string;
  waist: string;
  hips: string;
  height: string;
  shoulders: string;
  sleeve: string;
}

interface Props {
  values: ManualMeasurements;
  onChange: (field: keyof ManualMeasurements, value: string) => void;
}

const FIELDS: { key: keyof ManualMeasurements; placeholder: string }[] = [
  { key: "chest", placeholder: "96" },
  { key: "waist", placeholder: "80" },
  { key: "hips", placeholder: "100" },
  { key: "height", placeholder: "170" },
  { key: "shoulders", placeholder: "42" },
  { key: "sleeve", placeholder: "62" },
];

export default function ManualMeasurementsStep({ values, onChange }: Props) {
  const t = useOrderT();
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <span className="h-px w-[18px] bg-gold" />
        {t.measures.eyebrow}
      </p>

      <h2 className="mb-2 font-serif text-3xl font-light leading-tight text-ink">
        {em(t.measures.title)}
      </h2>

      <div className="mb-5 flex items-start gap-2.5 border border-ink/12 bg-gold-pale/60 px-4 py-3.5 text-[12.5px] leading-relaxed text-ink-2">
        <InfoIcon className="mt-px shrink-0 text-ink" />
        <span>{t.measures.info}</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {FIELDS.map((field) => (
          <label
            key={field.key}
            className="flex cursor-text flex-col items-center border border-ink/12 bg-white px-3 pt-4 pb-3 text-center transition duration-300 focus-within:border-ink hover:border-ink/45"
          >
            <MeasureIcon type={field.key} className="h-12 w-12 text-ink" />
            <span className="mt-2 text-[10px] uppercase tracking-[0.16em] text-ink-3">
              {t.measures.fields[field.key]}
            </span>
            <span className="mt-1 flex items-baseline justify-center gap-1">
              <input
                type="number"
                inputMode="decimal"
                value={values[field.key]}
                onChange={(e) => onChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-[3.2ch] bg-transparent text-center font-serif text-[24px] leading-none text-ink outline-none [appearance:textfield] placeholder:text-ink/25 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-[11px] text-ink-3">cm</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}
