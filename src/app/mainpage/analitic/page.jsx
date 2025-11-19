"use client";

import api from "@/lib/api";

import TrendIncomeExpense from "../../../components/analitic/TrendIncomeExpense";
import CategoryChart from "../../../components/analitic/CategoryChart";
import TotalBalanceEachTime from "../../../components/analitic/TotalBalanceEachTime";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export default function Analitic() {
  const queryClient = useQueryClient();
  const userInformation = queryClient.getQueryData(["userInformation"]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["analictic"],
    queryFn: async () => {
      const res = await api.get("/transactions");

      return res.data.data;
    },
  });
  const totalIncome = data
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = data
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  if (isLoading) return <p>Loading…</p>;

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
        <CategoryChart dataChart={data} />
      </div>

      <div className="trend bg-gray-50">
        <div>
          sort income/expense <br />
          income <br />
          expense
        </div>
        <TrendIncomeExpense dataChart={data} />
      </div>
      <div className="total_balance_chart w-full h-60">
        <div>
          sort all <br />
          ovo <br />
          dana
        </div>
        <TotalBalanceEachTime dataChart={data} />
      </div>
      <div className="each_category_each_time"></div>
    </div>
  );
}
