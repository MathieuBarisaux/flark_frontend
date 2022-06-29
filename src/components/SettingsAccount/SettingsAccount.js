import "./SettingsAccount.scss";

// ** Components **
import SubmitButton from "../SubmitButton/SubmitButton";

// ** Dependancies **
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

// ** Hooks **
import { useState } from "react";
import axios from "axios";

const SettingsAccount = ({ tokenChange, setTokenChange, bearerToken }) => {
  const [removeConfirm, setRemoveConfirm] = useState(false);

  const navigate = useNavigate();

  // ** Disconnect user **
  const disconnectUser = () => {
    Cookie.remove("token");

    localStorage.removeItem("InfosUser");

    setTokenChange(!tokenChange);
    navigate("/signin");
  };

  // ** Remove user **
  const removeUser = async () => {
    try {
      const callServerToDelete = await axios.delete(
        "https://flark.herokuapp.com/users/delete",
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (callServerToDelete.status === 200) {
        Cookie.remove("token");

        localStorage.removeItem("InfosUser");

        setTokenChange(!tokenChange);
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /************************** Component **************************/

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
              <p className="SettingsAccount__remove" onClick={removeUser}>
                Yes
              </p>
              <p onClick={() => setRemoveConfirm(false)}>No</p>
            </div>
          </>
        )}
      </div>

      <div className="SettingsAccount__disconnect">
        <SubmitButton
          title={"Disconnect"}
          color={"red"}
          onclick={() => disconnectUser()}
        />
      </div>
    </div>
  );
};

export default SettingsAccount;
