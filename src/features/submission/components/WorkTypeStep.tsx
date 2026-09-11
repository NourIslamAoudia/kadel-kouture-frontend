import type { GarmentType, WorkType } from "../types";
import {
  getGarmentPrice,
  getWorkPrice,
  formatPrice,
} from "../../../common/pricing";

interface WorkOption {
  value: WorkType;
  label: string;
  description: string;
}

const OPTIONS: WorkOption[] = [
  {
    value: "retouche",
    label: "Retouche",
    description: "Ourlets, ajustements, coutures",
  },
  {
    value: "reparation",
    label: "Réparation",
    description: "Trous, fermetures éclair, boutons",
  },
  {
    value: "personnalisation",
    label: "Personnalisation",
    description: "Broderies, impressions, logos",
  },
  {
    value: "upcycling",
    label: "Upcycling",
    description: "Transformation créative",
  },
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

  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <span className="h-px w-[18px] bg-gold" />
        {itemIndex !== undefined
          ? `Prestation · Pièce n° ${itemIndex + 1}`
          : "Prestation"}
      </p>

      <h2 className="mb-2 font-serif text-3xl font-light leading-tight text-ink">
        Quel type de <em className="italic text-gold">travail</em> ?
      </h2>

      <p className="mb-6 text-[13px] leading-relaxed text-ink-3">
        Sélectionnez la prestation souhaitée. Le tarif de la pièce est
        l'addition du produit ({formatPrice(garmentPrice)}) et du service.
      </p>

      <div className="flex flex-col gap-2.5">
        {OPTIONS.map((option) => {
          const selected = value === option.value;
          const workPrice = getWorkPrice(option.value);

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex items-center gap-3 rounded-2xl border-[1.5px] px-4 py-3 text-left transition ${
                selected
                  ? "border-gold bg-gold-pale shadow-sm"
                  : "border-gold/16 bg-white hover:border-gold hover:bg-gold-pale/40"
              }`}
            >
              <WorkIcon type={option.value} className="shrink-0 text-gold" />

              <span className="flex-1">
                <span className="block text-[13.5px] font-medium text-ink">
                  {option.label}
                </span>
                <span className="block text-[11px] text-ink-3">
                  {option.description}
                </span>
              </span>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-ink">
                  + {formatPrice(workPrice)}
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
        <div className="mt-4 rounded-xl border border-gold/25 bg-gold-pale/35 p-3 text-xs text-ink shadow-xs">
          <div className="flex items-center justify-between">
            <span>
              <strong className="capitalize">{garmentType ?? "Produit"}</strong>{" "}
              ({formatPrice(garmentPrice)}){" + "}
              <strong className="capitalize">{value}</strong> (
              {formatPrice(selectedWorkPrice)})
            </span>
            <span className="font-serif text-sm font-bold text-gold">
              Total pièce : {formatPrice(pieceTotal)}
            </span>
          </div>
        </div>
      )}

      {value && onItemCommentChange && (
        <div className="mt-4 rounded-xl border border-gold/20 bg-white p-3.5">
          <label className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-ink-3">
            Détail pour cette pièce (optionnel)
          </label>
          <input
            type="text"
            value={itemComment}
            onChange={(e) => onItemCommentChange(e.target.value)}
            placeholder="Ex : raccourcir de 4 cm, changer la fermeture..."
            className="w-full rounded-lg border border-gold/20 bg-bg px-3 py-2 text-xs text-ink outline-none transition focus:border-gold"
          />
        </div>
      )}
    </div>
  );
}

function WorkIcon({ type, className }: { type: WorkType; className?: string }) {
  const paths: Record<WorkType, React.ReactNode> = {
    retouche: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
      </>
    ),
    reparation: (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    ),
    personnalisation: (
      <>
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </>
    ),
    upcycling: (
      <>
        <path d="M4 12a8 8 0 0 1 14.93-4M20 12a8 8 0 0 1-14.93 4" />
        <path d="M18 4v4h-4M6 20v-4h4" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
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
