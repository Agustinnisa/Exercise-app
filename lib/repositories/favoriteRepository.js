import { supabase } from "@/lib/supabase";

export async function findAllFavorites() {
  const { data, error } = await supabase.from("favorites").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function findFavoriteById(id) {
  const targetId = isNaN(Number(id)) ? id : Number(id);

  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("id", targetId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export async function insertFavorite(payload) {
  const { data, error } = await supabase
    .from("favorites")
    .insert(payload)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteFavoriteById(id) {
  const targetId = isNaN(Number(id)) ? id : Number(id);

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("id", targetId);

  if (error) throw new Error(error.message);
  return true;
}

export async function updateNoteInFavorite(id, note) {
  const targetId = isNaN(Number(id)) ? id : Number(id);

  const { data, error } = await supabase
    .from("favorites")
    .update({ note })
    .eq("id", targetId)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}