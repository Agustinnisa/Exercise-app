import { favorites } from "@/lib/db";

// DELETE: Hapus favorite berdasarkan ID
export async function DELETE(request, { params }) {
  const { id } = await params;
  const index = favorites.findIndex((f) => String(f.id) === String(id));

  if (index === -1) {
    return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  favorites.splice(index, 1);
  return Response.json({ message: "Berhasil dihapus" });
}

// PATCH: Update data favorite (misal menambahkan field 'note')
export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();

  const favorite = favorites.find((f) => String(f.id) === String(id));

  if (!favorite) {
    return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  // Update field note jika ada di body
  if (body.note !== undefined) {
    favorite.note = body.note;
  }

  return Response.json(favorite, { status: 200 });
}