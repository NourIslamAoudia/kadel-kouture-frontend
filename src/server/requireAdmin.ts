import "server-only";
import type { User } from "@supabase/supabase-js";
import { supabaseAuth } from "./supabase";

function isAdmin(user: User) {
  const appMetadata = user.app_metadata ?? {};
  const userMetadata = user.user_metadata ?? {};
  return (
    appMetadata.role === "admin" ||
    appMetadata.is_admin === true ||
    appMetadata.is_admin === "true" ||
    userMetadata.role === "admin" ||
    userMetadata.is_admin === true ||
    userMetadata.is_admin === "true"
  );
}

type AdminCheck =
  | { user: User; error?: undefined }
  | { user?: undefined; error: Response };

/**
 * Vérifie le jeton Supabase du header Authorization.
 * Renvoie l'utilisateur admin, ou une réponse 401/403 à retourner telle quelle.
 */
export async function requireAdmin(request: Request): Promise<AdminCheck> {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : null;

  if (!token) {
    return {
      error: Response.json({ message: "Missing bearer token" }, { status: 401 }),
    };
  }

  const { data, error } = await supabaseAuth.auth.getUser(token);
  if (error || !data.user) {
    return {
      error: Response.json(
        { message: "Invalid or expired token" },
        { status: 401 },
      ),
    };
  }

  if (!isAdmin(data.user)) {
    return {
      error: Response.json(
        { message: "Administrator access required" },
        { status: 403 },
      ),
    };
  }

  return { user: data.user };
}
