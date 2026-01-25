import { http, HttpResponse } from "msw";
import { db } from "../data/db";
import { requireAuth } from "../middlewares/requireAuth";
const accounts = db.accounts;
const transactions = db.transactions;

export const accountHandlers = [
  http.post("/api/addAccount", async ({ request }) => {
    const auth = requireAuth(request);
    if (auth instanceof HttpResponse) return auth;

    const body = await request.json();

    const exists = db.accounts.find((a) => a.account_name === body.name);

    if (exists) {
      return HttpResponse.json(
        { message: "account already added" },
        { status: 400 },
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
    function totalBalance(account, transactions) {
      const accountTransactions = transactions.filter((item) => {
        return item.account_name === account.account_name;
      });
      const balance = accountTransactions.reduce((acc, trx) => {
        const amount = Number(trx.amount);
        acc += trx.type === "Income" ? amount : -amount;

        return acc;
      }, 0);

      const totalBalance = account.initial_balance + balance;

      return totalBalance;
    }
    function isDeletable(account, transactions) {
      const accountTransactions = transactions.filter((item) => {
        return item.account_name === account.account_name;
      });
      if (accountTransactions.length == 0) {
        return true;
      }
      return false;
    }

    return HttpResponse.json({
      message: "account showed",
      data: accounts.map((a) => ({
        account_id: a.account_id,
        account_name: a.account_name,
        total_balance: totalBalance(a, transactions),
        is_deletable: isDeletable(a, transactions),
      })),
    });
  }),

  http.delete("/api/deleteAccount", async ({ request }) => {
    const auth = requireAuth(request);
    if (auth instanceof HttpResponse) return auth;

    const body = await request.json();

    const index = accounts.findIndex((a) => a.account_id === body.account_id);

    if (index === -1) {
      return HttpResponse.json(
        { message: "Account not found" },
        { status: 404 },
      );
    }

    const removed = db.accounts.splice(index, 1)[0];

    return HttpResponse.json({
      message: "delete account succesfully",
      data: removed,
    });
  }),
];
