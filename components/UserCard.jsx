"use client";

import { Heart, Mail, Building2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useFavorite } from "@/context/FavoriteContext";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserCard({ user }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();

  // Pengecekan status favorite menggunakan string ID
  const favorited = isFavorite(user.id);

  const handleFavoriteClick = async () => {
    const userPayload = {
      ...user,
      id: String(user.id),
    };

    if (favorited) {
      await removeFavorite(userPayload.id);
    } else {
      await addFavorite(userPayload);
    }
  };

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="group relative overflow-hidden border border-border/60 bg-card/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
      {/* Aksen Dekoratif Sudut Kanan Atas */}
      <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-primary/5 transition-all group-hover:bg-primary/10" />

      <CardHeader className="relative pb-3">
        <div className="flex items-center gap-3.5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/30 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            {initials}
          </div>

          <CardTitle className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors truncate">
            {user.name}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-2">
        {/* Email dengan ikon Mail */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground truncate">
          <Mail className="size-4 shrink-0 text-primary/70" />
          <span className="truncate">{user.email}</span>
        </div>

        {/* Company dengan ikon Building2 */}
        <div className="flex items-center gap-2 text-xs font-medium text-primary/80 truncate">
          <Building2 className="size-3.5 shrink-0 text-primary/70" />
          <span className="truncate">{user.company?.name || "Company"}</span>
        </div>

        <div className="pt-3 flex items-center gap-2">
          <Link 
            href={`/users/${user.id}`} 
            className={cn(
              buttonVariants({ variant: "default" }),
              "flex-1 rounded-full bg-primary text-primary-foreground font-semibold shadow-sm transition-all hover:opacity-90 hover:shadow-md hover:shadow-primary/20"
            )}
          >
            View Profile
          </Link>

          <Button
            onClick={handleFavoriteClick}
            variant="outline"
            className={cn(
              "rounded-full font-semibold transition-all border-border/80 bg-background/50 hover:bg-accent hover:text-foreground",
              favorited && "border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20"
            )}
          >
            <Heart
              className={cn(
                "mr-1.5 size-4 transition-transform active:scale-125",
                favorited
                  ? "fill-rose-500 text-rose-500"
                  : "text-muted-foreground"
              )}
            />
            {favorited ? "Favorite" : "Add Favorite"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}