import refreshApi from "@/adapters/api/refresh/refreshApi";

export async function POST() {
  return refreshApi();
}
