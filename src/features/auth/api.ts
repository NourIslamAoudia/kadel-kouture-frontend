import { api } from "@shared/lib/axios";
import type { LoginPayload, RegisterPayload, AuthResponse } from "./types";
import type { User } from "@shared/types/user";

export const authApi = {
  login: (payload: LoginPayload) =>
    api.post<AuthResponse>("/auth/login", payload).then((res) => res.data),

  register: (payload: RegisterPayload) =>
    api.post<AuthResponse>("/auth/register", payload).then((res) => res.data),

  getMe: () => api.get<User>("/auth/me").then((res) => res.data),
};
