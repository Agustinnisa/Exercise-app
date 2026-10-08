import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ErrorPage({ searchParams }) {
  const { message } = await searchParams;

  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-md px-6 py-20">
        <div className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center backdrop-blur-sm shadow-sm">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="size-6" />
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
            Terjadi Kesalahan
          </h1>
          
          <p className="mt-2 text-sm text-muted-foreground">
            {message ?? "Email atau password salah."}
          </p>

          <div className="mt-6">
            <Button asChild className="rounded-full w-full">
              <Link href="/login">Kembali ke Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}