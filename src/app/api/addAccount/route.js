import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

export async function POST(req) {
  try {
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

    // ===== Get Body =====
    const { name, account_type, total_balance } = await req.json();

    if (!name || !account_type || total_balance === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // ===== Check Duplicate =====
    const { data: existing, error: checkError } = await supabase
      .from("accounts")
      .select("id")
      .eq("user_id", user_id)
      .eq("account_name", name)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 = no rows found
      throw checkError;
    }

    if (existing) {
      return NextResponse.json(
        { message: "account already added" },
        { status: 409 },
      );
    }

    // ===== Insert =====
    const { data, error: insertError } = await supabase
      .from("accounts")
      .insert({
        user_id,
        account_name: name,
        type: account_type,
        initial_balance: Number(total_balance),
      })
      .select()
      .single();

    if (insertError) throw insertError;

    return NextResponse.json(
      {
        message: "add account successfully",
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
