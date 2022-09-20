import "@testing-library/jest-dom";

import UserManagement from "../../containers/UserManagement/UserManagement";

// ** Custom wrapper **
import { render } from "./wrapper";

// ** Jest **
import { screen, fireEvent, waitFor } from "@testing-library/react";

import { serverUrl } from "../../assets/constants/globalVariables";

let submitButton;
let inputMail;
let inputPassword;
let errorMessage;
let container;

// Use to test number of call of useNavigation
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

beforeEach(async () => {
  mockedUsedNavigate.mockReset();
  container = render(<UserManagement type={"signin"} />);
  submitButton = screen.getByRole("button");
  inputMail = screen.getByPlaceholderText("Your email");
  inputPassword = screen.getByPlaceholderText("Password");
});

describe("SignIn Integration Tests", () => {
  it("should render without crash", async () => {});

  it("should NOT be disabled", () => {
    expect(submitButton).not.toHaveAttribute("disabled");
  });

  it("should have error message if email & password is empty", () => {
    fireEvent.click(submitButton);

    errorMessage = screen.getByTestId("error-message");

    expect(errorMessage.textContent).toBe(
      "We need more element to connect you ;)"
    );
  });

  it("should have error message if email is complet but not password", () => {
    fireEvent.change(inputMail, { target: { value: "test@test.fr" } });

    fireEvent.click(submitButton);

    errorMessage = screen.getByTestId("error-message");

    expect(errorMessage.textContent).toBe(
      "We need more element to connect you ;)"
    );
  });

  it("should have error message if email is empty but password is complet", () => {
    fireEvent.change(inputPassword, { target: { value: "azerty" } });

    fireEvent.click(submitButton);

    errorMessage = screen.getByTestId("error-message");

    expect(errorMessage.textContent).toBe(
      "We need more element to connect you ;)"
    );
  });

  it("should be disabled button", () => {
    fireEvent.change(inputMail, { target: { value: "test@test.fr" } });
    fireEvent.change(inputPassword, { target: { value: "azerty" } });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
  });

  it("should have error message with wrong email", async () => {
    fireEvent.change(inputMail, { target: { value: "test@test.com" } });
    fireEvent.change(inputPassword, { target: { value: "azerty" } });

    fireEvent.click(submitButton);

    errorMessage = screen.getByTestId("error-message");

    await waitFor(() =>
      expect(errorMessage.textContent).toBe(
        "Sorry but this mail or password is not exact"
      )
    );
  });

  it("should have error message with wrong password", async () => {
    fireEvent.change(inputMail, { target: { value: "test@test.fr" } });
    fireEvent.change(inputPassword, { target: { value: "azer" } });
    fireEvent.click(submitButton);

    errorMessage = screen.getByTestId("error-message");

    await waitFor(() =>
      expect(errorMessage.textContent).toBe(
        "Sorry but this mail or password is not exact"
      )
    );
  });

  it("should be redirected if email & password are ok", async () => {
    fireEvent.change(inputMail, { target: { value: "test@test.fr" } });
    fireEvent.change(inputPassword, { target: { value: "azerty" } });
    fireEvent.click(submitButton);

    errorMessage = screen.getByTestId("error-message");

    await waitFor(() => expect(mockedUsedNavigate).toBeCalledTimes(1));
  });
});
