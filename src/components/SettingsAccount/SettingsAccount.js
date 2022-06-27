import "./SettingsAccount.scss";

// ** Components **
import SubmitButton from "../SubmitButton/SubmitButton";

// ** Hooks **
import { useState } from "react";

const SettingsAccount = () => {
  const [removeConfirm, setRemoveConfirm] = useState(false);

  return (
    <div className="SettingsAccount">
      <div className="Settings__infos">
        <h2>Account</h2>
        <p>To disconnect or delete your account, it's here!</p>
      </div>

      <div className="Settings__inputs">
        {removeConfirm === false ? (
          <>
            <p>Remove your account</p>
            <p
              className="SettingsAccount__remove"
              onClick={() => setRemoveConfirm(true)}
            >
              Click here to remove your account
            </p>
          </>
        ) : (
          <>
            <p>Are you sure ? 😢</p>
            <div className="SettingsAccount__confirm">
              <p className="SettingsAccount__remove">Yes</p>
              <p onClick={() => setRemoveConfirm(false)}>No</p>
            </div>
          </>
        )}
      </div>

      <div className="SettingsAccount__disconnect">
        <SubmitButton title={"Disconnect"} color={"red"} />
      </div>
    </div>
  );
};

export default SettingsAccount;
