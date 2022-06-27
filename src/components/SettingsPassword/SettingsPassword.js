import "./SettingsPassword.scss";

// ** Components **
import InputText from "../../components/InputText/InputText";
import SubmitButton from "../SubmitButton/SubmitButton";

// ** Hooks **
import { useState } from "react";

const SettingsPassword = () => {
  const [actualPassword, setActualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");

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
        <SubmitButton title={"Update password"} />
      </div>
    </div>
  );
};

export default SettingsPassword;
