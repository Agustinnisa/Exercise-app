"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // State untuk menyimpan daftar user favorit
  const [favorites, setFavorites] = useState([]);

  // Fungsi toggle untuk menambah / menghapus favorite
  const toggleFavorite = (user) => {
    setFavorites((prev) => {
      const isExist = prev.some((fav) => fav.id === user.id);
      if (isExist) {
        return prev.filter((fav) => fav.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const value = {
    name,
    email,
    message,
    submitted,
    favorites,
    setName,
    setEmail,
    setMessage,
    setSubmitted,
    toggleFavorite,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser harus dipakai di dalam <UserProvider>");
  }

  return context;
}