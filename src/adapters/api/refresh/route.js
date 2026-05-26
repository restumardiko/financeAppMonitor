import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  console.log("Refresh token:", refreshToken);

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
  );

  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: refreshToken,
  });
  console.log("Supabase error:", error);
  console.log("Supabase data:", data);

  if (error || !data.session) {
    return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
  }

  const response = NextResponse.json({
    token: data.session.access_token,
  });

  // 🔥 UPDATE refresh token cookie
  response.cookies.set("refreshToken", data.session.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return response;
}
