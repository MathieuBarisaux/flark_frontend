import { useState, useEffect } from "react";
import "./PriorityTodos.scss";

const PriorityTodos = ({
  urgentTasks,
  urgentImportantTasks,
  importantTasks,
  otherTasks,
  favoriteTasks,
}) => {
  const [dataForFavorite, setDataForFavorite] = useState(null);

  const favoriteTypes = [
    {
      type: "urgentImportant",
      name: "Urgent & important",
      variable: urgentImportantTasks,
    },
    {
      type: "urgent",
      name: "Urgent",
      variable: urgentTasks,
    },
    {
      type: "important",
      name: "Important",
      variable: importantTasks,
    },
    {
      type: "other",
      name: "Other",
      variable: otherTasks,
    },
  ];

  // Check all tasks and create data for priority todo
  const checkFavoriteToCreateData = () => {
    let completTask = 0;
    let inProgressTask = 0;

    favoriteTypes.forEach((typeTask) => {
      if (favoriteTasks === typeTask.type) {
        for (let i = 0; i < typeTask.variable.length; i++) {
          if (typeTask.variable[i].achivement === false) {
            inProgressTask++;
          } else {
            completTask++;
          }
        }

        const createData = {
          name: typeTask.name,
          inProgress: inProgressTask,
          complet: completTask,
        };

        setDataForFavorite(createData);
      }
    });
  };

  useEffect(() => {
    checkFavoriteToCreateData();
    // eslint-disable-next-line
  }, [
    urgentImportantTasks,
    urgentTasks,
    importantTasks,
    otherTasks,
    favoriteTasks,
  ]);

  return (
    <div className="PriorityTodos PriorityTodos--blue">
      {dataForFavorite && (
        <>
          <h3>{dataForFavorite.name}</h3>
          <h4>Your favorite priority</h4>
          <div className="PriorityTodos__todoContainer">
            <div>
              <p>
                Complet <i className="fas fa-check-circle"></i>
              </p>
              <p>{dataForFavorite.complet}</p>
            </div>
            <div>
              <p>
                In progress <i className="fas fa-circle-notch"></i>
              </p>
              <p>{dataForFavorite.inProgress}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PriorityTodos;
