export const fakeAccountInitialData = [
  { id: "1", name: "BRI", balance: 1000 },
  { id: "2", name: "BCA", balance: 2000 },
];
export const fakeTransactionInitialData = [
  {
    id: "1",
    accountId: "1",
    amount: 20,
    transactionType: { type: "INCOME", category: "BUSINESS" },
    date: new Date("08-12-2025"),
  },
  //BELOW IS TEMPORARY BECAUSE I MADE UNSCALABLE INITIAL DATA AND SHOULD BE DELETED (GET TOTAL INCOME NECESSITY)

  {
    id: "2",
    accountId: "1",
    amount: 80,
    transactionType: { type: "INCOME", category: "SALARY" },
    date: new Date("08-12-2025"),
  },
  {
    id: "3",
    accountId: "1",
    amount: 20,
    transactionType: { type: "EXPENSE", category: "FOOD" },
    date: new Date("08-12-2025"),
  },
  {
    id: "4",
    accountId: "2",
    amount: 10,
    transactionType: { type: "EXPENSE", category: "FOOD" },
    date: new Date("09-12-2025"),
  },
];
