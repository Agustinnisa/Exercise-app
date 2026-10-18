import { createClient } from "@/lib/supabase/server";

export async function findAllFavorites() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .select("id, created_at, user_id, app_users(id, name, email, company_name)");

  if (error) throw new Error(error.message);

  const seenUserIds = new Set();
  const uniqueFavorites = [];

  for (const fav of data || []) {
    const uId = String(fav.user_id);
    if (!seenUserIds.has(uId)) {
      seenUserIds.add(uId);
      uniqueFavorites.push({
        id: String(fav.id),
        user_id: uId,
        name: fav.app_users?.name || "",
        email: fav.app_users?.email || "",
        company: fav.app_users?.company_name || "",
        created_at: fav.created_at,
      });
    }
  }

  return uniqueFavorites;
}

export async function findFavoriteById(id) {
  const supabase = await createClient();
  const targetId = isNaN(Number(id)) ? id : Number(id);

  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", targetId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export async function insertFavorite(payload) {
  const supabase = await createClient();
  const numericUserId = Number(payload.user_id || payload.id);

  // 1. Upsert data ke app_users
  const { error: userError } = await supabase.from("app_users").upsert(
    {
      id: numericUserId,
      name: payload.name || "",
      email: payload.email || "",
      company_name:
        typeof payload.company === "object"
          ? payload.company?.name || ""
          : payload.company || "",
    },
    { onConflict: "id" }
  );

  if (userError) throw new Error(`app_users error: ${userError.message}`);

  // 2. Cek apakah user sudah ada di tabel favorites
  const existing = await findFavoriteById(numericUserId);
  if (existing) {
    return {
      id: String(existing.id),
      user_id: String(existing.user_id),
      name: payload.name,
      email: payload.email,
      company: payload.company,
    };
  }

  // 3. Insert ke favorites
  const { data, error } = await supabase
    .from("favorites")
    .insert([{ user_id: numericUserId }])
    .select()
    .single();

  if (error) throw new Error(`favorites error: ${error.message}`);

  return {
    id: String(data.id),
    user_id: String(data.user_id),
    name: payload.name,
    email: payload.email,
    company: payload.company,
  };
}

export async function deleteFavoriteById(id) {
  const supabase = await createClient();
  const targetId = isNaN(Number(id)) ? id : Number(id);

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", targetId);

  if (error) throw new Error(error.message);
  return true;
}

export async function updateNoteInFavorite(id, note) {
  const supabase = await createClient();
  const targetId = isNaN(Number(id)) ? id : Number(id);

  const { data, error } = await supabase
    .from("favorites")
    .update({ note })
    .eq("user_id", targetId)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}