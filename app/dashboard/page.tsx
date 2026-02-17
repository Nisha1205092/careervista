"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import ResumeUpload from "@/components/resume/ResumeUpload";
import CareerTimeline, { type TimelineVariant } from "@/components/visualization/CareerTimeline";
import OptimizeButton from "@/components/resume/OptimizeButton";
import type { ParsedResume } from "@/types/resume.types";

const TIMELINE_VARIANTS: { value: TimelineVariant; label: string }[] = [
  { value: "horizontal", label: "Horizontal" },
  { value: "horizontalCardsAbove", label: "Horizontal (cards above)" },
  { value: "horizontalStepper", label: "Horizontal (stepper)" },
  { value: "horizontalAlternating", label: "Horizontal (alternating)" },
  { value: "horizontalPill", label: "Horizontal (pill nodes)" },
  { value: "zigzag", label: "Vertical zigzag" },
  { value: "dateFirst", label: "Date-first rows" },
  { value: "twoColumn", label: "Two columns" },
  { value: "bento", label: "Bento grid" },
];

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [timelineVariant, setTimelineVariant] = useState<TimelineVariant>("horizontal");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-semibold text-blue-600 hover:text-blue-500">
            CareerVista
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Dashboard</span>
            <button
              onClick={() => {
                logout();
                router.push("/");
                router.refresh();
              }}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl space-y-8 px-4 py-8">
        <ResumeUpload onUploadSuccess={setParsedResume} />
        {parsedResume && (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Timeline style:
              </span>
              <select
                value={timelineVariant}
                onChange={(e) => setTimelineVariant(e.target.value as TimelineVariant)}
                className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
              >
                {TIMELINE_VARIANTS.map((v) => (
                  <option key={v.value} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <CareerTimeline data={parsedResume} variant={timelineVariant} />
          </>
        )}
        <OptimizeButton />
      </main>
    </div>
  );
}
