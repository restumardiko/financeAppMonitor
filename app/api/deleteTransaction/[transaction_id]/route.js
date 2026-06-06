import deleteTransactionApi from "@/adapters/api/transaction/[transaction_id]/transactionApi";
export async function DELETE(req, { params }) {
  return deleteTransactionApi(req, params);
}
