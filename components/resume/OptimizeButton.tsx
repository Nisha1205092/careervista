"use client";

import { useState } from "react";
import { optimizeResume } from "@/services/optimization.service";

export default function OptimizeButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleOptimize() {
    setMessage(null);
    setLoading(true);

    try {
      const result = await optimizeResume();
      setMessage(result.message || "Optimization complete");
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        AI Resume Optimization
      </h2>
      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        Get an AI-optimized version of your resume. Integration with the optimization API will be added when ready.
      </p>
      <button
        onClick={handleOptimize}
        disabled={loading}
        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Optimizing..." : "Optimize Resume"}
      </button>
      {message && (
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          {message}
        </p>
      )}
    </div>
  );
}
