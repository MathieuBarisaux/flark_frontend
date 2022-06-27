import "./SettingsInformations.scss";

// ** Components **
import InputText from "../../components/InputText/InputText";
import SwitchButton from "../../components/SwitchButton/SwitchButton";
import SubmitButton from "../SubmitButton/SubmitButton";

// ** Hooks **
import { useState, useEffect } from "react";

const SettingsInformations = ({ userInformations }) => {
  const [userPseudo, setUserPseudo] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userNewsletter, setUserNewsletter] = useState(false);

  useEffect(() => {
    if (userInformations) {
      setUserPseudo(userInformations.pseudo);
      setUserMail(userInformations.email);

      if (userInformations.newsletter) {
        setUserNewsletter(userInformations.newsletter);
      }
    }
  }, [userInformations]);

  return (
    <div className="SettingInformations">
      <div className="Settings__infos">
        <h2>Informations</h2>
        <p>Check and modify your personnals informations.</p>
      </div>

      <div className="Settings__inputs">
        <p>Pseudo</p>
        <InputText value={userPseudo} setValue={setUserPseudo} />
      </div>

      <div className="Settings__inputs Settings__inputs--border">
        <p>Email</p>
        <InputText value={userMail} setValue={setUserMail} />
      </div>

      <div className="Settings__inputs Settings__inputs--border">
        <p>Newsletter</p>
        <SwitchButton value={userNewsletter} setValue={setUserNewsletter} />
      </div>

      <div className="Settings__button">
        <SubmitButton title={"Update informations"} />
      </div>
    </div>
  );
};

export default SettingsInformations;
