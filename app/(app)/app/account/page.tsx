import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/H1";
import SignOutBtn from "@/components/SignOutBtn";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="flex h-[500px] flex-col items-center justify-center gap-y-3">
        <p>Logged in as {session.user.email}</p>
        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}
