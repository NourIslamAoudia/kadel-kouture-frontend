export type GarmentType =
  "pantalon" | "veste" | "robe" | "chemise" | "manteau" | "autre" ;
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
  zone: string;
  drop_off_point: string;
}

export interface Submission extends SubmissionInput {
  id: string;
  created_at: string;
  status: string;
}
