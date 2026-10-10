import { C } from "./palette";
import { useSvgId } from "./useSvgId";

/** Petite étoile à quatre branches. */
export function Sparkle({ x, y, size = 10, fill }: { x: number; y: number; size?: number; fill: string }) {
  const s = size;
  return (
    <path
      transform={`translate(${x} ${y})`}
      d={`M0 ${-s}C${s * 0.12} ${-s * 0.2} ${s * 0.2} ${-s * 0.12} ${s} 0C${s * 0.2} ${s * 0.12} ${s * 0.12} ${s * 0.2} 0 ${s}C${-s * 0.12} ${s * 0.2} ${-s * 0.2} ${s * 0.12} ${-s} 0C${-s * 0.2} ${-s * 0.12} ${-s * 0.12} ${-s * 0.2} 0 ${-s}Z`}
      fill={fill}
    />
  );
}

/** Machine à coudre vue de profil, posée sur y = 236. */
export function SewingMachine({ body, accent, shadow }: { body: string; accent: string; shadow: string }) {
  return (
    <g>
      <rect x="96" y="222" width="112" height="14" rx="3" fill={body} />
      <rect x="170" y="160" width="28" height="64" rx="7" fill={body} />
      <rect x="110" y="152" width="88" height="26" rx="11" fill={body} />
      <rect x="106" y="152" width="24" height="44" rx="7" fill={body} />
      <rect x="115" y="196" width="5" height="18" fill={body} />
      <rect x="110" y="212" width="16" height="4" rx="2" fill={accent} />
      <path d="M138 165h32" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <circle cx="204" cy="170" r="12" fill={accent} />
      <circle cx="204" cy="170" r="4" fill={shadow} />
      <rect x="150" y="138" width="9" height="14" fill={C.red} />
      <rect x="147" y="136" width="15" height="4" rx="2" fill={body} />
      <path d="M154 140c-14-10-30-4-34 12" stroke={C.red} fill="none" strokeWidth="1.5" />
      <rect x="104" y="217" width="60" height="5" fill={C.red} />
    </g>
  );
}

function StepChoose() {
  return (
    <>
      <rect width="300" height="300" fill={C.mustard} />
      <circle cx="236" cy="66" r="30" fill={C.terracotta} />
      <g transform="rotate(-12 150 165)">
        <path d="M104 78h92l34 40v136a6 6 0 0 1-6 6H76a6 6 0 0 1-6-6V118Z" fill={C.cream} />
        <path
          d="M108 88h84l28 33v129H80V121Z"
          fill="none"
          stroke={C.terracotta}
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        <circle cx="150" cy="110" r="9" fill={C.mustard} />
        <path d="M150 110c-4-38 18-70 58-90" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="98" y="150" width="104" height="9" rx="4.5" fill={C.ink} />
        <rect x="98" y="172" width="80" height="7" rx="3.5" fill={C.ink} opacity=".45" />
        <rect x="98" y="190" width="58" height="7" rx="3.5" fill={C.ink} opacity=".45" />
        <path d="m182 218 18 18m0-18-18 18" stroke={C.terracotta} strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </>
  );
}

function StepWorkshop() {
  return (
    <>
      <rect width="300" height="300" fill={C.sky} />
      <path d="M66 300V150a84 84 0 0 1 168 0v150Z" fill={C.cream} />
      <path d="M82 300V152a68 68 0 0 1 136 0v148Z" fill={C.navy} />
      <rect x="82" y="236" width="136" height="10" fill={C.ochre} />
      <rect x="92" y="246" width="8" height="54" fill={C.ochre} opacity=".7" />
      <rect x="200" y="246" width="8" height="54" fill={C.ochre} opacity=".7" />
      <SewingMachine body={C.cream} accent={C.ochre} shadow={C.navy} />
      <Sparkle x={42} y={64} size={9} fill={C.cream} />
      <Sparkle x={256} y={48} size={12} fill={C.cream} />
      <Sparkle x={268} y={96} size={7} fill={C.cream} />
    </>
  );
}

function StepScan() {
  return (
    <>
      <rect width="300" height="300" fill={C.peach} />
      <rect x="98" y="30" width="104" height="240" rx="20" fill={C.ink} />
      <rect x="106" y="46" width="88" height="208" rx="12" fill={C.cream} />
      <rect x="136" y="37" width="28" height="4" rx="2" fill={C.cream} opacity=".3" />
      <rect x="106" y="160" width="88" height="18" fill={C.red} opacity=".08" />
      <g fill={C.terracotta} stroke={C.terracotta} strokeLinecap="round">
        <circle cx="150" cy="84" r="10" stroke="none" />
        <rect x="138" y="98" width="24" height="52" rx="9" stroke="none" />
        <path d="m140 104-16 42m36-42 16 42" strokeWidth="7" fill="none" />
        <path d="m145 148-4 66m14-66 4 66" strokeWidth="9" fill="none" />
      </g>
      <g stroke={C.navy} strokeWidth="1.6" fill="none">
        <path d="M114 112h72M114 132h72M114 152h72" strokeDasharray="3 3" />
        <path d="M114 108v8m72-8v8M114 128v8m72-8v8M114 148v8m72-8v8" />
      </g>
      <rect x="106" y="177" width="88" height="2" fill={C.red} opacity=".7" />
      <path
        d="M114 62v-8h10m62 8v-8h-10M114 238v8h10m62-8v8h-10"
        stroke={C.ink}
        strokeWidth="2"
        fill="none"
      />
    </>
  );
}

function StepDropOff() {
  const doors: React.ReactElement[] = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      if (row === 2 && col === 1) continue;
      const x = 66 + col * 58;
      const y = 58 + row * 50;
      doors.push(
        <g key={`${row}-${col}`}>
          <rect x={x} y={y} width="52" height="44" rx="3" fill={C.sand} />
          <rect x={x + 40} y={y + 18} width="4" height="9" rx="2" fill={C.ink} opacity=".45" />
        </g>,
      );
    }
  }
  const qr = ["11101", "10011", "11110", "00101", "10111"];

  return (
    <>
      <rect width="300" height="300" fill={C.green} />
      <ellipse cx="150" cy="270" rx="110" ry="8" fill={C.ink} opacity=".25" />
      <rect x="56" y="48" width="188" height="214" rx="6" fill={C.cream} />
      {doors}
      {/* écran QR */}
      <g transform="translate(78 66)">
        <rect width="28" height="28" fill={C.cream} />
        {qr.flatMap((line, r) =>
          [...line].map((bit, c) =>
            bit === "1" ? (
              <rect key={`${r}${c}`} x={c * 5.6} y={r * 5.6} width="5.6" height="5.6" fill={C.ink} />
            ) : null,
          ),
        )}
      </g>
      {/* casier ouvert, colis à l'intérieur */}
      <rect x="124" y="158" width="52" height="44" fill={C.ink} />
      <rect x="132" y="170" width="36" height="28" fill={C.ochre} />
      <path d="M150 170v28M132 180h36" stroke={C.rust} strokeWidth="2" />
      <path d="M176 158v44l26 8v-60Z" fill={C.sand} stroke={C.ink} strokeOpacity=".2" />
      <rect x="190" y="176" width="4" height="9" rx="2" fill={C.ink} opacity=".45" />
      <Sparkle x={250} y={40} size={8} fill={C.mustard} />
    </>
  );
}

function StepPickUp({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={`${id}-dots`} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="1.6" fill={C.ink} opacity=".55" />
        </pattern>
        <clipPath id={`${id}-skirt`}>
          <path d="M131 142h38l42 116q-61 15-122 0Z" />
        </clipPath>
      </defs>
      <rect width="300" height="300" fill={C.terracotta} />
      <circle cx="150" cy="132" r="80" fill={C.mustard} />
      <path d="M150 76c0-8 8-10 8-17 0-6-9-8-12-2" stroke={C.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="m112 104 38-28 38 28" stroke={C.ink} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M131 98h38l6 42 36 118q-61 15-122 0l36-118Z" fill={C.cream} />
      <rect x="89" y="142" width="122" height="130" fill={`url(#${id}-dots)`} clipPath={`url(#${id}-skirt)`} />
      <path d="M125 136h50l1 7h-52Z" fill={C.red} />
      <Sparkle x={66} y={70} size={10} fill={C.cream} />
      <Sparkle x={236} y={214} size={12} fill={C.cream} />
      <Sparkle x={80} y={236} size={7} fill={C.cream} />
    </>
  );
}

const STEPS = [StepChoose, StepWorkshop, StepScan, StepDropOff];

/** Illustration carrée de l'étape 1 à 5 du parcours. */
export function StepArt({ step, title }: { step: number; title: string }) {
  const id = useSvgId("step");
  const Step = STEPS[step];

  return (
    <svg viewBox="0 0 300 300" role="img" aria-label={title}>
      {Step ? <Step /> : <StepPickUp id={id} />}
    </svg>
  );
}
