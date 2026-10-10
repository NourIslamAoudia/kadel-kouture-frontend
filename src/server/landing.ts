import "server-only";
import { FOUNDER_OFFER } from "@/common/offer";

/**
 * Accès aux données de la landing page.
 * Tout passe par ce fichier : le jour où la base change (Postgres dans un
 * conteneur), seules ces fonctions sont à réécrire.
 *
 * Garde-fou du cahier des charges (section 3) : chaque chiffre affiché vient
 * de la base. Si la base ne répond pas, on n'affiche pas de chiffre.
 */

async function db() {
  // Import dynamique : une variable d'environnement manquante ne casse pas la page.
  const { supabaseAdmin } = await import("./supabase");
  return supabaseAdmin;
}

export interface FounderOfferState {
  /** null quand le compteur n'est pas disponible */
  remaining: number | null;
  active: boolean;
}

/**
 * Places restantes du tarif fondateur.
 * TODO(phase 2, paiement Stripe) : compter uniquement les commandes payées.
 * En attendant le paiement en ligne, on compte les demandes non annulées.
 */
export async function getFounderOffer(): Promise<FounderOfferState> {
  try {
    const client = await db();
    const { count, error } = await client
      .from("submissions")
      .select("id", { count: "exact", head: true })
      .or("status.is.null,status.neq.cancelled");

    if (error || count === null) return { remaining: null, active: true };

    const remaining = Math.max(FOUNDER_OFFER.limit - count, 0);
    return { remaining, active: remaining > 0 };
  } catch {
    return { remaining: null, active: true };
  }
}

/** Nombre de vêtements rendus à leur propriétaire (commandes terminées). */
export async function getSavedGarments(): Promise<number | null> {
  try {
    const client = await db();
    const { count, error } = await client
      .from("submissions")
      .select("id", { count: "exact", head: true })
      .eq("status", "completed");

    return error ? null : count;
  } catch {
    return null;
  }
}

export interface LeadInput {
  kind: "guide" | "workshop";
  channel: "email" | "whatsapp";
  contact: string;
  locale: string;
}

export async function saveLead(lead: LeadInput) {
  const client = await db();
  const { error } = await client.from("leads").insert({
    kind: lead.kind,
    channel: lead.channel,
    contact: lead.contact,
    locale: lead.locale,
    consent_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}

export interface BrandRequestInput {
  fullName: string;
  brand: string;
  email: string;
  need: string;
}

export async function saveBrandRequest(request: BrandRequestInput) {
  const client = await db();
  const { error } = await client.from("brand_requests").insert({
    full_name: request.fullName,
    brand: request.brand,
    email: request.email,
    need: request.need,
  });
  if (error) throw new Error(error.message);
}
