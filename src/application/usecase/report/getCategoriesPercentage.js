export default async function getCategoriesPercentage({
  transactionType,
  accountId,
  //year,
  // month,
  transactionRepo,
}) {
  const category = {
    EXPENSE: ["FOOD", "TRANSPORT", "HOME", "HEALTH"],
    INCOME: ["SALARY", "BUSINESS", "ETC."],
  };

  const allTransactionsAccount =
    await transactionRepo.getAllTransactionsAccount(accountId);

  const categoriesPercentage = (transactionType) => {
    const totalAmountTransType = allTransactionsAccount
      .filter((transaction) => {
        return transaction.transactionType.type === transactionType;
      })
      .reduce((acc, cur) => (acc + cur.amount, 0));
    return category[transactionType].map((category) => {
      const totalAmountTransCategory = (category) => {
        incomeTransactions.filter((transaction) => {
          return transaction.transactionType.category === category;
        });
      };
      const percentage =
        (totalAmountTransType / 100) * totalAmountTransCategory;

      return { [category]: percentage };
    });
  };
  return categoriesPercentage(transactionType);
}

//:[{food:%},{transport:%}...]
