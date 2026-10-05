import FakeAccountRepo from "../../fakeRepo/fakeAccountRepo";

import { fakeAccountInitialData } from "../../fakeRepo/initialDataRepo";
import getAccount from "./getAccount";

test("can get exact account", async () => {
  const fakeAccountRepository = new FakeAccountRepo(fakeAccountInitialData);

  const getSpy = jest.spyOn(fakeAccountRepository, "get");

  const account = await getAccount({
    accountId: "1",
    accountRepo: fakeAccountRepository,
  });

  expect(getSpy).toHaveBeenCalledTimes(1);
  expect(account).toEqual({ id: "1", name: "BRI", balance: 1000 });
});
