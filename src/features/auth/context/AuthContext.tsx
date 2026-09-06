import { createContext, useContext, useState } from "react";
import type { User } from "@shared/types/user";

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
  const login = (user: User) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
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
