// Abstracted resume upload / parsing API - mocked for now. Swap with real backend when ready.

import type { ParsedResume } from "@/types/resume.types";
import { MAX_RESUME_SIZE_BYTES } from "@/lib/constants";

const MOCK_DELAY_MS = 800;

export interface UploadResult {
  success: boolean;
  message?: string;
  data?: ParsedResume;
}

export async function uploadResume(file: File): Promise<UploadResult> {
  if (file.size > MAX_RESUME_SIZE_BYTES) {
    return {
      success: false,
      message: `File size exceeds 2 MB limit. Your file is ${(file.size / 1024 / 1024).toFixed(2)} MB.`,
    };
  }

  if (file.type !== "application/pdf") {
    return {
      success: false,
      message: "Only PDF files are allowed.",
    };
  }

  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  // Mock parsed resume data for visualization
  const mockData: ParsedResume = {
    education: [
      { institution: "University of Example", degree: "B.S. Computer Science", dates: "2016 - 2020" },
      { institution: "Example High School", degree: "High School Diploma", dates: "2012 - 2016" },
    ],
    experience: [
      { company: "Tech Corp", role: "Senior Software Engineer", dates: "2022 - Present" },
      { company: "Startup Inc", role: "Software Engineer", dates: "2020 - 2022" },
      { company: "Dev Agency", role: "Junior Developer", dates: "2019 - 2020" },
    ],
  };

  return { success: true, data: mockData };
}
