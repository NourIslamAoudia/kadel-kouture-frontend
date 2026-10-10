import { z } from "zod";
import { saveLead } from "@/server/landing";

const EMAIL = /^\S+@\S+\.\S+$/;
const PHONE = /^\+?[\d\s().-]{8,20}$/;

const leadSchema = z
  .object({
    kind: z.enum(["guide", "workshop"]),
    channel: z.enum(["email", "whatsapp"]),
    contact: z.string().trim().min(3).max(120),
    consent: z.literal(true),
    locale: z.enum(["es", "en", "ca", "fr"]).default("fr"),
    // Champ piège : invisible pour les humains, rempli par les robots.
    website: z.string().max(0).optional(),
  })
  .refine(
    (lead) =>
      lead.channel === "email" ? EMAIL.test(lead.contact) : PHONE.test(lead.contact),
    { message: "Invalid contact", path: ["contact"] },
  );

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (body && typeof body === "object" && "website" in body && body.website) {
    return Response.json({ ok: true }, { status: 201 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ message: "Invalid lead" }, { status: 400 });
  }

  try {
    await saveLead(parsed.data);
  } catch {
    return Response.json({ message: "Unable to save lead" }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
