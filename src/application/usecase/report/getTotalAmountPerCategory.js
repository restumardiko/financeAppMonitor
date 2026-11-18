export default async function getTotalAmountPerCategory({
  transactionType,
  accountId,
  year,
  month,
  transactionRepo,
}) {
  const category = {
    EXPENSE: ["FOOD", "TRANSPORT", "HOME", "HEALTH"],
    INCOME: ["SALARY", "BUSINESS", "ETC."],
  };

  const allTransactionsAccount =
    await transactionRepo.getAllTransactionsAccount(accountId);

  const filteredTransactions = allTransactionsAccount.filter((transaction) => {
    const trxDate = new Date(transaction.date);
    return (
      trxDate.getFullYear() === Number(year) &&
      trxDate.getMonth() === Number(month) - 1 &&
      transaction.transactionType.type === transactionType
    );
  });

  const totalAmountTransType = filteredTransactions.reduce(
    (acc, cur) => acc + cur.amount,
    0,
  );
  if (totalAmountTransType === 0) {
    return category[transactionType].map((cat) => ({ [cat]: 0 }));
  }

  return category[transactionType].map((cat) => {
    const transactionsCategory = filteredTransactions.filter(
      (transaction) => transaction.transactionType.category === cat,
    );
    const totalAmountTransCategory = transactionsCategory.reduce(
      (acc, curr) => acc + curr.amount,
      0,
    );

    return { [cat]: totalAmountTransCategory };
  });
}

//:[{food:total},{transport:total}...]
