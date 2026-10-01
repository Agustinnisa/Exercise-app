import { favorites } from "@/lib/db";

export function findAllFavorites() {
  return favorites;
}

export function findFavoriteById(id) {
  return favorites.find((f) => String(f.id) === String(id));
}

export function insertFavorite(data) {
  favorites.push(data);
  return data;
}

export function deleteFavoriteById(id) {
  const index = favorites.findIndex((f) => String(f.id) === String(id));
  if (index === -1) return false;

  favorites.splice(index, 1);
  return true;
}

export function updateNoteInFavorite(id, note) {
  const favorite = favorites.find((f) => String(f.id) === String(id));
  if (!favorite) return null;

  favorite.note = note;
  return favorite;
}