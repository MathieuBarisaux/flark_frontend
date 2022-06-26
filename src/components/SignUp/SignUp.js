import "./SignUp.scss";

// ** Hooks **
import { useState } from "react";

// ** Components **
import SubmitButton from "../SubmitButton/SubmitButton";
import InputText from "../InputText/InputText";

// ** Dependancies **
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

const SignUp = (props) => {
  const {
    tokenChange,
    setTokenChange,
    userInformationsChange,
    setUserInformationsChange,
  } = props;

  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const precedentStep = () => {
    setStep(step - 1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      if (pseudo && email && password) {
        const newUser = {
          email: email,
          pseudo: pseudo,
          password: password,
        };

        const response = await axios.post(
          "http://localhost:3001/users/signup",
          newUser
        );

        if (response.status === 200) {
          const responseData = response.data;

          Cookie.set("token", responseData.token, { expires: 360 });

          // ** Set local storage **
          const infosUser = {
            pseudo: responseData.pseudo,
            email: responseData.email,
          };

          const infosUserJSON = JSON.stringify(infosUser);

          localStorage.setItem("InfosUser", infosUserJSON);

          setUserInformationsChange(!userInformationsChange);
          setTokenChange(!tokenChange);
          navigate("/");
        }
      } else {
        console.log("We need more element");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data?.message);
    }
  };

  return (
    <div className="SignUp">
      <div className="SignUp__welcome">
        <h2>Welcome</h2>
        <h3>Please enter your informations to create your account</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="SignUp__inputs">
          {step === 0 && (
            <>
              <p>
                Choose a pseudo
                <InputText type={"text"} value={pseudo} setValue={setPseudo} />
              </p>
              {pseudo.length > 2 && (
                <div className="SignUp__inputs__nav">
                  <i
                    className="fas fa-arrow-circle-down"
                    onClick={nextStep}
                  ></i>
                </div>
              )}
            </>
          )}

          {step === 1 && (
            <>
              <p>
                and your email is
                <InputText type={"email"} value={email} setValue={setEmail} />
              </p>

              <div className="SignUp__inputs__nav">
                <i
                  className="fas fa-arrow-circle-up"
                  onClick={precedentStep}
                ></i>
                {email.length > 5 && (
                  <i
                    className="fas fa-arrow-circle-down"
                    onClick={nextStep}
                  ></i>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p>
                Choose a strong password :
                <InputText
                  type={"password"}
                  value={password}
                  setValue={setPassword}
                />
              </p>
              <div className="SignUp__inputs__nav">
                <i
                  className="fas fa-arrow-circle-up"
                  onClick={precedentStep}
                ></i>
              </div>
            </>
          )}

          {password.length > 5 && email.length > 5 && pseudo.length > 2 && (
            <SubmitButton title={"Create account"} />
          )}

          {errorMessage && (
            <p className="SignUp__error">Error : {errorMessage}</p>
          )}
        </div>

        <Link to={"/signin"}>
          <p className="SignUp__link">
            Have an account ? <strong>Login</strong>
          </p>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
