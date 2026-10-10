import { useId } from "react";

/*
 * Illustrations au trait, monochromes (couleur du texte).
 * Style « dessin technique de mode » : contours fins, coutures en pointillés.
 */

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ---------- Les cinq étapes ---------- */

const STEP_PATHS = [
  // 1. Étiquette de prestation
  <g key="tag">
    <path d="M17 9h14l6 7v23H11V16z" />
    <circle cx="24" cy="15.5" r="1.6" />
    <path d="M24 13.9c0-4 3-7.4 8-8.4" />
    <path d="M16 24h16M16 29h11" />
    <path d="m29 33 3 3m0-3-3 3" />
  </g>,
  // 2. Machine à coudre
  <g key="machine">
    <path d="M8 38h32" />
    <path d="M11 34h26v4H11z" />
    <path d="M14 14h18a4 4 0 0 1 4 4v16" />
    <path d="M14 14v13h4V20h12v14" />
    <path d="M16 27v5" />
    <path d="M24 14v-4m-2 0h4" />
  </g>,
  // 3. Mensurations : téléphone et silhouette
  <g key="scan">
    <rect x="15" y="6" width="18" height="36" rx="3" />
    <circle cx="24" cy="14" r="2.4" />
    <path d="M24 17v10m-4.5-7.5L24 18l4.5 1.5M21 36l3-9 3 9" />
    <path d="M18.5 23h11" strokeDasharray="1.5 2" />
  </g>,
  // 4. Colis en point relais
  <g key="parcel">
    <path d="m10 18 14-7 14 7v16l-14 7-14-7z" />
    <path d="m10 18 14 7 14-7M24 25v16" />
    <path d="m17 14.5 14 7" />
    <path d="M27 33h5v5h-5z" />
  </g>,
  // 5. Vêtement de retour, sur cintre
  <g key="hanger">
    <path d="M24 13v-1.5a2.5 2.5 0 1 1 2.5-2.5" />
    <path d="M24 13 8 21h32z" />
    <path d="m18 21-3 18h18l-3-18" />
    <path d="M17 29h14" strokeDasharray="1.5 2" />
  </g>,
];

export function StepIcon({
  step,
  className,
}: {
  step: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      {STEP_PATHS[step]}
    </svg>
  );
}

/* ---------- Les engagements ---------- */

const GUARANTEE_PATHS = [
  // Retouche reprise : aiguille et flèche circulaire
  <g key="rework">
    <path d="M35 15.5A13 13 0 1 0 37 26" />
    <path d="M36 9v7h-7" />
    <path d="m18 31 11-11" />
    <ellipse cx="28" cy="21" rx=".9" ry="2.2" transform="rotate(45 28 21)" />
  </g>,
  // Vêtement protégé : bouclier
  <g key="shield">
    <path d="m24 7 13 5v10c0 9.5-5.6 15.4-13 18.5C16.6 37.4 11 31.5 11 22V12z" />
    <path d="m18.5 23.5 4 4 7.5-8" />
  </g>,
  // Annulation gratuite : reçu et pourcentage
  <g key="receipt">
    <path d="M14 7h20v34l-3.3-2.2-3.4 2.2-3.3-2.2-3.4 2.2-3.3-2.2L14 41z" />
    <path d="m20 29 8-11" />
    <circle cx="20" cy="19" r="1.8" />
    <circle cx="28" cy="28" r="1.8" />
  </g>,
];

export function GuaranteeIcon({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      {GUARANTEE_PATHS[index]}
    </svg>
  );
}

/* ---------- Avant / après : dessins techniques ---------- */

export type FlatKind = "jeans" | "dress" | "jacket";

const GARMENT = { ...STROKE, fill: "var(--kk-white)" };
const STITCH = { ...STROKE, strokeDasharray: "2 2.5" };

function JeansFlat({ hemmed }: { hemmed: boolean }) {
  const legs = hemmed
    ? "M50 22H110L116 166H86L80 72L74 166H44Z"
    : "M50 22H110L119 188H86L80 72L74 188H41Z";
  return (
    <>
      <path d="M18 192H142" {...STROKE} strokeOpacity=".35" />
      <path d={legs} {...GARMENT} />
      <path d="M50 32H110" {...STROKE} />
      <path d="M80 32v34" {...STITCH} />
      <path d="M54 32q14 4 17 20M106 32q-14 4-17 20" {...STITCH} />
      {hemmed ? (
        <path d="M45 160H74M86 160h29" {...STITCH} />
      ) : (
        <path
          d="m43 176 5 4 5-4 5 4 5-4 5 4 5-4M88 176l5 4 5-4 5 4 5-4 5 4 5-4"
          {...STROKE}
        />
      )}
    </>
  );
}

function DressFlat({ fitted }: { fitted: boolean }) {
  const body = fitted
    ? "M65 24Q80 32 95 24Q100 52 90 68Q114 112 120 182Q80 190 40 182Q46 112 70 68Q60 52 65 24Z"
    : "M62 24Q80 32 98 24L113 182Q80 190 47 182Z";
  return (
    <>
      <path
        d={fitted ? "M66 25 63 10M94 25l3-15" : "M64 25 61 10M96 25l3-15"}
        {...STROKE}
      />
      <path d={body} {...GARMENT} />
      {fitted ? (
        <>
          <path d="M70 68Q80 72 90 68" {...STROKE} />
          <path d="m73 72-3 22m17-22 3 22" {...STITCH} />
        </>
      ) : (
        <path d="M70 60 63 176m27-116 7 116" {...STROKE} strokeOpacity=".3" />
      )}
    </>
  );
}

function JacketFlat({ embroidered }: { embroidered: boolean }) {
  return (
    <>
      <path
        d="M58 24H102L126 38L136 152L118 155L110 82V182H50V82L42 155L24 152L34 38Z"
        {...GARMENT}
      />
      <path d="M58 24q22 8 44 0" {...STROKE} />
      <path d="M50 56h60" {...STITCH} />
      <path d="m36 146 18 2m70-2-18 2" {...STROKE} />
      {embroidered ? (
        <g {...STROKE}>
          {/* motif inspiré du bogolan : losanges, croix et ligne brisée */}
          <path d="m80 92 18 18-18 18-18-18z" />
          <path d="m80 101 9 9-9 9-9-9z" />
          <circle cx="80" cy="110" r="1.4" fill="currentColor" stroke="none" />
          <path d="m60 142 6 6 6-6 6 6 6-6 6 6 6-6 6 6" />
          {[62, 72, 82, 92].map((x) => (
            <path key={x} d={`m${x} 66 4 4m0-4-4 4`} />
          ))}
        </g>
      ) : null}
    </>
  );
}

export function Flat({
  kind,
  state,
  className,
}: {
  kind: FlatKind;
  state: "before" | "after";
  className?: string;
}) {
  const after = state === "after";
  return (
    <svg viewBox="0 0 160 200" className={className} aria-hidden="true">
      {kind === "jeans" && <JeansFlat hemmed={after} />}
      {kind === "dress" && <DressFlat fitted={after} />}
      {kind === "jacket" && <JacketFlat embroidered={after} />}
    </svg>
  );
}

/* ---------- Nature morte d'atelier ---------- */

export function AtelierStillLife({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const ticks = Array.from({ length: 16 }, (_, index) => index);
  return (
    <svg
      viewBox="0 0 320 220"
      className={className}
      role="img"
      aria-label={title}
      {...STROKE}
    >
      {/* plateau */}
      <path d="M12 196h296" strokeOpacity=".4" />
      {/* bobine */}
      <path d="M52 112h40v6H52zM52 190h40v6H52z" />
      <path d="M58 118h28v72H58z" />
      <path d="M58 132h28M58 146h28M58 160h28M58 174h28" strokeOpacity=".45" />
      <path d="M86 128c26-6 40 10 58 2" />
      {/* ciseaux */}
      <circle cx="150" cy="176" r="12" />
      <circle cx="178" cy="182" r="12" />
      <path d="m160 168 92-56M170 172l96-40" />
      <circle cx="166" cy="168" r="1.6" fill="currentColor" stroke="none" />
      {/* mètre ruban */}
      <path d="M210 196c0-26 18-38 46-38h40" />
      <path d="M210 186c0-20 14-28 36-28" strokeOpacity=".45" />
      {ticks.map((tick) => (
        <path
          key={tick}
          d={`M${252 + tick * 3} 158v${tick % 5 === 0 ? 6 : 3}`}
          strokeWidth="1"
        />
      ))}
      {/* aiguille et fil */}
      <path d="m118 62 54-30" />
      <ellipse cx="168" cy="34" rx="1" ry="3" transform="rotate(61 168 34)" />
      <path d="M169 33c18-10 36 4 30 22s-34 18-40 6" strokeDasharray="2 3" />
    </svg>
  );
}

/* ---------- Frise bogolan ---------- */

/** Croix, points, traits et losanges : la grammaire du bogolan, au trait fin. */
export function BogolanBand({ className }: { className?: string }) {
  const id = `bogolan-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg className={className} width="100%" height="14" aria-hidden="true">
      <defs>
        <pattern id={id} width="72" height="14" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="m3 3 8 8m0-8-8 8" />
            <path d="M20 7h10" />
            <path d="m42 2 5 5-5 5-5-5z" />
            <path d="M56 7h10" />
          </g>
          <circle cx="34.5" cy="7" r="1.2" fill="currentColor" />
          <circle cx="69.5" cy="7" r="1.2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="14" fill={`url(#${id})`} />
    </svg>
  );
}
