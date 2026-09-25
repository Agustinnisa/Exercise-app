"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserCard({ user }) {
  const { favorites, toggleFavorite } = useUser();

  // Cek apakah user sudah ada di daftar favorit
  const isFavorite = favorites.some((fav) => fav.id === user.id);

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="group relative overflow-hidden border border-border/60 bg-card/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3.5">
          {/* Avatar Inisial */}
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/30 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            {initials}
          </div>

          <CardTitle className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {user.name}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground truncate">
          {user.email}
        </p>

        <p className="mt-1 text-xs font-medium text-primary/80">
          {user.company?.name || "Company"}
        </p>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center gap-2">
          {/* Tombol View Profile (Warna sama persis dengan Favourite saat aktif) */}
          <Button
            className="flex-1 rounded-full bg-primary text-primary-foreground font-semibold shadow-sm transition-all hover:opacity-90 hover:shadow-md hover:shadow-primary/20"
          >
            View Profile
          </Button>

          {/* Tombol Add Favourite / Favourite */}
          <Button
            onClick={() => toggleFavorite(user)}
            variant={isFavorite ? "default" : "outline"}
            className={`rounded-full font-semibold transition-all ${
              isFavorite
                ? "bg-primary text-primary-foreground border-primary hover:opacity-90 shadow-md shadow-primary/20"
                : "border-border/80 bg-background/50 hover:bg-accent hover:text-foreground"
            }`}
          >
            <Heart
              className={`mr-1.5 size-4 transition-transform active:scale-125 ${
                isFavorite
                  ? "fill-current text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            />
            {isFavorite ? "Favourite" : "Add Favourite"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}