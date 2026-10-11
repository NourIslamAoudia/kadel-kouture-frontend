import { API_URL } from "@shared/lib/api";
import type { SubmissionInput } from "@features/submission/types";

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
