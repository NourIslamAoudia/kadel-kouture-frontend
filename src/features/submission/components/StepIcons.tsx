import type { WorkType } from "../types";

/*
 * Icônes du formulaire de commande : dessins au trait fin, coutures en pointillés,
 * dans le même style que les dessins techniques des vêtements et de la landing.
 */

const LINE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.15,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const STITCH = { ...LINE, strokeDasharray: "1.6 1.9", strokeOpacity: 0.75 };
const SOFT = { ...LINE, strokeOpacity: 0.4 };
const MARK = { ...LINE, strokeWidth: 1.7 };

/* ---------- Prestations ---------- */

export function WorkIcon({
  type,
  className,
}: {
  type: WorkType;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {type === "retouche" && (
        <g>
          {/* Ciseaux de tailleur et ligne de coupe */}
          <circle {...LINE} cx="11" cy="13" r="4.5" />
          <circle {...LINE} cx="11" cy="35" r="4.5" />
          <path {...LINE} d="m14.6 15.7 22.4 15M14.6 32.3 37 17.3" />
          <circle cx="24.6" cy="24" r=".9" fill="currentColor" />
          <path {...STITCH} d="M30 24h14" />
        </g>
      )}
      {type === "reparation" && (
        <g>
          {/* Pièce cousue sur un tissu, aiguille et fil */}
          <path {...SOFT} d="M6 10h30v28H6z" />
          <path {...LINE} d="M12 17h16v14H12z" />
          <path {...STITCH} d="M14.5 19.5h11v9h-11z" />
          <path {...LINE} d="m30 33 12-12" />
          <ellipse
            {...LINE}
            cx="41"
            cy="22"
            rx=".7"
            ry="2"
            transform="rotate(45 41 22)"
          />
          <path {...STITCH} d="M41.5 21.5q4.5 5-3 11.5" />
        </g>
      )}
      {type === "personnalisation" && (
        <g>
          {/* Tambour à broder et motif losange */}
          <circle {...LINE} cx="22" cy="24" r="15" />
          <circle {...SOFT} cx="22" cy="24" r="12.5" />
          <path {...LINE} d="M35.5 17.5 39 15.5" />
          <path {...LINE} d="m22 16 8 8-8 8-8-8z" />
          <path {...STITCH} d="m22 20.5 3.5 3.5-3.5 3.5-3.5-3.5z" />
          <circle cx="22" cy="24" r=".9" fill="currentColor" />
          <path {...LINE} d="m35 34 8 8" />
        </g>
      )}
      {type === "upcycling" && (
        <g>
          {/* Patchwork : morceaux assemblés et cercle de réemploi */}
          <path {...LINE} d="M14 14h20v20H14z" />
          <path {...STITCH} d="M24 14v20M14 24h20" />
          <path {...SOFT} d="m14 14 10 10M24 24l10 10" />
          <path
            {...LINE}
            d="M8 22a16 16 0 0 1 27-11.5M40 26a16 16 0 0 1-27 11.5"
          />
          <path {...LINE} d="M35.5 6v5h-5M12.5 42v-5h5" />
        </g>
      )}
    </svg>
  );
}

/* ---------- Méthode de mesure ---------- */

export function MethodIcon({
  type,
  className,
}: {
  type: "manual" | "photo";
  className?: string;
}) {
  const ticks = Array.from({ length: 9 }, (_, index) => index);
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {type === "manual" ? (
        <g>
          {/* Mètre ruban déroulé */}
          <circle {...LINE} cx="14" cy="30" r="9" />
          <circle {...SOFT} cx="14" cy="30" r="3" />
          <path {...LINE} d="M14 21h29v7H23" />
          {ticks.map((tick) => (
            <path
              key={tick}
              {...LINE}
              strokeWidth={0.9}
              d={`M${17 + tick * 3} 21v${tick % 2 ? 2 : 3.5}`}
            />
          ))}
        </g>
      ) : (
        <g>
          {/* Téléphone qui cadre une silhouette */}
          <rect {...LINE} x="13" y="4" width="22" height="40" rx="3" />
          <path {...SOFT} d="M21 7.5h6" />
          <circle {...LINE} cx="24" cy="14" r="2.4" />
          <path
            {...LINE}
            d="M24 16.5v10m-4.5-7.5L24 17l4.5 2M21 35l3-8.5 3 8.5"
          />
          <path {...STITCH} d="M17 23h14" />
          <path {...LINE} d="M16 10v-2h3M32 10V8h-3M16 37v2h3M32 37v2h-3" />
        </g>
      )}
    </svg>
  );
}

/* ---------- Mensurations : buste de couturière et ligne de mesure ---------- */

export type MeasureKey =
  "chest" | "waist" | "hips" | "height" | "shoulders" | "sleeve";

const DRESS_FORM =
  "M20.5 8.5Q13 10 12.5 15.5q-.5 5 2.5 8.5-2.5 4-1.5 9 1 4.5 4.5 5.5h12q3.5-1 4.5-5.5 1-5-1.5-9 3-3.5 2.5-8.5Q35 10 27.5 8.5";

function Measure({ d, ticks }: { d: string; ticks: string }) {
  return (
    <>
      <path {...MARK} d={d} />
      <path {...MARK} strokeWidth={1.2} d={ticks} />
    </>
  );
}

export function MeasureIcon({
  type,
  className,
}: {
  type: MeasureKey;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g strokeOpacity={0.5}>
        <path {...LINE} d={DRESS_FORM} />
        <path {...LINE} d="M20.5 8.5V6h7v2.5M24 38.5V44M19 45.5h10" />
        {type === "sleeve" && (
          <path {...LINE} d="M34.5 13q5 6 6.5 19l-2.5.5q-2-10-5.5-14" />
        )}
      </g>
      {type === "chest" && (
        <Measure d="M13 17h22" ticks="M13 15.5v3M35 15.5v3" />
      )}
      {type === "waist" && (
        <Measure d="M15 24h18" ticks="M15 22.5v3M33 22.5v3" />
      )}
      {type === "hips" && (
        <Measure d="M13.5 32h21" ticks="M13.5 30.5v3M34.5 30.5v3" />
      )}
      {type === "shoulders" && (
        <Measure d="M14 11.5q10-3 20 0" ticks="M14 10v3M34 10v3" />
      )}
      {type === "height" && (
        <Measure d="M42 6v39" ticks="M40.5 6h3M40.5 45h3" />
      )}
      {type === "sleeve" && (
        <Measure
          d="M37 12.5q4.5 7 6 19"
          ticks="M35.6 13.3l2.8-1.6M41.6 32l2.9-.8"
        />
      )}
    </svg>
  );
}

/* ---------- Point de dépôt : casier ---------- */

export function LockerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path {...LINE} d="M8 8h32v34H8z" />
      <path {...LINE} d="M8 19h32M8 30h32M24 8v34" />
      <path {...STITCH} d="M12 13h8M12 24h8M28 35h8" />
      <circle cx="21" cy="35" r=".9" fill="currentColor" />
      <path {...LINE} d="M28 12.5h8v3h-8z" />
    </svg>
  );
}

/* ---------- Point de dépôt : boutique relais ---------- */

export function ShopIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path {...LINE} d="M10 20v22h28V20" />
      <path
        {...LINE}
        d="M7 13 10 6h28l3 7v2.5a4.25 4.25 0 0 1-8.5 0 4.25 4.25 0 0 1-8.5 0 4.25 4.25 0 0 1-8.5 0 4.25 4.25 0 0 1-8.5 0Z"
      />
      <path {...STITCH} d="M7 13h34" />
      <path {...LINE} d="M15 42V29h8v13" />
      <path {...SOFT} d="M27 28h7v7h-7z" />
    </svg>
  );
}
