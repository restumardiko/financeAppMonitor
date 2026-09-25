import FakeTransactionRepo from "./fakeTransactionRepo";
import { fakeTransactionInitialData } from "./initialDataRepo";
const fakeTransactionRepo = new FakeTransactionRepo(fakeTransactionInitialData);

//interface fakedata  { userId: "1", amount: 20, transactionType: {}, date: "12-12-2025" },

test("can save transaction to repo", () => {
  fakeTransactionRepo.save({
    userId: "2",
    amount: 10,
    transactionType: {},
    date: "11-06-2026",
  });
  expect(fakeTransactionRepo.data).toHaveLength(2);
});
test("can get transaction from repo", () => {
  const result = fakeTransactionRepo.get("1");
  expect(result).toEqual({
    userId: "1",
    amount: 20,
    transactionType: {},
    date: "12-12-2025",
  });
});
test("can delete transaction on repo", () => {
  const result = fakeTransactionRepo.delete("1");
  expect(result).toBeTruthy();
});
