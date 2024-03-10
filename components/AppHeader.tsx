"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  { label: "Dashboard", path: "/app/dashboard" },
  { label: "Account", path: "/app/account" },
];

export default function AppHeader() {
  const activePathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-white/10 p-2">
      <Logo />

      <nav>
        <ul className="text-md flex gap-x-2 text-lg">
          {routes.map((route) => (
            <li key={route.label}>
              <Link
                href={route.path}
                className={cn(
                  "rounded-sm px-2 py-1 text-white/70 transition hover:text-white focus:text-white",
                  {
                    "bg-black/10 text-white": activePathname === route.path,
                  },
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
