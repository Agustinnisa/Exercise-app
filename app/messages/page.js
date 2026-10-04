import { getMessages } from "@/lib/db";
import { deleteMessageAction } from "./action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, MessageSquare, Mail, User } from "lucide-react";

export default async function MessagesPage() {
  // Ambil pesan langsung dari Vercel KV database
  const messages = await getMessages();

  return (
    <section className="relative min-h-screen">
      {/* Background Grid & Radial Fade */}
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">Inbox</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
              Pesan Masuk
            </h1>
            <p className="mt-2 text-muted-foreground">
              Daftar pesan dan pertanyaan yang dikirimkan melalui form kontak.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/40 bg-card/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur-md shadow-sm">
            <MessageSquare className="size-4 text-primary" />
            <span>Total: <strong className="text-foreground">{messages.length}</strong> pesan</span>
          </div>
        </div>

        {/* Messages List Section */}
        <div className="mt-10 space-y-4">
          {messages.length === 0 ? (
            <Card className="border border-border/40 bg-card/80 backdrop-blur-md shadow-sm">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                  <MessageSquare className="size-6" />
                </div>
                <p className="text-xl font-semibold">Belum ada pesan masuk</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pesan yang dikirimkan melalui halaman contact akan muncul di sini.
                </p>
              </CardContent>
            </Card>
          ) : (
            messages.map((msg) => (
              <Card
                key={msg.id}
                className="group border border-border/40 bg-card/80 backdrop-blur-md transition-all hover:border-primary/40 hover:shadow-lg shadow-sm"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    
                    {/* Informasi Pengirim & Isi Pesan */}
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1.5 font-semibold text-foreground">
                          <User className="size-4 text-primary" />
                          <span>{msg.name}</span>
                        </div>
                        <span className="text-muted-foreground/40">•</span>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Mail className="size-3.5 text-primary/70" />
                          <span>{msg.email}</span>
                        </div>
                      </div>

                      {/* Kotak isi pesan */}
                      <p className="text-sm leading-relaxed text-foreground/90 bg-muted/60 dark:bg-background/60 p-4 rounded-xl border border-border/60 shadow-sm">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex self-end sm:self-center sm:ml-4">
                      <form action={deleteMessageAction}>
                        <input type="hidden" name="id" value={msg.id} />
                        <Button
                          type="submit"
                          size="sm"
                          className="gap-2 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white dark:bg-destructive/15 dark:text-red-400 dark:hover:bg-destructive dark:hover:text-white transition-all duration-200 shadow-sm font-medium cursor-pointer"
                        >
                          <Trash2 className="size-4" />
                          <span>Hapus</span>
                        </Button>
                      </form>
                    </div>

                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}