import pool from "@/lib/db/db";
import { withAuth } from "@/lib/server/auth/withAuth";
import { NextResponse } from "next/server";

async function handler(req) {
  let client;
  console.log("add account executed");

  try {
    const { name, account_type, total_balance } = await req.json();
    const user_id = req.user.userId;

    client = await pool.connect();
    await client.query("BEGIN");

    const check = await client.query(
      "SELECT id FROM accounts WHERE user_id=$1 AND account_name=$2",
      [user_id, name],
    );

    if (check.rowCount === 0) {
      const result = await client.query(
        `INSERT INTO accounts 
          (user_id, account_name, type, initial_balance)
         VALUES ($1,$2,$3,$4)
         RETURNING *`,
        [user_id, name, account_type, total_balance],
      );

      await client.query("COMMIT");

      return NextResponse.json(
        {
          message: "add account successfully",
          data: result.rows[0],
        },
        { status: 200 },
      );
    }

    await client.query("COMMIT");

    return NextResponse.json(
      {
        message: "account already added",
      },
      { status: 409 }, // conflict lebih tepat
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
