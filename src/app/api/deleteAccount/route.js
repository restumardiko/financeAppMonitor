import pool from "@/lib/db/db";
import { withAuth } from "@/lib/server/auth/withAuth";
import { NextResponse } from "next/server";

async function handler(req) {
  console.log("delete account executed");
  let client;

  try {
    const { account_id } = await req.json(); // <-- body
    const user_id = req.user.userId;

    client = await pool.connect();
    await client.query("BEGIN");

    const result = await client.query(
      `
      DELETE FROM accounts
      WHERE id = $1
        AND user_id = $2
        AND NOT EXISTS (
          SELECT 1
          FROM transactions
          WHERE transactions.account_id = accounts.id
        )
      RETURNING *
      `,
      [account_id, user_id],
    );

    await client.query("COMMIT");

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          message:
            "Account cannot be deleted because it has transactions or does not exist",
          data: [],
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "delete account successfully",
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
