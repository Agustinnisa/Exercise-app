import Link from "next/link";
import { Code2, LineChart, Palette, Calculator, Scan, Sparkles, ArrowRight, Lightbulb } from "lucide-react";
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

        {/* Header Bagian Interactive Tools & AI Labs */}
        <div className="mt-16 mb-8 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Interactive Tools & AI Labs</h2>
            <p className="text-sm text-muted-foreground">Eksperimen fitur interaktif dan teknologi AI terbaru dari kami.</p>
          </div>
        </div>

        {/* Grid Card Lab dengan Ukuran Sama Persis */}
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Card 1: Counter Playground */}
          <Card className="group relative flex flex-col justify-between overflow-hidden border border-primary/20 bg-card/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 p-6 sm:p-8">
            <div className="absolute -top-12 -right-12 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
                  <Calculator className="size-6" />
                </div>
                <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                  Interactive Lab
                </span>
              </div>

              <CardTitle className="text-2xl font-bold">
                Counter Playground
              </CardTitle>
              <CardDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Uji coba alat penghitung interaktif berbasis manajemen state React hooks yang responsif.
              </CardDescription>
            </div>

            <div className="mt-8 pt-4 border-t border-border/40">
              <Link
                href="/counter"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
              >
                <span>Try Counter Tool</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Card>

          {/* Card 2: Waste Object Detector */}
          <Card className="group relative flex flex-col justify-between overflow-hidden border border-primary/20 bg-card/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 p-6 sm:p-8">
            <div className="absolute -top-12 -right-12 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
                  <Scan className="size-6" />
                </div>
                <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                  AI Computer Vision
                </span>
              </div>

              <CardTitle className="text-2xl font-bold">
                Waste Object Detector
              </CardTitle>
              <CardDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Deteksi dan klasifikasi jenis sampah secara otomatis menggunakan algoritma YOLO dan Computer Vision.
              </CardDescription>
            </div>

            <div className="mt-8 pt-4 border-t border-border/40">
              <Link
                href="/vision"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
              >
                <span>Try Waste Detector</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Card>

          {/* Card 3: Activity Recommender (Ditaruh di bawah, ukuran sama persis dan berada di sisi kiri grid 2 kolom) */}
          <Card className="group relative flex flex-col justify-between overflow-hidden border border-primary/20 bg-card/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 p-6 sm:p-8">
            <div className="absolute -top-12 -right-12 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
                  <Lightbulb className="size-6" />
                </div>
                <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                  AI Recommendation
                </span>
              </div>

              <CardTitle className="text-2xl font-bold">
                Activity Recommender
              </CardTitle>
              <CardDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Sistem rekomendasi personal berbasis aturan & kecocokan profil untuk aktivitas harianmu.
              </CardDescription>
            </div>

            <div className="mt-8 pt-4 border-t border-border/40">
              <Link
                href="/recommendations"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
              >
                <span>Try Recommender</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}