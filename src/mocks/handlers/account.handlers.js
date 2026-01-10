import { http, HttpResponse } from "msw";
import { db } from "../data/db";
import { requireAuth } from "../middlewares/requireAuth";

export const accountHandlers = [
  http.post("/api/addAccount", async ({ request }) => {
    const auth = requireAuth(request);
    if (auth instanceof HttpResponse) return auth;

    const body = await request.json();

    const exists = db.accounts.find((a) => a.account_name === body.name);

    if (exists) {
      return HttpResponse.json(
        { message: "account already added" },
        { status: 400 }
      );
    }

    const account = {
      account_name: body.name,
      account_id: crypto.randomUUID(),
      id: db.users[0].id,
      type: body.account_type,
      initial_balance: Number(body.total_balance),
    };

    db.accounts.push(account);

    return HttpResponse.json({
      message: "add account succesfully",
      data: account,
    });
  }),

  http.get("/api/showAccount", ({ request }) => {
    const auth = requireAuth(request);
    if (auth instanceof HttpResponse) return auth;

    return HttpResponse.json({
      message: "account showed",
      data: db.accounts.map((a) => ({
        account_id: a.account_id,
        account_name: a.account_name,
        total_balance: a.initial_balance,
        is_deletable: true,
      })),
    });
  }),

  http.delete("/api/deleteAccounts", async ({ request }) => {
    const auth = requireAuth(request);
    if (auth instanceof HttpResponse) return auth;

    const body = await request.json();
    const index = db.accounts.findIndex((a) => a.id === body.account_id);

    if (index === -1) {
      return HttpResponse.json(
        { message: "Account not found" },
        { status: 404 }
      );
    }

    const removed = db.accounts.splice(index, 1)[0];

    return HttpResponse.json({
      message: "delete account succesfully",
      data: removed,
    });
  }),
];
