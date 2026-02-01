import pool from "@/lib/db/db";

import { generateRefreshToken } from "@/lib/server/auth/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  let client;

  try {
    client = await pool.connect();

    const body = await req.json();
    const { email, password } = body;

    await client.query("BEGIN");

    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(
      password,
      result.rows[0].password_hash,
    );

    if (!isMatch) {
      return NextResponse.json({ message: "password wrong" }, { status: 401 });
    }

    //  Create access token
    const token = jwt.sign(
      { userId: result.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    //  Create refresh token
    const refreshToken = generateRefreshToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await client.query(
      `
      UPDATE users 
      SET refresh_token = $1,
          refresh_token_expires = $2 
      WHERE id = $3
      `,
      [refreshToken, expiresAt, result.rows[0].id],
    );

    await client.query("COMMIT");

    //  Set refresh token cookie
    const response = NextResponse.json(
      { token, message: "login successfully" },
      { status: 200 },
    );

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
      path: "/",
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
