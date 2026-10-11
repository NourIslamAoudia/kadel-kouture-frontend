import { API_URL } from "@shared/lib/api";
import { getToken } from "@features/auth/session";
import type {
  AdminSubmission,
  BrandRequest,
  BrandRequestResponse,
  BrandRequestStatus,
  LeadResponse,
  SubmissionResponse,
  SubmissionStatus,
} from "./types";

/** Erreur d'un appel admin. `status` 401 : la session a expiré, il faut se reconnecter. */
export class AdminApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(
  path: string,
  fallback: string,
  init: RequestInit = {},
): Promise<T> {
  const token = getToken();
  if (!token) throw new AdminApiError(401, "Session administrateur expirée.");

  const response = await fetch(`${API_URL}/api/admin${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init.body ? { "Content-Type": "application/json" } : {}),
    },
  });

  if (response.status === 204) return undefined as T;
  const body = (await response.json().catch(() => null)) as
    | (T & { message?: string })
    | null;
  if (!response.ok) {
    throw new AdminApiError(
      response.status,
      response.status === 401 ? "Session administrateur expirée." : fallback,
    );
  }
  return body as T;
}

/** Les listes arrivent par pages de 100 ; recherche et filtres se font ensuite dans le navigateur. */
function page(offset: number) {
  return new URLSearchParams({
    limit: "100",
    offset: String(offset),
  }).toString();
}

export const adminApi = {
  submissions: (offset = 0) =>
    request<SubmissionResponse>(
      `/submissions?${page(offset)}`,
      "Impossible de charger les commandes.",
    ),

  updateSubmissionStatus: (id: string, status: SubmissionStatus) =>
    request<AdminSubmission>(
      `/submissions/${id}/status`,
      "Impossible de modifier le statut.",
      { method: "PATCH", body: JSON.stringify({ status }) },
    ),

  leads: (offset = 0) =>
    request<LeadResponse>(
      `/leads?${page(offset)}`,
      "Impossible de charger les contacts.",
    ),

  deleteLead: (id: string) =>
    request<void>(`/leads/${id}`, "Impossible de supprimer ce contact.", {
      method: "DELETE",
    }),

  brandRequests: (offset = 0) =>
    request<BrandRequestResponse>(
      `/brand-requests?${page(offset)}`,
      "Impossible de charger les demandes des marques.",
    ),

  updateBrandRequestStatus: (id: string, status: BrandRequestStatus) =>
    request<BrandRequest>(
      `/brand-requests/${id}/status`,
      "Impossible de modifier le statut.",
      { method: "PATCH", body: JSON.stringify({ status }) },
    ),
};
