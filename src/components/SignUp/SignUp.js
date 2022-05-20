import "./SignUp.scss";

// ** Hooks **
import { useState } from "react";

// ** Components **
import SubmitButton from "../SubmitButton/SubmitButton";
import InputText from "../InputText/InputText";

// ** Dependancies **
import axios from "axios";
import Cookie from "js-cookie";

const SignUp = (props) => {
  const { tokenChange, setTokenChange } = props;

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

        console.log(response);
        if (response.status === 200) {
          const token = response.data.token;
          const userId = response.data.id;

          Cookie.set("token", token, { expires: 360 });
          Cookie.set("userId", userId, { expires: 360 });

          setTokenChange(!tokenChange);
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
      </form>
    </div>
  );
};

export default SignUp;
