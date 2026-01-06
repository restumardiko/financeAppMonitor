import { accountHandlers } from "./handlers/account.handlers";
import { authHandlers } from "./handlers/auth.handlers";
import { transactionHandlers } from "./handlers/transaction.handler";
import { userHandlers } from "./handlers/user.handler";

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...accountHandlers,
  ...transactionHandlers,
];
