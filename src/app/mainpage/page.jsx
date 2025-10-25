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
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState, useCallback } from "react";
import useTransactionStore from "../store/useTransactionsStore";
import useUserInformation from "../store/useUserInformation";

const data = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 300 },
  { name: "Mar", uv: 200 },
  { name: "Apr", uv: 278 },
  { name: "May", uv: 189 },
];

export default function Home() {
  const { transactions, fetchTransactions } = useTransactionStore();
  const { name, total_balance, fetchInformation } = useUserInformation();
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
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line type="" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="recent_transactions">
          <TransactionsCard transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
