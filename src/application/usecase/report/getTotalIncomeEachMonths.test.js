import FakeTransactionRepo from "../../fakeRepo/fakeTransactionRepo";
import { fakeTransactionInitialData } from "../../fakeRepo/initialDataRepo";
import getTotalIncomeEachMonths from "./../report/getTotalIncomeEachMonths";

test("can return total income each month in targetted year and account", async () => {
  const fakeRepo = new FakeTransactionRepo(fakeTransactionInitialData);
  const getAllSpy = jest.spyOn(fakeRepo, "getAllTransactionsAccount");

  const totalIncomeEachMonths = await getTotalIncomeEachMonths({
    accountId: "1",
    year: Number("2025"),
    transactionRepo: fakeRepo,
  });
  expect(getAllSpy).toHaveBeenCalledTimes(1);
  expect(totalIncomeEachMonths).toHaveLength(12);
});
