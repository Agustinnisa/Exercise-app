"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFavorites(data);
        } else if (data && Array.isArray(data.data)) {
          setFavorites(data.data);
        } else if (data && Array.isArray(data.favorites)) {
          setFavorites(data.favorites);
        } else {
          setFavorites([]);
        }
      })
      .catch((err) => {
        console.error("Gagal memuat favorites:", err);
        setFavorites([]);
      });
  }, []);

  async function addFavorite(user) {
    if (isFavorite(user.id)) return;

    const formattedUser = { ...user, id: String(user.id) };
    setFavorites((prev) => [...prev, formattedUser]);

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedUser),
      });

      if (!res.ok) {
        // Rollback jika server gagal menyimpan
        setFavorites((prev) =>
          prev.filter((f) => String(f.id ?? f.user_id) !== String(user.id))
        );
      }
    } catch (error) {
      console.error("Gagal menambah favorite:", error);
      setFavorites((prev) =>
        prev.filter((f) => String(f.id ?? f.user_id) !== String(user.id))
      );
    }
  }

  async function removeFavorite(userId) {
    const stringId = String(userId);
    
    // Simpan data lama untuk rollback jika request gagal
    const previousFavorites = [...favorites];

    // Optimistic Update: Hapus dari state
    setFavorites((prev) =>
      prev.filter((f) => String(f.id ?? f.user_id) !== stringId)
    );

    try {
      const res = await fetch(`/api/favorites/${stringId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.error("Gagal menghapus dari server, membatalkan perubahan...");
        // Rollback ke state sebelumnya jika server merespons error
        setFavorites(previousFavorites);
      }
    } catch (error) {
      console.error("Gagal menghapus favorite:", error);
      setFavorites(previousFavorites);
    }
  }

  async function updateFavoriteNote(userId, note) {
    const stringId = String(userId);
    const res = await fetch(`/api/favorites/${stringId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    });

    if (res.ok) {
      const updated = await res.json();
      setFavorites((prev) =>
        prev.map((f) =>
          String(f.id ?? f.user_id) === stringId ? updated : f
        )
      );
    }
  }

  function isFavorite(userId) {
    if (!Array.isArray(favorites)) return false;
    // Pengecekan aman terhadap property 'id' maupun 'user_id'
    return favorites.some(
      (f) => String(f.id ?? f.user_id) === String(userId)
    );
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    updateFavoriteNote,
    isFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorite harus dipakai di dalam <FavoriteProvider>");
  }
  return context;
}