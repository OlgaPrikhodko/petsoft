import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/BackgroundPattern";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/contexts/PetContextProvider";
import SearchContextProvider from "@/contexts/SearchContextProvider";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const pets = await prisma.pet.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <>
      <BackgroundPattern />
      <div className="mx-auto flex min-h-screen max-w-[1050px] flex-col px-4">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>

      <Toaster position="top-right" />
    </>
  );
};
export default Layout;
