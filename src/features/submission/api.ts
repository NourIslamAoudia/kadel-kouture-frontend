import { API_URL } from "@shared/lib/api";
import type {
  ServicePointDto,
  ServicePointSearch,
  SubmissionInput,
} from "@features/submission/types";

export const submissionApi = {
  create: async (payload: SubmissionInput): Promise<void> => {
    const response = await fetch(`${API_URL}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      throw new Error(body?.message ?? "Impossible d'envoyer la demande.");
    }
  },
};

/** Erreur d’une recherche de points relais ; `code` vient du backend (ADDRESS_NOT_FOUND…). */
export class ServicePointsError extends Error {
  constructor(readonly code: string) {
    super(code);
  }
}

/**
 * Points relais Sendcloud : le backend fait l’appel (pays fixé côté serveur), les clés n’arrivent jamais ici.
 * La position éventuelle sert uniquement à cette requête : elle n’est ni conservée ni envoyée avec la commande.
 */
export const servicePointsApi = {
  search: async (
    search: ServicePointSearch,
    signal?: AbortSignal,
  ): Promise<ServicePointDto[]> => {
    const params = new URLSearchParams(
      search.mode === "address"
        ? { address: search.address }
        : {
            latitude: String(search.latitude),
            longitude: String(search.longitude),
          },
    );
    const response = await fetch(`${API_URL}/api/service-points?${params}`, {
      signal,
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as {
        error?: { code?: string };
      } | null;
      throw new ServicePointsError(body?.error?.code ?? "UNKNOWN");
    }
    return (await response.json()) as ServicePointDto[];
  },
};
