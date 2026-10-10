import { C } from "./palette";
import { Shirt, ShirtPatterns } from "./Shirt";
import { useSvgId } from "./useSvgId";

/**
 * « N° 001 — La chemise préférée ».
 * Une chemise rayée suspendue dans une arche en terre cuite. Un bouton
 * manque ; l'aiguille et son fil s'apprêtent à le recoudre.
 */
export function HeroArt({ title }: { title: string }) {
  const id = useSvgId("hero");

  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={title}>
      <defs>
        <ShirtPatterns stripesId={`${id}-s`} pocketId={`${id}-p`} />
      </defs>

      {/* mur */}
      <rect width="400" height="500" fill={C.blush} />
      <rect width="52" height="500" fill={C.green} />
      <rect x="52" width="20" height="500" fill={C.cream} />
      <rect x="356" width="44" height="500" fill={C.cream} />
      <circle cx="318" cy="88" r="36" fill={C.mustard} />

      {/* arche */}
      <path d="M96 500V198a104 104 0 0 1 208 0v302Z" fill={C.terracotta} />
      <path d="M96 470h208v30H96z" fill={C.rust} opacity=".35" />

      {/* rai de lumière */}
      <path d="M0 0h130l230 500H210Z" fill="#fff" opacity=".07" />

      {/* cintre */}
      <path
        d="M200 160c0-9 10-11 10-20 0-8-11-10-15-3"
        fill="none"
        stroke={C.gold}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="m140 202 60-40 60 40"
        fill="none"
        stroke={C.gold}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Shirt stripesId={`${id}-s`} pocketId={`${id}-p`} missingButton />

      {/* aiguille et fil, jusqu'au bouton manquant */}
      <path
        d="M269 301c22-16 40 10 24 34s-58 22-72 4c-8-10-12-12-21-15"
        fill="none"
        stroke={C.mustard}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="m226 350 46-52" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="268.5" cy="302" rx="1.1" ry="3" fill={C.cream} transform="rotate(41.5 268.5 302)" />
      <path d="m196 320 8 8m0-8-8 8" stroke={C.ink} strokeWidth="1.2" opacity=".55" />

      {/* plante */}
      <g fill={C.leaf}>
        <path d="M52 456c-6-50 4-92 26-118 8 40-4 84-26 118Z" />
        <path d="M52 456c-24-24-30-58-14-84 14 22 18 54 14 84Z" fill={C.green} />
        <path d="M52 456c-30-6-50-26-54-52 26 4 46 22 54 52Z" />
        <path d="M52 456c18-30 44-44 70-42-10 24-36 40-70 42Z" fill={C.green} />
        <path d="M52 456c-2-36 10-66 34-80 2 30-12 58-34 80Z" />
      </g>
      <path d="M26 456h52l-6 44H32Z" fill={C.ochre} />
      <path d="M26 456h52v6H26z" fill={C.rust} opacity=".25" />

      {/* vase et graminées */}
      <g stroke={C.ochre} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M355 418 338 332" />
        <path d="M355 418 362 318" />
        <path d="M355 418 380 340" />
      </g>
      <g fill={C.sand}>
        <ellipse cx="337" cy="326" rx="5" ry="15" transform="rotate(-12 337 326)" />
        <ellipse cx="362" cy="312" rx="5" ry="15" transform="rotate(4 362 312)" />
        <ellipse cx="381" cy="334" rx="5" ry="14" transform="rotate(20 381 334)" />
      </g>
      <path d="M334 500c-12-30-8-60 10-72v-12h22v12c18 12 22 42 10 72Z" fill={C.navy} />
      <path d="M344 428h22" stroke={C.cream} strokeOpacity=".3" strokeWidth="2" />
    </svg>
  );
}
