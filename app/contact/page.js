"use client";

import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { submitContactForm } from "./action";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@mywebsite.com" },
  { icon: MapPin, label: "Location", value: "Jakarta, Indonesia" },
  { icon: MessageCircle, label: "Response time", value: "Within 1-2 days" },
];

export default function Contact() {
  const {
    name,
    email,
    message,
    submitted,
    setName,
    setEmail,
    setMessage,
    setSubmitted,
  } = useUser();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    const result = await submitContactForm(formData);

    if (result.success) {
      setSubmitted(true);
    } else {
      alert(result.error);
    }
  }

  return (
    <section className="relative min-h-screen">
      {/* Background Grid & Radial Fade */}
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Contact</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Let&apos;s talk
          </h1>
          <p className="mt-4 text-muted-foreground">
            Have a project or question in mind? Send us a message and we&apos;ll get back to you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-5">
          {/* Sidebar Contact Info */}
          <div className="space-y-4 md:col-span-2">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <Card
                key={label}
                className="border border-border/40 bg-card/80 backdrop-blur-md transition-all hover:border-primary/40 shadow-sm"
              >
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-semibold text-foreground">{value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Form Section */}
          <Card className="border border-border/40 bg-card/80 backdrop-blur-md md:col-span-3 shadow-sm">
            <CardContent className="p-6">
              {submitted ? (
                <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 ring-1 ring-primary/20">
                    <Send className="size-6" />
                  </div>
                  <p className="text-xl font-semibold">Message sent!</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks for reaching out — we&apos;ll reply soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-background/80 border-border/60 focus-visible:ring-primary shadow-inner"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background/80 border-border/60 focus-visible:ring-primary shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Tell us about your project..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-xl border border-border/60 bg-background/80 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary shadow-inner"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-full font-semibold shadow-md transition-all hover:shadow-primary/20">
                    Send message
                  </Button>
                </form>
              )}

              {/* Note: Div debug state */}
              <div className="mt-6 rounded-xl border border-border/50 bg-muted/60 dark:bg-background/60 p-4 text-xs font-mono shadow-sm">
                <p><span className="font-semibold text-primary">Name:</span> {name || "(kosong)"}</p>
                <p><span className="font-semibold text-primary">Email:</span> {email || "(kosong)"}</p>
                <p><span className="font-semibold text-primary">Message:</span> {message || "(kosong)"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}