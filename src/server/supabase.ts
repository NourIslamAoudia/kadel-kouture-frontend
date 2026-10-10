import "server-only";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !anonKey || !serviceRoleKey) {
  throw new Error("Variables d'environnement Supabase serveur manquantes");
}

const serverOptions = {
  auth: { autoRefreshToken: false, persistSession: false },
};

export const supabaseAuth = createClient(supabaseUrl, anonKey, serverOptions);

export const supabaseAdmin = createClient(
  supabaseUrl,
  serviceRoleKey,
  serverOptions,
);
