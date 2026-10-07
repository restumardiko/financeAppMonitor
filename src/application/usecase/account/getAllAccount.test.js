import Account from "../../../domain/entities/account";
import FakeAccountRepo from "../../fakeRepo/fakeAccountRepo";
import { fakeAccountInitialData } from "../../fakeRepo/initialDataRepo";
import getAllAccount from "../../usecase/account/getAllAccount";

test("can get all Accounts", async () => {
  const fakeAccountRepo = new FakeAccountRepo(fakeAccountInitialData);
  const result = await getAllAccount(fakeAccountRepo);

  expect(result).toHaveLength(2);
  expect(result[0]).toBeInstanceOf(Account);
});
