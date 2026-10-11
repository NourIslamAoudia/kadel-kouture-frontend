import { BarcelonaMap } from "./BarcelonaMap";
import { LockerIcon } from "./StepIcons";
import { em, useOrderT } from "../i18n";

interface RelayPoint {
  name: string;
  address: string;
  hours: string;
}

const RELAYS: Record<string, RelayPoint[]> = {
  Eixample: [
    { name: "Colmado La Creu", address: "C/ Mallorca 123", hours: "L-V 8–21h" },
    {
      name: "Farmacia Pg. Gràcia",
      address: "Pg. Gràcia 88",
      hours: "L-S 9–22h",
    },
  ],
  Gràcia: [
    { name: "El Racó de Gràcia", address: "C/ Verdi 34", hours: "L-V 9–20h" },
    {
      name: "Librería Calders",
      address: "C/ Torrijos 12",
      hours: "L-S 10–21h",
    },
  ],
  "Sant Martí": [
    { name: "Bar Poblenou", address: "Rambla Poblenou 45", hours: "L-D 8–23h" },
  ],
  Barceloneta: [
    {
      name: "Estanco Barceloneta",
      address: "Pg. Joan de Borbó 22",
      hours: "L-S 9–20h",
    },
  ],
  Sants: [
    { name: "Copistería Sants", address: "C/ Sants 56", hours: "L-V 9–20h" },
  ],
  Sarrià: [
    {
      name: "Farmacia Sarrià",
      address: "Pg. Reina Elisenda 4",
      hours: "L-V 9–21h",
    },
  ],
  Poblenou: [
    { name: "Café Centric", address: "C/ Pallars 195", hours: "L-D 8–22h" },
  ],
  Raval: [
    { name: "MACBA Shop", address: "Pl. dels Àngels 1", hours: "L-D 10–21h" },
  ],
};

const ZONES = Object.keys(RELAYS);

interface Props {
  zone: string | null;
  dropOffPoint: string | null;
  onZoneChange: (zone: string) => void;
  onDropOffChange: (point: string) => void;
}

export default function ZoneDropoffStep({
  zone,
  dropOffPoint,
  onZoneChange,
  onDropOffChange,
}: Props) {
  const relays = zone ? (RELAYS[zone] ?? []) : [];
  const t = useOrderT();

  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <span className="h-px w-[18px] bg-gold" />
        {t.zone.eyebrow}
      </p>

      <h2 className="mb-2 font-serif text-3xl font-light leading-tight text-ink">
        {em(t.zone.title)}
      </h2>

      <p className="mb-6 text-[13px] leading-relaxed text-ink-3">
        {t.zone.subtitle}
      </p>

      {/* Plan de Barcelone (provisoire : le sélecteur de points relais Sendcloud le remplacera) */}
      <div className="mb-6 overflow-hidden border border-ink/12">
        <BarcelonaMap zones={ZONES} selected={zone} onSelect={onZoneChange} />
      </div>

      <p className="mb-2.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-ink-3">
        <span className="h-px w-3.5 bg-gold opacity-50" />
        {t.zone.pickZone}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {ZONES.map((z) => {
          const selected = zone === z;
          return (
            <button
              key={z}
              type="button"
              onClick={() => onZoneChange(z)}
              aria-pressed={selected}
              className={`border px-4 py-2 text-[13px] transition duration-300 ${
                selected
                  ? "border-ink bg-ink text-kk-ivory"
                  : "border-ink/12 bg-white text-ink-2 hover:border-ink/45"
              }`}
            >
              {z}
            </button>
          );
        })}
      </div>

      {zone && (
        <div>
          <p className="mb-2.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-ink-3">
            <span className="h-px w-3.5 bg-gold opacity-50" />
            {t.zone.dropOff}
          </p>

          <div className="flex flex-col gap-2.5">
            {relays.map((relay) => {
              const selected = dropOffPoint === relay.name;
              return (
                <button
                  key={relay.name}
                  type="button"
                  onClick={() => onDropOffChange(relay.name)}
                  aria-pressed={selected}
                  className={`flex items-center gap-4 border px-4 py-3.5 text-left transition duration-300 ${
                    selected
                      ? "border-ink bg-gold-pale"
                      : "border-ink/12 bg-white hover:border-ink/45"
                  }`}
                >
                  <LockerIcon className="h-10 w-10 shrink-0 text-ink" />

                  <span className="flex-1">
                    <span className="block font-serif text-[16px] leading-tight text-ink">
                      {relay.name}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] text-ink-3">
                      {relay.address} · {relay.hours}
                    </span>
                  </span>

                  <span
                    className={`h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-white ${
                      selected ? "flex" : "hidden"
                    }`}
                  >
                    <CheckIcon />
                  </span>
                </button>
              );
            })}
          </div>
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
