import type { User } from "@shared/types/user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
