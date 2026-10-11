/**
 * Calculs de la carte des points relais : projection Web Mercator (celle des tuiles),
 * cadrage automatique, et position de l'adresse cherchée retrouvée à partir des distances.
 */

export type LatLng = { latitude: number; longitude: number };

export const TILE_SIZE = 256;

/** Coordonnées GPS → pixels du « monde » au niveau de zoom donné. */
export function worldPixel({ latitude, longitude }: LatLng, zoom: number) {
  const scale = TILE_SIZE * 2 ** zoom;
  const sin = Math.sin((latitude * Math.PI) / 180);
  return {
    x: ((longitude + 180) / 360) * scale,
    y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * scale,
  };
}

export interface MapView {
  zoom: number;
  /** Pixel du monde au coin haut gauche de la carte. */
  left: number;
  top: number;
}

/**
 * Le zoom le plus fort qui fait tenir tous les lieux dans la carte (avec une marge),
 * centré sur l'ensemble. Un seul lieu : zoom de quartier.
 */
export function fitView(
  places: LatLng[],
  width: number,
  height: number,
  { padding = 44, maxZoom = 16, minZoom = 4 } = {},
): MapView {
  for (let zoom = maxZoom; zoom >= minZoom; zoom--) {
    const pixels = places.map((place) => worldPixel(place, zoom));
    const xs = pixels.map((p) => p.x);
    const ys = pixels.map((p) => p.y);
    const spanX = Math.max(...xs) - Math.min(...xs);
    const spanY = Math.max(...ys) - Math.min(...ys);
    if (spanX <= width - padding * 2 && spanY <= height - padding * 2) {
      const cx = (Math.max(...xs) + Math.min(...xs)) / 2;
      const cy = (Math.max(...ys) + Math.min(...ys)) / 2;
      return { zoom, left: cx - width / 2, top: cy - height / 2 };
    }
  }
  const center = worldPixel(places[0], minZoom);
  return { zoom: minZoom, left: center.x - width / 2, top: center.y - height / 2 };
}

/** Vue d'ensemble de la France métropolitaine, avant toute recherche. */
export function franceView(width: number, height: number): MapView {
  const zoom = 6;
  const center = worldPixel({ latitude: 46.5, longitude: 2.5 }, zoom);
  return { zoom, left: center.x - width / 2, top: center.y - height / 2 };
}

/** Position d'un lieu sur la carte (en pixels de la carte). */
export function toMap(place: LatLng, view: MapView) {
  const p = worldPixel(place, view.zoom);
  return { x: p.x - view.left, y: p.y - view.top };
}

/** Mètres par pixel à cette latitude (pour tracer un rayon). */
export function metersPerPixel(latitude: number, zoom: number) {
  return (
    (156543.03392 * Math.cos((latitude * Math.PI) / 180)) / 2 ** zoom
  );
}

/**
 * Retrouve le point de départ d'une recherche par adresse : Sendcloud ne renvoie pas
 * les coordonnées de l'adresse, mais la distance de chaque point relais à celle-ci.
 * Moindres carrés sur un plan local ; null si les données ne suffisent pas ou se contredisent.
 */
export function estimateOrigin(
  points: (LatLng & { distance: number | null })[],
): LatLng | null {
  const known = points.filter(
    (p): p is LatLng & { distance: number } => p.distance !== null,
  );
  if (known.length < 3) return null;

  const lat0 = known.reduce((sum, p) => sum + p.latitude, 0) / known.length;
  const lng0 = known.reduce((sum, p) => sum + p.longitude, 0) / known.length;
  const mLat = 110574;
  const mLng = 111320 * Math.cos((lat0 * Math.PI) / 180);
  const local = known.map((p) => ({
    x: (p.longitude - lng0) * mLng,
    y: (p.latitude - lat0) * mLat,
    d: p.distance,
  }));

  // (x - xi)² + (y - yi)² = di², moins l'équation du premier point : système linéaire en x, y.
  const [first, ...rest] = local;
  let a11 = 0, a12 = 0, a22 = 0, b1 = 0, b2 = 0;
  for (const p of rest) {
    const ax = 2 * (p.x - first.x);
    const ay = 2 * (p.y - first.y);
    const b =
      first.d ** 2 - p.d ** 2 + p.x ** 2 - first.x ** 2 + p.y ** 2 - first.y ** 2;
    a11 += ax * ax; a12 += ax * ay; a22 += ay * ay;
    b1 += ax * b; b2 += ay * b;
  }
  const det = a11 * a22 - a12 * a12;
  if (Math.abs(det) < 1e-6) return null;
  const x = (a22 * b1 - a12 * b2) / det;
  const y = (a11 * b2 - a12 * b1) / det;

  // Contrôle : les distances recalculées doivent coller à celles de Sendcloud.
  const error = Math.sqrt(
    local.reduce((sum, p) => sum + (Math.hypot(x - p.x, y - p.y) - p.d) ** 2, 0) /
      local.length,
  );
  if (!Number.isFinite(error) || error > 250) return null;

  return { latitude: lat0 + y / mLat, longitude: lng0 + x / mLng };
}
