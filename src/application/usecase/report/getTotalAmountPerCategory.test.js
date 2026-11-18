import FakeTransactionRepo from "../../fakeRepo/fakeTransactionRepo";
import { fakeTransactionInitialData } from "../../fakeRepo/initialDataRepo";
import getTotalAmountPerCategory from "./getTotalAmountPerCategory";

test("can get total amount per category", async () => {
  const transactionRepo = new FakeTransactionRepo(fakeTransactionInitialData);
  const getTransactionAccountSpy = jest.spyOn(
    transactionRepo,
    "getAllTransactionsAccount",
  );
  const totalAmountPerCategory = await getTotalAmountPerCategory({
    transactionType: "INCOME",
    accountId: "1",
    year: "2025",
    month: 8,
    transactionRepo: transactionRepo,
  });
  expect(getTransactionAccountSpy).toHaveBeenCalledTimes(1);
  expect(totalAmountPerCategory).toHaveLength(3);
});
