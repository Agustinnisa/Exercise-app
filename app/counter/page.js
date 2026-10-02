"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Minus, RotateCcw, Trash2, Trophy, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "multi_counters_v2";

export default function AdvancedMultiCounter() {
  const [counters, setCounters] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        } catch (e) {
          console.error("Gagal membaca localStorage:", e);
        }
      }
    }
    return [];
  });

  const [newTitle, setNewTitle] = useState("");
  const [newGoal, setNewGoal] = useState("10");
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
  }, [counters]);

  const handleAddCounter = () => {
    if (!newTitle.trim()) {
      inputRef.current?.focus();
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: newTitle.trim(),
      count: 0,
      goal: Number(newGoal) > 0 ? Number(newGoal) : 10,
      color: "from-primary/20 to-primary/5",
    };

    setCounters((prev) => [...prev, newItem]);
    setNewTitle("");
    setNewGoal("10");
    inputRef.current?.focus();
  };

  const updateCount = (id, delta) => {
    setCounters((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextCount = Math.max(0, c.count + delta);
          return { ...c, count: nextCount };
        }
        return c;
      })
    );
  };

  const resetCount = (id) => {
    setCounters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, count: 0 } : c))
    );
  };

  const deleteCounter = (id) => {
    setCounters((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section className="relative min-h-screen">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold tracking-wide text-primary uppercase flex items-center gap-1.5">
              <Sparkles className="size-4" /> Productivity Tracker
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Smart Counter Hub
            </h1>
            
            <p className="text-muted-foreground text-base max-w-xl">
              Kelola berbagai target harianmu dengan tracker counter interaktif.
            </p>

            <p className="text-sm text-muted-foreground pt-3 max-w-xl leading-relaxed">
              <span className="font-semibold text-foreground">Cara Pakai:</span> Ketik nama & target pada formulir di kanan, lalu klik tombol <span className="font-semibold text-foreground">+ Buat</span>. Gunakan tombol <span className="font-semibold text-foreground">(+)</span> atau <span className="font-semibold text-foreground">(-)</span> pada tiap kartu untuk mengubah nilai counter.
            </p>
          </div>

          {/* Form Input Section */}
          <div className="flex gap-2 items-center bg-card/80 p-2 rounded-2xl border border-border/60 backdrop-blur-md shadow-md shrink-0">
            <Input
              ref={inputRef}
              placeholder="Nama counter (misal: Dzikir, Buku)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCounter();
              }}
              className="w-48 md:w-60 border-none bg-transparent focus-visible:ring-0 shadow-none"
            />
            <Input
              type="number"
              placeholder="Target"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCounter();
              }}
              className="w-20 border-none bg-transparent focus-visible:ring-0 shadow-none text-center"
            />
            <Button 
              type="button" 
              onClick={handleAddCounter} 
              size="sm" 
              className="rounded-xl px-4 font-semibold cursor-pointer"
            >
              <Plus className="size-4 mr-1" /> Buat
            </Button>
          </div>
        </div>

        {/* Tampilan Ketika Kosong (Empty State) */}
        {counters.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/30 p-12 text-center backdrop-blur-sm">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                if (!newTitle.trim()) {
                  inputRef.current?.focus();
                } else {
                  handleAddCounter();
                }
              }}
              className="size-16 rounded-2xl bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 mb-4 transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              title="Klik untuk membuat counter atau fokus ke input"
            >
              <Plus className="size-8" />
            </Button>
            <h3 className="text-lg font-semibold text-foreground">Belum ada counter aktif</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-sm">
              Mulai buat counter pertamamu menggunakan formulir di atas untuk melacak aktivitas atau target harianmu.
            </p>
          </div>
        ) : (
          /* List Counter Grid */
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {counters.map((item) => {
              const percentage = Math.min(100, Math.round((item.count / item.goal) * 100));
              const isCompleted = item.count >= item.goal;

              return (
                <Card
                  key={item.id}
                  className="group relative overflow-hidden border border-border/60 bg-card/60 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className={`absolute top-0 right-0 h-28 w-28 rounded-bl-full bg-linear-to-br ${item.color} transition-all group-hover:scale-110 pointer-events-none`} />

                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0 relative z-10">
                    <CardTitle className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
                      {item.name}
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-xs bg-emerald-500/15 text-emerald-500 px-2 py-0.5 rounded-full font-semibold">
                          <Trophy className="size-3" /> Done!
                        </span>
                      )}
                    </CardTitle>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteCounter(item.id)}
                      className="relative z-20 size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      title="Hapus counter"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </CardHeader>

                  <CardContent className="space-y-6 pt-2 relative z-10">
                    <div className="flex items-baseline justify-between">
                      <span className="text-5xl font-black tracking-tight text-foreground">
                        {item.count}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                        <Target className="size-3.5" /> Target: {item.goal}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progres</span>
                        <span className="font-semibold text-foreground">{percentage}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted/60">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isCompleted ? "bg-emerald-500" : "bg-primary"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => updateCount(item.id, -1)}
                        className="size-10 rounded-xl border-border/60 bg-background/50 hover:bg-accent transition-all active:scale-95 cursor-pointer"
                      >
                        <Minus className="size-4" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => resetCount(item.id)}
                        className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <RotateCcw className="size-3.5 mr-1" /> Reset
                      </Button>

                      <Button
                        type="button"
                        onClick={() => updateCount(item.id, 1)}
                        className="size-10 rounded-xl bg-primary text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-95 cursor-pointer"
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}