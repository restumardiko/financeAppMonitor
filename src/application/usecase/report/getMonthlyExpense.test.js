import FakeTransactionRepo from "../../fakeRepo/fakeTransactionRepo";
import { fakeTransactionInitialData } from "../../fakeRepo/initialDataRepo";
import getMonthlyExpense from "./getMonthlyExpense";

test("can get monthly expense", async () => {
  const transactionRepo = new FakeTransactionRepo(fakeTransactionInitialData);

  const monthlyExpense = await getMonthlyExpense({ transactionRepo });
  expect(monthlyExpense).toBe(20);
});
