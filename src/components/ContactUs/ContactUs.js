import "./ContactUs.scss";

// ** Dependencies **
import axios from "axios";

// ** Components **
import SubmitButton from "../SubmitButton/SubmitButton";
import InputText from "../InputText/InputText";

// ** Hooks **
import { useState } from "react";

// ** Global variable **
import { serverUrl } from "../../assets/constants/globalVariables";

// ** Redux **
import { useSelector } from "react-redux";

const ContactUs = () => {
  const { userToken } = useSelector((state) => ({
    ...state.tokenManagementReducer,
  }));

  const [userObject, setUserObject] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const [sendOk, setSendOk] = useState(false);

  // Send message with mailgun
  const sendMessage = async (action) => {
    action.preventDefault();

    try {
      const data = {
        userObject: userObject,
        userMessage: userMessage,
      };

      const callServer = await axios.post(`${serverUrl}/contact`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (callServer.status === 200) {
        setSendOk(true);

        setUserObject("");
        setUserMessage("");
        setTimeout(() => setSendOk(false), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="ContactUs" onSubmit={sendMessage}>
      <p>Want to send us a message? It's here that it happens !</p>

      <div className="ContactUs__inputs">
        <InputText
          value={userObject}
          setValue={setUserObject}
          placeholder="Subject"
        />

        <textarea
          cols="10"
          rows="6"
          placeholder="Type your message..."
          value={userMessage}
          onChange={(event) => {
            setUserMessage(event.target.value);
          }}
        ></textarea>
      </div>

      {sendOk ? (
        <SubmitButton title="Message send with success ! ✓" />
      ) : (
        <SubmitButton title="Send message" />
      )}
    </form>
  );
};

export default ContactUs;
