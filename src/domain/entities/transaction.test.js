import TransactionType from "../valueObjects/transactionType";
import Money from "./../valueObjects/money";
import Transaction from "./transaction";

//"cannot create transaction with zero amount"
const id = crypto.randomUUID();
const date = new Date();
test("should create a transaction", () => {
  const amount = Money.create(100);
  const transType = TransactionType.create({
    type: "INCOME",
    category: "SALARY",
  });

  const newTransaction = Transaction.create({
    amount,
    transactionType: transType,
    date,
    accountId: id,
    description: "the transaction ",
  });
  expect(newTransaction.toJSON()).toHaveProperty("amount");
  expect(newTransaction.toJSON()).toHaveProperty("transactionType");
  expect(newTransaction.toJSON()).toHaveProperty("date");
});
// cannot create transaction in the future
test("reject transaction when date in the future", () => {
  const amount = Money.create(100);
  const transType = TransactionType.create({
    type: "INCOME",
    category: "SALARY",
  });
  const futureDate = new Date("2030-02-03");

  expect(() => {
    Transaction.create({
      amount,
      transactionType: transType,
      date: futureDate,
      accountId: id,
      description: "this is description",
    });
  }).toThrow(/^Transaction cannot be in the future$/);
});

//cannot create transactin with empty accountId
test("reject transaction with empty account id", () => {
  const amount = Money.create(100);
  const transType = TransactionType.create({
    type: "INCOME",
    category: "SALARY",
  });
  const pastDate = new Date("2026-02-03");

  expect(() => {
    Transaction.create({
      amount,
      transactionType: transType,
      date: pastDate,
      accountId: "",
      description: "this is description",
    });
  }).toThrow(/^accountId cannot be empty$/);
});
//cannot create transaction with empty description
test("reject transaction with empty account id", () => {
  const amount = Money.create(100);
  const transType = TransactionType.create({
    type: "INCOME",
    category: "SALARY",
  });
  const pastDate = new Date("2026-02-03");

  expect(() => {
    Transaction.create({
      amount,
      transactionType: transType,
      date: pastDate,
      accountId: crypto.randomUUID(),
      description: "",
    });
  }).toThrow(/^description cannot be empty$/);
});

test("every getter is working", () => {
  const amount = Money.create(100);
  const transType = TransactionType.create({
    type: "INCOME",
    category: "SALARY",
  });

  const newTransaction = Transaction.create({
    amount,
    transactionType: transType,
    date,
    accountId: id,
    description: "the transaction",
  });
  expect(newTransaction.amount.toNumber()).toEqual(100);
  expect(newTransaction.transactionType).toHaveProperty("type");
  expect(newTransaction.date).toBe(date);
  expect(newTransaction.accountId).toBe(id);
  expect(newTransaction.description).toBe("the transaction");
});

test("every setter is working");
