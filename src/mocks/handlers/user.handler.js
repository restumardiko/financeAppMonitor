import { http, HttpResponse } from "msw";
import { db } from "../data/db";
import { requireAuth } from "../middlewares/requireAuth";

export const userHandlers = [
  http.get("/api/userInformation", ({ request }) => {
    const auth = requireAuth(request);
    if (auth instanceof HttpResponse) return auth;

    const user = db.users[0];

    const total_balance = db.accounts.reduce(
      (s, a) => s + a.initial_balance,
      0
    );

    return HttpResponse.json({
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      total_balance,
      initial_balance: db.accounts,
    });
  }),
];
