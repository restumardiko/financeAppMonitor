"use client";
import api from "@/lib/utils/api";
//import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useQuery } from "@tanstack/react-query";
//import useUserInformation from "../store/useUserInformation";
//import TrendIncomeExpense from "../../components/chart/linechart";
import { formatIDR } from "../../lib/utils/idrCurrency";

import TransactionsHistory from "../../components/wallet/transactions_hystory";

export default function Home() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["userInformation"],
    queryFn: async () => {
      const res = await api.get("/userInformation");

      return res.data;
    },
  });

  const { data: transactions = [], isLoading: isTransactionLoading } = useQuery(
    {
      queryKey: ["analytic"],
      queryFn: async () => {
        const res = await api.get("/transactions");

        return res.data.data;
      },
    },
  );

  //monthly income
  const monthlyIncome = useMemo(() => {
    if (!transactions.length) return 0;

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const incomeThisMonth = transactions
      .filter(
        (t) =>
          t.type === "Income" &&
          new Date(t.created_at).getMonth() + 1 === currentMonth &&
          new Date(t.created_at).getFullYear() === currentYear,
      )
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return incomeThisMonth;
  }, [transactions]);

  //monthly expense
  const monthlyExpense = useMemo(() => {
    if (!transactions.length) return 0;

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const expenseThisMonth = transactions
      .filter(
        (t) =>
          t.type === "Expense" &&
          new Date(t.created_at).getMonth() + 1 === currentMonth &&
          new Date(t.created_at).getFullYear() === currentYear,
      )
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return expenseThisMonth;
  }, [transactions]);
  //monthly balance
  const monthlyBalance = useMemo(() => {
    return monthlyIncome - monthlyExpense;
  }, [monthlyIncome, monthlyExpense]);

  // ---MONTHLY PREVIOUS---
  //PREVIOUS MONTHLY INCOME
  const prevMonthlyIncome = useMemo(() => {
    if (!transactions.length) return 0;

    const now = new Date();

    let targetMonth = now.getMonth() - 1;
    let targetYear = now.getFullYear();

    // Handle January → December of previous year
    if (targetMonth < 0) {
      targetMonth = 11;
      targetYear -= 1;
    }

    const expenseLastMonth = transactions
      .filter((t) => {
        const date = new Date(t.created_at);

        return (
          t.type === "Income" &&
          date.getMonth() === targetMonth &&
          date.getFullYear() === targetYear
        );
      })
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return expenseLastMonth;
  }, [transactions]);

  //PREVIUS MONTHLY EXPENSE
  const prevMonthlyExpense = useMemo(() => {
    if (!transactions.length) return 0;

    const now = new Date();

    let targetMonth = now.getMonth() - 1; // previous month
    let targetYear = now.getFullYear();

    // Handle January → December of previous year
    if (targetMonth < 0) {
      targetMonth = 11;
      targetYear -= 1;
    }

    const expenseLastMonth = transactions
      .filter((t) => {
        const date = new Date(t.created_at);

        return (
          t.type === "Expense" &&
          date.getMonth() === targetMonth &&
          date.getFullYear() === targetYear
        );
      })
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return expenseLastMonth;
  }, [transactions]);

  // PREV MONTHLY BALANCE
  const prevMonthlyBalance = useMemo(() => {
    return prevMonthlyIncome - prevMonthlyExpense;
  }, [prevMonthlyIncome, prevMonthlyExpense]);

  ///PERCENTAGE SESSION
  const incomeChange = useMemo(() => {
    if (prevMonthlyIncome === 0) return null;

    const diff = monthlyIncome - prevMonthlyIncome;
    const percent = (diff / prevMonthlyIncome) * 100;

    return percent;
  }, [monthlyIncome, prevMonthlyIncome]);
  //EXPENSE DIFF
  const expenseChange = useMemo(() => {
    if (prevMonthlyExpense === 0) return null;

    const diff = monthlyExpense - prevMonthlyExpense;
    const percent = (diff / prevMonthlyExpense) * 100;

    return percent;
  }, [monthlyIncome, prevMonthlyIncome]);
  //BALANCE DIFF
  const balanceChange = useMemo(() => {
    if (prevMonthlyBalance === 0) return null;

    const diff = monthlyBalance - prevMonthlyBalance;
    const percent = (diff / prevMonthlyBalance) * 100;

    return percent;
  }, [monthlyBalance, prevMonthlyBalance]);
  // text generate
  const renderChangeText = (percent) => {
    if (percent === null) return "No data from last month";

    const abs = Math.abs(percent).toFixed(1);

    if (percent > 0) return `${abs}% higher than last month`;
    if (percent < 0) return `${abs}% lower than last month`;

    return "Same as last month";
  };
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className=" font-bold flex flex-col font-serif">
          <span className="text-3xl text-emerald-600">أَهْلًا بِكُم</span>

          <span className="text-xl text-amber-500">
            {isLoading ? "..." : data.name}
          </span>
        </h1>
        <h3 className="text-muted-foreground">This is your finance report</h3>
      </div>

      {/* Total Balance */}
      <div id="card">
        <Card>
          <CardHeader>
            <CardTitle className="text-emerald-700 ">Total Balance</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-row">
            <h1 className="text-2xl font-semibold">
              {isLoading ? "..." : formatIDR.format(data.total_balance)}
            </h1>
          </CardContent>

          <CardFooter>
            <p className="text-sm text-muted-foreground">
              from {isLoading ? "..." : data.initial_balance.length} accounts
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Monthly Cards */}
      <div className="monthly flex flex-col md:flex-row gap-4">
        {/* Monthly Expense */}
        <div className="monthlyExpense w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Monthly Expense</CardTitle>
            </CardHeader>

            <CardContent>
              <p>
                {isTransactionLoading
                  ? "..."
                  : formatIDR.format(monthlyExpense)}
              </p>
            </CardContent>

            <CardFooter>
              <p className="text-sm text-muted-foreground">
                {" "}
                {renderChangeText(expenseChange)}
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Monthly Income */}
        <div className="monthlyIncome w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-700">Monthly Income</CardTitle>
            </CardHeader>

            <CardContent>
              <p>
                {isTransactionLoading ? "..." : formatIDR.format(monthlyIncome)}
              </p>
            </CardContent>

            <CardFooter>
              <p className="text-sm text-muted-foreground">
                {renderChangeText(incomeChange)}
              </p>
            </CardFooter>
          </Card>
        </div>
        {/* Monthly balance*/}
        <div className="monthlyBalance w-full">
          <Card className="">
            <CardHeader>
              <CardTitle className="text-amber-500">Monthly balance</CardTitle>
            </CardHeader>

            <CardContent>
              <p>
                {isTransactionLoading
                  ? "..."
                  : formatIDR.format(monthlyBalance)}
              </p>
            </CardContent>

            <CardFooter>
              <p className="text-sm text-muted-foreground">
                {renderChangeText(balanceChange)}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/*
  <div className="statistic">
    <TrendIncomeExpense />
    <CategoryChart />
  </div>
  */}

      {/* Recent Transactions */}
      <div className="recent_transactions">
        <div className="text-emerald-700 m-2 ">Latest Transaction</div>
        <TransactionsHistory />
      </div>
    </div>
  );
}

// Line chart	Tren Income vs Expense
// Pie Chart	Distribusi pengeluaran per kategori
