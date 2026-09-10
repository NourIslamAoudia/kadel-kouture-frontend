import type { GarmentType } from "../types";

interface GarmentOption {
  value: GarmentType;
  label: string;
}

const OPTIONS: GarmentOption[] = [
  { value: "pantalon", label: "Pantalon" },
  { value: "veste", label: "Veste" },
  { value: "robe", label: "Robe" },
  { value: "chemise", label: "Chemise" },
  { value: "manteau", label: "Manteau" },
  { value: "autre", label: "Autre" },
];

interface Props {
  value: GarmentType | null;
  otherValue: string;
  onChange: (value: GarmentType) => void;
  onOtherChange: (value: string) => void;
}

export default function GarmentTypeStep({
  value,
  otherValue,
  onChange,
  onOtherChange,
}: Props) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <span className="h-px w-[18px] bg-gold" />
        Nouvelle pièce
      </p>

      <h2 className="mb-6 font-serif text-3xl font-light leading-tight text-ink">
        Que souhaitez-vous transformer ?
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {OPTIONS.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex flex-col items-center gap-2 rounded-lg border px-3 py-4 text-center text-[13px] transition ${
                selected
                  ? "border-gold bg-gold-pale text-ink"
                  : "border-gold/20 bg-white text-ink-2 hover:border-gold hover:bg-gold-pale/40"
              }`}
            >
              <GarmentIcon type={option.value} className="text-gold" />
              {option.label}
            </button>
          );
        })}
      </div>

      {value === "autre" && (
        <div className="mt-4">
          <label className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-ink-3">
            Précisez le vêtement
          </label>
          <input
            type="text"
            value={otherValue}
            onChange={(e) => onOtherChange(e.target.value)}
            placeholder="Ex : combinaison, écharpe..."
            className="w-full rounded-full border-[1.5px] border-gold/20 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold focus:shadow-[0_0_0_3px_rgba(184,147,90,0.11)]"
          />
        </div>
      )}
    </div>
  );
}

function GarmentIcon({
  type,
  className,
}: {
  type: GarmentType;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {type === "pantalon" && (
        <>
          <path d="M7 4h10l1 7-2 9h-4l-1-7-1 7H6l1-9z" />
          <path d="M8 7h8M11 4v5M13 4v5" />
        </>
      )}
      {type === "veste" && (
        <>
          <path d="m9 4-4 3 2 6 2-1v8h6v-8l2 1 2-6-4-3-3 4z" />
          <path d="m9 4 3 4 3-4M12 8v12M10 12h1M13 12h1" />
        </>
      )}
      {type === "robe" && (
        <>
          <path d="M10 4h4l1 5 4 11H5l4-11z" />
          <path d="M10 4h4M9 9h6M12 9v11" />
        </>
      )}
      {type === "chemise" && (
        <>
          <path d="m9 4-5 3 2 6 3-2v9h6v-9l3 2 2-6-5-3-3 4z" />
          <path d="m9 4 3 4 3-4M12 8v12M12 11v.1M12 14v.1M12 17v.1" />
        </>
      )}
      {type === "manteau" && (
        <>
          <path d="m9 3-4 3 1 5 2-1v11h8V10l2 1 1-5-4-3-3 4z" />
          <path d="m9 3 3 4 3-4M12 7v14M8 13h8" />
        </>
      )}
      {type === "autre" && (
        <>
          <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
          <path d="m5.6 5.6 3.5 3.5M14.9 14.9l3.5 3.5M18.4 5.6l-3.5 3.5M9.1 14.9l-3.5 3.5" />
          <circle cx="12" cy="12" r="2.5" />
        </>
      )}
    </svg>
  );
}
