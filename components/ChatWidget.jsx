"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // State ID Sesi Anonim
  const [sessionId, setSessionId] = useState("");
  // State Persetujuan Privasi
  const [consent, setConsent] = useState(false);

  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Halo! Saya asisten Virtual Safe Space. Ada yang bisa saya bantu terkait informasi dokumen kesehatan mental atau panduan psikologis?",
    },
  ]);

  // Generate UUID saat komponen dimuat
  useEffect(() => {
    setSessionId(crypto.randomUUID());
  }, []);

  // Auto-scroll ke pesan terbaru saat messages bertambah
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, loading]);

  async function sendMessage(event) {
    event?.preventDefault();
    const message = input.trim();
    if (!message || loading || !consent || !sessionId) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: message,
          sessionId,
          consent,
          consentNoticeVersion: "v1",
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.detail || "Permintaan gagal");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer || "Belum ada jawaban." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Maaf, terjadi kendala: ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* Container Chat Dialog */}
      {open && (
        <section className="flex h-130 w-[420px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-2xl backdrop-blur-md transition-all duration-300">
          {/* Header Chat */}
          <header className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                <Bot className="size-4" />
              </div>
              <div>
                <h3 className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-foreground">
                  Virtual Safe Space
                  <Sparkles className="size-3 text-primary" />
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Asisten Informasi Berbasis Dokumen
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="size-8 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label="Tutup chat"
            >
              <X className="size-4" />
            </Button>
          </header>

          {/* Area Pesan Chat */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3 text-sm scrollbar-thin scrollbar-thumb-muted"
            aria-live="polite"
          >
            {messages.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-full gap-2",
                  item.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {item.role === "assistant" && (
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs mt-0.5">
                    AI
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed text-xs md:text-sm",
                    item.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-xs font-medium shadow-sm whitespace-pre-wrap"
                      : "bg-muted/70 text-foreground border border-border/40 rounded-bl-xs"
                  )}
                >
                  {item.role === "user" ? (
                    item.content
                  ) : (
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
                        hr: ({ node, ...props }) => <hr className="my-2 border-border/60" {...props} />,
                      }}
                    >
                      {item.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {/* Indicator Loading */}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <Loader2 className="size-3.5 animate-spin text-primary" />
                <span>Sedang menganalisis dokumen...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Pesan & UI Pemberitahuan & Checkbox Persetujuan */}
          <div className="border-t border-border/60 bg-background/50 p-3">
            <div className="mb-2.5 rounded-lg border border-border/60 bg-muted/30 p-2.5 text-[11px] leading-relaxed text-muted-foreground">
              <p>
                Dengan mencentang kotak ini, Anda menyetujui pemrosesan percakapan untuk evaluasi kualitas chatbot. Hindari memasukkan nama, alamat, nomor telepon, atau detail sensitif.
              </p>
              <label className="mt-1.5 flex items-start gap-2 cursor-pointer font-medium text-foreground">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 size-3.5 rounded border-border text-primary focus:ring-primary"
                />
                <span>Saya telah membaca dan menyetujui ketentuan di atas.</span>
              </label>
            </div>

            <form onSubmit={sendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tulis pertanyaan..."
                aria-label="Tulis pertanyaan"
                className="flex-1 rounded-full border border-border/80 bg-background px-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading || !consent || !sessionId || !input.trim()}
                className="size-9 shrink-0 rounded-full bg-primary text-primary-foreground shadow-sm hover:opacity-90 disabled:opacity-50"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </div>

          {/* Footer Disclaimer */}
          <p className="bg-background/80 px-4 pb-2 pt-0.5 text-[10px] text-center text-muted-foreground/80">
            Bukan layanan darurat atau pengganti pendamping profesional.
          </p>
        </section>
      )}

      {/* Tombol Floating Action (Trigger Widget) */}
      <Button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Tutup chatbot" : "Buka chatbot"}
        className="size-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
      >
        {open ? (
          <X className="size-6 transition-transform rotate-0" />
        ) : (
          <MessageCircle className="size-6 transition-transform" />
        )}
      </Button>
    </div>
  );
}