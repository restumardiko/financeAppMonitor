import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

export async function POST(req) {
  try {
    console.log("add transaction");

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "Missing Authorization header" },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];

    // ===== VERIFY USER =====
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const user_id = user.id;

    // 🔥 AUTHORIZED CLIENT (WAJIB UNTUK RLS)
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

    const { account_id, category_id, amount, note } = await req.json();

    if (!account_id || !category_id || !amount) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // ===== OPTIONAL CHECK (RLS sebenarnya sudah cukup) =====
    const { data: account, error: accError } = await supabaseUser
      .from("accounts")
      .select("id")
      .eq("id", account_id)
      .single();

    if (accError || !account) {
      return NextResponse.json({ message: "Invalid account" }, { status: 400 });
    }

    // ===== INSERT TRANSACTION =====
    const { data, error: insertError } = await supabaseUser
      .from("transactions")
      .insert({
        account_id,
        category_id,
        amount: Number(amount),
        note: note || null,
        user_id, // harus match dengan policy
      })
      .select()
      .single();

    if (insertError) throw insertError;

    return NextResponse.json(
      {
        message: "add transaction successfully",
        data,
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
