import { login, signup } from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-md px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Account
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Welcome back
          </h1>
          <p className="mt-4 text-muted-foreground">
            Login untuk melihat daftar favorite kamu, atau buat akun baru.
          </p>
        </div>

        <Card className="mt-10 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm shadow-sm">
          <CardContent className="p-6">
            <form className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nama kamu (untuk Sign Up)"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimal 6 karakter"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  type="submit"
                  formAction={login}
                  className="rounded-full"
                >
                  Login
                </Button>
                <Button
                  type="submit"
                  formAction={signup}
                  variant="outline"
                  className="rounded-full"
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}