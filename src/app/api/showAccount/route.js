import pool from "@/lib/db/db";
import { withAuth } from "@/lib/server/auth/withAuth";
import { NextResponse } from "next/server";

async function handler(req) {
  let client;
  console.log("show all account");

  try {
    const user_id = req.user.userId;

    client = await pool.connect();

    const result = await client.query(
      `
      SELECT 
        accounts.id AS account_id,
        accounts.account_name,
        accounts.initial_balance 
          + COALESCE(
              SUM(
                CASE 
                  WHEN categories.type = 'Income' THEN transactions.amount 
                  WHEN categories.type = 'Expense' THEN -transactions.amount 
                END
              ), 
            0
          ) AS total_balance,

        CASE 
          WHEN COUNT(transactions.id) = 0 THEN true
          ELSE false
        END AS is_deletable

      FROM accounts
      LEFT JOIN transactions 
        ON transactions.account_id = accounts.id
      LEFT JOIN categories 
        ON categories.id = transactions.category_id
      WHERE accounts.user_id = $1
      GROUP BY 
        accounts.id, 
        accounts.account_name, 
        accounts.initial_balance;
      `,
      [user_id],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          message: "please add account",
          data: [],
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        message: "account showed",
        data: result.rows,
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
