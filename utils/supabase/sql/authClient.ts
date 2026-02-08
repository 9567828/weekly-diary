import { createClient } from "../service/client";

export async function getUserIdClient() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.id) return null;

  return user.id;
}
