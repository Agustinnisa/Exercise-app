import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Palette,
  Sparkles,
  Users2,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Fast, scalable web applications built with modern tooling, clean architecture, and optimal performance.",
    tag: "Next.js / React",
  },
  {
    icon: Palette,
    title: "UI Development",
    description:
      "Clean, accessible, and responsive interfaces that feel intuitive and engaging on every device.",
    tag: "Tailwind CSS / Design System",
  },
  {
    icon: Users2,
    title: "Consulting",
    description:
      "Practical technical guidance to help you architect, plan, and ship high-quality digital products.",
    tag: "Architecture & Strategy",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-radial-fade opacity-70" />
        <div className="absolute top-1/2 left-1/2 -z-10 h-112.5 w-112.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[130px]" />
        <div className="animate-blob absolute top-20 left-1/4 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="animate-blob absolute top-36 right-1/4 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px] [animation-delay:4s]" />

        <div className="mx-auto max-w-6xl px-6">
          <div className="animate-fade-up mx-auto max-w-3xl text-center">
            {/* Welcome Badge */}
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-md shadow-xs">
              <Sparkles className="size-3.5" />
              <span>Welcome to RasunaSaid</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-gradient pb-2 text-4xl font-extrabold tracking-tight leading-tight md:text-6xl md:leading-[1.12]">
              Build something meaningful with technology.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              We help individuals and businesses build modern, simple, and useful digital experiences.
            </p>

            {/* Call to Actions */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/services"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full px-7 shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-[1.02]"
                )}
              >
                Explore Services
                <ArrowRight className="ml-2 size-4" />
              </Link>

              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-border/80 px-7 backdrop-blur-md transition-all hover:bg-accent/50"
                )}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            Our Expertise
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            What we do best
          </h2>
          <p className="mt-3 text-muted-foreground">
            A focused suite of web development and design solutions tailored for growth.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description, tag }) => (
            <Card
              key={title}
              className="group relative overflow-hidden border border-border/60 bg-card/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-primary/5 transition-all group-hover:bg-primary/10" />
              
              <CardHeader className="relative">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                  {tag}
                </span>
                <CardTitle className="mt-1 text-lg group-hover:text-primary transition-colors">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <span>Learn more</span>
                  <ArrowRight className="size-3.5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-linear-to-b from-card/80 to-card/40 px-8 py-16 text-center shadow-2xl backdrop-blur-xl">
          <div className="bg-grid bg-radial-fade absolute inset-0 opacity-40 -z-10" />
          <div className="absolute -top-24 left-1/2 -z-10 h-48 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[90px]" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Zap className="size-5" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Let&apos;s talk about what you&apos;re building and how we can help make it a success.
            </p>

            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 rounded-full px-8 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
              )}
            >
              Get in touch
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}