import { getAllFavorites, addFavorite } from "@/lib/services/favoriteServices";

export async function GET() {
  const favorites = await getAllFavorites();
  return Response.json(favorites);
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

  const result = await addFavorite(body);

  if (!result.success) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json(result.data, { status: result.status });
}