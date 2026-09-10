export type Role = "client" | "artisan" | "partner" | "logistics" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  is_admin?: boolean;
}
