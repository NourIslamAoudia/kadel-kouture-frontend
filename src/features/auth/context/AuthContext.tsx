"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@shared/types/user";
import { authApi } from "../api";
import { clearToken, getToken, setToken } from "../session";

const AuthContext = createContext<
  | {
      user: User | null;
      /** false tant que la session n'a pas été vérifiée auprès du backend */
      ready: boolean;
      login: (email: string, password: string) => Promise<User>;
      logout: () => void;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const token = getToken();
    const check = token ? authApi.me(token) : Promise.resolve(null);
    void check
      .catch(() => null)
      .then((current) => {
        if (!active) return;
        if (!current) clearToken();
        setUser(current);
        setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { user: loggedIn, accessToken } = await authApi.login({ email, password });
    setToken(accessToken);
    setUser(loggedIn);
    return loggedIn;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>
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
