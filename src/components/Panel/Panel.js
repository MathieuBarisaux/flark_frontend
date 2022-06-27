import "./Panel.scss";

// ** Components **
import PriorityTodos from "./priorityTodos/priorityTodos";

// ** Dependancies **
import DatePicker from "sassy-datepicker";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

// ** Functions **
import upperCaseFirst from "../../Functions/upperCaseFirst";

const Panel = (props) => {
  const { tokenChange, setTokenChange, userInformations } = props;

  const navigate = useNavigate();

  const disconnect = () => {
    Cookie.remove("token");

    localStorage.removeItem("InfosUser");

    setTokenChange(!tokenChange);
    navigate("/signin");
  };

  return (
    <div className="Panel">
      <div className="Panel__userInfos">
        <div className="Panel__userInfos--left">
          {userInformations.avatar ? (
            <img src={userInformations.avatar} alt="User avatar" />
          ) : (
            <img
              src={
                "https://res.cloudinary.com/vintedcopy/image/upload/v1655988565/Flark/blank-profile-picture-973460_640_taatmn.png"
              }
              alt="User avatar"
            />
          )}
          <p>
            Welcome back 👋
            <br />
            <strong>{upperCaseFirst(userInformations.pseudo)}</strong>
          </p>
        </div>

        <div className="Panel__userInfos--right">
          <div>
            <i className="fas fa-angle-down"></i>
          </div>
          <ul>
            <p onClick={disconnect}>Disconnect</p>
          </ul>
        </div>
      </div>

      <div className="Panel__prioritiesTodos">
        <DatePicker />
        <PriorityTodos title="Urgent" />
      </div>
    </div>
  );
};

export default Panel;
