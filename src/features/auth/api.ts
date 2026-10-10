import { API_URL } from "@shared/lib/api";
import type { User } from "@shared/types/user";
import type { AuthResponse, LoginPayload } from "./types";

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.status === 429) throw new Error("Trop de tentatives. Réessayez dans quelques minutes.");
    if (!response.ok) throw new Error("Email ou mot de passe incorrect.");
    return (await response.json()) as AuthResponse;
  },

  me: async (token: string): Promise<User | null> => {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) return null;
    return ((await response.json()) as { user: User }).user;
  },
};
