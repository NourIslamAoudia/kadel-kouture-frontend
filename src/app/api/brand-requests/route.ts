import { z } from "zod";
import { saveBrandRequest } from "@/server/landing";

const brandSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  brand: z.string().trim().min(1).max(120),
  email: z.string().trim().regex(/^\S+@\S+\.\S+$/).max(160),
  need: z.string().trim().min(5).max(2000),
  // Champ piège : invisible pour les humains, rempli par les robots.
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (body && typeof body === "object" && "website" in body && body.website) {
    return Response.json({ ok: true }, { status: 201 });
  }

  const parsed = brandSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ message: "Invalid request" }, { status: 400 });
  }

  try {
    await saveBrandRequest(parsed.data);
  } catch {
    return Response.json({ message: "Unable to save request" }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
