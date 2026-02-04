import pool from "@/lib/db/db";
import { withAuth } from "@/lib/server/auth/withAuth";
import { NextResponse } from "next/server";

async function handler(req, { params }) {
  let client;

  try {
    const user_id = req.user.userId;
    const { transaction_id } = await params;

    const now = new Date();

    const startOfDay = new Date(
      now.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" }) +
        "T00:00:00+07:00",
    );

    const nextDay = new Date(startOfDay);
    nextDay.setDate(nextDay.getDate() + 1);

    client = await pool.connect();
    await client.query("BEGIN");

    const result = await client.query(
      `
      DELETE FROM transactions
      WHERE id = $1
        AND user_id = $2
        AND created_at >= $3
        AND created_at <  $4
      RETURNING *
      `,
      [transaction_id, user_id, startOfDay, nextDay],
    );

    await client.query("COMMIT");

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          message: "Only transaction from today can be deleted",
          data: [],
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "delete transaction successfully",
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

export const DELETE = withAuth(handler);
