import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ===== VERIFY USER =====
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 🔥 CLIENT YANG MEMBAWA JWT (WAJIB UNTUK RLS)
    const supabaseUser = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    );

    // ===== FETCH TRANSACTIONS =====
    const { data, error } = await supabaseUser
      .from("transactions")
      .select(
        `
        id,
        amount,
        note,
        created_at,
        categories (category_name, type),
        accounts (account_name)
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const formatted = (data || []).map((trx) => ({
      id: trx.id,
      category_name: trx.categories?.category_name ?? null,
      type: trx.categories?.type ?? null,
      account_name: trx.accounts?.account_name ?? null,
      amount: trx.amount,
      note: trx.note,
      created_at: trx.created_at,
    }));

    return NextResponse.json(
      {
        message: "data fetching successfully",
        data: formatted,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
