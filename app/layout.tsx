import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetSoft - Pet Daycare Software",
  description: "Take care of people's pets responsibly with PetSoft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-zink-900 min-h-screen bg-[#e5e8ec] text-sm `}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
