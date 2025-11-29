"use client";
import api from "@/lib/api";
//import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

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
              6 persen less than last month
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
              <CardDescription>Card Description</CardDescription>
              <CardAction>Card Action</CardAction>
            </CardHeader>

            <CardContent>
              <p>Rp.xxxxxxxxxx</p>
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
              <CardDescription>Card Description</CardDescription>
              <CardAction>Card Action</CardAction>
            </CardHeader>

            <CardContent>
              <p>Rp.xxxxxxxxxx</p>
            </CardContent>

            <CardFooter>
              <p className="text-sm text-muted-foreground">
                6 persen higher than last month
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Statistik (sementara dimatiin) */}
      {/*
  <div className="statistic">
    <TrendIncomeExpense />
    <CategoryChart />
  </div>
  */}

      {/* Recent Transactions */}
      <div className="recent_transactions">
        <TransactionsHistory />
      </div>
    </div>
  );
}

// Line chart	Tren Income vs Expense
// Pie Chart	Distribusi pengeluaran per kategori
