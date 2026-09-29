import { favorites } from "@/lib/db";

export async function GET() {
  return Response.json(favorites);
}

export async function POST(request) {
  let body;
  
  // Try-catch untuk menangani jika body kosong / bukan JSON valid
  try {
    body = await request.json();
  } catch (error) {
    return Response.json(
      { error: "Body tidak boleh kosong dan harus berupa JSON valid" },
      { status: 400 }
    );
  }

  // Validasi jika object body kosong {}
  if (!body || Object.keys(body).length === 0) {
    return Response.json(
      { error: "Body request tidak boleh kosong" },
      { status: 400 }
    );
  }

  // Validasi field wajib (id dan name)
  if (!body.id || !body.name) {
    return Response.json(
      { error: "Field 'id' dan 'name' wajib diisi" },
      { status: 400 }
    );
  }

  // Validasi jika user sudah terdaftar di favorites
  const alreadyExists = favorites.some((f) => String(f.id) === String(body.id));
  if (alreadyExists) {
    return Response.json(
      { error: "User ini sudah difavoritkan" },
      { status: 400 }
    );
  }

  // Simpan data baru
  favorites.push(body);
  return Response.json(body, { status: 201 });
}