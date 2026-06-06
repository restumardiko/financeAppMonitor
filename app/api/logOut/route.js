import logOutApi from "@/adapters/api/logOut/logOutApi";
export async function DELETE(req) {
  return logOutApi(req);
}
