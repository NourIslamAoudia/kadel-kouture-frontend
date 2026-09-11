import type { OrderItem } from "@features/submission/types";

export type SubmissionStatus =
  "pending" | "in_progress" | "completed" | "cancelled";

export interface AdminSubmission {
  id: string;
  created_at: string | null;
  full_name: string;
  phone_number: string;
  email: string;
  garment_type: string;
  work_type: string;
  garment_type_other?: string | null;
  items?: OrderItem[] | null;
  total_price?: number | null;
  comment?: string | null;
  silhouette_model?: string;
  height_cm: number;
  zone: string;
  drop_off_point: string;
  status: SubmissionStatus | null;
  measurements: Record<string, unknown>;
  mesh_url: string | null;
}

export interface SubmissionResponse {
  data: AdminSubmission[];
  count: number;
  limit: number;
  offset: number;
}