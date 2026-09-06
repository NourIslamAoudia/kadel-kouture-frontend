import type { User } from "@shared/types/user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  role: "client" | "artisan" | "partner";
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
