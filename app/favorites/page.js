"use client";

import { useUser } from "@/context/UserContext";
import UserCard from "@/components/UserCard";

export default function FavoritesPage() {
  const { favorites } = useUser();

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
      </div>
    </section>
  );
}