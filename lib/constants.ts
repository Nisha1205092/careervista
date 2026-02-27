export const MAX_RESUME_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
export const ALLOWED_MIME_TYPES = ["application/pdf"] as const;
export const ALLOWED_EXTENSIONS = [".pdf"] as const;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
