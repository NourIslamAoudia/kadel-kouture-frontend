import { C } from "./palette";
import { SewingMachine } from "./StepArt";

/** Un atelier de Barcelone : fenêtre en arche, machine à coudre, bobines et mètre ruban. */
export function WorkshopArt({ title }: { title: string }) {
  const ticks = Array.from({ length: 14 }, (_, index) => index);

  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={title}>
      <rect width="400" height="500" fill={C.teal} />

      {/* fenêtre en arche, lumière de fin de journée */}
      <path d="M70 330V176a130 130 0 0 1 260 0v154Z" fill={C.cream} />
      <path d="M84 330V178a116 116 0 0 1 232 0v152Z" fill={C.sky} />
      <circle cx="146" cy="136" r="34" fill={C.mustard} />
      <path d="M84 250h40v80H84zm46 22h34v58h-34zm110-10h36v68h-36zm42 18h34v50h-34z" fill={C.blush} />
      <path d="M200 62v268M84 210h232" stroke={C.cream} strokeWidth="7" />
      <path d="M0 0h150l250 330H230Z" fill="#fff" opacity=".06" />

      {/* table */}
      <rect x="28" y="330" width="344" height="16" fill={C.oak} />
      <rect x="28" y="346" width="344" height="6" fill={C.ink} opacity=".2" />
      <rect x="52" y="352" width="12" height="148" fill={C.oak} />
      <rect x="336" y="352" width="12" height="148" fill={C.oak} />

      {/* machine, agrandie */}
      <g transform="translate(-20 -12) scale(1.45)">
        <SewingMachine body={C.cream} accent={C.ochre} shadow={C.teal} />
      </g>

      {/* bobines */}
      {[
        { x: 46, fill: C.mustard },
        { x: 72, fill: C.red },
        { x: 98, fill: C.sky },
      ].map((spool) => (
        <g key={spool.x}>
          <rect x={spool.x} y="300" width="18" height="30" fill={spool.fill} />
          <rect x={spool.x - 3} y="296" width="24" height="5" rx="2" fill={C.oak} />
          <rect x={spool.x - 3} y="327" width="24" height="5" rx="2" fill={C.oak} />
          <path d={`M${spool.x} 308h18M${spool.x} 316h18`} stroke={C.ink} strokeOpacity=".15" />
        </g>
      ))}

      {/* ciseaux */}
      <g transform="rotate(-18 330 318)" fill="none" stroke={C.ink} strokeWidth="4">
        <circle cx="306" cy="322" r="8" />
        <circle cx="306" cy="340" r="8" />
        <path d="m314 320 46-14M314 342l46-28" strokeLinecap="round" />
      </g>

      {/* mètre ruban qui tombe de la table */}
      <path d="M262 330h40c14 0 18 10 18 24v70c0 14 8 22 22 22" fill="none" stroke={C.mustard} strokeWidth="11" />
      <g stroke={C.ink} strokeWidth="1">
        {ticks.map((tick) => (
          <path key={tick} d={`M${266 + tick * 3} 325v${tick % 5 === 0 ? 6 : 3}`} />
        ))}
      </g>
    </svg>
  );
}
