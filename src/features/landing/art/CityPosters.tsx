import { C } from "./palette";
import { useSvgId } from "./useSvgId";

/*
 * Triptyque Mali · Paris · Barcelone (cahier des charges, section 4).
 * Ces affiches tiennent la place des 4 visuels déjà produits par
 * Kadel Kouture, à intégrer dès qu'ils sont fournis.
 */

const TITLE = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  textAnchor: "middle" as const,
};

export function MaliPoster({ title }: { title: string }) {
  const id = useSvgId("mali");

  return (
    <svg viewBox="0 0 300 420" role="img" aria-label={title}>
      <defs>
        <pattern id={`${id}-x`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="m7 7 10 10m0-10L7 17" stroke={C.cream} strokeWidth="2.2" />
        </pattern>
        <pattern id={`${id}-z`} width="28" height="34" patternUnits="userSpaceOnUse">
          <path d="m0 26 14-18 14 18" fill="none" stroke={C.cream} strokeWidth="2.4" />
        </pattern>
        <pattern id={`${id}-d`} width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="m18 4 14 14-14 14L4 18Z" fill="none" stroke={C.cream} strokeWidth="2" />
          <path d="m18 12 6 6-6 6-6-6Z" fill={C.cream} />
        </pattern>
        <pattern id={`${id}-o`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="2.4" fill={C.cream} />
        </pattern>
      </defs>
      <rect width="300" height="420" fill={C.brown} />
      <text x="150" y="76" fontSize="60" letterSpacing="8" fill={C.mustard} {...TITLE}>
        MALI
      </text>
      <g>
        <rect x="24" y="104" width="252" height="48" fill={`url(#${id}-x)`} />
        <rect x="24" y="158" width="252" height="5" fill={C.cream} />
        <rect x="24" y="169" width="252" height="34" fill={`url(#${id}-z)`} />
        <rect x="24" y="209" width="252" height="5" fill={C.cream} />
        <rect x="24" y="220" width="252" height="72" fill={`url(#${id}-d)`} />
        <rect x="24" y="298" width="252" height="5" fill={C.cream} />
        <rect x="24" y="309" width="252" height="87" fill={`url(#${id}-o)`} />
      </g>
      <rect x="24" y="104" width="252" height="292" fill="none" stroke={C.mustard} strokeOpacity=".5" />
    </svg>
  );
}

export function ParisPoster({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 300 420" role="img" aria-label={title}>
      <rect width="300" height="420" fill={C.sky} />
      <rect y="250" width="300" height="122" fill={C.peach} />
      <circle cx="222" cy="214" r="38" fill={C.blush} />
      <g fill={C.cream} opacity=".85">
        <rect x="34" y="146" width="70" height="14" rx="7" />
        <rect x="58" y="134" width="40" height="14" rx="7" />
        <rect x="196" y="120" width="64" height="12" rx="6" />
      </g>
      <text x="150" y="76" fontSize="60" letterSpacing="8" fill={C.navy} {...TITLE}>
        PARIS
      </text>
      {/* tour Eiffel */}
      <g fill={C.navy}>
        <path d="M149 92h2v12h-2z" />
        <path d="M146 104h8l6 58h-20Z" />
        <path d="M134 162h32v9h-32z" />
        <path d="M138 171h24l14 82h-52Z" />
        <path d="M116 253h68v12h-68z" />
        <path d="M120 265h60l30 107h-32a28 50 0 0 0-56 0H90Z" />
      </g>
      <g stroke={C.sky} strokeWidth="1.2" opacity=".55">
        <path d="m141 175 19 74m-1-74-19 74M127 270l46 98m0-98-46 98" />
      </g>
      <rect y="372" width="300" height="48" fill={C.olive} />
      <g fill={C.green}>
        <circle cx="40" cy="366" r="16" />
        <circle cx="62" cy="370" r="12" />
        <circle cx="252" cy="366" r="16" />
        <circle cx="232" cy="371" r="11" />
      </g>
    </svg>
  );
}

export function BarcelonaPoster({ title }: { title: string }) {
  const spires = [
    { x: 78, top: 172, w: 9 },
    { x: 110, top: 118, w: 11 },
    { x: 136, top: 98, w: 11 },
    { x: 164, top: 98, w: 11 },
    { x: 190, top: 118, w: 11 },
    { x: 222, top: 172, w: 9 },
  ];

  return (
    <svg viewBox="0 0 300 420" role="img" aria-label={title}>
      <rect width="300" height="420" fill={C.mustard} />
      <circle cx="150" cy="226" r="70" fill={C.terracotta} opacity=".55" />
      <text x="150" y="70" fontSize="40" letterSpacing="5" fill={C.ink} {...TITLE}>
        BARCELONA
      </text>
      {/* Sagrada Família */}
      <g fill={C.terracotta}>
        {spires.map((spire) => (
          <path
            key={spire.x}
            d={`M${spire.x - spire.w} 310V${spire.top + 60}Q${spire.x - spire.w} ${spire.top + 18} ${spire.x} ${spire.top}Q${spire.x + spire.w} ${spire.top + 18} ${spire.x + spire.w} ${spire.top + 60}V310Z`}
          />
        ))}
      </g>
      <g fill={C.cream} opacity=".7">
        {spires.flatMap((spire) =>
          [0, 1, 2, 3].map((index) => (
            <rect key={`${spire.x}-${index}`} x={spire.x - 1.6} y={spire.top + 52 + index * 28} width="3.2" height="14" rx="1.6" />
          )),
        )}
      </g>
      <g fill={C.gold}>
        {spires.map((spire) => (
          <circle key={spire.x} cx={spire.x} cy={spire.top - 4} r="4" />
        ))}
      </g>
      <path d="M58 300h184v72H58z" fill={C.rust} />
      <g fill={C.ink} opacity=".55">
        <path d="M80 372v-30a14 14 0 0 1 28 0v30Z" />
        <path d="M136 372v-36a14 14 0 0 1 28 0v36Z" />
        <path d="M192 372v-30a14 14 0 0 1 28 0v30Z" />
      </g>
      <circle cx="150" cy="318" r="9" fill={C.mustard} />
      {/* palmier */}
      <path d="M262 372c2-36-2-64-12-86" fill="none" stroke={C.brown} strokeWidth="5" strokeLinecap="round" />
      <g fill={C.green}>
        <path d="M250 286c-18-10-36-6-46 6 16-2 32 0 46-6Z" />
        <path d="M250 286c10-16 30-20 44-12-16 2-30 6-44 12Z" />
        <path d="M250 286c-4-18 4-32 18-38-6 14-10 26-18 38Z" />
        <path d="M250 286c-14 4-24 16-26 30 10-12 18-20 26-30Z" />
      </g>
      <rect y="372" width="300" height="48" fill={C.blush} />
    </svg>
  );
}
