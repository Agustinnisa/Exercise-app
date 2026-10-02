import Link from "next/link";
import {
  CheckCircle2,
  Code2,
  Compass,
  Lightbulb,
  Rocket,
  ShieldCheck,
  UserCheck,
  ArrowRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const values = [
  "Simple, maintainable solutions over complexity",
  "Clear communication throughout every project",
  "Design and engineering that work together",
];

const stats = [
  { value: "20+", label: "Projects shipped" },
  { value: "5+", label: "Years building" },
  { value: "10+", label: "Happy clients" },
  { value: "3", label: "Core services" },
];

const pillars = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We adopt modern technologies and patterns to build forward-looking applications.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Reliability",
    description:
      "Clean code, performance-optimized, and thoroughly tested before delivery.",
  },
  {
    icon: Compass,
    title: "User-Centered Design",
    description:
      "Every pixel and interaction is crafted to solve real problems seamlessly.",
  },
];

export default function About() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      {/* Hero / About Main Section */}
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">
              About Us
            </p>

            {/* Mengubah tracking-tight menjadi tracking-normal dan menambahkan leading-snug / leading-[1.15] */}
            <h1 className="mt-2 text-4xl font-bold leading-snug tracking-normal md:text-5xl md:leading-[1.15]">
              We build modern digital experiences that scale.
            </h1>

            {/* Menambahkan leading-relaxed agar paragraf deskripsi juga lebih nyaman dibaca */}
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
              We are a team passionate about building useful digital products and
              experiences — focused on clarity, craft, and outcomes that matter.
            </p>

            <ul className="mt-8 space-y-3">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{value}</span>
                </li>
              ))}
            </ul>
          </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Elemen Dekoratif Aksen Gradien Khas Home */}
              <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-primary/5 transition-all group-hover:bg-primary/10" />

              <p className="relative text-3xl font-extrabold tracking-tight text-primary transition-colors group-hover:scale-105">
                {stat.value}
              </p>
              <p className="relative mt-1 text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section Tambahan 1: Core Pillars / How We Work */}
      <div className="border-t border-border/40 bg-accent/30 py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">
              Our Principles
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              How we approach every project
            </h2>
            <p className="mt-3 text-muted-foreground">
              A clear methodology that ensures quality results without
              unnecessary friction.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Elemen Dekoratif Gradien Pojok */}
                <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-primary/5 transition-all group-hover:bg-primary/10" />

                <div className="relative mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </div>
                <h3 className="relative text-lg font-bold group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Tambahan 2: CTA Callout Banner */}
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="group relative overflow-hidden rounded-3xl border border-primary/30 bg-primary/5 px-8 py-12 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10">
          {/* Pendaran Light Beam Khas CTA Home */}
          <div className="absolute -top-12 left-1/2 -z-10 h-32 w-64 -translate-x-1/2 rounded-full bg-primary/15 blur-2xl" />

          <h2 className="text-2xl font-bold md:text-3xl">
            Ready to bring your ideas to life?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Whether you need web development, UI engineering, or technical
            consultation, we are here to help.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-6 shadow-md transition-all hover:shadow-lg active:scale-95",
              )}
            >
              Get in Touch
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="/profile"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-border/80 px-6 backdrop-blur-sm transition-all hover:bg-accent/50 active:scale-95",
              )}
            >
              View Team Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
