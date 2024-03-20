import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/H1";
import SignOutBtn from "@/components/SignOutBtn";
import { checkAuth } from "@/lib/server-utils";

export default async function AccountPage() {
  const session = await checkAuth();

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
