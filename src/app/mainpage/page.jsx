"use client";
import api from "@/lib/api";
//import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import TransactionsCard from "../../components/wallet/transactionsCard";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
//import useUserInformation from "../store/useUserInformation";
//import TrendIncomeExpense from "../../components/chart/linechart";
//import CategoryChart from "../../components/chart/piechart";
import TransactionsHistory from "../../components/wallet/transactions_hystory";

export default function Home() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["userInformation"],
    queryFn: async () => {
      const res = await api.get("/userInformation");
      console.log(res.data);

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
    }
  );
  console.log("ini transactions di mainpage", transactions);

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
          new Date(t.created_at).getFullYear() === currentYear
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
          new Date(t.created_at).getFullYear() === currentYear
      )
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return expenseThisMonth;
  }, [transactions]);
  //monthly balance
  const monthlyBalance = useMemo(() => {
    return monthlyIncome - monthlyExpense;
  }, [monthlyIncome, monthlyExpense]);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.log("token empthy");
      router.push("/login");
      return;
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Hello {isLoading ? "..." : data.name}.
        </h1>
        <h3 className="text-muted-foreground">This is your finance report</h3>
      </div>

      {/* Total Balance */}
      <div id="card">
        <Card>
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
          </CardHeader>

          <CardContent>
            <h1 className="text-2xl font-semibold">
              Rp. {isLoading ? "..." : data.total_balance}
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
              <CardTitle>Monthly Expense</CardTitle>
            </CardHeader>

            <CardContent>
              <p>Rp.{isTransactionLoading ? "..." : monthlyExpense}</p>
            </CardContent>

            <CardFooter>
              <p className="text-sm text-muted-foreground">
                6 persen higher than last month
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Monthly Income */}
        <div className="monthlyIncome w-full">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Income</CardTitle>
            </CardHeader>

            <CardContent>
              <p>Rp.{isTransactionLoading ? "..." : monthlyIncome}</p>
            </CardContent>

            <CardFooter>
              <p className="text-sm text-muted-foreground">
                6 persen higher than last month
              </p>
            </CardFooter>
          </Card>
        </div>
        {/* Monthly balance*/}
        <div className="monthlyBalance w-full">
          <Card>
            <CardHeader>
              <CardTitle>Monthly balance</CardTitle>
            </CardHeader>

            <CardContent>
              <p>Rp.{isTransactionLoading ? "..." : monthlyBalance}</p>
            </CardContent>

            <CardFooter>
              <p className="text-sm text-muted-foreground">
                6 persen higher than last month
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
        <div>Latest Transactions</div>
        <TransactionsHistory />
      </div>
    </div>
  );
}

// Line chart	Tren Income vs Expense
// Pie Chart	Distribusi pengeluaran per kategori
