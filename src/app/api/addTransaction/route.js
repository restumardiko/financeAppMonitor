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

    // ===== Verify User =====
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const user_id = user.id;

    const { account_id, category_id, amount, note } = await req.json();

    if (!account_id || !category_id || !amount) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // ===== Optional Safety Check (Account belongs to user) =====
    const { data: account, error: accError } = await supabase
      .from("accounts")
      .select("id")
      .eq("id", account_id)
      .eq("user_id", user_id)
      .single();

    if (accError || !account) {
      return NextResponse.json({ message: "Invalid account" }, { status: 400 });
    }

    // ===== Insert Transaction =====
    const { data, error: insertError } = await supabase
      .from("transactions")
      .insert({
        account_id,
        category_id,
        amount: Number(amount),
        note: note || null,
        user_id,
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
