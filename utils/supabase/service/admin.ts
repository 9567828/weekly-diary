"use server";

import { Database } from "@/database.types";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseURL || !supabaseServiceKey) {
  throw new Error("환경변수 설정이 안되었다");
}

export async function createAdminClient() {
  const cookieStore = await cookies();

  return createClient<Database>(supabaseURL!, supabaseServiceKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
