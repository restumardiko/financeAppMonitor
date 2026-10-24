import FakeTransactionRepo from "../../fakeRepo/fakeTransactionRepo";
import { fakeTransactionInitialData } from "../../fakeRepo/initialDataRepo";
import getCategoriesPercentage from "./getCategoriesPercentage";

test("can get categories percentage", async () => {
  const transactionRepo = new FakeTransactionRepo(fakeTransactionInitialData);
  const getTransactionAccountSpy = jest.spyOn(
    transactionRepo,
    "getAllTransactionsAccount",
  );
  const categoriesPercentage = await getCategoriesPercentage({
    transactionType: "EXPENSE",
    accountId: "2",
    transactionRepo: transactionRepo,
  });
  expect(getTransactionAccountSpy).toHaveBeenCalledTimes(1);
  expect(categoriesPercentage).toHaveLength(3);
  expect(categoriesPercentage).toBe(4);
});
