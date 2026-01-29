"use client";

import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/database.types";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseAnonKey) {
  throw new Error("환경변수 설정이 안되었다");
}

export function createClient() {
  return createBrowserClient<Database>(supabaseURL!, supabaseAnonKey!);
}
