import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

export async function GET(req) {
  try {
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
      },
    );

    const user_id = user.id;

    // ===== AMBIL ACCOUNTS =====
    const { data: accounts = [], error: accErr } = await supabaseUser
      .from("accounts")
      .select("id, account_name, initial_balance")
      .eq("user_id", user_id);

    if (accErr) throw accErr;

    if (accounts.length === 0) {
      return NextResponse.json(
        {
          message: "please add account",
          data: [],
        },
        { status: 200 },
      );
    }

    // ===== AMBIL TRANSACTIONS =====
    const { data: transactions = [], error: trxErr } = await supabaseUser
      .from("transactions")
      .select(
        `
        amount,
        account_id,
        categories(type)
      `,
      )
      .eq("user_id", user_id);

    if (trxErr) throw trxErr;

    // ===== HITUNG BALANCE =====
    const accountMap = {};

    accounts.forEach((acc) => {
      accountMap[acc.id] = {
        account_id: acc.id,
        account_name: acc.account_name,
        total_balance: Number(acc.initial_balance),
        transaction_count: 0,
      };
    });

    transactions.forEach((trx) => {
      const acc = accountMap[trx.account_id];
      if (!acc) return;

      const amount = Number(trx.amount);
      const type = trx.categories?.type;

      acc.transaction_count += 1;

      if (type === "Income") {
        acc.total_balance += amount;
      } else if (type === "Expense") {
        acc.total_balance -= amount;
      }
    });

    const finalData = Object.values(accountMap).map((acc) => ({
      account_id: acc.account_id,
      account_name: acc.account_name,
      total_balance: acc.total_balance,
      is_deletable: acc.transaction_count === 0,
    }));

    return NextResponse.json(
      {
        message: "account showed",
        data: finalData,
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
