"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorite } from "@/context/FavoriteContext";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/ThemeToogle";
import { Menu, X } from "lucide-react";

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
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const favoriteCount = Array.isArray(favorites) ? favorites.length : 0;

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-4">
      <nav className="flex flex-col rounded-3xl border border-neutral-200/85 bg-white/80 px-6 py-3 shadow-xl shadow-neutral-900/5 backdrop-blur-xl transition-all dark:border-white/10 dark:bg-neutral-950/80 dark:shadow-black/30">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 text-base font-extrabold tracking-tight text-neutral-900 transition-opacity hover:opacity-80 dark:text-white md:text-lg"
          >
            Rasuna<span className="text-primary">Said</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-1 text-sm text-neutral-600 sm:flex dark:text-neutral-400">
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
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:text-neutral-900 dark:hover:text-white",
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
                "rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:text-neutral-900 dark:hover:text-white",
                pathname === "/favorites"
                  ? "bg-primary/10 font-semibold text-primary ring-1 ring-primary/30 dark:bg-primary/20"
                  : "text-neutral-600 dark:text-neutral-400"
              )}
            >
              Favorite ({favoriteCount})
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Tombol Auth (Login / Logout) untuk Desktop */}
            <div className="hidden sm:inline-flex">
              {isLoggedIn ? (
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className={cn(
                      buttonVariants({ size: "sm", variant: "outline" }),
                      "rounded-full px-4"
                    )}
                  >
                    Logout
                  </button>
                </form>
              ) : (
                <Link
                  href="/login"
                  className={cn(buttonVariants({ size: "sm" }), "rounded-full px-4")}
                >
                  Login
                </Link>
              )}
            </div>

            {/* Tombol Hamburger Mobile */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-full p-2 text-neutral-700 hover:bg-neutral-100 sm:hidden dark:text-neutral-200 dark:hover:bg-neutral-800"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="flex flex-col gap-2 pt-4 pb-2 sm:hidden border-t border-neutral-200/60 dark:border-white/10 mt-3">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 font-semibold text-primary dark:bg-primary/20"
                      : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/favorites"
              onClick={() => setIsOpen(false)}
              className={cn(
                "rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                pathname === "/favorites"
                  ? "bg-primary/10 font-semibold text-primary dark:bg-primary/20"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
              )}
            >
              Favorite ({favoriteCount})
            </Link>

            <div className="mt-2 w-full pt-2 border-t border-neutral-200/40 dark:border-white/5">
              {isLoggedIn ? (
                <form action="/auth/signout" method="post" className="w-full">
                  <button
                    type="submit"
                    className={cn(
                      buttonVariants({ size: "default", variant: "outline" }),
                      "w-full rounded-full font-semibold shadow-sm"
                    )}
                  >
                    Logout
                  </button>
                </form>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "w-full rounded-full font-semibold shadow-sm"
                  )}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}