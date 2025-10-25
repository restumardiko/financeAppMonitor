"use client";
import useTransactionStore from "../../store/useTransactionsStore";

export default function Analitic() {
  const { transactions } = useTransactionStore();
  console.log("data passed", transactions);
  return <div></div>;
}
