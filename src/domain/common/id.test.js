import id from "./id.js";

test("Id generates a unique identifier", () => {
  const generatedId = id.generate();

  expect(generatedId).toBeInstanceOf(id);
  expect(generatedId.toString()).toMatch(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );
});

test("Id throws an error when initialized with an empty value", () => {
  expect(() => new id("")).toThrow("Id cannot be empty");
});

test("Id can be initialized with a valid value", () => {
  const validId = "1234567890abcdef";
  const idInstance = new id(validId);
  expect(idInstance.toString()).toBe(validId);
});
