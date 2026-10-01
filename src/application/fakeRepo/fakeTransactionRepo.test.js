import FakeTransactionRepo from "./fakeTransactionRepo";
import { fakeTransactionInitialData } from "./initialDataRepo";
const fakeTransactionRepo = new FakeTransactionRepo(fakeTransactionInitialData);

//interface fakedata  { userId: "1", amount: 20, transactionType: {}, date: "12-12-2025" },

test("can save transaction to repo", () => {
  fakeTransactionRepo.save({
    transactionId: "2",
    accountId: "1",
    amount: 10,
    transactionType: {},
    date: "11-06-2026",
  });
  expect(fakeTransactionRepo.data).toHaveLength(2);
});
test("can get transaction from repo", () => {
  const result = fakeTransactionRepo.get("1");
  expect(result).toEqual({
    transactionId: "1",
    accountId: "1",
    amount: 20,
    transactionType: {},
    date: "12-12-2025",
  });
});
test("can delete transaction on repo", () => {
  const result = fakeTransactionRepo.delete("1");
  expect(result).toBeTruthy();
  expect(fakeTransactionRepo.data).toHaveLength(1);
});

test("has transaction for account", () => {
  const result = fakeTransactionRepo.hasTransactionFor("1");
  expect(result).toBeTruthy();
});
