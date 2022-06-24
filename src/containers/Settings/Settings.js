import "./Settings.scss";

// ** Components **
import LoadScreen from "../../components/LoadScreen/LoadScreen";
import InputText from "../../components/InputText/InputText";
import { useState } from "react";

const Settings = (props) => {
  const { informationsLoading, userInformations } = props;

  console.log(userInformations);

  const [newPseudo, setNewPseudo] = useState(userInformations.pseudo || " ");

  return (
    <div className="Settings">
      {informationsLoading ? (
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
            <InputText value={newPseudo} />
          </div>

          <div className="Settings__inputs">
            <p>Email</p>
            <InputText value={newPseudo} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
