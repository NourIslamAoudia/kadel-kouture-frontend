import type { OrderItem } from "@features/submission/types";
import type { Locale } from "@features/landing/i18n/locales";

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

/** Contact laissé sur la landing : guide gratuit ou atelier à prévenir. */
export type LeadKind = "guide" | "workshop";
export type LeadChannel = "email" | "whatsapp";

export interface Lead {
  id: string;
  created_at: string;
  kind: LeadKind;
  channel: LeadChannel;
  contact: string;
  locale: Locale;
  consent_at: string;
}

/** Demande B2B envoyée depuis la section « Marques » de la landing. */
export type BrandRequestStatus = "new" | "contacted" | "closed";

export interface BrandRequest {
  id: string;
  created_at: string;
  full_name: string;
  brand: string;
  email: string;
  need: string;
  status: BrandRequestStatus;
}

/** Réponse paginée des listes admin. `totals` compte chaque statut ou type, sans filtre. */
export interface ListResponse<T, K extends string = string> {
  data: T[];
  count: number;
  limit: number;
  offset: number;
  totals: Partial<Record<K, number>>;
}

export type SubmissionResponse = ListResponse<AdminSubmission, SubmissionStatus>;
export type LeadResponse = ListResponse<Lead, LeadKind>;
export type BrandRequestResponse = ListResponse<
  BrandRequest,
  BrandRequestStatus
>;
