import { C } from "./palette";

/** Silhouette de la chemise rayée (centrée sur x = 200, du col y = 176 à l'ourlet y = 442). */
export const SHIRT_PATH =
  "M183 176 142 196 108 312l26 10 18-64v166q48 18 96 0V258l18 64 26-10-34-116-41-20q-17 14-34 0Z";

interface ShirtProps {
  /** id du motif de rayures défini par l'illustration parente */
  stripesId: string;
  pocketId: string;
  /** Un bouton manque : l'histoire de la réparation. */
  missingButton?: boolean;
}

export function Shirt({ stripesId, pocketId, missingButton = false }: ShirtProps) {
  const buttons = [228, 260, 292, 324, 356, 388];

  return (
    <g>
      <path d={SHIRT_PATH} fill={C.ink} opacity=".16" transform="translate(8 10)" />
      <path d={SHIRT_PATH} fill={`url(#${stripesId})`} />
      {/* poche */}
      <path d="M164 232h26v26h-26z" fill={`url(#${pocketId})`} />
      <path d="M164 232h26" stroke={C.cream} strokeWidth="2" />
      {/* poignets */}
      <path d="m108 312 26 10-4 12-26-11Z" fill={C.cream} />
      <path d="m292 312-26 10 4 12 26-11Z" fill={C.cream} />
      {/* patte de boutonnage */}
      <path d="M196 204h8v226h-8z" fill={C.cream} />
      {buttons.map((y) =>
        missingButton && y === 324 ? null : (
          <circle key={y} cx="200" cy={y} r="3.4" fill={C.ink} />
        ),
      )}
      {/* col */}
      <path d="m183 176 17 28-12 9-18-25Z" fill={C.cream} stroke={C.red} strokeOpacity=".35" />
      <path d="m217 176-17 28 12 9 18-25Z" fill={C.cream} stroke={C.red} strokeOpacity=".35" />
    </g>
  );
}

export function ShirtPatterns({ stripesId, pocketId }: { stripesId: string; pocketId: string }) {
  return (
    <>
      <pattern id={stripesId} width="16" height="10" patternUnits="userSpaceOnUse">
        <rect width="8" height="10" fill={C.red} />
        <rect x="8" width="8" height="10" fill={C.cream} />
      </pattern>
      <pattern id={pocketId} width="10" height="12" patternUnits="userSpaceOnUse">
        <rect width="10" height="6" fill={C.red} />
        <rect y="6" width="10" height="6" fill={C.cream} />
      </pattern>
    </>
  );
}
