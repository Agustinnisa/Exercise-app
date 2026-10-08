export function validateFavoriteInput(body) {
  if (!body.user_id) {
    return { valid: false, error: "user_id wajib diisi" };
  }

  if (!body.id || !body.name) {
    return { valid: false, error: "id dan name wajib diisi" };
  }

  return { valid: true };
}