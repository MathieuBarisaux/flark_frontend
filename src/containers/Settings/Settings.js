import "./Settings.scss";

// ** Components **
import LoadScreen from "../../components/LoadScreen/LoadScreen";
import SettingsInformations from "../../components/SettingsInformations/SettingsInformations";
import SettingsPassword from "../../components/SettingsPassword/SettingsPassword";
import SettingsAccount from "../../components/SettingsAccount/SettingsAccount";

// ** Hooks **
import { useState, useEffect } from "react";

// ** Dependencies **
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ** Global variable **
import { serverUrl } from "../../assets/constants/globalVariables";

// ** Redux **
import { useSelector, useDispatch } from "react-redux";

// ** Verification **
const imageMimeType = /image\/(png|jpg|jpeg)/i;

const Settings = () => {
  const dispatch = useDispatch();

  const { userToken, userTokenChange, userInformations, userAvatarLoad } =
    useSelector((state) => ({
      ...state.tokenManagementReducer,
      ...state.userInformationsReducer,
    }));

  const [settingNav, setSettingNav] = useState("informations");

  const naviguate = useNavigate();

  // Redirection if token
  useEffect(() => {
    if (!userToken) {
      naviguate("/signup");
    }
    // eslint-disable-next-line
  }, [userTokenChange, userToken]);

  /* Call server to update profil picture */
  const updatePicture = async (event) => {
    dispatch({ type: "userAvatarLoad", payload: true });
    const formDataPicture = new FormData();
    formDataPicture.append("userPicture", event.target.files[0]);

    try {
      const callServerToUpdateImage = await axios.put(
        `${serverUrl}/users/update`,
        formDataPicture,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (callServerToUpdateImage.status === 200) {
        const responseData = callServerToUpdateImage.data;

        // ** Set local storage **
        const infosUser = {
          pseudo: responseData.pseudo,
          avatar: responseData.avatar,
          email: responseData.email,
          newsletter: responseData.newsletter,
        };

        const infosUserJSON = JSON.stringify(infosUser);

        localStorage.setItem("InfosUser", infosUserJSON);

        dispatch({ type: "userInformationsChange" });

        dispatch({ type: "userAvatarLoad", payload: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /************************** Component **************************/

  return (
    <div className="Settings">
      {!userInformations ? (
        <LoadScreen />
      ) : (
        <div className="Settings__container">
          <h1>Edit profile</h1>

          <div className="Settings__profil_picture">
            {userAvatarLoad ? (
              <LoadScreen />
            ) : userInformations && userInformations.avatar ? (
              <img src={userInformations.avatar} alt="User avatar" />
            ) : (
              <img
                src={
                  "https://res.cloudinary.com/vintedcopy/image/upload/v1655988565/Flark/blank-profile-picture-973460_640_taatmn.png"
                }
                alt="User avatar"
              />
            )}

            <label htmlFor="file" className="Settings__profil_picture__icon">
              <i className="fas fa-pen"></i>
            </label>
            <input
              type="file"
              id="file"
              accept=".png, .jpg, .jpeg"
              onChange={(event) => {
                const file = event.target.files[0];

                if (file) {
                  if (!file.type.match(imageMimeType)) {
                    console.log("Image type is not valid");
                    return;
                  } else {
                    updatePicture(event);
                  }
                }
              }}
            />
          </div>

          <nav className="Settings__nav">
            <p
              className={
                settingNav === "informations" ? "Settings__nav--focus" : ""
              }
              onClick={() => setSettingNav("informations")}
            >
              Informations
            </p>
            <p
              className={
                settingNav === "password" ? "Settings__nav--focus" : ""
              }
              onClick={() => setSettingNav("password")}
            >
              Password
            </p>
            <p
              className={settingNav === "account" ? "Settings__nav--focus" : ""}
              onClick={() => setSettingNav("account")}
            >
              Account
            </p>
          </nav>

          {settingNav === "informations" ? (
            <SettingsInformations />
          ) : settingNav === "password" ? (
            <SettingsPassword />
          ) : (
            <SettingsAccount />
          )}
        </div>
      )}
    </div>
  );
};

export default Settings;
