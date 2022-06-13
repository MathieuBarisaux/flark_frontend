import "./SignIn.scss";

// ** Hooks **
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// ** Dependancies **
import axios from "axios";
import Cookie from "js-cookie";

// ** Components **
import InputText from "../InputText/InputText";
import SubmitButton from "../SubmitButton/SubmitButton";

const SignIn = (props) => {
  const { tokenChange, setTokenChange } = props;

  const navigate = useNavigate();

  // States form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // SignIn function
  const handleSubmitForSigIn = async (event) => {
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
          Cookie.set("userId", response.data.id, { expires: 360 });

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
    <form className="SignIn" onSubmit={handleSubmitForSigIn}>
      <h2>Welcome back</h2>
      <h3>Please enter your informations</h3>
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

      <SubmitButton title={"Connect"} color={"purple"} />
      {errorMessage && <p>{errorMessage}</p>}

      <Link to={"/signup"}>
        <p className="SignIn__link">
          Don't have an account ? <strong>Sign up</strong>
        </p>
      </Link>
    </form>
  );
};

export default SignIn;
