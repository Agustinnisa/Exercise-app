"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import ThemeToggle from "@/components/ThemeToogle"; // <--- Pakai kurung kurawal {}

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
  const { name, submitted } = useUser();

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-4xl px-4">
      <nav className="flex items-center justify-between gap-4 rounded-full border border-border/60 bg-background/80 px-5 py-2.5 shadow-lg shadow-black/5 backdrop-blur-xl transition-all dark:border-white/10 dark:shadow-black/20">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="shrink-0 text-base font-extrabold tracking-tight text-foreground transition-opacity hover:opacity-80 md:text-lg"
        >
          RasunaSaid
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
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
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 hover:text-foreground",
                isActive 
                  ? "bg-primary/10 font-semibold text-primary ring-1 ring-primary/30" 
                  : "text-muted-foreground"
              )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* User Greeting, Theme Toggle & CTA */}
        <div className="flex items-center gap-3">
          {submitted && (
            <span className="hidden text-sm font-medium text-muted-foreground md:inline-block">
              Hi, <span className="text-primary font-semibold">{name}</span> 👋
            </span>
          )}

          {/* Pemanggilan Komponen ThemeToggle */}
          <ThemeToggle />

          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "default" }), 
              "rounded-full font-semibold shadow-sm transition-all hover:shadow-md hover:shadow-primary/20"
            )}
          >
            Get in touch
          </Link>
        </div>
      </nav>
    </header>
  );
}