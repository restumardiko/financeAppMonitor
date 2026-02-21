// app/api/transactions/route.js
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Client untuk verify saja
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "Missing Authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { message: "Invalid token format" },
        { status: 401 }
      );
    }

    // ===== VERIFY USER =====
    const { data: userData, error: userError } =
      await supabase.auth.getUser(token);

    if (userError || !userData?.user) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    const userId = userData.user.id;

    // 🔥 CLIENT DENGAN JWT (WAJIB UNTUK RLS)
    const supabaseUser = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    // ===== FETCH 5 TRANSAKSI TERAKHIR =====
    const { data, error } = await supabaseUser
      .from("transactions")
      .select(`
        id,
        amount,
        note,
        created_at,
        categories:category_id (category_name, type),
        accounts:account_id (account_name)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

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
      { message: "Data fetched successfully", data: formatted },
      { status: 200 }
    );
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
