import { removeFavorite, updateFavoriteNote } from "@/lib/services/favoriteServices";

// DELETE: Hapus favorite berdasarkan ID
export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    if (!id) {
      return Response.json({ error: "ID tidak ditemukan" }, { status: 400 });
    }

    const result = await removeFavorite(id);

    if (!result.success) {
      return Response.json({ error: result.error }, { status: result.status || 500 });
    }

    return Response.json({ message: result.message || "Berhasil dihapus" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: Update data favorite (misal menambahkan field 'note')
export async function PATCH(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    let body;
    try {
      body = await request.json();
    } catch (error) {
      return Response.json({ error: "Body harus berupa JSON valid" }, { status: 400 });
    }

    const result = await updateFavoriteNote(id, body.note);

    if (!result.success) {
      return Response.json({ error: result.error }, { status: result.status || 500 });
    }

    return Response.json(result.data, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}