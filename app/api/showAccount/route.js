import showAccountApi from "@/adapters/api/showAccount/showAccountApi";

export async function GET(req) {
  return showAccountApi(req);
}
