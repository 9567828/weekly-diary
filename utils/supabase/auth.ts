import { supabase } from "./client";

export async function signUp(email: string, password: string, phone: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  // 프로필 생성
  const { error: profileError } = await supabase.from("user").insert([
    {
      user_uid: authData.user?.id, // 외래키 연결
      email: email.trim(),
      password: password.trim(),
      phone_num: phone.trim(),
    },
  ]);

  return { authData, profileError, authError };
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/", // 로그인 후 돌아올 URL
    },
  });

  if (error) throw error;
  return data;
}
