import "./Panel.scss";

// ** Components **
import PriorityTodos from "./priorityTodos/priorityTodos";

// ** Dependancies **
import DatePicker from "sassy-datepicker";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const Panel = (props) => {
  const { tokenChange, setTokenChange } = props;

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
          <img
            src="https://journalducoin-com.exactdn.com/app/uploads/2021/10/singe-record.png?strip=all&lossy=1&quality=66&resize=631%2C631&ssl=1"
            alt="Profil of user"
          />
          <p>
            Welcome back 👋
            <br />
            <strong>Mathieu</strong>
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
