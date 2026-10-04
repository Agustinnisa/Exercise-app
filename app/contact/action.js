"use server";

import { getMessages, saveMessages } from "@/lib/db";

export async function submitContactForm(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return { success: false, error: "Semua field wajib diisi." };
  }

  const existingMessages = await getMessages();

  const newMessage = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };

  // Tambahkan pesan baru ke daftar pesan lama
  await saveMessages([newMessage, ...existingMessages]);

  return { success: true };
}