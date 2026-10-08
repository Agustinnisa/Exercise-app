"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(formData) {
  const rawId = formData.get("id");

  if (!rawId) return;

  const id = isNaN(Number(rawId)) ? rawId : Number(rawId);

  // Inisialisasi client supabase server secara async
  const supabase = await createClient();

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