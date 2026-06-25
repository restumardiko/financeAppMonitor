import assert from "node:assert/strict";
import test from "node:test";
import Money from "./money.js";

test("Money can add and compare values", () => {
  const base = Money.create(100);
  const result = base.add(Money.create(50));

  assert.equal(result.toNumber(), 150);
  assert.equal(base.toString(), "100.00");
});

test("Money can subtract values", () => {
  const base = Money.create(100);
  const result = base.subtract(Money.create(30));

  assert.equal(result.toNumber(), 70);
});
