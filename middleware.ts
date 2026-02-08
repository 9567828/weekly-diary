import type { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/service/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|manifest.json|apple-touch-icon|imgs|robots.txt|sitemap.xml|\\.well-known).*)"],
};
