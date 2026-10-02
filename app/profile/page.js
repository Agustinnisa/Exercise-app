"use client";

import { useEffect, useState } from "react";
import { Globe, Mail, MessageCircle, Users, ExternalLink, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stats = [
  { value: "20+", label: "Projects" },
  { value: "5+", label: "Years exp." },
  { value: "10+", label: "Clients" },
];

const social = [
  { icon: Mail, label: "Email", href: "mailto:hello@mywebsite.com" },
  { icon: Globe, label: "Website", href: "/" },
  { icon: MessageCircle, label: "Contact", href: "/contact" },
];

export default function Profile() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setTeamMembers(data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* Kotak Utama Profile */}
          <Card className="group relative overflow-hidden border border-border/60 bg-card/60 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
            {/* Mengubah opacity dari /15 ke /5 agar gradien lebih halus */}
            <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-primary/5 transition-all group-hover:bg-primary/10" />

            <CardContent className="relative flex flex-col items-center p-8 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-linear-to-br from-primary/30 to-primary/10 text-2xl font-bold text-primary ring-2 ring-primary/30">
              MW
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight">MyWebsite Team</h1>
            <p className="text-sm font-medium text-primary/90">Web &amp; Product Development</p>

            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              We build modern, simple, and useful digital experiences for individuals and businesses.
            </p>

            <div className="mt-8 grid w-full grid-cols-3 gap-4 border-t border-border/40 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              {social.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/30 text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section Kartu Anggota Tim */}
        <div className="mt-12">
          <div className="mb-4 px-1">
            <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
              Our Core Team
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="size-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {teamMembers.map((user) => {
                const initials = user.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();

                return (
                  <Link
                    key={user.id}
                    href={`/users/${user.id}`}
                    className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                  >
                    <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-primary/5 transition-all group-hover:bg-primary/10" />

                    <div className="relative flex items-center gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/30 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        {initials}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                          {user.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-primary/80">
                          {user.company?.name || "Company"}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="relative size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                );
              })}
            </div>
          )}

          {/* Tombol Bawah */}
          <div className="mt-6">
            <Link
              href="/users"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full rounded-2xl border-primary/30 bg-primary/5 py-6 font-semibold text-primary shadow-sm transition-all hover:border-primary hover:bg-primary/15 hover:shadow-md hover:shadow-primary/10"
              )}
            >
              <Users className="mr-2 size-5" />
              Explore Full Users List
              <ExternalLink className="ml-2 size-4 opacity-70" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}