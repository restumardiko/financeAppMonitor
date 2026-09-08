import Account from "../../../domain/entities/account.js";
import Money from "../../../domain/valueObjects/money.js";

// export default function createAccount({ name, balance, accountRepository }) {
//   const normalizedName = typeof name === "string" ? name.trim() : "";

//   if (!normalizedName || normalizedName.length < 2) {
//     throw new Error("Name should not be empty or less than two");
//   }

//   const parsedBalance = balance instanceof Money ? balance : Money.create(balance);
//   const account = Account.create({
//     name: normalizedName,
//     balance: parsedBalance,
//   });

//   const savedAccount = accountRepository.create({
//     id: account.id,
//     name: account.name,
//     balance: account.balance,
//   });

//   return Account.create({
//     name: savedAccount.name,
//     balance: Money.create(savedAccount.balance),
//   });
// }
