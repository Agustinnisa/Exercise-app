import { removeFavorite, updateFavoriteNote } from "@/lib/services/favoriteServices";

// DELETE: Hapus favorite berdasarkan ID
export async function DELETE(request, { params }) {
  const { id } = await params;
  const result = await removeFavorite(id);

  if (!result.success) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json({ message: "Berhasil dihapus" });
}

// PATCH: Update data favorite (misal menambahkan field 'note')
export async function PATCH(request, { params }) {
  const { id } = await params;
  
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return Response.json({ error: "Body harus berupa JSON valid" }, { status: 400 });
  }

  const result = await updateFavoriteNote(id, body.note);

  if (!result.success) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json(result.data, { status: 200 });
}