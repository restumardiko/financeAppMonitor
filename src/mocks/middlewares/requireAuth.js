import { HttpResponse } from "msw";

export const ACCESS_TOKEN = "fake-access-token";

export function requireAuth(request) {
  const auth = request.headers.get("authorization");

  if (!auth) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (auth !== `Bearer ${ACCESS_TOKEN}`) {
    return HttpResponse.json({ message: "Invalid token" }, { status: 403 });
  }

  return { userId: "u-1" };
}

export function generateRefreshToken() {
  return crypto.randomUUID() + crypto.randomUUID();
}
