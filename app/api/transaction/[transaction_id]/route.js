import transactionApi from "@/adapters/api/transaction/transactionApi";

export async function PATCH(request, { params }) {
  return transactionApi(request, params);
}
