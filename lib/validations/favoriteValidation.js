export function validateFavoriteInput(body) {
  const userId = body?.user_id || body?.id;

  if (!userId) {
    return { valid: false, error: "id atau user_id wajib diisi" };
  }

  if (!body?.name) {
    return { valid: false, error: "name wajib diisi" };
  }

  return { valid: true };
}