import pool from "@/lib/db/db";
import { NextResponse } from "next/server";
import { withAuth } from "../../../lib/server/auth/withAuth";

async function handler(req) {
  let client;

  try {
    const user_id = req.user.userId;

    client = await pool.connect();

    await client.query("BEGIN");

    const result = await client.query(
      `
      SELECT  
        categories.category_name,
        transactions.amount,
        transactions.note,
        transactions.created_at,
        transactions.id,
        categories.type,
        accounts.account_name
      FROM transactions 
      LEFT JOIN categories 
        ON transactions.category_id = categories.id 
      LEFT JOIN accounts 
        ON transactions.account_id = accounts.id 
      WHERE transactions.user_id = $1 
      ORDER BY transactions.created_at DESC
      `,
      [user_id],
    );

    await client.query("COMMIT");

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          message: "No transactions found",
          data: [],
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        message: "data fetching successfully",
        data: result.rows,
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
export const GET = withAuth(handler);
