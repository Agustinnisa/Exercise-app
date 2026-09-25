"use client";

import { useState } from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CounterPage() {
  const [count, setCount] = useState(0);

  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        {/* Header Halaman (Selaras dengan halaman lainnya) */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Interactive Tool
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Counter App
          </h1>
          <p className="mt-4 text-muted-foreground">
            A simple state management demonstration using React useState hook.
          </p>
        </div>

        {/* Counter Card Display */}
        <div className="mt-12 max-w-md">
          <Card className="border border-border/60 bg-card/60 backdrop-blur-md shadow-xl">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Current Value
              </span>

              {/* Display Angka */}
              <div className="my-6 text-6xl font-extrabold tracking-tight text-foreground md:text-7xl">
                {count}
              </div>

              {/* Action Buttons */}
              <div className="flex w-full items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCount(count - 1)}
                  className="size-11 rounded-full border-border/80 bg-background/50 hover:bg-accent hover:text-foreground transition-all active:scale-95"
                  aria-label="Decrease"
                >
                  <Minus className="size-5" />
                </Button>

                <Button
                  onClick={() => setCount(0)}
                  variant="outline"
                  className="rounded-full border-border/80 bg-background/50 px-5 font-semibold transition-all hover:bg-accent hover:text-foreground active:scale-95"
                >
                  <RotateCcw className="mr-2 size-4" />
                  Reset
                </Button>

                <Button
                  onClick={() => setCount(count + 1)}
                  className="size-11 rounded-full bg-primary text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-md hover:shadow-primary/20 active:scale-95"
                  aria-label="Increase"
                >
                  <Plus className="size-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}