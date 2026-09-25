import { Globe, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-3xl px-6 py-20">
        <Card className="border border-white/10 bg-card/60 backdrop-blur-md shadow-xl">
          <CardContent className="flex flex-col items-center p-8 text-center">
            {/* Avatar dengan Ring Aksen */}
            <div className="flex size-20 items-center justify-center rounded-full bg-linear-to-br from-primary/30 to-primary/10 text-2xl font-bold text-primary ring-2 ring-primary/30">
              MW
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight">MyWebsite Team</h1>
            <p className="text-sm font-medium text-primary/90">Web &amp; Product Development</p>

            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              We build modern, simple, and useful digital experiences for individuals and businesses.
            </p>

            <div className="mt-8 grid w-full grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              {social.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-background/30 text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}