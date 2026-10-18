import { NextResponse } from "next/server";
import {
  removeFavorite,
  updateFavoriteNote,
} from "@/lib/services/favoriteServices";

// DELETE: Hapus favorite berdasarkan user_id (dikirim via params.id)
export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    if (!id) {
      return NextResponse.json(
        { error: "ID tidak ditemukan" },
        { status: 400 }
      );
    }

    const result = await removeFavorite(id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status || 500 }
      );
    }

    return NextResponse.json(
      { message: result.message || "Berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: Update data favorite (misal menambahkan field 'note')
export async function PATCH(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    if (!id) {
      return NextResponse.json(
        { error: "ID tidak ditemukan" },
        { status: 400 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Body harus berupa JSON valid" },
        { status: 400 }
      );
    }

    const result = await updateFavoriteNote(id, body.note);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status || 500 }
      );
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}