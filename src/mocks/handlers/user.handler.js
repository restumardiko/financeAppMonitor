import { http, HttpResponse } from "msw";
import { db } from "../data/db";
import { requireAuth } from "../middlewares/requireAuth";
const accounts = db.accounts;
const transactions = db.transactions;

export const userHandlers = [
  http.get("/api/userInformation", ({ request }) => {
    const auth = requireAuth(request);
    if (auth instanceof HttpResponse) return auth;

    const user = db.users[0];

    const initialBalance = accounts.map((account) => {
      return {
        account_name: account.account_name,
        initial_balance: account.initial_balance,
      };
    });
    // total initial balance
    const totalInitialBalance = accounts.reduce((total, acc) => {
      return total + acc.initial_balance;
    }, 0);

    const totalIncome = transactions.reduce((total, tx) => {
      if (tx.type === "income") {
        return total + tx.amount;
      }
      return total;
    }, 0);

    //total expesense
    const totalExpense = transactions.reduce((total, tx) => {
      if (tx.type === "expense") {
        return total + tx.amount;
      }
      return total;
    }, 0);

    const totalBalance = totalInitialBalance + (totalIncome - totalExpense);

    return HttpResponse.json({
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      total_balance: totalBalance,
      initial_balance: initialBalance,
    });
  }),
];
