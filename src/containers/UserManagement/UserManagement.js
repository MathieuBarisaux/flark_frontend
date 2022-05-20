import "./UserManagement.scss";

// ** Dependancies **
import { Link, useNavigate } from "react-router-dom";

// ** Picture **
import robot from "../../img/Saly-26.svg";

// ** Components **
import SignUp from "../../components/SignUp/SignUp";
import SignIn from "../../components/SignIn/SignIn";
import { useEffect } from "react";

const UserManagement = (props) => {
  const { type, bearerToken, tokenChange, setTokenChange } = props;

  const naviguate = useNavigate();

  // Redirection if token
  useEffect(() => {
    if (bearerToken) {
      naviguate("/");
    }
    // eslint-disable-next-line
  }, [tokenChange]);

  return (
    <div className="UserManagement">
      <div className="UserManagement__left">
        <h2>{type === "signup" ? "Sign up" : "Sign in"}</h2>

        <div>
          <img src={robot} alt="Blocknote 3D" />
          <p>Keep calm & priorise your task... easly.</p>
        </div>

        <Link to={type === "signup" ? "/signin" : "/signup"}>
          <div className="UserManagement__left__link">
            {type === "signup" ? (
              <p>
                Have an account ? <strong>Login</strong>
              </p>
            ) : (
              <p>
                Don't have an account ? <strong>Signup</strong>
              </p>
            )}

            <p></p>
          </div>
        </Link>
      </div>

      <div className="UserManagement__right">
        <div className="UserManagement__right__logo">
          <div>
            <i className="fas fa-pen-nib"></i>
          </div>
          <p>Flark</p>
        </div>

        {type === "signup" ? (
          <SignUp tokenChange={tokenChange} setTokenChange={setTokenChange} />
        ) : (
          <SignIn tokenChange={tokenChange} setTokenChange={setTokenChange} />
        )}
      </div>
    </div>
  );
};

export default UserManagement;
