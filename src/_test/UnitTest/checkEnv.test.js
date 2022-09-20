import { checkEnv } from "../../Functions/checkEnv";

describe("CheckEnv Unit Test Suite", () => {
  it("should be true per default", () => {
    expect(checkEnv()).toBe(true);
  });

  it("should be true in development", () => {
    process.env.NODE_ENV = "development";
    expect(checkEnv()).toBe(true);
  });

  it("should be false in production", () => {
    process.env.NODE_ENV = undefined;
    expect(checkEnv()).toBe(null);
  });
});
