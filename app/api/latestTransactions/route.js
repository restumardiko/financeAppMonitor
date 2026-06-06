import latestTransactionsApi from "@/adapters/api/latestTransactions/latestTransactionsApi";
export async function GET(req) {
  return latestTransactionsApi(req);
}
