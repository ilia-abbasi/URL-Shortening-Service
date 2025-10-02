import { generateKey, generateShortCode } from "../../helpers/utils.js";

describe("testing generateShortCode", () => {
  it("should return a string with 6 chars", () => {
    const shortCode = generateShortCode();

    expect(shortCode.length).toBe(6);
  });
});

describe("testing generateKey", () => {
  it("should return a string with 32 chars", () => {
    const key = generateKey();

    expect(key.length).toBe(32);
  });

  it("should return a string that starts with 'q'", () => {
    const key = generateKey();

    expect(key[0]).toBe("q");
  });
});
