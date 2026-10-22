export default async function getMonthlyIncome({ transactionRepo }) {
  const allTransactions = await transactionRepo.getAll();
  const monthlyIncomeTransactions = allTransactions.filter(
    (transaction) =>
      transaction.transactionType.type === "INCOME" &&
      transaction.date.getMonth() === new Date().getMonth() &&
      transaction.date.getFullYear() === new Date().getFullYear(),
  );
  const totalMonthlyIncome = monthlyIncomeTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );
  return totalMonthlyIncome;
}
