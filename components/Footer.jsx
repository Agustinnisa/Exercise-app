import Link from "next/link";
import { Globe, Code, Share2, Mail, ArrowUpRight } from "lucide-react";

const columns = [
  {
    title: "Navigation",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/favorites", label: "Favorite" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/profile", label: "Team Profile" },
      { href: "/users", label: "User Directory" },
      { href: "/messages", label: "Messages (Inbox)" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

const socials = [
  { icon: Globe, href: "https://github.com", label: "Website / Source" },
  { icon: Code, href: "https://github.com", label: "Repository" },
  { icon: Share2, href: "https://twitter.com", label: "Social" },
  { icon: Mail, href: "mailto:hello@mywebsite.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-neutral-200/80 bg-neutral-50 text-neutral-900 transition-colors dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Efek Garis Aksen & Glow Gradient di Atas Footer */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-24 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Bagian Identitas Brand & Bio */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="text-xl font-extrabold tracking-tight">
              Rasuna<span className="text-primary">Said</span>
            </Link>
            <p className="mt-1 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Tria Agusti Khoirun Nisa
            </p>
            <p className="mt-3 max-w-sm text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Helping individuals and businesses build modern, clean, and functional digital experiences using the latest technologies.
            </p>

            {/* Tombol Media Sosial Interaktif */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-300"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Bagian Kolom Tautan Navigasi */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 sm:grid-cols-2">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-bold tracking-wider text-neutral-900 uppercase dark:text-white">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center text-sm text-neutral-600 transition-colors hover:text-primary dark:text-neutral-400 dark:hover:text-primary"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="ml-1 size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Garis Pembatas & Copyright */}
        <div className="mt-16 flex flex-col gap-4 border-t border-neutral-200/80 pt-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-neutral-500">
          <p>© 2026 RasunaSaid. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              System Operational
            </span>
            <span>Built with Next.js &amp; Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Tambahkan default export agar fleksibel untuk kedua jenis import
export default Footer;