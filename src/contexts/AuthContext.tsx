import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "professor" | "aluno";

interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const mockUsers: Record<UserRole, User> = {
  admin: { id: "1", name: "Carlos Silva", role: "admin", email: "admin@escola.edu.br" },
  professor: { id: "2", name: "Prof. Ana Santos", role: "professor", email: "ana.santos@escola.edu.br" },
  aluno: { id: "3", name: "João Oliveira", role: "aluno", email: "joao.oliveira@escola.edu.br" },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => setUser(mockUsers[role]);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
