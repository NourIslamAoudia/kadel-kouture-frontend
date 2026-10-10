import type { GarmentType, WorkType } from "@features/submission/types";

/**
 * Catalogue des prestations (cahier des charges V1, section 6).
 * Prix publics estimés pour Barcelone, affichés « à partir de »,
 * livraison aller-retour en point relais incluse.
 * À confirmer avec les grilles des ateliers partenaires.
 * Les libellés sont dans les textes de chaque langue (clé = id).
 */
export type ServiceCategory =
  | "reparation"
  | "ajustement"
  | "personnalisation"
  | "upcycling";

export type CatalogueGarment = "pantalon" | "robe" | "veste" | "jean" | "autre";

export type ServiceId =
  | "reprise"
  | "boutons"
  | "fermeture"
  | "ourlet"
  | "cintrer"
  | "reprendre"
  | "broderie"
  | "teinture"
  | "transformation";

export interface CatalogueService {
  id: ServiceId;
  category: ServiceCategory;
  fromPrice: number;
  garments: CatalogueGarment[];
}

export const CATALOGUE_GARMENTS: CatalogueGarment[] = [
  "pantalon",
  "robe",
  "veste",
  "jean",
  "autre",
];

const ALL = CATALOGUE_GARMENTS;

export const SERVICES: CatalogueService[] = [
  { id: "reprise", category: "reparation", fromPrice: 12, garments: ALL },
  { id: "boutons", category: "reparation", fromPrice: 10, garments: ALL },
  { id: "fermeture", category: "reparation", fromPrice: 22, garments: ALL },
  { id: "ourlet", category: "ajustement", fromPrice: 15, garments: ["pantalon", "jean"] },
  { id: "cintrer", category: "ajustement", fromPrice: 25, garments: ["autre"] },
  { id: "reprendre", category: "ajustement", fromPrice: 39, garments: ["robe", "veste"] },
  { id: "broderie", category: "personnalisation", fromPrice: 35, garments: ALL },
  { id: "teinture", category: "personnalisation", fromPrice: 45, garments: ALL },
  { id: "transformation", category: "upcycling", fromPrice: 79, garments: ALL },
];

/**
 * Prix moyen du neuf, affiché en ancrage à côté des prix de réparation.
 * Seul le jean (80 €) vient du cahier des charges : les autres valeurs
 * sont des estimations à valider avec Kadel Kouture.
 */
export const NEW_PRICE: Record<CatalogueGarment, number> = {
  pantalon: 60,
  robe: 70,
  veste: 120,
  jean: 80,
  autre: 45,
};

/** Panier minimum par commande (section 6). */
export const MIN_BASKET = 15;

/** Seuil d'annulation gratuite si le prix final dépasse le prix affiché (section 6). */
export const QUOTE_TOLERANCE_PERCENT = 15;

export function servicesFor(garment: CatalogueGarment): CatalogueService[] {
  return SERVICES.filter((service) => service.garments.includes(garment));
}

export function lowestPrice(category?: ServiceCategory): number {
  const prices = SERVICES.filter(
    (service) => !category || service.category === category,
  ).map((service) => service.fromPrice);
  return Math.min(...prices);
}

/* ---------- Lien vers le formulaire de commande ---------- */

const CATEGORY_TO_WORK: Record<ServiceCategory, WorkType> = {
  reparation: "reparation",
  ajustement: "retouche",
  personnalisation: "personnalisation",
  upcycling: "upcycling",
};

const CATALOGUE_TO_GARMENT: Record<CatalogueGarment, GarmentType> = {
  pantalon: "pantalon",
  jean: "pantalon",
  robe: "robe",
  veste: "veste",
  autre: "autre",
};

/** Ouvre le formulaire de commande avec la prestation présélectionnée (section 5.5). */
export function orderHref(service?: ServiceId, garment?: CatalogueGarment) {
  const params = new URLSearchParams();
  if (service) params.set("service", service);
  if (garment) params.set("piece", garment);
  const query = params.toString();
  return query ? `/commander?${query}` : "/commander";
}

export function parseOrderPreselection(
  params: Record<string, string | string[] | undefined>,
): { garment: GarmentType | null; work: WorkType | null } {
  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const service = SERVICES.find((item) => item.id === first(params.service));
  const piece = first(params.piece);
  const garment = CATALOGUE_GARMENTS.find((item) => item === piece);

  return {
    garment: garment ? CATALOGUE_TO_GARMENT[garment] : null,
    work: service ? CATEGORY_TO_WORK[service.category] : null,
  };
}
