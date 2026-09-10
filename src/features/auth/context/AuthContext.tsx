import { createContext, useContext, useEffect, useState } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@shared/lib/supabase";
import type { User } from "@shared/types/user";

export function mapSupabaseUser(supabaseUser: SupabaseUser): User {
  const metadata = supabaseUser.user_metadata ?? {};
  const appMetadata = supabaseUser.app_metadata ?? {};
  const isAdmin = appMetadata.is_admin === true;
  const role = appMetadata.role === "admin" ? "admin" : "client";

  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? "",
    name:
      (typeof metadata.name === "string" ? metadata.name : null) ??
      (typeof metadata.full_name === "string" ? metadata.full_name : null) ??
      supabaseUser.email ??
      "Utilisateur",
    role,
    is_admin: isAdmin,
  };
}

const AuthContext = createContext<
  | {
      user: User | null;
      login: (user: User) => void;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active && data.session?.user)
        setUser(mapSupabaseUser(data.session.user));
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setUser(session?.user ? mapSupabaseUser(session.user) : null);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const login = (user: User) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    void supabase.auth.signOut();
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
