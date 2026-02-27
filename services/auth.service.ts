import api from "@/lib/api";
import { AxiosError } from "axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  fullName: string;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  token?: string;
  refreshToken?: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResult> {
  try {
    const response = await api.post("/v1/login", {
      email: credentials.email,
      password: credentials.password,
    });

    const { access_token, refresh_token } = response.data.data;
    return { success: true, token: access_token, refreshToken: refresh_token };
  } catch (error) {
    const axiosError = error as AxiosError<{ detail: string }>;
    const message =
      axiosError.response?.data?.detail ?? "Invalid email or password";
    return { success: false, message };
  }
}

export async function signup(credentials: SignupCredentials): Promise<AuthResult> {
  try {
    const response = await api.post("/v1/register", {
      email: credentials.email,
      name: credentials.fullName,
      password: credentials.password,
    });

    const { access_token, refresh_token } = response.data.data;
    return { success: true, token: access_token, refreshToken: refresh_token };
  } catch (error) {
    const axiosError = error as AxiosError<{ detail: string }>;
    const message =
      axiosError.response?.data?.detail ?? "Registration failed";
    return { success: false, message };
  }
}

export async function logout(token: string): Promise<void> {
  try {
    await api.post(
      "/v1/logout",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch {
    // JWT is stateless — proceed with local cleanup regardless
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem("careervista-auth-token");
      localStorage.removeItem("careervista-refresh-token");
    }
  }
}
