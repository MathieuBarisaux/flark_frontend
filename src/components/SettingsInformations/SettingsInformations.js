import "./SettingsInformations.scss";

// ** Components **
import InputText from "../../components/InputText/InputText";
import SwitchButton from "../../components/SwitchButton/SwitchButton";
import SubmitButton from "../SubmitButton/SubmitButton";

// ** Hooks **
import { useState, useEffect } from "react";

// ** Dependencies **
import axios from "axios";

const SettingsInformations = ({
  userInformations,
  userInformationsChange,
  setUserInformationsChange,
  bearerToken,
}) => {
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

  const [errorMessage, setErrorMessage] = useState("");
  const [updateValidate, setUpdateValidate] = useState(false);

  const submitChangeInformations = async () => {
    try {
      const data = {
        email: userMail,
        pseudo: userPseudo,
        newsletter: userNewsletter,
      };

      const callServer = await axios.put(
        "http://localhost:3001/users/update",
        data,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (callServer.status === 200) {
        setUpdateValidate(true);

        // ** Set new local storage **
        console.log(callServer);
        const responseData = callServer.data;

        const infosUser = {
          pseudo: responseData.pseudo,
          avatar: responseData.avatar,
          email: responseData.email,
          newsletter: responseData.newsletter,
        };

        const infosUserJSON = JSON.stringify(infosUser);

        localStorage.setItem("InfosUser", infosUserJSON);

        setUserInformationsChange(!userInformationsChange);

        setTimeout(() => setUpdateValidate(false), 3000);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data?.message);
    }
  };

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
        <p>{errorMessage}</p>
        {updateValidate ? (
          <SubmitButton title={"Update with success ✓"} />
        ) : (
          <SubmitButton
            title={"Update informations"}
            onclick={() => submitChangeInformations()}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsInformations;
