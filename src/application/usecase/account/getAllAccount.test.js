import FakeAccountRepo from "../../fakeRepo/fakeAccountRepo";
import { fakeAccountInitialData } from "../../fakeRepo/initialDataRepo";
import getAccounts from "./getAccount";

test("can get all Accounts", async () => {
  const fakeAccountRepo = new FakeAccountRepo(fakeAccountInitialData);
  const result = await getAccounts({ fakeAccountRepo });

  expect(result).toEqual([
    { id: "1", name: "BRI", balance: 1000 },
    { id: "2", name: "BCA", balance: 2000 },
  ]);
});
