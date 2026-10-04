"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Plus, Minus, RotateCcw, Trash2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CounterPage() {
  const [counters, setCounters] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("counters");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [name, setName] = useState("");
  const [goal, setGoal] = useState("10");

  useEffect(() => {
    localStorage.setItem("counters", JSON.stringify(counters));
  }, [counters]);

  const handleAddCounter = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCounter = {
      id: Date.now().toString(),
      name: name.trim(),
      count: 0,
      goal: Number(goal) || 10,
    };

    setCounters([...counters, newCounter]);
    setName("");
    setGoal("10");
  };

  const handleUpdateCount = (id, delta) => {
    setCounters(
      counters.map((item) => {
        if (item.id === id) {
          const newCount = Math.max(0, item.count + delta);
          return { ...item, count: newCount };
        }
        return item;
      })
    );
  };

  const handleReset = (id) => {
    setCounters(
      counters.map((item) =>
        item.id === id ? { ...item, count: 0 } : item
      )
    );
  };

  const handleDelete = (id) => {
    setCounters(counters.filter((item) => item.id !== id));
  };

  return (
    <section className="relative min-h-screen">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-5xl px-6 py-20">
        {/* Header Section */}
        <div className="border-b border-border/40 pb-6">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">
          PRODUCTIVITY TRACKER
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          Productivity Counter
        </h1>
        <p className="mt-4 text-muted-foreground">
          Kelola berbagai target harianmu dengan tracker counter interaktif.
        </p>

        {/* Poin-Poin Berangka / Step Badges */}
        <div className="mt-6 rounded-xl border border-border/50 bg-card/40 p-4 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            Cara Pakai:
          </p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                1
              </span>
              <span>Isi nama aktivitas dan target jumlah pada formulir di bawah.</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                2
              </span>
              <span>
                Klik tombol <span className="font-semibold text-foreground">+ Buat</span> untuk menambahkan kartu counter baru.
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                3
              </span>
              <span>
                Gunakan tombol <span className="font-semibold text-foreground">(+)</span> atau <span className="font-semibold text-foreground">(-)</span> pada tiap kartu untuk mengubah nilai progres.
              </span>
            </li>
          </ul>
        </div>
      </div>

        {/* Form Tambah Counter */}
        <form onSubmit={handleAddCounter} className="mt-8 flex flex-wrap gap-3">
          <Input
            placeholder="Nama aktivitas (misal: Belajar React)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-xs"
          />
          <Input
            type="number"
            placeholder="Target"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-24"
          />
          <Button type="submit">
            <Plus className="mr-1 size-4" /> Buat
          </Button>
        </form>

        {/* Tampilan Kosong / Grid List Counter */}
        {counters.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border/60 p-8 text-center text-muted-foreground">
            Belum ada counter. Buat counter pertama kamu menggunakan form di atas!
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {counters.map((item) => {
              const progress = Math.min(
                100,
                Math.round((item.count / item.goal) * 100)
              );
              const isCompleted = item.count >= item.goal;

              return (
                <Card
                  key={item.id}
                  className="group relative overflow-hidden border border-border/60 bg-card/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-primary/5 transition-all group-hover:bg-primary/10" />

                  <CardHeader className="relative p-6 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Target className="size-5" />
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        className="size-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>

                    <CardTitle className="mt-4 text-lg transition-colors group-hover:text-primary">
                      {item.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative px-6 pb-6 space-y-4">
                    <div className="flex items-baseline justify-between pt-2">
                      <span className="text-4xl font-extrabold tracking-tight">
                        {item.count}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        Target: {item.goal}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-muted-foreground font-medium">
                        <span>Progres</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className={`h-full transition-all duration-300 ${
                            isCompleted ? "bg-emerald-500" : "bg-primary"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/40">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateCount(item.id, -1)}
                        className="size-9 rounded-lg"
                      >
                        <Minus className="size-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReset(item.id)}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        <RotateCcw className="mr-1 size-3" /> Reset
                      </Button>

                      <Button
                        size="icon"
                        onClick={() => handleUpdateCount(item.id, 1)}
                        className="size-9 rounded-lg"
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