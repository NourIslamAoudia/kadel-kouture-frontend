import type { GarmentType, WorkType } from "@features/submission/types";

/**
 * Prix unitaire de base par produit / vêtement (€)
 */
export const GARMENT_PRICES: Record<GarmentType, number> = {
  pantalon: 10,
  chemise: 10,
  robe: 15,
  veste: 20,
  manteau: 25,
  autre: 12,
};

/**
 * Prix unitaire par prestation / service de retouche (€)
 */
export const WORK_PRICES: Record<WorkType, number> = {
  retouche: 10,
  reparation: 15,
  personnalisation: 25,
  upcycling: 40,
};

/**
 * Récupère le prix de base du vêtement (produit)
 */
export function getGarmentPrice(
  garmentType: GarmentType | null | undefined,
): number {
  if (!garmentType) return 0;
  return GARMENT_PRICES[garmentType] ?? 10;
}

/**
 * Récupère le prix de la prestation (service / retouche)
 */
export function getWorkPrice(workType: WorkType | null | undefined): number {
  if (!workType) return 0;
  return WORK_PRICES[workType] ?? 10;
}

/**
 * Calcule le prix total d'une pièce : Prix Produit + Prix Service
 */
export function getItemPrice(
  garmentType: GarmentType | null | undefined,
  workType: WorkType | null | undefined,
): number {
  return getGarmentPrice(garmentType) + getWorkPrice(workType);
}

/**
 * Récupère le prix de départ d'un type de vêtement
 */
export function getGarmentStartingPrice(garmentType: GarmentType): number {
  return getGarmentPrice(garmentType);
}

/**
 * Récupère le prix d'une prestation
 */
export function getWorkTypeStartingPrice(workType: WorkType): number {
  return getWorkPrice(workType);
}

/**
 * Formate un montant en devise locale (€)
 */
export function formatPrice(amount: number): string {
  return `${amount} €`;
}

/**
 * Calcule le montant total d'une liste de pièces (produits + services)
 */
export function calculateTotalPrice(
  items: Array<
    | {
        price?: number;
        garment_price?: number;
        work_price?: number;
        garment_type?: GarmentType;
        work_type?: WorkType;
      }
    | null
    | undefined
  >,
): number {
  return items.reduce((sum, item) => {
    if (!item) return sum;
    if (typeof item.price === "number") return sum + item.price;
    const gPrice = item.garment_price ?? getGarmentPrice(item.garment_type);
    const wPrice = item.work_price ?? getWorkPrice(item.work_type);
    return sum + gPrice + wPrice;
  }, 0);
}
