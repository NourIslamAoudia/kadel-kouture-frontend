import { z } from "zod";
import { supabaseAdmin } from "@/server/supabase";
import { requireAdmin } from "@/server/requireAdmin";

const statusSchema = z.object({
  status: z.enum(["pending", "in_progress", "completed", "cancelled"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error: authError } = await requireAdmin(request);
  if (authError) return authError;

  const parsed = statusSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ message: "Invalid status" }, { status: 400 });
  }

  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from("submissions")
    .update({ status: parsed.data.status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return Response.json(
      { message: "Unable to update submission" },
      { status: 500 },
    );
  }

  return Response.json(data);
}
