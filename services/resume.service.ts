import api from "@/lib/api";
import { AxiosError } from "axios";
import type { ParsedResume, Education, Experience } from "@/types/resume.types";
import { MAX_RESUME_SIZE_BYTES } from "@/lib/constants";

export interface UploadResult {
  success: boolean;
  message?: string;
  data?: ParsedResume;
}

function toEducation(item: unknown): Education {
  if (typeof item === "string") {
    return { institution: item };
  }
  const d = item as Record<string, string>;
  return {
    institution: d.institution ?? d.degree ?? "Unknown",
    degree: d.degree,
    dates: d.dates,
  };
}

function toExperience(item: unknown): Experience {
  if (typeof item === "string") {
    return { company: item };
  }
  const d = item as Record<string, string>;
  return {
    company: d.company ?? d.role ?? "Unknown",
    role: d.role,
    dates: d.dates,
  };
}

function mapParsedData(raw: Record<string, unknown>): ParsedResume {
  return {
    name: raw.name as string | undefined,
    email: raw.email as string | undefined,
    phone: raw.phone as string | undefined,
    education: ((raw.education as unknown[]) ?? []).map(toEducation),
    experience: ((raw.experience as unknown[]) ?? []).map(toExperience),
    skills: raw.skills as string[] | undefined,
    projects: raw.projects as string[] | undefined,
    certifications: raw.certifications as string[] | undefined,
  };
}

export async function uploadResume(file: File, token: string): Promise<UploadResult> {
  if (file.size > MAX_RESUME_SIZE_BYTES) {
    return {
      success: false,
      message: `File size exceeds 2 MB limit. Your file is ${(file.size / 1024 / 1024).toFixed(2)} MB.`,
    };
  }

  if (file.type !== "application/pdf") {
    return { success: false, message: "Only PDF files are allowed." };
  }

  const authHeader = { Authorization: `Bearer ${token}` };
  const uploadedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  try {
    const formData = new FormData();
    formData.append("name", file.name.replace(/\.pdf$/i, ""));
    formData.append("description", `Uploaded on ${uploadedDate}`);
    formData.append("file", file);

    const uploadResponse = await api.post("/v1/resumes/upload", formData, {
      headers: { ...authHeader, "Content-Type": "multipart/form-data" },
    });

    const resumeId: string = uploadResponse.data.data.id;

    const parseResponse = await api.get("/v1/resumes/parse", {
      params: { resume_id: resumeId },
      headers: authHeader,
    });

    const parsedData = mapParsedData(
      parseResponse.data.data.parsed_data as Record<string, unknown>
    );

    return { success: true, data: parsedData };
  } catch (error) {
    const axiosError = error as AxiosError<{ detail: string }>;
    const message =
      axiosError.response?.data?.detail ?? "Upload failed. Please try again.";
    return { success: false, message };
  }
}
