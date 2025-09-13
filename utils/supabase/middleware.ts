import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });

  const { data, error } = await supabase.auth.getUser(); // refresh
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = request.nextUrl.clone();
  const isLoginPage = url.pathname.startsWith("/login");
  const isCallback = url.pathname.startsWith("/auth/callback");

  // ✅ callback은 무조건 통과
  if (isCallback) return;

  if (!session && !data.user?.email && !isLoginPage) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 로그인 된 상태에서 /login 페이지 접근 → 홈으로 보냄
  if (session && data.user?.email && isLoginPage) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}
