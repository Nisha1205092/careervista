import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 px-4 dark:bg-zinc-950">
      <Link href="/" className="text-xl font-semibold text-blue-600 hover:text-blue-500">
        CareerVista
      </Link>
      <LoginForm />
    </div>
  );
}
