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

        <img src={robot} alt="Robot 3D" />

        <p>Keep calm & priorise your task... easly.</p>
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

        <p className="UserManagement__copyright">© Flark 2022</p>
      </div>
    </div>
  );
};

export default UserManagement;
