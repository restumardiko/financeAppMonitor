import pool from "@/lib/db/db";
import { withAuth } from "@/lib/server/auth/withAuth";
import { NextResponse } from "next/server";

async function handler(req) {
  console.log("add transaction");
  let client;

  try {
    const { account_id, category_id, amount, note } = await req.json();
    const user_id = req.user.userId;

    client = await pool.connect();
    await client.query("BEGIN");

    const result = await client.query(
      `
      INSERT INTO transactions
        (account_id, category_id, amount, note, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [account_id, category_id, amount, note, user_id],
    );

    await client.query("COMMIT");

    return NextResponse.json(
      {
        message: "add transaction successfully",
        data: result.rows[0],
      },
      { status: 200 },
    );
  } catch (err) {
    if (client) await client.query("ROLLBACK");

    console.error("DB ERROR:", err);

    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}

export const POST = withAuth(handler);
