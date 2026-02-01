import pool from "@/lib/db/db";
import { NextResponse } from "next/server";
import { withAuth } from "../../../lib/server/auth/withAuth";
export async function handler(req) {
  let client;

  try {
    const user_id = req.user.userId;
    client = await pool.connect();

    // ---------------- USER INFO ----------------
    const userResult = await client.query(
      "SELECT name,email,created_at FROM users WHERE id = $1",
      [user_id],
    );

    // ---------------- INITIAL BALANCE ----------------
    const initialBalance = await client.query(
      `
      SELECT 
        accounts.account_name,
        accounts.initial_balance 
      FROM accounts 
      WHERE accounts.user_id = $1
      `,
      [user_id],
    );

    // ---------------- TOTAL BALANCE ----------------
    const totalBalance = await client.query(
      `
      SELECT 
        SUM(account_balance) AS user_total_balance
      FROM (
        SELECT
          accounts.initial_balance 
          + COALESCE(
              SUM(
                CASE 
                  WHEN categories.type = 'Income' 
                    THEN transactions.amount 
                  WHEN categories.type = 'Expense' 
                    THEN -transactions.amount 
                END
              ), 
            0
          ) AS account_balance
        FROM accounts
        LEFT JOIN transactions 
          ON transactions.account_id = accounts.id
        LEFT JOIN categories 
          ON categories.id = transactions.category_id
        WHERE accounts.user_id = $1
        GROUP BY accounts.id, accounts.initial_balance
      ) AS balances
      `,
      [user_id],
    );

    // ---------------- RESPONSE DATA ----------------
    const { name, email, created_at } = userResult.rows[0];

    return NextResponse.json(
      {
        name,
        email,
        created_at,
        total_balance: totalBalance.rows[0]?.user_total_balance || 0,
        initial_balance: initialBalance.rows,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("DB ERROR:", err);

    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}

export const GET = withAuth(handler);
