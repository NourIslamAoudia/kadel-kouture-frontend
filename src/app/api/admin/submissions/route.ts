import { z } from "zod";
import { supabaseAdmin } from "@/server/supabase";
import { requireAdmin } from "@/server/requireAdmin";

const querySchema = z.object({
  status: z.string().trim().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

export async function GET(request: Request) {
  const { error: authError } = await requireAdmin(request);
  if (authError) return authError;

  const searchParams = new URL(request.url).searchParams;
  const parsed = querySchema.safeParse(Object.fromEntries(searchParams));
  if (!parsed.success) {
    return Response.json(
      { message: "Invalid query parameters", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { status, limit, offset } = parsed.data;
  let query = supabaseAdmin
    .from("submissions")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) query = query.eq("status", status);

  const { data, error, count } = await query;
  if (error) {
    return Response.json(
      { message: "Unable to load submissions" },
      { status: 500 },
    );
  }

  return Response.json({ data, count: count ?? 0, limit, offset });
}
