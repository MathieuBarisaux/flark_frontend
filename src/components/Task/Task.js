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
  } = props;

  // Change achivement status
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

  // Delete task
  const deleteTask = async () => {
    await axios.delete(`http://localhost:3001/todo/delete?todoID=${item._id}`);
    setRefreshAllTasks(!refreshAllTasks);
    setRefreshAllCategories(!refreshAllCategories);
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
