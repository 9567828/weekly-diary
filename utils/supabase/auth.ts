"use server";

import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { createClient } from "./server";

export const signIn = async (provider: Provider): Promise<void> => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: "http://localhost:3000/callback",
    },
  });

  redirect(data.url as string);
};

export const signInGoogle = async () => signIn("google");
