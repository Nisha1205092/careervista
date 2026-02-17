"use client";

import type { ParsedResume, Education, Experience } from "@/types/resume.types";

export type TimelineVariant =
  | "horizontal"
  | "horizontalCardsAbove"
  | "horizontalStepper"
  | "horizontalAlternating"
  | "horizontalPill"
  | "zigzag"
  | "dateFirst"
  | "twoColumn"
  | "bento";

interface CareerTimelineProps {
  data: ParsedResume;
  variant?: TimelineVariant;
}

const CARD_CLASS =
  "rounded-md border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50";

function ExperienceCard({
  exp,
  className = "",
}: {
  exp: Experience;
  className?: string;
}) {
  return (
    <div className={`${CARD_CLASS} ${className}`}>
      <p className="font-semibold text-zinc-900 dark:text-zinc-50">{exp.company}</p>
      {exp.role && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{exp.role}</p>
      )}
      {exp.dates && (
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">{exp.dates}</p>
      )}
    </div>
  );
}

function EducationCard({
  edu,
  className = "",
}: {
  edu: Education;
  className?: string;
}) {
  return (
    <div className={`${CARD_CLASS} ${className}`}>
      <p className="font-semibold text-zinc-900 dark:text-zinc-50">{edu.institution}</p>
      {edu.degree && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{edu.degree}</p>
      )}
      {edu.dates && (
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">{edu.dates}</p>
      )}
    </div>
  );
}

export default function CareerTimeline({ data, variant = "horizontal" }: CareerTimelineProps) {
  const { education, experience } = data;
  const experienceReversed = [...experience].reverse();
  const educationReversed = [...education].reverse();

  const sectionTitle = "mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400";

  // --- Horizontal: Cards above line ---
  if (variant === "horizontalCardsAbove") {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Career Timeline</h2>
        <div className="space-y-10">
          {experienceReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Experience</h3>
              <div className="flex overflow-x-auto pb-2">
                <div className="relative flex shrink-0 gap-8 px-4">
                  {experienceReversed.map((exp, i) => (
                    <div key={i} className="flex shrink-0 flex-col items-center justify-between">
                      <div className="mb-4 w-44">
                        <ExperienceCard exp={exp} />
                      </div>
                      <div className="flex h-6 shrink-0 items-center justify-center">
                        <span className="z-10 h-3 w-3 rounded-full bg-blue-500" />
                      </div>
                    </div>
                  ))}
                  <div className="absolute inset-x-0 bottom-3 h-0.5 bg-zinc-200 dark:bg-zinc-700" aria-hidden="true" />
                </div>
              </div>
            </section>
          )}
          {educationReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Education</h3>
              <div className="flex overflow-x-auto pb-2">
                <div className="relative flex shrink-0 gap-8 px-4">
                  {educationReversed.map((edu, i) => (
                    <div key={i} className="flex shrink-0 flex-col items-center justify-between">
                      <div className="mb-4 w-44">
                        <EducationCard edu={edu} />
                      </div>
                      <div className="flex h-6 shrink-0 items-center justify-center">
                        <span className="z-10 h-3 w-3 rounded-full bg-emerald-500" />
                      </div>
                    </div>
                  ))}
                  <div className="absolute inset-x-0 bottom-3 h-0.5 bg-zinc-200 dark:bg-zinc-700" aria-hidden="true" />
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // --- Horizontal: Stepper (numbered) ---
  if (variant === "horizontalStepper") {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Career Timeline</h2>
        <div className="space-y-10">
          {experienceReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Experience</h3>
              <div className="flex items-start overflow-x-auto pb-2">
                <div className="relative flex shrink-0 gap-8 px-4">
                  <div className="absolute inset-x-0 top-4 h-0.5 bg-zinc-200 dark:bg-zinc-700" aria-hidden="true" />
                  {experienceReversed.map((exp, i) => (
                    <div key={i} className="flex shrink-0 flex-col items-center">
                      <span className="z-10 mb-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <div className="w-44">
                        <ExperienceCard exp={exp} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          {educationReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Education</h3>
              <div className="flex items-start overflow-x-auto pb-2">
                <div className="relative flex shrink-0 gap-8 px-4">
                  <div className="absolute inset-x-0 top-4 h-0.5 bg-zinc-200 dark:bg-zinc-700" aria-hidden="true" />
                  {educationReversed.map((edu, i) => (
                    <div key={i} className="flex shrink-0 flex-col items-center">
                      <span className="z-10 mb-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <div className="w-44">
                        <EducationCard edu={edu} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // --- Horizontal: Alternating above/below ---
  // Each column has three inner boxes: (1) card or empty, (2) line + dot, (3) empty or card
  if (variant === "horizontalAlternating") {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Career Timeline</h2>
        <div className="space-y-10">
          {experienceReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Experience</h3>
              <div className="flex overflow-x-auto pb-2">
                <div className="flex shrink-0 px-4">
                  {experienceReversed.map((exp, i) => (
                    <div key={i} className="flex shrink-0 flex-col items-center">
                      {/* Box 1: above line — fixed height so line stays continuous */}
                      <div className="flex h-32 w-44 items-end justify-center pb-3">
                        {i % 2 === 0 ? <ExperienceCard exp={exp} /> : null}
                      </div>
                      {/* Box 2: straight line + dot */}
                      <div className="flex h-6 w-44 items-center">
                        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" aria-hidden="true" />
                        <span className="z-10 h-3 w-3 shrink-0 rounded-full bg-blue-500" />
                        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" aria-hidden="true" />
                      </div>
                      {/* Box 3: below line — same fixed height as box 1 */}
                      <div className="flex h-32 w-44 items-start justify-center pt-3">
                        {i % 2 === 1 ? <ExperienceCard exp={exp} /> : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          {educationReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Education</h3>
              <div className="flex overflow-x-auto pb-2">
                <div className="flex shrink-0 px-4">
                  {educationReversed.map((edu, i) => (
                    <div key={i} className="flex shrink-0 flex-col items-center">
                      {/* Box 1: above line — fixed height so line stays continuous */}
                      <div className="flex h-32 w-44 items-end justify-center pb-3">
                        {i % 2 === 0 ? <EducationCard edu={edu} /> : null}
                      </div>
                      {/* Box 2: straight line + dot */}
                      <div className="flex h-6 w-44 items-center">
                        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" aria-hidden="true" />
                        <span className="z-10 h-3 w-3 shrink-0 rounded-full bg-emerald-500" />
                        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" aria-hidden="true" />
                      </div>
                      {/* Box 3: below line — same fixed height as box 1 */}
                      <div className="flex h-32 w-44 items-start justify-center pt-3">
                        {i % 2 === 1 ? <EducationCard edu={edu} /> : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // --- Horizontal: Pill nodes ---
  if (variant === "horizontalPill") {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Career Timeline</h2>
        <div className="space-y-10">
          {experienceReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Experience</h3>
              <div className="flex items-start overflow-x-auto pb-2">
                <div className="relative flex shrink-0 gap-8 px-4">
                  <div className="absolute inset-x-0 top-3 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700" aria-hidden="true" />
                  {experienceReversed.map((exp, i) => (
                    <div key={i} className="flex shrink-0 flex-col items-center">
                      <span className="z-10 mb-4 rounded-full bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white">
                        {i + 1}
                      </span>
                      <div className="w-44">
                        <ExperienceCard exp={exp} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          {educationReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Education</h3>
              <div className="flex items-start overflow-x-auto pb-2">
                <div className="relative flex shrink-0 gap-8 px-4">
                  <div className="absolute inset-x-0 top-3 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700" aria-hidden="true" />
                  {educationReversed.map((edu, i) => (
                    <div key={i} className="flex shrink-0 flex-col items-center">
                      <span className="z-10 mb-4 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white">
                        {i + 1}
                      </span>
                      <div className="w-44">
                        <EducationCard edu={edu} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // --- Vertical zigzag ---
  if (variant === "zigzag") {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Career Timeline
        </h2>
        <div className="space-y-10">
          {experienceReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Experience</h3>
              <div className="relative flex flex-col">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-zinc-200 dark:bg-zinc-700" aria-hidden="true" />
                {experienceReversed.map((exp, i) => (
                  <div key={i} className="relative flex w-full items-center gap-4 py-4">
                    <div className="flex-1 pr-4 text-right">
                      {i % 2 === 0 ? <ExperienceCard exp={exp} /> : null}
                    </div>
                    <div className="z-10 shrink-0">
                      <span className="block h-3 w-3 rounded-full bg-blue-500" />
                    </div>
                    <div className="flex-1 pl-4 text-left">
                      {i % 2 === 1 ? <ExperienceCard exp={exp} /> : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {educationReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Education</h3>
              <div className="relative flex flex-col">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-zinc-200 dark:bg-zinc-700" aria-hidden="true" />
                {educationReversed.map((edu, i) => (
                  <div key={i} className="relative flex w-full items-center gap-4 py-4">
                    <div className="flex-1 pr-4 text-right">
                      {i % 2 === 0 ? <EducationCard edu={edu} /> : null}
                    </div>
                    <div className="z-10 shrink-0">
                      <span className="block h-3 w-3 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex-1 pl-4 text-left">
                      {i % 2 === 1 ? <EducationCard edu={edu} /> : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // --- Option B: Date-first rows ---
  if (variant === "dateFirst") {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Career Timeline
        </h2>
        <div className="space-y-8">
          {experienceReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Experience</h3>
              <div className="relative flex flex-col pl-4 before:absolute before:left-[3px] before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-700">
                {experienceReversed.map((exp, i) => (
                  <div key={i} className="relative flex gap-4 py-3">
                    <span className="absolute -left-4 top-5 h-2 w-2 rounded-full bg-blue-500" />
                    <div className="shrink-0">
                      <span className="inline-flex rounded-md bg-zinc-200 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                        {exp.dates ?? "—"}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-50">{exp.company}</p>
                      {exp.role && (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{exp.role}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {educationReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Education</h3>
              <div className="relative flex flex-col pl-4 before:absolute before:left-[3px] before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-700">
                {educationReversed.map((edu, i) => (
                  <div key={i} className="relative flex gap-4 py-3">
                    <span className="absolute -left-4 top-5 h-2 w-2 rounded-full bg-emerald-500" />
                    <div className="shrink-0">
                      <span className="inline-flex rounded-md bg-zinc-200 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                        {edu.dates ?? "—"}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-50">{edu.institution}</p>
                      {edu.degree && (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{edu.degree}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // --- Option C: Two-column vertical timelines ---
  if (variant === "twoColumn") {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Career Timeline
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {experienceReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Experience</h3>
              <div className="relative flex flex-col pl-6 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-700">
                {experienceReversed.map((exp, i) => (
                  <div key={i} className="relative flex gap-4 pb-6">
                    <span className="absolute -left-6 top-2 h-2 w-2 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <ExperienceCard exp={exp} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {educationReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Education</h3>
              <div className="relative flex flex-col pl-6 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-700">
                {educationReversed.map((edu, i) => (
                  <div key={i} className="relative flex gap-4 pb-6">
                    <span className="absolute -left-6 top-2 h-2 w-2 rounded-full bg-emerald-500" />
                    <div className="flex-1">
                      <EducationCard edu={edu} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // --- Bento grid ---
  if (variant === "bento") {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Career Timeline
        </h2>
        <div className="space-y-8">
          {experienceReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Experience</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {experienceReversed.map((exp, i) => (
                  <div key={i} className="relative">
                    {exp.dates && (
                      <span className="absolute right-3 top-3 rounded bg-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400">
                        {exp.dates}
                      </span>
                    )}
                    <ExperienceCard exp={exp} className="h-full" />
                  </div>
                ))}
              </div>
            </section>
          )}
          {educationReversed.length > 0 && (
            <section>
              <h3 className={sectionTitle}>Education</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {educationReversed.map((edu, i) => (
                  <div key={i} className="relative">
                    {edu.dates && (
                      <span className="absolute right-3 top-3 rounded bg-zinc-200 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400">
                        {edu.dates}
                      </span>
                    )}
                    <EducationCard edu={edu} className="h-full" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // --- Default: Horizontal ---
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Career Timeline
      </h2>
      <div className="space-y-10">
        {experienceReversed.length > 0 && (
          <section>
            <h3 className={sectionTitle}>Experience</h3>
            <div className="flex items-start overflow-x-auto pb-2">
              <div className="relative flex shrink-0 gap-8 px-4">
                <div className="absolute inset-x-0 top-1.5 h-0.5 bg-zinc-200 dark:bg-zinc-700" aria-hidden="true" />
                {experienceReversed.map((exp, i) => (
                  <div key={i} className="flex shrink-0 flex-col items-center">
                    <span className="z-10 mb-4 h-3 w-3 shrink-0 rounded-full bg-blue-500" />
                    <div className="w-44">
                      <ExperienceCard exp={exp} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {educationReversed.length > 0 && (
          <section>
            <h3 className={sectionTitle}>Education</h3>
            <div className="flex items-start overflow-x-auto pb-2">
              <div className="relative flex shrink-0 gap-8 px-4">
                <div className="absolute inset-x-0 top-1.5 h-0.5 bg-zinc-200 dark:bg-zinc-700" aria-hidden="true" />
                {educationReversed.map((edu, i) => (
                  <div key={i} className="flex shrink-0 flex-col items-center">
                    <span className="z-10 mb-4 h-3 w-3 shrink-0 rounded-full bg-emerald-500" />
                    <div className="w-44">
                      <EducationCard edu={edu} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
