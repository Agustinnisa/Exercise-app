"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorite } from "@/context/FavoriteContext";
import ThemeToggle from "@/components/ThemeToogle";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/profile", label: "Profile" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { favorites } = useFavorite();

  const favoriteCount = Array.isArray(favorites) ? favorites.length : 0;

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-4">
      <nav className="flex items-center justify-between gap-6 rounded-full border border-neutral-200/80 bg-white/80 px-6 py-3 shadow-xl shadow-neutral-900/5 backdrop-blur-xl transition-all dark:border-white/10 dark:bg-neutral-950/80 dark:shadow-black/30">
        <Link
          href="/"
          className="shrink-0 text-base font-extrabold tracking-tight text-neutral-900 transition-opacity hover:opacity-80 dark:text-white md:text-lg"
        >
          Rasuna<span className="text-primary">Said</span>
        </Link>

        <div className="hidden items-center gap-2 text-sm text-neutral-600 sm:flex dark:text-neutral-400">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-neutral-900 dark:hover:text-white",
                  isActive
                    ? "bg-primary/10 font-semibold text-primary ring-1 ring-primary/30 dark:bg-primary/20"
                    : "text-neutral-600 dark:text-neutral-400"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/favorites"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-neutral-900 dark:hover:text-white",
              pathname === "/favorites"
                ? "bg-primary/10 font-semibold text-primary ring-1 ring-primary/30 dark:bg-primary/20"
                : "text-neutral-600 dark:text-neutral-400"
            )}
          >
            Favorite ({favoriteCount})
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "default" }),
              "rounded-full px-5 font-semibold shadow-sm transition-all hover:shadow-md hover:shadow-primary/20"
            )}
          >
            Get in touch
          </Link>
        </div>
      </nav>
    </header>
  );
}