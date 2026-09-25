"use client";

import { useUser } from "@/context/UserContext";
import UserCard from "@/components/UserCard";

export default function FavoritesPage() {
  const { favorites } = useUser();

  return (
    <section className="relative overflow-hidden py-16">
      <div className="absolute inset-0 bg-grid bg-radial-fade -z-10" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Header Halaman */}
        <div className="mb-10">
          <p className="text-sm font-medium text-muted-foreground">Favorite</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            My Favorite Users
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Data ini diambil langsung dari FavoriteContext.
          </p>
        </div>

        {/* List Card User Favorit */}
        {favorites.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-card/40 p-12 text-center backdrop-blur-sm">
            <p className="text-lg font-medium text-muted-foreground">
              Belum ada user yang ditambahkan ke favorit.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}