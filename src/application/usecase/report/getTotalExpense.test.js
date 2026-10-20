import FakeTransactionRepo from "../../fakeRepo/fakeTransactionRepo";
import { fakeTransactionInitialData } from "../../fakeRepo/initialDataRepo";
import getTotalExpense from "./../report/getTotalExpense";

test("can return total income each month in targetted year and account", async () => {
  const fakeRepo = new FakeTransactionRepo(fakeTransactionInitialData);
  const getAllSpy = jest.spyOn(fakeRepo, "getAllTransactionsAccount");

  const totalIncome = await getTotalExpense({
    accountId: "2",
    year: Number("2025"),
    transactionRepo: fakeRepo,
  });
  expect(getAllSpy).toHaveBeenCalledTimes(1);
  expect(totalIncome).toHaveLength(12);
});
