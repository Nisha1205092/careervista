"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { logout as logoutService } from "@/services/auth.service";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string, refreshToken?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_TOKEN_KEY = "careervista-auth-token";
const REFRESH_TOKEN_KEY = "careervista-refresh-token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Group token + mounted into a single state object to avoid multiple
  // synchronous setState calls inside useEffect (which can trigger
  // cascading renders in React strict mode).
  const [state, setState] = useState<{
    token: string | null;
    mounted: boolean;
  }>({
    token: null,
    mounted: false,
  });

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem(AUTH_TOKEN_KEY)
        : null;
    // Defer the update to avoid calling setState synchronously inside the effect
    // which can trigger cascading renders in some React lint rules / strict mode.
    Promise.resolve().then(() => setState({ token: stored, mounted: true }));
  }, []);

  const login = useCallback((newToken: string, refreshToken?: string) => {
    setState((prev) => ({ ...prev, token: newToken }));
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, newToken);
      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }
    }
  }, []);

  const logout = useCallback(() => {
    const currentToken = state.token;
    setState((prev) => ({ ...prev, token: null }));
    if (currentToken) {
      logoutService(currentToken);
    }
  }, [state.token]);

  if (!state.mounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!state.token,
        token: state.token,
        login,
        logout,
      }}
    >
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
