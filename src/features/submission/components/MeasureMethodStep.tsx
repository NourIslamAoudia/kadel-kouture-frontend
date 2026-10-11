import { MethodIcon } from "./StepIcons";
import { em, useOrderT } from "../i18n";

export type MeasureMethod = "manual" | "photo";

const OPTIONS: MeasureMethod[] = ["manual", "photo"];

interface Props {
  value: MeasureMethod | null;
  onChange: (value: MeasureMethod) => void;
}

export default function MeasureMethodStep({ value, onChange }: Props) {
  const t = useOrderT();
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <span className="h-px w-[18px] bg-gold" />
        {t.method.eyebrow}
      </p>

      <h2 className="mb-2 font-serif text-3xl font-light leading-tight text-ink">
        {em(t.method.title)}
      </h2>

      <p className="mb-6 text-[13px] leading-relaxed text-ink-3">
        {t.method.subtitle}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={selected}
              className={`group flex flex-col items-center border px-4 pt-7 pb-6 text-center transition duration-300 ${
                selected
                  ? "border-ink bg-gold-pale"
                  : "border-ink/12 bg-white hover:border-ink/45"
              }`}
            >
              <MethodIcon
                type={option}
                className="mb-4 h-14 w-14 text-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-0.5"
              />
              <span className="font-serif text-[18px] leading-none text-ink">
                {t.method[option].label}
              </span>
              <span className="mt-2 text-[12px] text-ink-3">
                {t.method[option].description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
