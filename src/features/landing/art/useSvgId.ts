import { useId } from "react";

/** Identifiant unique et sûr pour les motifs SVG (url(#…)) d'une illustration. */
export function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
}
