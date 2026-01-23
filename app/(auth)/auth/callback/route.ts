import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";
import { type TablesInsert } from "@/database.types";

type ProfileInsert = TablesInsert<"profiles">;

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");


  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const profile: ProfileInsert = {
        avatar_url: user?.user_metadata.avatar_url ?? null,
        id: user!.id,
        nickname: user?.user_metadata.full_name ?? null,
      };

      if (user) {
        // ✅ 로그인 성공 → 홈으로 리다이렉트
        // profile 테이블에 insert
        await supabase.from("profiles").upsert(profile);
        // setting 테이블에 insert
        await supabase.from("setting").upsert({ id: user.id });
        console.log("data? ", data, "error? ", error);
        return NextResponse.redirect(`${origin}${next}`);
      } else {
        // ✅ 세션 교환은 됐는데 user 없음 → 로그인 페이지로
        return NextResponse.redirect(`${origin}/login`);
      }
    } else {
      // ✅ 교환 실패 → 로그인 페이지로
      return NextResponse.redirect(`${origin}/login`);
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}
