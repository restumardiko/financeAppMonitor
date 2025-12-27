import { FAKE_TOKEN } from "../utils/token";

export function requireAuth(req, res, ctx) {
  const auth = req.headers.get("authorization");

  if (auth !== `Bearer ${FAKE_TOKEN}`) {
    return res(ctx.status(401));
  }

  return null;
}
