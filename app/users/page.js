"use client";

import { useEffect, useState } from "react";
import { Search, SearchX, Loader2 } from "lucide-react";

import UserCard from "@/components/UserCard";
import { Input } from "@/components/ui/input";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Hasil filter berdasarkan nama
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }

        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Error handling visual
  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center backdrop-blur-md">
          <h2 className="font-semibold text-destructive">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-destructive/80">
            {error}
          </p>
        </div>
      </main>
    );
  }

  // Loading skeleton visual
  if (loading) {
    return (
      <section className="relative">
        <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl space-y-3">
            <div className="h-4 w-20 animate-pulse rounded-full bg-primary/20" />
            <div className="h-10 w-64 animate-pulse rounded-xl bg-muted" />
            <div className="h-4 w-80 animate-pulse rounded-lg bg-muted/60" />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl border border-border/60 bg-card/40" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Directory
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            User Directory
          </h1>

          <p className="mt-4 text-muted-foreground">
            Browse and search through registered users.
          </p>
        </div>

        {/* Search Input dengan Ikon */}
        <div className="relative mt-10 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground z-10" />
          <Input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 rounded-full border-border/80 bg-card/80 pl-10 pr-4 text-foreground placeholder:text-muted-foreground backdrop-blur-md shadow-sm transition-all hover:border-primary/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
          />
        </div>

        {/* User Cards Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/30 py-16 text-center text-muted-foreground backdrop-blur-sm">
              <SearchX className="size-10 text-primary/60 mb-2" />
              <p className="text-base font-medium text-foreground">User tidak ditemukan.</p>
              <p className="text-sm text-muted-foreground">Coba gunakan kata kunci pencarian lain.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}