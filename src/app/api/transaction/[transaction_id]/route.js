import { verifyToken } from "@/lib/auth";
import pool from "@/lib/db";
import { NextResponse } from "next/server";
// verifyToken should return { userId }

export async function PATCH(request, { params }) {
  let client;

  try {
    // 1. Auth
    const user = await verifyToken(request);
    const user_id = user.userId;

    // 2. Params
    const { transaction_id } = params;

    // 3. Body
    const body = await request.json();
    const { account_id, category_id, amount, note } = body;

    client = await pool.connect();
    await client.query("BEGIN");

    const result = await client.query(
      `
      UPDATE transactions 
      SET 
        account_id = $1,
        category_id = $2,
        amount = $3,
        note = $4
      WHERE id = $5 AND user_id = $6
      RETURNING *
      `,
      [account_id, category_id, amount, note, transaction_id, user_id],
    );

    await client.query("COMMIT");

    return NextResponse.json(
      {
        message: "Edit income successfully",
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
