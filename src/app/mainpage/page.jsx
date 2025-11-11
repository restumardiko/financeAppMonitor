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

import { useEffect, useState, useCallback } from "react";
import useLatestTransactionStore from "../store/useTransactionsStore";
import useUserInformation from "../store/useUserInformation";
import TrendIncomeExpense from "../../components/statistic/linechart";
import CategoryChart from "../../components/statistic/piechart";

export default function Home() {
  const { LatestTransactions, fetchLatestTransactions } =
    useLatestTransactionStore();
  const { name, total_balance, fetchInformation } = useUserInformation();

  const router = useRouter();

  const stableInformationFetch = useCallback(() => {
    fetchInformation();
  }, [fetchInformation]);
  const stableLatestTransactionFetch = useCallback(() => {
    fetchLatestTransactions();
  }, [fetchLatestTransactions]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.log("token empthy");
      router.push("/login");
      return;
    }

    stableInformationFetch();
    stableLatestTransactionFetch();
  }, [stableInformationFetch, stableLatestTransactionFetch]);

  return (
    <div>
      Home
      <div>
        <h1>hello {name}.</h1>
        <h3>this is your finance report</h3>
      </div>
      <div id="card" className="">
        <Card>
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <h1>Rp.{total_balance}</h1>
          </CardContent>
          <CardFooter>
            <p>6 persen less than last month</p>
          </CardFooter>
        </Card>
      </div>
      <div>
        <div className="monthly flex flex-row">
          <div className="monthlyExpense">
            <Card>
              <CardHeader>
                <CardTitle>monthly expense</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>Rp.xxxxxxxxxx</p>
              </CardContent>
              <CardFooter>
                <p> 6 persen higher than last month</p>
              </CardFooter>
            </Card>
          </div>
          <div className="monthlyIncome">
            <Card>
              <CardHeader>
                <CardTitle>monthly income</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>Rp.xxxxxxxxxx</p>
              </CardContent>
              <CardFooter>
                <p> 6 persen higher than last month</p>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="statistic">
          <TrendIncomeExpense />
          <CategoryChart />
        </div>
        <div className="recent_transactions">
          <TransactionsCard transactions={LatestTransactions} />
        </div>
      </div>
    </div>
  );
}

// Line chart	Tren Income vs Expense
// Pie Chart	Distribusi pengeluaran per kategori
