import checkMail from "../../Functions/checkMail";

describe("CheckMail Unit Test Suite", () => {
  it("should be true", () => {
    expect(checkMail("mathieu@gmail.com")).toBeTruthy();
  });

  it("should be true", () => {
    expect(checkMail("mathieu.joke@lol.com")).toBeTruthy();
  });

  it("should be true", () => {
    expect(checkMail("mathieu.joke.contact@gmail.fr")).toBeTruthy();
  });

  it("should be false", () => {
    expect(checkMail("mathieu.jokegmail.com")).toBeFalsy();
  });

  it("should be false", () => {
    expect(checkMail("mathieu.joke@gmailcom")).toBeFalsy();
  });

  it("should be false", () => {
    expect(checkMail("mathieu.joke@gmail.c")).toBeFalsy();
  });
});
