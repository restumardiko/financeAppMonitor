import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    // 1. Auth
    const { token, userId } = await verifyToken(request);

    const { transaction_id } = params;

    const body = await request.json();
    const { account_id, category_id, amount, note } = body;

    // 🔥 Client dengan JWT
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

    const { data, error } = await supabaseUser
      .from("transactions")
      .update({
        account_id,
        category_id,
        amount,
        note,
      })
      .eq("id", transaction_id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      {
        message: "Edit transaction successfully",
        data,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
