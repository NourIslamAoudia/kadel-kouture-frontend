import type { ExtractionResponse, Gender, HealthResponse } from "./types";

const configuredBase =
  import.meta.env.VITE_API_BASE_URL ??
  "http://127.0.0.1:8000";
const BASE = configuredBase.replace(/\/api\/?$/, "").replace(/\/$/, "");

async function unwrap<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let detail = `${response.status} ${response.statusText}`;
    try {
      const body = await response.json();
      if (typeof body?.detail === "string") detail = body.detail;
      else if (Array.isArray(body?.detail)) {
        detail = body.detail
          .map((d: { msg?: string }) => d.msg ?? "")
          .join("; ");
      }
    } catch {
      // response had no JSON body; the status line is all we have
    }
    throw new Error(detail);
  }
  return response.json() as Promise<T>;
}

export async function getHealth(signal?: AbortSignal): Promise<HealthResponse> {
  return unwrap<HealthResponse>(
    await fetch(`${BASE}/api/v1/health`, { signal }),
  );
}

export interface ExtractParams {
  heightMm: number;
  gender: Gender;
  frontImage?: Blob | null;
  sideImage?: Blob | null;
  useDemoMesh?: boolean;
  signal?: AbortSignal;
}

export async function extractMeasurements({
  heightMm,
  gender,
  frontImage,
  sideImage,
  useDemoMesh = true,
  signal,
}: ExtractParams): Promise<ExtractionResponse> {
  const form = new FormData();
  form.append("height_mm", String(heightMm));
  form.append("gender", gender);
  form.append("use_demo_mesh", String(useDemoMesh));
  if (frontImage) form.append("front_image", frontImage, "front.jpg");
  if (sideImage) form.append("side_image", sideImage, "side.jpg");

  return unwrap<ExtractionResponse>(
    await fetch(`${BASE}/api/v1/measurements/extract`, {
      method: "POST",
      body: form,
      signal,
    }),
  );
}

export function meshUrl(response: { mesh_url: string }): string {
  return `${BASE}${response.mesh_url}`;
}
