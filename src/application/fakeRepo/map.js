import Account from "../../domain/entities/account";
import Transaction from "../../domain/entities/transaction";
import Money from "../../domain/valueObjects/money";

//this is used only for "get"
export function accountMap(raw) {
  if (!raw) {
    throw new Error("account is not defined");
  }
  const balance = Money.create(raw.balance);
  const account = Account.create({
    id: raw.id,
    name: raw.name,
    balance: balance,
  });
  return account;
}
export function transactionMap(raw) {
  return Transaction.create(raw);
}
