import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 px-4 dark:bg-zinc-950">
      <h1 className="text-center text-4xl font-bold text-zinc-900 dark:text-zinc-50">
        CareerVista
      </h1>
      <p className="max-w-md text-center text-lg text-zinc-600 dark:text-zinc-400">
        Upload your resume, track your career journey, and get AI-powered updates.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/login"
          className="rounded-md border border-zinc-300 bg-white px-6 py-2 font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className="rounded-md bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Sign up
        </Link>
        <Link
          href="/dashboard"
          className="rounded-md border border-blue-500 px-6 py-2 font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
