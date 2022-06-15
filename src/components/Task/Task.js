import "./Task.scss";

// ** Dependencies **
import axios from "axios";

const Task = (props) => {
  const {
    item,
    refreshAllTasks,
    setRefreshAllTasks,
    refreshAllCategories,
    setRefreshAllCategories,
    onDashboard,
  } = props;

  const changeAchivementStatus = async () => {
    if (item.achivement === false) {
      item.achivement = "true";
    } else {
      item.achivement = "false";
    }

    const updateValue = {
      todoID: item._id,
      achivement: item.achivement,
    };

    await axios.put("http://localhost:3001/todo/update", updateValue);

    setRefreshAllTasks(!refreshAllTasks);
  };

  const deleteTask = async () => {
    await axios.delete(`http://localhost:3001/todo/delete?todoID=${item._id}`);
    setRefreshAllTasks(!refreshAllTasks);
    setRefreshAllCategories(!refreshAllCategories);
  };

  const defineTag = () => {
    if (item.urgent === true && item.important === true) {
      return (
        <div className="Task__tag Task__tag--red">
          <h5>Urgent & important</h5>
        </div>
      );
    } else if (item.urgent === true && item.important === false) {
      return (
        <div className="Task__tag Task__tag--orange">
          <h5>Urgent</h5>
        </div>
      );
    } else if (item.urgent === false && item.important === true) {
      return (
        <div className="Task__tag Task__tag--blue">
          <h5>Important</h5>
        </div>
      );
    } else {
      return (
        <div className="Task__tag Task__tag--green">
          <h5>Other</h5>
        </div>
      );
    }
  };

  return (
    <div className="Task">
      <div>
        <div
          className="Task__validate"
          onClick={changeAchivementStatus}
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
            style={item.achivement ? { width: "100%" } : { width: "0%" }}
          ></span>
        </p>
      </div>

      {onDashboard && defineTag()}

      <div className="Task__tools">
        <i className="fas fa-ellipsis-v"></i>
        <ul>
          <li>
            <i className="fas fa-eraser"></i> Modify
          </li>
          <li onClick={deleteTask}>
            <i className="fas fa-trash"></i> Delete
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Task;
