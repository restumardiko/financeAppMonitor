import Account from "../../domain/entities/account";
export function accountMap(raw) {
  return Account.create(raw);
}
