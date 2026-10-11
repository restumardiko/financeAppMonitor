import FakeTransactionRepo from "../../fakeRepo/fakeTransactionRepo";
import { fakeTransactionInitialData } from "../../fakeRepo/initialDataRepo";
import getLatestTransactions from "./getLatestTransactions";

test("can get latest transaction", async () => {
  const fakeTransactionRepo = new FakeTransactionRepo(
    fakeTransactionInitialData,
  );
  const result = await getLatestTransactions(fakeTransactionRepo);

  expect(result[0]).toEqual({
    id: "1",
    accountId: "1",
    amount: 20,
    transactionType: {},
    date: "12-12-2025",
  });
});
