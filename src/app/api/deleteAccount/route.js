import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

export async function DELETE(req) {
  try {
    console.log("delete account executed");

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

    const { account_id } = await req.json();

    if (!account_id) {
      return NextResponse.json(
        { message: "account_id is required" },
        { status: 400 },
      );
    }

    // ===== Check if account exists & belongs to user =====
    const { data: account, error: accError } = await supabase
      .from("accounts")
      .select("id")
      .eq("id", account_id)
      .eq("user_id", user_id)
      .single();

    if (accError && accError.code === "PGRST116") {
      return NextResponse.json(
        {
          message: "Account does not exist",
          data: [],
        },
        { status: 404 },
      );
    }

    if (accError) throw accError;

    // ===== Check if has transactions =====
    const { data: transactions, error: trxError } = await supabase
      .from("transactions")
      .select("id")
      .eq("account_id", account_id)
      .limit(1);

    if (trxError) throw trxError;

    if (transactions.length > 0) {
      return NextResponse.json(
        {
          message: "Account cannot be deleted because it has transactions",
          data: [],
        },
        { status: 400 },
      );
    }

    // ===== Delete =====
    const { data, error: deleteError } = await supabase
      .from("accounts")
      .delete()
      .eq("id", account_id)
      .eq("user_id", user_id)
      .select()
      .single();

    if (deleteError) throw deleteError;

    return NextResponse.json(
      {
        message: "delete account successfully",
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
