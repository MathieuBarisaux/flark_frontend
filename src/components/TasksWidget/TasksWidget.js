import "./TasksWidget.scss";

import axios from "axios";

const AllTasksWidget = (props) => {
  const {
    refreshAllTasks,
    setRefreshAllTasks,
    refreshAllCategories,
    setRefreshAllCategories,
    typeTasks,
    title,
    labelColor,
  } = props;

  return (
    <div className="TasksWidget">
      <h4>{title}</h4>
      <div
        className="TasksWidget--label"
        style={{ backgroundColor: `${labelColor}` }}
      ></div>

      <div className="TasksWidget__tasks">
        {typeTasks.map((item) => {
          return (
            <div className="Task" key={item._id}>
              <div>
                <div
                  className="Task__validate"
                  onClick={async () => {
                    if (item.achivement === false) {
                      item.achivement = "true";
                    } else {
                      item.achivement = "false";
                    }

                    const updateValue = {
                      todoID: item._id,
                      achivement: item.achivement,
                    };

                    await axios.put(
                      "http://localhost:3001/todo/update",
                      updateValue
                    );

                    setRefreshAllTasks(!refreshAllTasks);
                  }}
                  style={
                    item.categories && item.achivement
                      ? {
                          backgroundColor: `${item.categories.category_color}`,
                        }
                      : item.categories && {
                          border: `2px solid ${item.categories.category_color}`,
                        }
                  }
                >
                  {item.achivement && <i className="fas fa-check"></i>}
                </div>
                <p>
                  {item.content}
                  <span
                    style={
                      item.achivement ? { width: "100%" } : { width: "0%" }
                    }
                  ></span>
                </p>
              </div>

              <div className="Task__tools">
                <i className="fas fa-ellipsis-v"></i>
                <ul>
                  <li>
                    <i className="fas fa-eraser"></i> Modify
                  </li>
                  <li
                    onClick={async () => {
                      await axios.delete(
                        `http://localhost:3001/todo/delete?todoID=${item._id}`
                      );
                      setRefreshAllTasks(!refreshAllTasks);
                      setRefreshAllCategories(!refreshAllCategories);
                    }}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllTasksWidget;
