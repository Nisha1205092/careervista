// Abstracted auth API - mocked for now. Swap with real backend when ready.

const MOCK_DELAY_MS = 500;

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
}

export async function login(credentials: LoginCredentials): Promise<AuthResult> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  // Mock: accept any non-empty email/password
  if (credentials.email && credentials.password) {
    const mockToken = `mock-token-${Date.now()}`;
    return { success: true, token: mockToken };
  }

  return { success: false, message: "Email and password are required" };
}

export async function signup(credentials: SignupCredentials): Promise<AuthResult> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  // Mock: accept any non-empty credentials
  if (credentials.email && credentials.password && credentials.fullName) {
    const mockToken = `mock-token-${Date.now()}`;
    return { success: true, token: mockToken };
  }

  return { success: false, message: "All fields are required" };
}

export function logout(): void {
  // Clear token from storage when backend is integrated
}
