import { checkEnv } from "../Functions/checkEnv";

describe("CheckEnv Unit Test Suite", () => {
  it("should be null", () => {
    expect(checkEnv()).toBe(null);
  });

  it("should be true", () => {
    process.env.NODE_ENV = "dev";
    expect(checkEnv()).toBe(true);
  });
});
