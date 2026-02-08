"use server";

import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createServClient } from "../service/server";

export const signIn = async (provider: Provider): Promise<void> => {
  const supabase = await createServClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,

      queryParams: {
        prompt: "select_account",
      },
    },
  });

  console.log(data.url);

  if (error) throw error;

  redirect(data.url as string);
};

export const signInGoogle = async () => signIn("google");

export const signOut = async () => {
  const supabase = await createServClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("로그아웃오류: ", error);
  }

  redirect("/login");
};

export async function getUserId(): Promise<string | null> {
  const supabase = await createServClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.id) return null;

  return user.id;
}
