/** Mirrors app/schemas.py. Every dimension is millimetres, every angle degrees. */

export type Gender = "neutral" | "male" | "female";
export type ExtractionMode = "demo_stub" | "photo_regression";

export interface MeasurementItem {
  name: string;
  group: string;
  source: string;
  type: string;
  value_cm: number;
  value_in: number;
  hidden: boolean;
}

export interface ExtractionResponse {
  request_id: string;
  mode: ExtractionMode;
  gender: Gender;
  height_mm: number;
  scale_factor: number;
  measurements: MeasurementItem[];
  mesh_url: string;
  mesh_format: "obj" | "glb" | "ply";
  landmark_vertices: Record<string, number>;
  processing_ms: number;
  warnings: string[];
}

export interface HealthResponse {
  status: string;
  smplx_models: Record<Gender, boolean>;
  mesh_dir_writable: boolean;
}

/**
 * Resolution of the posture metrics, from the backend's own measurement of its
 * noise floor. Asymmetry smaller than this is not the subject's posture.
 */
export const ASYMMETRY_RESOLUTION = { dropMm: 10, slopeDeg: 3.5 };
