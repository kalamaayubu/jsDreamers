import { updateSession } from "./lib/supabase/middleware";

export async function proxy(req) {
  return await updateSession(req);
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
