import Money from "../../../domain/valueObjects/money";
import TransactionType from "../../../domain/valueObjects/transactionType";
import FakeTransactionRepo from "../../fakeRepo/fakeTransactionRepo";
import { fakeTransactionInitialData } from "../../fakeRepo/initialDataRepo";
import createTransaction from "./createTransaction";

test("should create transaction", async () => {
  const fakeRepo = new FakeTransactionRepo(fakeTransactionInitialData);
  const saveSpy = jest.spyOn(fakeRepo, "save");
  const transaction = await createTransaction({
    id: "123",
    amount: Money.create(200),
    transactionType: TransactionType.create({
      type: "INCOME",
      category: "SALARY",
    }),
    date: new Date(),
    accountId: "10",
    description: "first transaction",
    transactionRepo: fakeRepo,
  });
  expect(transaction).toHaveProperty("id", "123");
  expect(fakeRepo.data).toHaveLength(2);
  expect(saveSpy).toHaveBeenCalledTimes(1);
});

test("should create transaction without id embeded", async () => {
  const fakeRepo = new FakeTransactionRepo(fakeTransactionInitialData);

  const transaction = await createTransaction({
    amount: Money.create(200),
    transactionType: TransactionType.create({
      type: "EXPENSE",
      category: "FOOD",
    }),
    date: new Date(),
    accountId: "123",
    description: "second transaction",
    transactionRepo: fakeRepo,
  });
  expect(transaction).toHaveProperty("id");
  expect(fakeRepo.data).toHaveLength(3);
});
