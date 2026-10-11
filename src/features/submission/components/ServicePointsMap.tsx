//src/features/submission/components/ServicePointsMap.tsx
import { useState } from "react";
import type { ServicePointDto } from "../types";
import {
  TILE_SIZE,
  fitView,
  franceView,
  metersPerPixel,
  toMap,
  type LatLng,
  type MapView,
} from "../lib/mapGeo";

/** Taille logique de la carte ; elle s'adapte ensuite à la largeur disponible. */
const WIDTH = 600;
const HEIGHT = 400;

/**
 * Fond de carte OpenStreetMap, passé en noir et blanc chaud par un filtre CSS.
 * Pour la production, brancher un fournisseur avec clé (MapTiler, Stadia…) via
 * NEXT_PUBLIC_MAP_TILES_URL ({s}, {z}, {x}, {y}, et {r} pour les tuiles @2x) et NEXT_PUBLIC_MAP_ATTRIBUTION.
 */
const TILES_URL =
  process.env.NEXT_PUBLIC_MAP_TILES_URL ??
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION =
  process.env.NEXT_PUBLIC_MAP_ATTRIBUTION ?? "© OpenStreetMap";

const INK = "#171715";
const PAPER = "#f7f4ee";
const HALO = {
  stroke: PAPER,
  strokeWidth: 3.5,
  strokeLinejoin: "round" as const,
  paintOrder: "stroke" as const,
};

function tileUrl(z: number, x: number, y: number) {
  return TILES_URL.replace("{s}", "abcd"[(x + y) % 4])
    .replace("{z}", String(z))
    .replace("{x}", String(x))
    .replace("{y}", String(y))
    .replace("{r}", "@2x");
}

const sameView = (a: MapView, b: MapView) =>
  a.zoom === b.zoom &&
  Math.abs(a.left - b.left) < 0.5 &&
  Math.abs(a.top - b.top) < 0.5;

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

/**
 * Carte de l'étape point relais : le lieu cherché, la zone couverte et les points disponibles.
 * Les points sont cliquables ; la liste sous la carte reste la voie accessible.
 */
export function ServicePointsMap({
  origin,
  originLabel,
  points,
  busy,
  hint,
  selectedId,
  activeId,
  onSelect,
  onHover,
}: {
  /** Lieu de la recherche (position du client ou adresse retrouvée), s'il est connu. */
  origin: LatLng | null;
  originLabel: string;
  points: ServicePointDto[];
  /** Recherche en cours : la carte garde son cadrage au lieu de revenir sur la France. */
  busy: boolean;
  /** Texte affiché avant toute recherche. */
  hint: string | null;
  selectedId: number | null;
  activeId: number | null;
  onSelect: (point: ServicePointDto) => void;
  onHover: (id: number | null) => void;
}) {
  const places: LatLng[] = [...(origin ? [origin] : []), ...points];
  const fitted =
    places.length > 0 ? fitView(places, WIDTH, HEIGHT, { maxZoom: 16 }) : null;

  // Dernier cadrage : gardé pendant une nouvelle recherche, pour éviter un saut vers la France.
  const [kept, setKept] = useState<MapView | null>(null);
  if (fitted && (!kept || !sameView(kept, fitted))) setKept(fitted);
  const view = fitted ?? (busy ? kept : null) ?? franceView(WIDTH, HEIGHT);

  // Tuiles visibles.
  const tiles: { key: string; url: string; left: number; top: number }[] = [];
  const count = 2 ** view.zoom;
  const firstX = Math.floor(view.left / TILE_SIZE);
  const firstY = Math.floor(view.top / TILE_SIZE);
  for (let x = firstX; x * TILE_SIZE < view.left + WIDTH; x++) {
    for (let y = firstY; y * TILE_SIZE < view.top + HEIGHT; y++) {
      if (y < 0 || y >= count) continue;
      const wrapped = ((x % count) + count) % count;
      tiles.push({
        key: `${view.zoom}/${x}/${y}`,
        url: tileUrl(view.zoom, wrapped, y),
        left: x * TILE_SIZE - view.left,
        top: y * TILE_SIZE - view.top,
      });
    }
  }

  const center = origin ? toMap(origin, view) : null;
  const reach = origin
    ? Math.max(0, ...points.map((point) => point.distance ?? 0))
    : 0;
  const reachRadius =
    origin && reach > 0
      ? reach / metersPerPixel(origin.latitude, view.zoom) + 14
      : 0;
  const highlighted = selectedId ?? activeId;
  const label = points.find((point) => point.id === highlighted);

  return (
    <div
      className="relative overflow-hidden bg-[#efebe3]"
      style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
    >
      {/* Fond de carte */}
      <div
        aria-hidden="true"
        className="absolute inset-0 filter-[grayscale(1)_sepia(0.12)_brightness(1.07)_contrast(0.82)]"
      >
        {tiles.map((tile) => (
          <div
            key={tile.key}
            className="absolute bg-cover"
            style={{
              left: pct(tile.left, WIDTH),
              top: pct(tile.top, HEIGHT),
              width: pct(TILE_SIZE, WIDTH),
              height: pct(TILE_SIZE, HEIGHT),
              backgroundImage: `url(${tile.url})`,
            }}
          />
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-kk-ivory/35" />

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="absolute inset-0 h-full w-full select-none"
        aria-hidden="true"
      >
        {/* Zone couverte par la recherche */}
        {center && reachRadius > 0 && (
          <circle
            cx={center.x}
            cy={center.y}
            r={reachRadius}
            fill={INK}
            fillOpacity=".035"
            stroke={INK}
            strokeOpacity=".45"
            strokeWidth=".9"
            strokeDasharray="3 4"
            className="kk-map-reach pointer-events-none"
          />
        )}

        {/* Points relais : losanges, le motif de la marque */}
        {points.map((point, index) => {
          const { x, y } = toMap(point, view);
          const active = point.id === highlighted;
          const size = active ? 9 : 6;
          return (
            <g
              key={point.id}
              transform={`translate(${x} ${y})`}
              className="kk-map-point cursor-pointer"
              style={{ animationDelay: `${Math.min(index, 12) * 35}ms` }}
              onClick={() => onSelect(point)}
              onMouseEnter={() => onHover(point.id)}
              onMouseLeave={() => onHover(null)}
            >
              <circle r="13" fill="transparent" />
              {active && (
                <circle r="13" fill={PAPER} fillOpacity=".7" stroke={INK} strokeOpacity=".35" />
              )}
              <rect
                x={-size / 2}
                y={-size / 2}
                width={size}
                height={size}
                transform="rotate(45)"
                fill={point.type === "locker" ? PAPER : INK}
                stroke={INK}
                strokeWidth={point.type === "locker" ? 1.4 : 0.8}
              />
            </g>
          );
        })}

        {/* Lieu de la recherche */}
        {center && (
          <g
            transform={`translate(${center.x} ${center.y})`}
            className="pointer-events-none"
          >
            <circle r="15" fill={INK} fillOpacity=".08" className="kk-map-pulse" />
            <circle r="6.5" fill={PAPER} stroke={INK} strokeWidth="1.2" />
            <circle r="3" fill={INK} />
            <text
              y="-14"
              textAnchor="middle"
              fontSize="11"
              letterSpacing=".16em"
              fill={INK}
              style={{ fontFamily: "var(--font-sans)", textTransform: "uppercase" }}
              {...HALO}
            >
              {originLabel}
            </text>
          </g>
        )}

        {/* Nom du point survolé ou choisi */}
        {label &&
          (() => {
            const { x, y } = toMap(label, view);
            return (
              <text
                x={x}
                y={y - 17}
                textAnchor="middle"
                fontSize="13"
                fill={INK}
                className="pointer-events-none capitalize"
                style={{ fontFamily: "var(--font-serif)" }}
                {...HALO}
              >
                {label.name.toLowerCase()}
              </text>
            );
          })()}
      </svg>

      {hint && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
          <p className="max-w-75 border border-ink/12 bg-kk-ivory/92 px-5 py-4 text-center font-serif text-[15px] italic leading-snug text-ink-2 backdrop-blur-sm">
            {hint}
          </p>
        </div>
      )}

      <p className="pointer-events-none absolute right-0 bottom-0 bg-kk-ivory/80 px-1.5 py-0.5 text-[9px] text-ink-3">
        {ATTRIBUTION}
      </p>
    </div>
  );
}
