import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = { email: string; name: string };
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem("gu_user") || "null"); } catch { return null; }
  });

  useEffect(() => {
    if (user) localStorage.setItem("gu_user", JSON.stringify(user));
    else localStorage.removeItem("gu_user");
  }, [user]);

  const login = async (email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 600));
    setUser({ email, name: email.split("@")[0] });
  };
  const signup = async (name: string, email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 600));
    setUser({ email, name });
  };
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
