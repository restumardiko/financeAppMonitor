import { NextResponse } from "next/server";
import "server-only";
import { verifyToken } from "./jwt";

export function withAuth(handler) {
  return async (req, context) => {
    try {
      const authHeader = req.headers.get("authorization");
      const token = authHeader?.split(" ")[1];

      if (!token) {
        return NextResponse.json({ message: "Token missing" }, { status: 401 });
      }

      const decoded = verifyToken(token);

      // attach user payload
      req.user = decoded;

      return handler(req, context);
    } catch (err) {
      console.error("AUTH ERROR:", err);

      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 403 },
      );
    }
  };
}
