import FakeTransactionRepo from "../../fakeRepo/fakeTransactionRepo";
import { fakeTransactionInitialData } from "../../fakeRepo/initialDataRepo";
import getTotalExpenseEachMonths from "./../report/getTotalExpenseEachMonths";

test("can return total income each month in targetted year and account", async () => {
  const fakeRepo = new FakeTransactionRepo(fakeTransactionInitialData);
  const getAllSpy = jest.spyOn(fakeRepo, "getAllTransactionsAccount");

  const totalExpenseEachMonths = await getTotalExpenseEachMonths({
    accountId: "2",
    year: Number("2025"),
    transactionRepo: fakeRepo,
  });
  expect(getAllSpy).toHaveBeenCalledTimes(1);
  expect(totalExpenseEachMonths).toHaveLength(12);
});
