import { API_URL } from "@shared/lib/api";
import { getToken } from "@features/auth/session";
import type { AdminSubmission, SubmissionResponse, SubmissionStatus } from "./types";

function authHeader() {
  const token = getToken();
  if (!token) throw new Error("Session administrateur expirée.");
  return { Authorization: `Bearer ${token}` };
}

export async function getAdminSubmissions(): Promise<SubmissionResponse> {
  const response = await fetch(`${API_URL}/api/admin/submissions`, {
    headers: authHeader(),
  });
  const body = (await response.json()) as {
    message?: string;
  } & Partial<SubmissionResponse>;
  if (!response.ok)
    throw new Error(body.message ?? "Impossible de charger les soumissions.");
  return body as SubmissionResponse;
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
): Promise<AdminSubmission> {
  const response = await fetch(
    `${API_URL}/api/admin/submissions/${id}/status`,
    {
      method: "PATCH",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    },
  );
  const body = (await response.json()) as AdminSubmission & {
    message?: string;
  };
  if (!response.ok)
    throw new Error(body.message ?? "Impossible de modifier le statut.");
  return body;
}
