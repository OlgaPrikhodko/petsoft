import AuthForm from "@/components/AuthForm";
import H1 from "@/components/H1";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main>
      <H1 className="mb-5 text-center">Log In</H1>

      <AuthForm type="logIn" />

      <p className="mt-6 text-sm text-zinc-500">
        No account account yet?{" "}
        <Link href="/signup" className="font-medium">
          Sign up
        </Link>
      </p>
    </main>
  );
}
