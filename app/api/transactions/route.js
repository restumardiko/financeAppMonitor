import transactionsApi from "@/adapters/api/transactions/transactionsApi";

export async function GET(req) {
  return transactionsApi(req);
}
