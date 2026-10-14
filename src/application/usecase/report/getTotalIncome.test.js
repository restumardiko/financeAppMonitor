import FakeTransactionRepo from "../../fakeRepo/fakeTransactionRepo";
import { fakeTransactionInitialData } from "../../fakeRepo/initialDataRepo";
import getTotalIncome from "./getTotalBalance";

test("can return total income each month in targetted year and account", async () => {
  const fakeRepo = new FakeTransactionRepo(fakeTransactionInitialData);
  const getAllSpy = jest.spyOn(fakeRepo, "getAll");

  const totalIncome = await getTotalIncome({
    accountId: "1",
    year: "205",
    transactionRepo: fakeRepo,
  });
  expect(totalIncome).toHaveLength(12);
  expect(getAllSpy).toHaveBeenCalledTimes(1);
});
