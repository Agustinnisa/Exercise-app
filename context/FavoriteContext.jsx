"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const { isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Jika tidak login, jangan jalankan fetch
    if (!isLoggedIn) return;

    let isMounted = true;

    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.favorites)
          ? data.favorites
          : [];

        const normalized = list.map((item) => ({
          ...item,
          user_id: String(item.user_id || item.id),
        }));

        setFavorites(normalized);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Gagal memuat favorites:", err);
        setFavorites([]);
      });

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

  const activeFavorites = isLoggedIn ? favorites : [];

  // PENTING: Hanya bandingkan f.user_id dengan userId agar tidak tertukar dengan ID tabel favorit
  function isFavorite(userId) {
    if (!Array.isArray(activeFavorites)) return false;
    const targetId = String(userId);
    return activeFavorites.some((f) => String(f.user_id) === targetId);
  }

  async function addFavorite(user) {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk menambahkan favorite.");
      return;
    }

    const userIdStr = String(user.id || user.user_id);

    if (isFavorite(userIdStr)) return;

    const formattedUser = {
      user_id: userIdStr,
      name: user.name || "",
      email: user.email || "",
      company:
        typeof user.company === "object"
          ? user.company?.name || ""
          : user.company || "",
    };

    // Optimistic Update UI
    setFavorites((prev) => [...prev, formattedUser]);

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedUser),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Gagal simpan favorite di server:", errorData);
        // Rollback jika gagal
        setFavorites((prev) =>
          prev.filter((f) => String(f.user_id) !== userIdStr)
        );
      } else {
        const saved = await res.json();
        const savedData = saved.data || saved || formattedUser;
        setFavorites((prev) =>
          prev.map((f) =>
            String(f.user_id) === userIdStr
              ? { ...savedData, user_id: userIdStr }
              : f
          )
        );
      }
    } catch (error) {
      console.error("Gagal menambah favorite:", error);
      setFavorites((prev) =>
        prev.filter((f) => String(f.user_id) !== userIdStr)
      );
    }
  }

  async function removeFavorite(userId) {
    const stringId = String(userId);
    const previousFavorites = [...favorites];

    // Optimistic Update UI
    setFavorites((prev) =>
      prev.filter((f) => String(f.user_id) !== stringId)
    );

    try {
      const res = await fetch(`/api/favorites/${stringId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        setFavorites(previousFavorites);
      }
    } catch (error) {
      console.error("Gagal menghapus favorite:", error);
      setFavorites(previousFavorites);
    }
  }

  const value = {
    favorites: activeFavorites,
    addFavorite,
    removeFavorite,
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