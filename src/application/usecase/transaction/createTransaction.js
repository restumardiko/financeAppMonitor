import Transaction from "../../../domain/entities/transaction";

export default async function createTransaction({
  id,
  amount,
  transactionType,
  date,
  accountId,
  description,
  transactionRepo,
}) {
  const transaction = Transaction.create({
    id,
    amount,
    transactionType,
    date,
    accountId,
    description,
  });
  const savedTransaction = await transactionRepo.save(transaction);
  return savedTransaction;
}
