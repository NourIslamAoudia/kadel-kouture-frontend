import { C } from "./palette";
import { useSvgId } from "./useSvgId";

/** Sceau de garantie : le texte tourne lentement autour de l'aiguille. */
export function Seal({ text, center }: { text: string; center: string }) {
  const id = useSvgId("seal");

  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path id={id} d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0" />
      </defs>
      <circle cx="100" cy="100" r="98" fill={C.terracotta} />
      <circle cx="100" cy="100" r="88" fill="none" stroke={C.cream} strokeOpacity=".35" strokeDasharray="3 4" />
      <g className="kk-spin">
        {/* textLength = circonférence (2π × 74) : le texte fait exactement le tour */}
        <text fill={C.cream} fontSize="11.5" fontWeight="600" style={{ fontFamily: "var(--font-body)" }}>
          <textPath href={`#${id}`} textLength="462" lengthAdjust="spacing">
            {text.toUpperCase()}
          </textPath>
        </text>
      </g>
      <circle cx="100" cy="100" r="50" fill={C.cream} />
      <text
        x="100"
        y="106"
        textAnchor="middle"
        fontSize="24"
        fontStyle="italic"
        fill={C.ink}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {center}
      </text>
      <path d="M80 120h40" stroke={C.terracotta} strokeWidth="1.4" strokeDasharray="4 3" />
    </svg>
  );
}

/** Frise bogolan discrète : traits, points et petites croix (section 4). */
export function BogolanRule({ className }: { className?: string }) {
  const id = useSvgId("bogolan");

  return (
    <svg className={className} height="18" width="100%" aria-hidden="true">
      <defs>
        <pattern id={id} width="56" height="18" patternUnits="userSpaceOnUse">
          <path d="m4 5 8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="22" cy="9" r="1.6" fill="currentColor" />
          <path d="M30 9h12" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="50" cy="9" r="1.6" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="18" fill={`url(#${id})`} />
    </svg>
  );
}

/* Icônes au trait pour les engagements de la garantie. */

export function LockIcon() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="7" y="14" width="18" height="13" rx="2" />
      <path d="M11 14v-4a5 5 0 0 1 10 0v4" />
      <path d="M16 19v3" strokeLinecap="round" />
    </svg>
  );
}

export function RouteIcon() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="7" cy="25" r="2.5" />
      <path d="M9.5 25H20a4 4 0 0 0 0-8h-8a4 4 0 0 1 0-8h9" strokeDasharray="2.5 2.5" />
      <path d="M25 4c-2.2 0-4 1.8-4 4 0 3 4 7 4 7s4-4 4-7c0-2.2-1.8-4-4-4Z" />
    </svg>
  );
}

export function ShieldIcon() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M16 4 6 8v7c0 6.5 4.3 11 10 13 5.7-2 10-6.5 10-13V8Z" />
      <path d="m11.5 16 3 3 6-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
