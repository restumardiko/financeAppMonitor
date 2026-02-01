import pool from "@/lib/db/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  let client;

  try {
    const { name, email, password } = await req.json();

    client = await pool.connect();

    const password_hash = await bcrypt.hash(password, 10);

    await client.query("BEGIN");

    const result = await client.query(
      "INSERT INTO users (name, password_hash, email) VALUES ($1, $2, $3) RETURNING *",
      [name, password_hash, email],
    );

    await client.query("COMMIT");

    return Response.json(
      {
        message: "sign up successfully",
        data: result.rows[0].id,
      },
      { status: 200 },
    );
  } catch (err) {
    if (client) await client.query("ROLLBACK");

    console.error("DB ERROR:", err);

    return Response.json({ error: err.message }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
