import Id from "../common/id";
import TransactionType from "../valueObjects/transactionType";
import Money from "./../valueObjects/money";
import Transaction from "./transaction";

//"cannot create transaction with zero amount"
test("should create a transaction", () => {
  const amount = Money.create(100);
  const transType = TransactionType.create({
    type: "INCOME",
    category: "SALARY",
  });
  const date = new Date();

  const newTransaction = Transaction.create({
    amount,
    transactionType: transType,
    date,
    accountId: Id.generate().toString(),
    description: "the transaction ",
  });
  expect(newTransaction.toJSON().transactionType.type).toEqual("INCOME");
});
//cannot create transaction with invalid transaction type
// cannot create transaction in the future
//cannot create transactin with empty accountId
//cannot create transaction with empty description
//
