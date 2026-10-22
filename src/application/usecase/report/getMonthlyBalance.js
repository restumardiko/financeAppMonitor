import getMonthlyExpense from "./getMonthlyExpense";
import getMonthlyIncome from "./getMonthlyIncome";

export default async function getMonthlyBalance({ transactionRepo }) {
  const monthlyExpense = await getMonthlyExpense({ transactionRepo });

  const monthlyIncome = await getMonthlyIncome({ transactionRepo });
  const monthlyBalance = monthlyIncome - monthlyExpense;

  return monthlyBalance;
}
