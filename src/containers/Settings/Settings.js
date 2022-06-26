import "./Settings.scss";

// ** Components **
import LoadScreen from "../../components/LoadScreen/LoadScreen";
import InputText from "../../components/InputText/InputText";
import { useState, useEffect } from "react";

const Settings = (props) => {
  const { userInformations } = props;

  const [userPseudo, setUserPseudo] = useState("");
  const [userMail, setUserMail] = useState("");

  useEffect(() => {
    if (userInformations) {
      setUserPseudo(userInformations.pseudo);
      setUserMail(userInformations.email);
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
            <img src={userInformations.avatar} alt="User avatar" />
            <div className="Settings__profil_picture__icon">
              <i className="fas fa-pen"></i>
            </div>
          </div>

          <div className="Settings__inputs">
            <p>Pseudo</p>
            <InputText value={userPseudo} setValue={setUserPseudo} />
          </div>

          <div className="Settings__inputs">
            <p>Email</p>
            <InputText value={userMail} setValue={setUserMail} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
