export type Unit = "cm" | "in";

export const MM_PER_INCH = 25.4;

export function fromMm(mm: number, unit: Unit): number {
  return unit === "cm" ? mm / 10 : mm / MM_PER_INCH;
}

export function formatLength(mm: number, unit: Unit): string {
  const value = fromMm(mm, unit);
  return unit === "cm" ? value.toFixed(1) : value.toFixed(2);
}

export function formatDegrees(deg: number): string {
  return `${deg.toFixed(1)}°`;
}

export function formatSignedMm(mm: number): string {
  return `${mm >= 0 ? "+" : ""}${mm.toFixed(1)} mm`;
}
