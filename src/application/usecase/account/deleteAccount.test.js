export class FakeAccountRepo {
  data;
  constructor(initialdata) {
    this.data = initialdata;
  }
  delete() {}
  save() {}
  get() {}
}
export class FakeTransactionRepo {
  data;
  constructor(initialdata) {}
}

function makeFakeAccountRepository() {
  const store = [];
  return {
    delete: jest.fn(async (account) => {
      store.push(account);
      return account;
    }),
    get: jest.fn(async (accountId) => {
      //find index
      const whatIndex = store.findIndex((account) => {
        return account.id === accountId;
      });
      return whatIndex;
    }),
    _store: store,
  };
}
function makeFakeTransactionRepository() {
  const store = [];
  return {
    get: jest,
  };
}
const fakeRepo = makeFakeRepository();

test("account can be deleted", async () => {});
test("empty account cannot be deleted");
test("account that has transactions cannot be deleted ");
