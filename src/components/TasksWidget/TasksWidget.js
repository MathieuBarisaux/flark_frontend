import "./TasksWidget.scss";

// ** Components **
import Task from "../Task/Task";

// ** Dependencies **
import axios from "axios";

const TasksWidget = (props) => {
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
            <Task
              key={item._id}
              item={item}
              refreshAllTasks={refreshAllTasks}
              setRefreshAllTasks={setRefreshAllTasks}
              refreshAllCategories={refreshAllCategories}
              setRefreshAllCategories={setRefreshAllCategories}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TasksWidget;
