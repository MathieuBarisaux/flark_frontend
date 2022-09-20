import "./SignIn.scss";

// ** Hooks **
import { useState } from "react";

// ** Dependancies **
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

// ** Components **
import InputText from "../InputText/InputText";
import SubmitButton from "../SubmitButton/SubmitButton";

// ** Global variable **
import { serverUrl } from "../../assets/constants/globalVariables";

// ** Redux **
import { useDispatch } from "react-redux";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // SignIn function
  const handleSubmitForSigIn = async (event) => {
    event.preventDefault();

    if (!isLoading) {
      setIsLoading(true);
      setErrorMessage("");

      try {
        if (email && password) {
          const dataUser = {
            email: email,
            password: password,
          };

          const response = await axios.post(
            `${serverUrl}/users/signin`,
            dataUser
          );

          if (response.status === 200) {
            const responseData = response.data;

            // ** Set Cookie **
            Cookie.set("token", responseData.token, { expires: 360 });

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
            dispatch({ type: "changeToken" });
            navigate("/");
          }
        } else {
          setErrorMessage("We need more element to connect you ;)");
        }
      } catch (error) {
        setErrorMessage(error.response.data?.message);
      } finally {
        setIsLoading(false);
      }
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
        required
      />

      <SubmitButton title={"Connect"} color={"purple"} isLoading={isLoading} />
      {<p data-testid={"error-message"}>{errorMessage}</p>}

      <Link to={"/signup"}>
        <p className="SignIn__link">
          Don't have an account ? <strong>Sign up</strong>
        </p>
      </Link>
    </form>
  );
};

export default SignIn;
