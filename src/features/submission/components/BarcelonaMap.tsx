import { useId } from "react";

/** Position approximative de chaque quartier sur le plan (viewBox 600 × 220). */
const ZONE_POSITIONS: Record<string, [number, number]> = {
  Sarrià: [118, 46],
  Gràcia: [270, 52],
  Sants: [150, 132],
  Eixample: [300, 110],
  Raval: [318, 158],
  Barceloneta: [404, 186],
  "Sant Martí": [470, 104],
  Poblenou: [520, 140],
};

const LINE = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * Plan stylisé de Barcelone au trait : grille de l'Eixample, Diagonal, littoral.
 * Les repères de quartier sont cliquables ; la liste de boutons reste la voie accessible.
 */
export function BarcelonaMap({
  zones,
  selected,
  onSelect,
}: {
  zones: string[];
  selected: string | null;
  onSelect: (zone: string) => void;
}) {
  const id = `bcn-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      viewBox="0 0 600 220"
      className="block h-auto w-full text-ink"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`${id}-grid`}
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <path {...LINE} d="M0 0h18v18" strokeWidth=".6" strokeOpacity=".22" />
        </pattern>
        <pattern
          id={`${id}-sea`}
          width="10"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path
            {...LINE}
            d="M0 3q2.5-2.5 5 0t5 0"
            strokeWidth=".6"
            strokeOpacity=".28"
          />
        </pattern>
      </defs>

      <rect width="600" height="220" fill="#f7f4ee" />
      {/* Mer Méditerranée */}
      <path d="M330 220 Q420 186 600 92 V220Z" fill={`url(#${id}-sea)`} />
      <path
        {...LINE}
        d="M330 220 Q420 186 600 92"
        strokeWidth="1"
        strokeOpacity=".55"
      />
      {/* Collines de Collserola */}
      <path
        {...LINE}
        d="M0 26 Q60 6 120 18 T240 10 T360 4"
        strokeWidth=".8"
        strokeOpacity=".3"
        strokeDasharray="2 3"
      />
      {/* Eixample : la grille de Cerdà */}
      <path
        d="M200 70 L330 40 L470 92 L340 182 L210 160Z"
        fill={`url(#${id}-grid)`}
      />
      {/* Grandes avenues : Diagonal, Gran Via, Meridiana */}
      <path
        {...LINE}
        d="M40 58 L560 132"
        strokeWidth="1.3"
        strokeOpacity=".55"
      />
      <path
        {...LINE}
        d="M120 168 L560 102"
        strokeWidth="1"
        strokeOpacity=".4"
      />
      <path
        {...LINE}
        d="M352 120 L500 20"
        strokeWidth=".8"
        strokeOpacity=".35"
      />
      {/* Montjuïc */}
      <path
        {...LINE}
        d="M228 196 q22-26 52-10"
        strokeWidth=".8"
        strokeOpacity=".35"
      />

      {zones.map((zone) => {
        const position = ZONE_POSITIONS[zone];
        if (!position) return null;
        const [x, y] = position;
        const active = zone === selected;
        return (
          <g
            key={zone}
            onClick={() => onSelect(zone)}
            className="cursor-pointer"
            transform={`translate(${x} ${y})`}
          >
            <circle r="14" fill="transparent" />
            {active ? (
              <>
                <circle
                  r="9"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity=".35"
                />
                <circle r="4.5" fill="currentColor" />
              </>
            ) : (
              <circle
                r="3.2"
                fill="#f7f4ee"
                stroke="currentColor"
                strokeWidth="1.1"
              />
            )}
            <text
              y={active ? -15 : -9}
              textAnchor="middle"
              fill="currentColor"
              fillOpacity={active ? 1 : 0.6}
              fontSize={active ? 13 : 10}
              style={{
                fontFamily: active ? "var(--font-serif)" : "var(--font-sans)",
                letterSpacing: active ? 0 : "0.08em",
              }}
            >
              {active ? zone : zone.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
