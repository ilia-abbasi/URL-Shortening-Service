import { generateShortCode } from "../../helpers/utils";

describe("testing generateShortCode", () => {
  it("should return a string with 6 chars", () => {
    const shortCode = generateShortCode();

    expect(shortCode.length).toBe(6);
  });
});
