// app/api/transactions/route.js
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Supabase server-side client pakai Secret Key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

export async function GET(req) {
  try {
    // Ambil access token dari header Authorization
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "Missing Authorization header" },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1]; // format: Bearer <token>
    if (!token) {
      return NextResponse.json(
        { message: "Invalid token format" },
        { status: 401 },
      );
    }

    // Verifikasi user via Supabase
    const { data: userData, error: userError } =
      await supabase.auth.getUser(token);

    if (userError || !userData?.user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userId = userData.user.id;

    // Query 5 transaksi terakhir milik user
    const { data, error } = await supabase
      .from("transactions")
      .select(
        `
        id,
        amount,
        note,
        created_at,
        categories:category_id (category_name, type),
        accounts:account_id (account_name)
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const formatted = data.map((trx) => ({
      category_name: trx.categories?.category_name ?? null,
      amount: trx.amount,
      note: trx.note,
      id: trx.id,
      created_at: trx.created_at,
      type: trx.categories?.type ?? null,
      account_name: trx.accounts?.account_name ?? null,
    }));

    return NextResponse.json(
      { message: "Data fetched successfully", data: formatted },
      { status: 200 },
    );
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
