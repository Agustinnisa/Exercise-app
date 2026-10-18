"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email"),
    password: formData.get("password"),
    options: {
      data: { name: formData.get("name") },
    },
  });

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
  }

  // Jika Supabase membutuhkan konfirmasi email, beri tahu user via parameter URL
  if (data?.user && data?.session === null) {
    redirect(`/login?message=${encodeURIComponent("Pendaftaran berhasil! Silakan periksa inbox email kamu untuk konfirmasi.")}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}