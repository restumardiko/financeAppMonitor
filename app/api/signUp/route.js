import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // 1️⃣ SIGN UP
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    const user = data.user;
    const session = data.session;

    if (!user || !session) {
      return Response.json(
        { error: "Signup failed. No session returned." },
        { status: 400 },
      );
    }

    // 🔥 CLIENT BARU DENGAN JWT
    const supabaseUser = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      },
    );

    // 2️⃣ INSERT PROFILE (RLS SAFE)
    const { error: profileError } = await supabaseUser.from("profiles").insert({
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
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
