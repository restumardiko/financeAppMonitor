import TransactionType from "../valueObjects/transactionType";
import Money from "./../valueObjects/money";
import Transaction from "./transaction";

//"can create transaction"
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
test("reject transaction when date is not valid", () => {
  const amount = Money.create(100);
  const transType = TransactionType.create({
    type: "INCOME",
    category: "SALARY",
  });

  expect(() => {
    Transaction.create({
      amount,
      transactionType: transType,
      date: new Date("invalid date"),
      accountId: id,
      description: "this is description",
    });
  }).toThrow(/^invalid date transaction$/);
});

test("reject transaction with invalid amount", () => {
  const amount = 100;
  const transType = TransactionType.create({
    type: "INCOME",
    category: "SALARY",
  });

  expect(() => {
    Transaction.create({
      amount: amount,
      transactionType: transType,
      date: date,
      accountId: id,
      description: "this is description",
    });
  }).toThrow(/^Amount is not valid$/);
});
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
test("reject transaction with empty description", () => {
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

test("every setter is working", () => {
  const transType = TransactionType.create({
    type: "EXPENSE",
    category: "HEALTH",
  });

  const newTransaction = Transaction.create({
    amount: Money.create(100),
    transactionType: transType,
    date: date,
    accountId: id,
    description: "the transaction",
  });
  //not error when set new amount
  expect(() => {
    newTransaction.amount = Money.create(50);
  }).not.toThrow();
  expect(() => {
    newTransaction.transactionType = TransactionType.create({
      type: "INCOME",
      category: "SALARY",
    });
  }).not.toThrow();
  //not error when set new date
  expect(() => {
    newTransaction.date = new Date();
  }).not.toThrow();
  //error when set invalid new date
  expect(() => {
    newTransaction.date = "jsksk";
  }).toThrow(/^invalid date transaction$/);

  //expect(newTransaction.accountId).not.toThrow();
  //not error when set new description
  expect(() => {
    newTransaction.description = "new description";
  }).not.toThrow();
});
//test instance method
test("all method are working", () => {
  const transType = TransactionType.create({
    type: "INCOME",
    category: "SALARY",
  });

  const newTransaction = Transaction.create({
    amount: Money.create(100),
    transactionType: transType,
    date,
    accountId: id,
    description: "the transaction ",
  });

  expect(newTransaction.isPending()).toBeTruthy();
  expect(newTransaction.isConfirmed()).toBeFalsy();
  newTransaction.confirm();
  expect(newTransaction.isPending()).toBeFalsy();
  newTransaction.cancel();
  expect(newTransaction.status).toBe("CANCELED");
});
// test("confirm is working",()=>{

// })
