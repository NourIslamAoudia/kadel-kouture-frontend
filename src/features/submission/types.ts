export type GarmentType =
  "pantalon" | "veste" | "robe" | "chemise" | "manteau" | "autre";
export type WorkType =
  "retouche" | "reparation" | "personnalisation" | "upcycling";
export type SilhouetteModel = "neutral" | "male" | "female";

export interface OrderItem {
  id: string;
  garment_type: GarmentType;
  garment_type_other?: string | null;
  work_type: WorkType;
  garment_price: number;
  work_price: number;
  price: number;
  comment?: string | null;
}

/** Jour Sendcloud : "0" = lundi … "6" = dimanche. */
export type OpeningDay = "0" | "1" | "2" | "3" | "4" | "5" | "6";

/**
 * Point relais Sendcloud tel que renvoyé par GET /api/service-points (kadel-backend).
 * Même forme que ServicePointDto côté backend, qui la revalide à la création de la commande.
 */
export interface ServicePointDto {
  id: number;
  code: string;
  name: string;
  carrier: string;
  carrierName: string | null;
  carrierLogoUrl: string | null;
  type: "servicepoint" | "locker" | "post_office" | "carrier_depot" | "other";
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  openingTimes: Record<OpeningDay, string[]>;
  openTomorrow: boolean;
  openUpcomingWeek: boolean;
  distance: number | null;
}

/** Recherche de points relais : une adresse ou un code postal, ou la position du client (arrondie). */
export type ServicePointSearch =
  | { mode: "address"; address: string }
  | { mode: "geo"; latitude: number; longitude: number };

export interface SubmissionInput {
  full_name: string;
  phone_number: string;
  email: string;
  items: OrderItem[];
  total_price: number;
  garment_type?: GarmentType;
  garment_type_other?: string | null;
  work_type?: WorkType;
  comment?: string | null;
  height_cm: number;
  silhouette_model: SilhouetteModel;
  measurements: Record<string, unknown>; // la réponse complète de FastAPI, stockée en jsonb
  mesh_url?: string | null;
  drop_off_point: string;
  service_point: ServicePointDto;
}

export interface Submission extends SubmissionInput {
  id: string;
  created_at: string;
  status: string;
}
