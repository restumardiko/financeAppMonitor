"use client";

import api from "@/lib/api";

import TrendIncomeExpense from "../../../components/analitic/TrendIncomeExpense";
import CategoryChart from "../../../components/analitic/CategoryChart";
import TotalBalanceEachTime from "../../../components/analitic/TotalBalanceEachTime";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import generateDummyTransactions from "../../../components/analitic/data dummy";

const transaction = generateDummyTransactions();

export default function Analitic() {
  const queryClient = useQueryClient();
  const userInformation = queryClient.getQueryData(["userInformation"]);

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
    <div>
      <div className=" summary">
        <div>total income:{totalIncome}</div>
        <div>total expense:{totalExpense}</div>
        <div className="balance">
          <div>
            {!userInformation ? (
              <>loading...</>
            ) : (
              <div> total balance:{userInformation.total_balance}</div>
            )}
          </div>
        </div>
      </div>

      <div className="category_charts">
        <CategoryChart
          dataChart={transaction}
          account={account}
          loading={isAccountLoading}
        />
      </div>

      <div className="trend mt-36">
        <TrendIncomeExpense
          dataChart={transaction}
          account={account}
          loading={isAccountLoading}
        />
      </div>
      <div className="total_balance_chart w-full h-60 mb-40 ml-10">
        <TotalBalanceEachTime
          dataChart={transaction}
          account={account}
          loading={isAccountLoading}
          initialBalance={userInformation.initial_balance}
        />
      </div>
      <div className="each_category_each_time"></div>
    </div>
  );
}
