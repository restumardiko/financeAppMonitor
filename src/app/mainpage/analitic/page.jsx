"use client";

import api from "@/lib/api";

import TrendIncomeExpense from "../../../components/analitic/TrendIncomeExpense";
import CategoryChart from "../../../components/analitic/CategoryChart";
import TotalBalanceEachTime from "../../../components/analitic/TotalBalanceEachTime";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import generateDummyTransactions from "../../../components/analitic/data dummy";

const transaction = generateDummyTransactions();

export default function Analitic() {
  //const queryClient = useQueryClient();
  //const userInformation = queryClient.getQueryData(["userInformation"]);
  const { data: userInfo, isLoading: isUserLoading } = useQuery({
    queryKey: ["userInformation"],
    queryFn: async () => {
      const res = await api.get("/userInformation");
      console.log(res.data);

      return res.data;
    },
  });

  const { data: account, isLoading: isAccountLoading } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const res = await api.get("/showAccount");
      return res.data.data;
    },
  });

  const { data: transactionsss = [], isLoading: isTransactionLoading } =
    useQuery({
      queryKey: ["analytic"],
      queryFn: async () => {
        const res = await api.get("/transactions");

        return res.data.data;
      },
    });
  const totalIncome = transaction
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transaction
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  if (isTransactionLoading) return <p>Loading…</p>;

  return (
    <div className="space-y-20">
      {/* Summary */}
      <div className="summary space-y-2">
        <div>Total Income: Rp. {totalIncome}</div>
        <div>Total Expense:Rp. {totalExpense}</div>

        <div className="balance">
          {isUserLoading ? (
            <p>Loading...</p>
          ) : (
            <div>Total Balance: Rp. {userInfo.total_balance}</div>
          )}
        </div>
      </div>
      <div className="chart">
        {isAccountLoading ? (
          <p>Loading</p>
        ) : (
          <div>
            {" "}
            {/* Category Chart */}
            <div className="category_charts">
              <CategoryChart dataChart={transaction} account={account} />
            </div>
            {/* Trend Chart */}
            <div className="trend mt-36">
              <TrendIncomeExpense dataChart={transaction} account={account} />
            </div>
            {/* Total Balance Over Time */}
            <div className="total_balance_chart w-full h-60 mb-40 ml-10">
              <TotalBalanceEachTime
                dataChart={transaction}
                account={account}
                initialBalance={userInfo.initial_balance}
                isUserLoading={isUserLoading}
              />
            </div>
          </div>
        )}
      </div>

      {/* Each Category Each Time (Placeholder) */}
      <div className="each_category_each_time"></div>
    </div>
  );
}
