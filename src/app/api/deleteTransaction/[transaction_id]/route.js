// app/api/transactions/[transaction_id]/route.js
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);
export async function DELETE(req, { params }) {
  try {
    const { transaction_id } = await params;

    const id = Number(transaction_id);

    if (!id) {
      return NextResponse.json(
        { message: "Invalid transaction id" },
        { status: 400 },
      );
    }

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "Missing Authorization header" },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];

    const { data: userData, error: userError } =
      await supabase.auth.getUser(token);

    if (userError || !userData?.user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const user_id = userData.user.id;

    // ===== RANGE HARI INI =====
    const now = new Date();

    const startOfDay = new Date(
      now.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" }) +
        "T00:00:00+07:00",
    );

    const nextDay = new Date(startOfDay);
    nextDay.setDate(nextDay.getDate() + 1);

    const { data, error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id)
      .eq("user_id", user_id)
      .gte("created_at", startOfDay.toISOString())
      .lt("created_at", nextDay.toISOString())
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          {
            message: "Only transaction from today can be deleted",
            data: [],
          },
          { status: 404 },
        );
      }
      throw error;
    }

    return NextResponse.json(
      {
        message: "delete transaction successfully",
        data,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
