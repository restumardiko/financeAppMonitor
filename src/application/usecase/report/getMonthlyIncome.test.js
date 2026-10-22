import FakeTransactionRepo from "../../fakeRepo/fakeTransactionRepo";
import { fakeTransactionInitialData } from "../../fakeRepo/initialDataRepo";
import getMonthlyIncome from "./getMonthlyIncome";

test("can get monthly expense", async () => {
  const transactionRepo = new FakeTransactionRepo(fakeTransactionInitialData);

  const monthlyIncome = await getMonthlyIncome({ transactionRepo });
  expect(monthlyIncome).toBe(20);
});
