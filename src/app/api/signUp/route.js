import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

export async function POST(req) {
  const { name, email, password } = await req.json();

  // 1️⃣ SIGN UP (NO JWT NEEDED)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  const user = data.user;

  // 2️⃣ INSERT PROFILE (pakai RLS)
  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.id,
    name,
    email,
  });

  if (profileError) {
    return Response.json({ error: profileError.message }, { status: 400 });
  }

  return Response.json({
    message: "Signup success",
    user,
  });
}
