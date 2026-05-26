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

    // 🔥 BUAT CLIENT BARU YANG MEMBAWA JWT (PENTING UNTUK RLS)
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

    // ================= PROFILE =================
    let { data: profile, error: profileErr } = await supabaseUser
      .from("profiles")
      .select("name, email, created_at")
      .eq("id", user_id)
      .maybeSingle();

    if (profileErr) throw profileErr;

    // Jika belum ada profile → buat otomatis
    if (!profile) {
      const { data: newProfile, error: insertErr } = await supabaseUser
        .from("profiles")
        .insert({
          id: user_id,
          email: user.email,
          name: user.user_metadata?.name || "New User",
        })
        .select()
        .single();

      if (insertErr) throw insertErr;

      profile = newProfile;
    }

    // ================= ACCOUNTS =================
    const { data: accounts = [], error: accErr } = await supabaseUser
      .from("accounts")
      .select("id, account_name, initial_balance")
      .eq("user_id", user_id);

    if (accErr) throw accErr;

    // ================= TRANSACTIONS =================
    const { data: transactions = [], error: trxErr } = await supabaseUser
      .from("transactions")
      .select(
        `
        amount,
        categories(type),
        accounts(account_name)
      `,
      )
      .eq("user_id", user_id);

    if (trxErr) throw trxErr;

    // ================= HITUNG TOTAL BALANCE =================
    let accountBalances = {};

    accounts.forEach((acc) => {
      accountBalances[acc.account_name] = Number(acc.initial_balance);
    });

    transactions.forEach((trx) => {
      const accountName = trx.accounts?.account_name;
      const type = trx.categories?.type;
      const amount = Number(trx.amount);

      if (!accountName) return;

      if (type === "Income") {
        accountBalances[accountName] += amount;
      } else if (type === "Expense") {
        accountBalances[accountName] -= amount;
      }
    });

    const totalBalance = Object.values(accountBalances).reduce(
      (sum, val) => sum + val,
      0,
    );

    return NextResponse.json(
      {
        name: profile.name,
        email: profile.email,
        created_at: profile.created_at,
        total_balance: totalBalance,
        initial_balance: accounts.map((acc) => ({
          account_name: acc.account_name,
          initial_balance: acc.initial_balance,
        })),
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
