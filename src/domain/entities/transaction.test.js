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
  Transaction.create({
    amount,
    transactionType: transType.getTransactionType(),
    date,
    accountId,
    description,
  });
});
//cannot create transaction with invalid transaction type
// cannot create transaction in the future
//cannot create transactin with empty accountId
//cannot create transaction with empty description
//
