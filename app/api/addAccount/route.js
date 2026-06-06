import addAccountApi from "@/adapters/api/addAccount/addAccountApi";
export async function POST(req) {
  return addAccountApi(req);
}
