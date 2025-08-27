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
  // 로그인 안 된 경우만 /login 으로 보냄
  if (!session && !data.user?.email) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 로그인 된 상태에서 /login 페이지 접근 → 홈으로 보냄
  if (session && url.pathname.startsWith("/login")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}

// 필요하다면 matcher 추가
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login).*)"],
};
