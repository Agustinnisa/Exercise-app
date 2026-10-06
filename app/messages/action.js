"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(formData) {
  const rawId = formData.get("id");

  if (!rawId) return;

  // Jika ID di Supabase berbentuk angka (integer), konversi ke Number.
  // Jika ID berbentuk UUID (string), gunakan rawId langsung.
  const id = isNaN(Number(rawId)) ? rawId : Number(rawId);

  // Hapus baris pesan dari tabel Supabase berdasarkan ID
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Gagal menghapus pesan:", error.message);
    return;
  }

  // Refresh data pada halaman /messages
  revalidatePath("/messages");
}