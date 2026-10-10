import type { CatalogueGarment } from "@/common/services";
import { C } from "./palette";
import { Shirt, ShirtPatterns } from "./Shirt";
import { useSvgId } from "./useSvgId";

/* Silhouettes dessinées sur un format 4:5 (300 × 375), centrées sur x = 150. */
const TROUSERS = "M94 46H206L220 330H164L150 134L136 330H80Z";
const TROUSERS_LONG = "M94 46H206L222 358H164L150 136L136 358H78Z";
const TROUSERS_HEMMED = "M94 46H206L219 314H165L150 134L135 314H81Z";
const DRESS = "M124 44Q150 60 176 44L182 96C216 134 232 214 240 328C180 342 120 342 60 328C68 214 84 134 118 96Z";
const DRESS_BOXY = "M118 44Q150 58 182 44L208 330Q150 346 92 330Z";
const DRESS_FITTED =
  "M122 44Q150 58 178 44Q186 98 166 128Q210 192 222 330Q150 346 78 330Q90 192 134 128Q114 98 122 44Z";
const JACKET = "M118 48H182L232 74L254 290L220 296L204 154L206 330H94L96 154L80 296L46 290L68 74Z";
const JACKET_BACK = "M114 50H186L234 76L256 290L222 296L206 154V330H94V154L78 296L44 290L66 76Z";

function TrouserHanger() {
  return (
    <g fill="none" stroke={C.gold} strokeLinecap="round">
      <path d="M150 40V30c0-8 9-9 9-16 0-6-8-8-11-3" strokeWidth="3.5" />
      <path d="M84 41H216" strokeWidth="4" />
    </g>
  );
}

function Trousers({ path, fill, shade }: { path: string; fill: string; shade: string }) {
  return (
    <g>
      <path d={path} fill={C.ink} opacity=".14" transform="translate(7 9)" />
      <path d={path} fill={fill} />
      <path d="M94 46H206V62H94Z" fill={shade} />
      <g fill={shade}>
        <rect x="104" y="44" width="6" height="22" />
        <rect x="147" y="44" width="6" height="22" />
        <rect x="190" y="44" width="6" height="22" />
      </g>
      <circle cx="150" cy="54" r="3.2" fill={C.gold} />
    </g>
  );
}

function JeanDetails({ hemY }: { hemY?: number }) {
  return (
    <g fill="none" stroke={C.ochre} strokeWidth="1.4" strokeDasharray="4 3">
      <path d="M100 66 86 326M200 66l14 260" />
      <path d="M150 64v56" />
      <path d="M100 64q16 6 20 30M200 64q-16 6-20 30" />
      <path d="M182 72h12v12h-12z" />
      {hemY ? <path d={`M83 ${hemY}H134M166 ${hemY}H217`} /> : null}
    </g>
  );
}

function Pantalon() {
  return (
    <>
      <rect width="300" height="375" fill={C.blush} />
      <TrouserHanger />
      <Trousers path={TROUSERS} fill={C.teal} shade="#234A52" />
      <g stroke={C.cream} strokeOpacity=".28" strokeWidth="2" fill="none">
        <path d="M122 70 116 326M178 70l6 256" />
        <path d="M100 64q14 6 18 30M200 64q-14 6-18 30" />
      </g>
    </>
  );
}

function Jean() {
  return (
    <>
      <rect width="300" height="375" fill={C.peach} />
      <TrouserHanger />
      <Trousers path={TROUSERS} fill={C.denim} shade={C.denimDark} />
      <JeanDetails />
      <circle cx="120" cy="94" r="2.4" fill={C.gold} />
      <circle cx="180" cy="94" r="2.4" fill={C.gold} />
    </>
  );
}

function Robe() {
  return (
    <>
      <rect width="300" height="375" fill={C.green} />
      <path d="M126 46 121 20M174 46l5-26" stroke={C.mustard} strokeWidth="5" strokeLinecap="round" />
      <path d={DRESS} fill={C.ink} opacity=".2" transform="translate(7 9)" />
      <path d={DRESS} fill={C.mustard} />
      <path d="M118 94q32 10 64 0l2 8q-34 10-68 0Z" fill={C.terracotta} />
      <g stroke={C.cream} strokeOpacity=".3" strokeWidth="2" fill="none">
        <path d="M136 112 116 324M164 112l20 212M150 114v214" />
      </g>
    </>
  );
}

function Veste() {
  return (
    <>
      <rect width="300" height="375" fill={C.sky} />
      <path d="M150 46V28c0-8 9-9 9-16 0-6-8-8-11-3M104 62l46-24 46 24" stroke={C.gold} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={JACKET} fill={C.ink} opacity=".16" transform="translate(7 9)" />
      <path d={JACKET} fill={C.camel} />
      <path d="M118 48 150 156 136 124 112 62Z" fill={C.camelDark} />
      <path d="M182 48 150 156 164 124 188 62Z" fill={C.camelDark} />
      <path d="m118 48 12-12h40l12 12-32 12Z" fill={C.camelDark} />
      <circle cx="150" cy="196" r="4" fill={C.ink} />
      <circle cx="150" cy="232" r="4" fill={C.ink} />
      <path d="M106 262h32M162 262h32" stroke={C.camelDark} strokeWidth="3" strokeLinecap="round" />
      <path d="m48 282 34 6m172-6-34 6" stroke={C.camelDark} strokeWidth="3" />
    </>
  );
}

function Autre({ id }: { id: string }) {
  return (
    <>
      <defs>
        <ShirtPatterns stripesId={`${id}-s`} pocketId={`${id}-p`} />
      </defs>
      <rect width="300" height="375" fill={C.mustard} />
      <g transform="translate(-50 -122)">
        <path d="M200 160c0-9 10-11 10-20 0-8-11-10-15-3" fill="none" stroke={C.ink} strokeWidth="4" strokeLinecap="round" />
        <path d="m140 202 60-40 60 40" fill="none" stroke={C.ink} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <Shirt stripesId={`${id}-s`} pocketId={`${id}-p`} />
      </g>
    </>
  );
}

/** Le vêtement choisi dans le catalogue, accroché comme une œuvre. */
export function GarmentArt({ kind, title }: { kind: CatalogueGarment; title: string }) {
  const id = useSvgId("garment");

  return (
    <svg viewBox="0 0 300 375" role="img" aria-label={title}>
      {kind === "pantalon" && <Pantalon />}
      {kind === "jean" && <Jean />}
      {kind === "robe" && <Robe />}
      {kind === "veste" && <Veste />}
      {kind === "autre" && <Autre id={id} />}
    </svg>
  );
}

/* ---------- Avant / après ---------- */

export type BeforeAfterKind = "ourlet" | "robe" | "veste";

function HemBefore() {
  const folds = [322, 340];
  return (
    <>
      <rect width="300" height="375" fill={C.sand} />
      <rect y="346" width="300" height="29" fill={C.ink} opacity=".07" />
      <TrouserHanger />
      <Trousers path={TROUSERS_LONG} fill={C.denim} shade={C.denimDark} />
      <JeanDetails />
      <g fill="none" stroke={C.denimDark} strokeWidth="2.2" strokeLinejoin="round">
        {folds.map((y) => (
          <g key={y}>
            <path d={`M82 ${y}l7 6 7-6 7 6 7-6 7 6 7-6 7 6`} />
            <path d={`M164 ${y}l7 6 7-6 7 6 7-6 7 6 7-6 7 6`} />
          </g>
        ))}
      </g>
    </>
  );
}

function HemAfter() {
  const ticks = Array.from({ length: 22 }, (_, index) => 44 + index * 10);
  return (
    <>
      <rect width="300" height="375" fill={C.sand} />
      <rect y="346" width="300" height="29" fill={C.ink} opacity=".07" />
      <TrouserHanger />
      <Trousers path={TROUSERS_HEMMED} fill={C.denim} shade={C.denimDark} />
      <JeanDetails hemY={304} />
      <rect x="36" y="352" width="228" height="11" fill={C.mustard} />
      <g stroke={C.ink} strokeWidth="1">
        {ticks.map((x, index) => (
          <path key={x} d={`M${x} 352v${index % 5 === 0 ? 6 : 3}`} />
        ))}
      </g>
    </>
  );
}

function DressBefore() {
  return (
    <>
      <rect width="300" height="375" fill={C.green} />
      <path d="M124 46 120 20M176 46l4-26" stroke={C.mustard} strokeWidth="5" strokeLinecap="round" />
      <path d={DRESS_BOXY} fill={C.ink} opacity=".2" transform="translate(7 9)" />
      <path d={DRESS_BOXY} fill={C.mustard} />
      <path d="M128 90 112 326M172 90l16 236" stroke={C.cream} strokeOpacity=".28" strokeWidth="2" />
    </>
  );
}

function DressAfter() {
  return (
    <>
      <rect width="300" height="375" fill={C.green} />
      <path d="M126 46 122 20M174 46l4-26" stroke={C.mustard} strokeWidth="5" strokeLinecap="round" />
      <path d={DRESS_FITTED} fill={C.ink} opacity=".2" transform="translate(7 9)" />
      <path d={DRESS_FITTED} fill={C.mustard} />
      <path d="M132 122q18 6 36 0l2 10q-20 7-40 0Z" fill={C.terracotta} />
      <g stroke={C.cream} strokeOpacity=".35" strokeWidth="2" fill="none">
        <path d="m140 134-6 40M160 134l6 40" strokeDasharray="4 3" />
        <path d="M138 150 108 326M162 150l30 176M150 140v188" />
      </g>
    </>
  );
}

function JacketBack({ embroidered }: { embroidered: boolean }) {
  const rays = Array.from({ length: 12 }, (_, index) => (index * Math.PI) / 6);
  const crosses = Array.from({ length: 8 }, (_, index) => 108 + index * 12);

  return (
    <>
      <rect width="300" height="375" fill={C.blush} />
      <path d={JACKET_BACK} fill={C.ink} opacity=".16" transform="translate(7 9)" />
      <path d={JACKET_BACK} fill={C.denim} />
      <path d="M114 50q36 10 72 0v8q-36 10-72 0Z" fill={C.denimDark} />
      <path d="M94 104h112" stroke={C.ochre} strokeWidth="1.4" strokeDasharray="4 3" />
      <path d="m44 282 34 6m178-6-34 6" stroke={C.denimDark} strokeWidth="3" />
      {embroidered ? (
        <g>
          {crosses.map((x) => (
            <path key={x} d={`m${x - 3} 81 6 6m0-6-6 6`} stroke={C.cream} strokeWidth="1.8" strokeLinecap="round" />
          ))}
          <g stroke={C.mustard} strokeWidth="3" strokeLinecap="round">
            {rays.map((angle) => (
              <path
                key={angle}
                d={`M${150 + Math.cos(angle) * 31} ${204 + Math.sin(angle) * 31}L${150 + Math.cos(angle) * 42} ${204 + Math.sin(angle) * 42}`}
              />
            ))}
          </g>
          <circle cx="150" cy="204" r="24" fill={C.mustard} />
          <circle cx="150" cy="204" r="12" fill={C.red} />
          <circle cx="150" cy="204" r="4" fill={C.cream} />
          <path d="M108 272q14-14 28 0t28 0 28 0" fill="none" stroke={C.cream} strokeWidth="2" />
        </g>
      ) : null}
    </>
  );
}

const BEFORE_AFTER = {
  ourlet: { before: HemBefore, after: HemAfter },
  robe: { before: DressBefore, after: DressAfter },
  veste: {
    before: () => <JacketBack embroidered={false} />,
    after: () => <JacketBack embroidered />,
  },
};

export function BeforeAfterArt({ kind, state }: { kind: BeforeAfterKind; state: "before" | "after" }) {
  const Art = BEFORE_AFTER[kind][state];
  return (
    <svg viewBox="0 0 300 375" aria-hidden="true">
      <Art />
    </svg>
  );
}

/* ---------- Personnalisation et upcycling ---------- */

export function EmbroideryArt({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 300 375" role="img" aria-label={title}>
      <JacketBack embroidered />
    </svg>
  );
}

export function UpcyclingArt({ title }: { title: string }) {
  const id = useSvgId("upcycling");
  const crosses = `${id}-x`;
  const dots = `${id}-d`;

  return (
    <svg viewBox="0 0 300 375" role="img" aria-label={title}>
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={JACKET} />
        </clipPath>
        <pattern id={crosses} width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill={C.blush} />
          <path d="m4 4 6 6m0-6-6 6" stroke={C.terracotta} strokeWidth="1.6" />
        </pattern>
        <pattern id={dots} width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill={C.cream} />
          <circle cx="5" cy="5" r="1.6" fill={C.ink} />
        </pattern>
      </defs>
      <rect width="300" height="375" fill={C.ochre} />
      <circle cx="236" cy="60" r="34" fill={C.mustard} />
      <path d="M150 46V28c0-8 9-9 9-16 0-6-8-8-11-3M104 62l46-24 46 24" stroke={C.ink} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={JACKET} fill={C.ink} opacity=".18" transform="translate(7 9)" />
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="40" y="30" width="110" height="90" fill={C.mustard} />
        <rect x="150" y="30" width="120" height="80" fill={C.red} />
        <rect x="40" y="120" width="80" height="110" fill={C.sky} />
        <rect x="120" y="110" width="90" height="90" fill={`url(#${dots})`} />
        <rect x="210" y="110" width="60" height="120" fill={C.green} />
        <rect x="40" y="230" width="110" height="110" fill={`url(#${crosses})`} />
        <rect x="120" y="200" width="150" height="140" fill={C.denim} />
        <path
          d="M40 120h230M150 30v80M120 110v120M210 110v120M40 230h80M120 200h150"
          stroke={C.cream}
          strokeWidth="1.6"
          strokeDasharray="5 4"
        />
      </g>
      <path d="M118 48 150 156 136 124 112 62Z" fill={C.ink} opacity=".22" />
      <path d="M182 48 150 156 164 124 188 62Z" fill={C.ink} opacity=".22" />
      <circle cx="150" cy="196" r="4" fill={C.cream} />
      <circle cx="150" cy="232" r="4" fill={C.cream} />
    </svg>
  );
}
