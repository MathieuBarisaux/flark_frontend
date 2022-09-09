import upperCaseFirst from "../Functions/upperCaseFirst";

describe("Test upperCaseFirst Unit function", () => {
  it("should return Thomas", () => {
    expect(upperCaseFirst("THOMAS")).toBe("Thomas");
  });

  it("should return Jack", () => {
    expect(upperCaseFirst("jack")).toBe("Jack");
  });

  it("should return Géraldine", () => {
    expect(upperCaseFirst("GéRaldIne")).toBe("Géraldine");
  });

  it("should return Thomas1", () => {
    expect(upperCaseFirst("thomas1")).toBe("Thomas1");
  });

  it("should return nothing", () => {
    expect(upperCaseFirst("")).toBe("");
  });
});
