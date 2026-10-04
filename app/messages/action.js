"use server";

import { getMessages, saveMessages } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(formData) {
  const id = Number(formData.get("id"));

  const existingMessages = await getMessages();

  // Filter out pesan yang dihapus
  const updatedMessages = existingMessages.filter((msg) => msg.id !== id);

  // Simpan kembali daftar pesan terbaru
  await saveMessages(updatedMessages);

  // Refresh cache halaman messages otomatis
  revalidatePath("/messages");
}