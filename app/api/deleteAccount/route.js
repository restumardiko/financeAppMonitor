import deleteAccountApi from "@/adapters/api/deleteAccount/deleteAccountApi";
export async function DELETE(req) {
  return deleteAccountApi(req);
}
