import "./Panel.scss";

// ** Components **
import PriorityTodos from "./priorityTodos/priorityTodos";

// ** Dependancies **
import DatePicker from "sassy-datepicker";

// ** Functions **
import upperCaseFirst from "../../Functions/upperCaseFirst";

// ** Hooks **
import { useState, useEffect } from "react";

// ** Redux **
import { useSelector } from "react-redux";

const Panel = (props) => {
  const { urgentTasks, urgentImportantTasks, importantTasks, otherTasks } =
    props;

  const { userInformations } = useSelector((state) => ({
    ...state.userInformationsReducer,
  }));

  const [favoriteTasks, setFavoriteTasks] = useState("urgentImportant");

  useEffect(() => {
    const checkLocalStorage = localStorage.getItem("favoriteTasks");

    if (checkLocalStorage) {
      setFavoriteTasks(checkLocalStorage);
    }
  }, []);

  const favoriteTypes = [
    {
      type: "urgentImportant",
      name: "Urgent & important",
    },
    {
      type: "urgent",
      name: "Urgent",
    },
    {
      type: "important",
      name: "Important",
    },
    {
      type: "other",
      name: "Other",
    },
  ];

  return (
    <div className="Panel">
      <div className="Panel__userInfos">
        <div className="Panel__userInfos--left">
          {userInformations && userInformations.avatar ? (
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
            <strong>
              {userInformations && upperCaseFirst(userInformations.pseudo)}
            </strong>
          </p>
        </div>

        <div className="Panel__userInfos--right">
          <div>
            <i className="fas fa-angle-down"></i>
          </div>
          <ul>
            <p>Choose your favorite priority :</p>

            {favoriteTypes.map((item, index) => {
              return (
                <p
                  onClick={() => {
                    setFavoriteTasks(item.type);
                    localStorage.setItem("favoriteTasks", item.type);
                  }}
                  key={index}
                >
                  {favoriteTasks === item.type && (
                    <i className="fas fa-check"></i>
                  )}
                  {item.name}
                </p>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="Panel__prioritiesTodos">
        <DatePicker />

        <PriorityTodos
          urgentTasks={urgentTasks}
          urgentImportantTasks={urgentImportantTasks}
          importantTasks={importantTasks}
          otherTasks={otherTasks}
          favoriteTasks={favoriteTasks}
        />
      </div>
    </div>
  );
};

export default Panel;
