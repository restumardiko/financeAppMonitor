import { useEffect, useCallback } from "react";
import useTransactionStore from "../../app/store/useTransactionsStore";
import TransactionsCard from "./transactionsCard";

export default function TransactionsHistory() {
  const { transactions, fetchTransactions } = useTransactionStore();

  const stableFetch = useCallback(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    if (!transactions || transactions.length === 0) {
      stableFetch();
    }
  }, [stableFetch]);

  return (
    <div className="recent_transactions gap-2 flex flex-col">
      <TransactionsCard transactions={transactions} />
    </div>
  );
}
