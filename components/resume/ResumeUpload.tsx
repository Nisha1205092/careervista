"use client";

import { useState, useCallback } from "react";
import { uploadResume } from "@/services/resume.service";
import type { ParsedResume } from "@/types/resume.types";
import { MAX_RESUME_SIZE_BYTES } from "@/lib/constants";

interface ResumeUploadProps {
  onUploadSuccess: (data: ParsedResume) => void;
}

export default function ResumeUpload({ onUploadSuccess }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = useCallback((f: File): string | null => {
    if (f.type !== "application/pdf") {
      return "Only PDF files are allowed.";
    }
    if (f.size > MAX_RESUME_SIZE_BYTES) {
      return `File size exceeds 2 MB limit. Your file is ${(f.size / 1024 / 1024).toFixed(2)} MB.`;
    }
    return null;
  }, []);

  function handleFileSelect(selectedFile: File | null) {
    setError("");
    if (!selectedFile) {
      setFile(null);
      return;
    }
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      setFile(null);
      return;
    }
    setFile(selectedFile);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    handleFileSelect(selected);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0] ?? null;
    if (dropped) handleFileSelect(dropped);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave() {
    setDragActive(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const result = await uploadResume(file);

      if (result.success && result.data) {
        onUploadSuccess(result.data);
      } else {
        setError(result.message || "Upload failed");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Upload Resume
      </h2>
      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        PDF only, max 2 MB. Drag and drop or click to browse.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition-colors ${
            dragActive
              ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30"
              : "border-zinc-300 dark:border-zinc-600"
          }`}
        >
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleInputChange}
            className="hidden"
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            className="cursor-pointer text-center text-sm text-zinc-600 dark:text-zinc-400"
          >
            Click to browse or drag and drop your resume (PDF)
          </label>
          {file && (
            <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </p>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <button
          type="submit"
          disabled={!file || loading}
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>
      </form>
    </div>
  );
}
