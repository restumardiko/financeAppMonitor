import pool from "@/lib/db/db";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  let client;

  try {
    client = await pool.connect();

    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token found" },
        { status: 400 },
      );
    }

    await client.query("BEGIN");

    await client.query(
      `UPDATE users
       SET refresh_token = NULL,
           refresh_token_expires = NULL
       WHERE refresh_token = $1`,
      [refreshToken],
    );

    await client.query("COMMIT");

    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 },
    );

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (err) {
    if (client) await client.query("ROLLBACK");

    console.error("DB ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
