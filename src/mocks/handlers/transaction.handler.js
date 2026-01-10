import { http, HttpResponse } from "msw";
import { db } from "../data/db";
import { requireAuth } from "../middlewares/requireAuth";
const categories = db.categories;
const accounts = db.accounts;

export const transactionHandlers = [
  http.post("/api/addtransaction", async ({ request }) => {
    const auth = requireAuth(request);
    if (auth instanceof HttpResponse) return auth;

    const body = await request.json();

    const accountName = accounts.find(
      (acc) => acc.account_id === body.account_id
    );

    const categoryName = categories.find(
      (cat) => cat.id === body.category_id
    ).category_name;

    const trx = {
      id: crypto.randomUUID(),
      amount: Number(body.amount),
      note: body.note,
      created_at: new Date().toISOString(),
      category_name: categoryName,
      account_name: accountName.account_name,
      type: body.transaction_type,
    };

    db.transactions.push(trx);

    return HttpResponse.json({
      message: "add transaction successfully",
      data: trx,
    });
  }),

  http.get("/api/transactions", ({ request }) => {
    const auth = requireAuth(request);
    if (auth instanceof HttpResponse) return auth;

    return HttpResponse.json({
      message: "data fetching successfully",
      data: db.transactions,
    });
  }),

  http.get("/api/latestTransactions", ({ request }) => {
    const auth = requireAuth(request);
    if (auth instanceof HttpResponse) return auth;

    return HttpResponse.json({
      data: db.transactions.slice(-5).reverse(),
    });
  }),

  http.delete("/api/transactions/:transaction_id", ({ params, request }) => {
    const auth = requireAuth(request);
    if (auth instanceof HttpResponse) return auth;

    const index = db.transactions.findIndex(
      (t) => t.id === params.transaction_id
    );

    if (index === -1) {
      return HttpResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    const removed = db.transactions.splice(index, 1)[0];

    return HttpResponse.json({
      message: "delete transaction succesfully",
      data: removed,
    });
  }),
];
