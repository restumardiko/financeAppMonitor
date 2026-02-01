import crypto from "crypto";
import jwt from "jsonwebtoken";
import "server-only";

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}
