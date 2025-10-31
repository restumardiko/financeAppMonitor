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
import useTransactionStore from "../store/useTransactionsStore";
import useUserInformation from "../store/useUserInformation";
import TrendIncomeExpense from "../../components/statistic/linechart";
import CategoryChart from "../../components/statistic/piechart";

export default function Home() {
  const { transactions, fetchTransactions } = useTransactionStore();
  const { name, total_balance, fetchInformation } = useUserInformation();
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  const latestFive = sortedTransactions.slice(0, 5);
  console.log("ini new Date", new Date(transactions[3].created_at));
  console.log("ini yang belum di sort ya mas", transactions);
  console.log("ini udah di sort ya mas", sortedTransactions);
  const router = useRouter();

  const stableInformationFetch = useCallback(() => {
    fetchInformation();
  }, [fetchInformation]);
  const stableTransactionFetch = useCallback(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.log("token empthy");
      router.push("/login");
      return;
    }

    stableInformationFetch();
    stableTransactionFetch();
  }, [stableInformationFetch, stableTransactionFetch]);

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
          <TransactionsCard transactions={latestFive} />
        </div>
      </div>
    </div>
  );
}

// Line chart	Tren Income vs Expense
// Pie Chart	Distribusi pengeluaran per kategori
