import addTransactionApi from "@/adapters/api/addTransaction/addTransactionApi";
export async function POST(req) {
  return addTransactionApi(req);
}
