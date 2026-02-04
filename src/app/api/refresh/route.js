import pool from "@/lib/db/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  let client;

  try {
    client = await pool.connect();

    // ambil refresh token dari cookie
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token" },
        { status: 401 },
      );
    }

    const result = await client.query(
      "SELECT id, refresh_token_expires FROM users WHERE refresh_token = $1",
      [refreshToken],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 403 },
      );
    }

    const { id, refresh_token_expires } = result.rows[0];

    if (new Date() > refresh_token_expires) {
      return NextResponse.json(
        { message: "Refresh token expired" },
        { status: 403 },
      );
    }

    const newAccessToken = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({ token: newAccessToken }, { status: 200 });
  } catch (err) {
    console.error("DB ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
