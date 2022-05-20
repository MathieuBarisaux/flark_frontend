import "./SignIn.scss";

// ** Hooks **
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ** Dependancies **
import axios from "axios";
import Cookie from "js-cookie";

// ** Components **
import InputText from "../InputText/InputText";
import SubmitButton from "../SubmitButton/SubmitButton";

const SignIn = (props) => {
  const { tokenChange, setTokenChange } = props;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      if (email && password) {
        const dataUser = {
          email: email,
          password: password,
        };

        const response = await axios.post(
          "http://localhost:3001/users/signin",
          dataUser
        );

        if (response.status === 200) {
          Cookie.set("token", response.data.token, { expires: 360 });
          Cookie.set("userId", response.data.id);

          setTokenChange(!tokenChange);
          navigate("/");
        }
      } else {
        setErrorMessage("We need more element to connect you ;)");
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.response.data?.message);
    }
  };

  return (
    <form className="SignIn" onSubmit={handleSubmit}>
      <InputText
        type={"email"}
        placeholder={"Your email"}
        value={email}
        setValue={setEmail}
      />
      <InputText
        type={"password"}
        placeholder={"Password"}
        value={password}
        setValue={setPassword}
      />
      <SubmitButton title={"Connect"} />
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default SignIn;
