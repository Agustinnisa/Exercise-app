// app/api/users/[id]/route.js

// Data cadangan / lokal milikmu
const localUsers = [
  { id: 1, name: "Leanne Graham", email: "leanne@example.com" },
  { id: 2, name: "Ervin Howell", email: "ervin@example.com" },
  { id: 3, name: "Clementine Bauch", email: "clementine@example.com" },
];

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    // 1. Coba fetch data user dari API JSONPlaceholder (berlaku untuk semua user 1 - 10)
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (res.ok) {
      const user = await res.json();
      return Response.json(user, { status: 200 });
    }
  } catch (error) {
    console.error("Gagal mengambil dari API eksternal, mencoba data lokal...", error);
  }

  // 2. Jika dari API gagal / user tidak ditemukan (misal offline atau ID > 10),
  // cari di data lokal (localUsers)
  const user = localUsers.find((u) => String(u.id) === String(id));

  if (!user) {
    return Response.json({ error: "User tidak ditemukan" }, { status: 404 });
  }

  return Response.json(user, { status: 200 });
}