"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_TOKEN_KEY = "careervista-auth-token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
    if (stored) setToken(stored);
    setMounted(true);
  }, []);

  const login = useCallback((newToken: string) => {
    setToken(newToken);
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, newToken);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
