import "./Settings.scss";

// ** Components **
import LoadScreen from "../../components/LoadScreen/LoadScreen";
import SettingsInformations from "../../components/SettingsInformations/SettingsInformations";
import SettingsPassword from "../../components/SettingsPassword/SettingsPassword";
import SettingsAccount from "../../components/SettingsAccount/SettingsAccount";

// ** Hooks **
import { useState, useEffect } from "react";

const Settings = (props) => {
  const { userInformations } = props;

  const [settingNav, setSettingNav] = useState("informations");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    if (userInformations) {
      if (userInformations.avatar) {
        setUserAvatar(userInformations.avatar);
      }
    }
  }, [userInformations]);

  return (
    <div className="Settings">
      {!userInformations ? (
        <LoadScreen />
      ) : (
        <div className="Settings__container">
          <h1>Edit profile</h1>

          <div className="Settings__profil_picture">
            {userAvatar ? (
              <img src={userAvatar} alt="User avatar" />
            ) : (
              <img
                src={
                  "https://res.cloudinary.com/vintedcopy/image/upload/v1655988565/Flark/blank-profile-picture-973460_640_taatmn.png"
                }
                alt="User avatar"
              />
            )}

            {/* TODOOOOOOOOOOOOOOOOOOOOOOO Check picture */}
            <label htmlFor="file" className="Settings__profil_picture__icon">
              <i className="fas fa-pen"></i>
            </label>
            <input
              type="file"
              id="file"
              onChange={(event) => {
                setUserAvatar(event.target.files[0]);
                console.log(event.target.files[0]);
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
            <SettingsInformations userInformations={userInformations} />
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
