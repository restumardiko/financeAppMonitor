import Money from "./money.js";

test("Money can add another Money value", () => {
  const base = Money.create(100);
  const result = base.add(Money.create(50));

  expect(result).toEqual(Money.create(150));
});
test("should Error when change value directly", () => {
  const base = Money.create(100);

  expect(() => {
    base.amount += 2;
  }).toThrow(TypeError);
});
test("Money can subtract values", () => {
  const base = Money.create(100);
  const result = base.subtract(Money.create(30));

  expect(result).toEqual(Money.create(70));
});

test("Money rejects invalid amount", () => {
  expect(() => Money.create("abc")).toThrow();
});

test("Money does not mutate original", () => {
  const base = Money.create(100);
  base.add(Money.create(50));
  expect(base).toEqual(Money.create(100));
});

test("Money rejects negative amount", () => {
  expect(() => Money.create(-20)).toThrow();
});
