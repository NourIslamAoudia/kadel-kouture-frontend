import { supabase } from "@shared/lib/supabase";
import type { AdminSubmission, SubmissionResponse, SubmissionStatus } from "./types";

const adminApiUrl = (
  import.meta.env.VITE_ADMIN_API_URL ?? "http://localhost:8001"
).replace(/\/$/, "");

export async function getAdminSubmissions(): Promise<SubmissionResponse> {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  if (!token) throw new Error("Session administrateur expirée.");

  const response = await fetch(`${adminApiUrl}/api/admin/submissions`, {
    headers: { Authorization: `Bearer ${token}` },
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
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  if (!token) throw new Error("Session administrateur expirée.");

  const response = await fetch(
    `${adminApiUrl}/api/admin/submissions/${id}/status`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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
