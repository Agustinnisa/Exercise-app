"use server";

import { messages } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(formData) {
  const id = Number(formData.get("id"));

  // Cari index pesan berdasarkan id
  const index = messages.findIndex((msg) => msg.id === id);

  // Hapus pesan jika ditemukan
  if (index !== -1) {
    messages.splice(index, 1);
  }

  // Refresh cache halaman messages otomatis
  revalidatePath("/messages");
}