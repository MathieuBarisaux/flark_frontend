import "./SettingsAccount.scss";

// ** Components **
import SubmitButton from "../SubmitButton/SubmitButton";

// ** Dependancies **
import Cookie from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ** Hooks **
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// ** Gobal variable **
import { serverUrl } from "../../assets/constants/globalVariables";

const SettingsAccount = () => {
  const [removeConfirm, setRemoveConfirm] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userToken } = useSelector((state) => ({
    ...state.tokenManagementReducer,
  }));

  // ** Disconnect user **
  const disconnectUser = () => {
    Cookie.remove("token");

    localStorage.removeItem("InfosUser");

    dispatch({ type: "changeToken" });
    navigate("/signup");
  };

  // ** Remove user **
  const removeUser = async () => {
    try {
      const callServerToDelete = await axios.delete(
        `${serverUrl}/users/delete`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (callServerToDelete.status === 200) {
        Cookie.remove("token");

        localStorage.removeItem("InfosUser");

        dispatch({ type: "changeToken" });
        navigate("/signup");
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
