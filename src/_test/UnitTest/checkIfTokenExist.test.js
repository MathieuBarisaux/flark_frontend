// ** Dependancies **
import Cookie from "js-cookie";

// ** Function **
import checkIfTokenExist from "../../Functions/checkIfTokenExist";

let actualTokenRegister;

beforeAll(() => {
  actualTokenRegister = Cookie.get("token");

  Cookie.remove("token");
});

afterAll(() => {
  actualTokenRegister &&
    Cookie.set("token", actualTokenRegister, { expires: 360 });
});

describe("CheckIfTokenExist Unit Test Suite", () => {
  it("should be null", () => {
    expect(checkIfTokenExist()).toBe(null);
  });

  it("should be Token", () => {
    Cookie.set("token", "Token", { expires: 360 });

    expect(checkIfTokenExist()).toBe("Token");
  });
});
