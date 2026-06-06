import userInformationApi from "@/adapters/api/userInformation/userInformationApi";

export async function GET(req) {
  return userInformationApi(req);
}
