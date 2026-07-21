import Id from "../common/id";
import Transaction from "./transaction";
import Money from "./../valueObjects/money";

const transactionId = Id.generate();
const accountId = Id.generate();

//"cannot create transaction with zero amount"
test("should create a transaction", () => {
  const amount = Money.create(100);
  Transaction.create({
    transactionId,
    amount,
    transactionType,
    date,
    accountId,
    description,
    status,
  });
});
