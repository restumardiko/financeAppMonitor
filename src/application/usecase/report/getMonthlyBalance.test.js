import FakeTransactionRepo from "../../fakeRepo/fakeTransactionRepo";
import { fakeTransactionInitialData } from "../../fakeRepo/initialDataRepo";
import getMonthlyBalance from "./getMonthlyBalance";

test("can get monthly balance", async () => {
  const transactionRepo = new FakeTransactionRepo(fakeTransactionInitialData);
  const monthlyBalance = await getMonthlyBalance({ transactionRepo });

  expect(monthlyBalance).toBe(0);
});
