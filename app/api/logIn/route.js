import logInApi from "@/adapters/api/logIn/logInApi.js";
export async function POST(req) {
  return logInApi(req);
}
