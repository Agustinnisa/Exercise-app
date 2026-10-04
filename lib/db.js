// Memori sementara untuk menyimpan pesan di localhost
let localMessages = [];

// Variabel untuk fitur favorite yang sebelumnya ada
export let favorites = [];

// Cek apakah variabel lingkungan Vercel KV tersedia
const isKvConfigured =
  Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

export async function getMessages() {
  if (!isKvConfigured) {
    return localMessages;
  }

  try {
    const { kv } = await import("@vercel/kv");
    const data = await kv.get("messages");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Gagal mengambil messages dari Vercel KV:", error);
    return localMessages;
  }
}

export async function saveMessages(messages) {
  if (!isKvConfigured) {
    localMessages = messages;
    return;
  }

  try {
    const { kv } = await import("@vercel/kv");
    await kv.set("messages", messages);
  } catch (error) {
    console.error("Gagal menyimpan messages ke Vercel KV:", error);
  }
}