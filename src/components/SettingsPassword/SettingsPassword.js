import "./SettingsPassword.scss";

// ** Components **
import InputText from "../../components/InputText/InputText";
import SubmitButton from "../SubmitButton/SubmitButton";

// ** Hooks **
import { useState } from "react";

// ** Dependencies **
import axios from "axios";
import Cookie from "js-cookie";

// ** Global variable **
import { serverUrl } from "../../assets/constants/globalVariables";

// ** Redux **
import { useSelector, useDispatch } from "react-redux";

const SettingsPassword = () => {
  const { userToken } = useSelector((state) => ({
    ...state.tokenManagementReducer,
  }));

  const dispatch = useDispatch();

  const [actualPassword, setActualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [updateValidate, setUpdateValidate] = useState(false);

  // Verify all informations and if they are OK, submit form and change token
  const submitChangePassword = async () => {
    setErrorMessage("");

    if (actualPassword && newPassword && verifyNewPassword) {
      if (newPassword.length > 5) {
        if (newPassword === verifyNewPassword) {
          try {
            const data = {
              password: actualPassword,
              newPassword: newPassword,
            };

            const callServerToChangePassword = await axios.put(
              `${serverUrl}/users/update-password`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            if (callServerToChangePassword.status === 200) {
              Cookie.set("token", callServerToChangePassword.data.token, {
                expires: 360,
              });

              dispatch({ type: "changeToken" });
              setUpdateValidate(true);

              setActualPassword("");
              setNewPassword("");
              setVerifyNewPassword("");

              setTimeout(() => setUpdateValidate(false), 3000);
            }
          } catch (error) {
            console.log(error.response);
            setErrorMessage(error.response.data?.message);
          }
        } else {
          setErrorMessage("Your confirmation password is not good.");
        }
      } else {
        setErrorMessage(
          "For your security, choose a password with more thant 5 letters"
        );
      }
    } else {
      setErrorMessage("You must complete all the fields of the form");
    }
  };

  return (
    <div className="SettingsPassword">
      <div className="Settings__infos">
        <h2>Password</h2>
        <p>Please enter your current password to change your password.</p>
      </div>

      <div className="Settings__inputs">
        <p>Current password</p>
        <InputText
          value={actualPassword}
          setValue={setActualPassword}
          type="password"
        />
      </div>

      <div className="Settings__inputs Settings__inputs--border">
        <p>New password</p>
        <InputText
          value={newPassword}
          setValue={setNewPassword}
          type="password"
        />
      </div>

      <div className="Settings__inputs Settings__inputs--border">
        <p>Confirm new password</p>
        <InputText
          value={verifyNewPassword}
          setValue={setVerifyNewPassword}
          type="password"
        />
      </div>

      <div className="Settings__button">
        <p>{errorMessage}</p>
        {updateValidate ? (
          <SubmitButton title={"Success ✓"} />
        ) : (
          <SubmitButton
            title={"Update password"}
            onclick={() => submitChangePassword()}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsPassword;
