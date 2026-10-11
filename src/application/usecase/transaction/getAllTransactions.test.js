import FakeTransactionRepo from "../../fakeRepo/fakeTransactionRepo";
import { fakeTransactionInitialData } from "../../fakeRepo/initialDataRepo";
import getAllTransaction from "./getAllTransactions";

test("can get all transaction", async () => {
  const fakeTransactionRepo = new FakeTransactionRepo(
    fakeTransactionInitialData,
  );
  const result = await getAllTransaction(fakeTransactionRepo);

  expect(result).toHaveLength(1);
});
