import Link from "next/link";
import { Code2, LineChart, Palette, Calculator, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Build modern web applications with a fast, maintainable codebase — from landing pages to full products.",
  },
  {
    icon: Palette,
    title: "UI Development",
    description:
      "Create clean and responsive interfaces that stay consistent across devices and themes.",
  },
  {
    icon: LineChart,
    title: "Consulting",
    description:
      "Get guidance on architecture, tooling, and roadmap for your digital projects.",
  },
];

export default function ServicesPage() {
  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Services
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-muted-foreground">
            A focused set of services to help you plan, design, and build your next digital product.
          </p>
        </div>

        {/* Grid Layanan Utama */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="group relative overflow-hidden border border-border/60 bg-card/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Mengurangi opacity menjadi /5 agar gradien lebih halus dan menyatu */}
              <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-primary/5 transition-all group-hover:bg-primary/10" />

              <CardHeader className="relative p-6 pb-2">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative px-6 pb-6">
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </CardDescription>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <span>Learn more</span>
                  <ArrowRight className="size-3.5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Card Tambahan: Interactive Playground / Lab ke /counter */}
        <div className="mt-8">
          <Card className="group relative overflow-hidden border border-primary/30 bg-primary/5 backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10">
            {/* Elemen Gradien Lingkaran Khas */}
            <div className="absolute -top-12 left-1/2 -z-10 h-32 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-2xl" />

            <CardHeader className="p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="flex items-start gap-5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                  <Calculator className="size-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                    Interactive Lab
                  </span>
                  <CardTitle className="mt-1 text-2xl font-bold">
                    Counter Playground
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm text-muted-foreground">
                    Try our interactive state management counter tool built with React hooks.
                  </CardDescription>
                </div>
              </div>

              <Link
                href="/counter"
                className="mt-6 sm:mt-0 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
              >
                <span>Try Counter Tool</span>
                <ArrowRight className="size-4" />
              </Link>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}