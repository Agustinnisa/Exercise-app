import { getAllFavorites, addFavorite } from "@/lib/services/favoriteServices";

export async function GET() {
  try {
    const favorites = await getAllFavorites();
    return Response.json(favorites);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch (error) {
    return Response.json(
      { error: "Format JSON tidak valid" },
      { status: 400 }
    );
  }

  try {
    const result = await addFavorite(body);

    if (!result.success) {
      return Response.json({ error: result.error }, { status: result.status });
    }

    return Response.json(result.data, { status: result.status });
  } catch (error) {
    console.error("API POST Error:", error);
    return Response.json(
      { error: error.message || "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}