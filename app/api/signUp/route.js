import signUpApi from "@/adapters/api/signUp/signUpApi";

export async function POST(req) {
  return signUpApi(req);
}
