import { supabase } from "@/lib/supabase";

export async function findAllFavorites() {
  const { data, error } = await supabase.from("favorites").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function findFavoriteById(id) {
  const targetId = isNaN(Number(id)) ? id : Number(id);

  // Cek berdasarkan 'id' atau 'user_id'
  let { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("id", targetId)
    .maybeSingle();

  if (!data) {
    const res = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", targetId)
      .maybeSingle();
    data = res.data;
    error = res.error || error;
  }

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

  // Coba hapus berdasarkan kolom 'id'
  let { data, error } = await supabase
    .from("favorites")
    .delete()
    .eq("id", targetId)
    .select();

  // Jika gagal atau baris tidak ditemukan, coba hapus berdasarkan kolom 'user_id'
  if (error || !data || data.length === 0) {
    const res = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", targetId)
      .select();
    data = res.data;
    error = res.error;
  }

  if (error) throw new Error(error.message);
  return true;
}

export async function updateNoteInFavorite(id, note) {
  const targetId = isNaN(Number(id)) ? id : Number(id);

  let { data, error } = await supabase
    .from("favorites")
    .update({ note })
    .eq("id", targetId)
    .select()
    .maybeSingle();

  if (!data) {
    const res = await supabase
      .from("favorites")
      .update({ note })
      .eq("user_id", targetId)
      .select()
      .maybeSingle();
    data = res.data;
    error = res.error || error;
  }

  if (error) throw new Error(error.message);
  return data;
}