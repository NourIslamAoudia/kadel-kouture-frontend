/** Jeton de session admin, délivré par le backend (POST /api/auth/login). */
const KEY = "kk_admin_token";

export function getToken(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string) {
  try {
    localStorage.setItem(KEY, token);
  } catch {
    // stockage indisponible (navigation privée stricte) : la session ne survivra pas au rechargement
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // rien à faire
  }
}
