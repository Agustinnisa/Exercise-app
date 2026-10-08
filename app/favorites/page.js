"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import UserCard from "@/components/UserCard";
import { useFavorite } from "@/context/FavoriteContext";

export default function FavoritesPage() {
  const { favorites } = useFavorite();

  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        {/* Header Halaman */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Favorite
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            My Favorite Users
          </h1>
          <p className="mt-4 text-muted-foreground">
            Data ini diambil langsung dari FavoriteContext.
          </p>
        </div>

        {/* List Card User Favorit */}
        <div className="mt-12">
          {!favorites || favorites.length === 0 ? (
            <div className="mt-16 flex flex-col items-center gap-3 py-16 text-center text-muted-foreground rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
              <Heart className="size-8" />
              <p className="text-lg font-medium">
                Belum ada user favorit. Tandai dulu dari User Directory.
              </p>
              <Link
                href="/users"
                className="text-sm font-medium text-primary hover:underline"
              >
                Buka User Directory →
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((favorite) => {
                // Mendukung struktur data relasi Supabase (app_users) maupun data fallback/flat
                const userData = favorite.app_users
                  ? {
                      id: favorite.app_users.id,
                      name: favorite.app_users.name,
                      email: favorite.app_users.email,
                      company: { name: favorite.app_users.company_name },
                    }
                  : favorite;

                return (
                  <UserCard
                    key={favorite.id || favorite.user_id}
                    user={userData}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}