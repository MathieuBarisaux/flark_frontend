import "./TaskForm.scss";

// ** Hooks **
import { useState } from "react";

// ** Components **
import SubmitButton from "../SubmitButton/SubmitButton";
import InputText from "../InputText/InputText";
import CloseModale from "../CloseModale/CloseModale";

// ** Dependencies **
import axios from "axios";

// ** Global variable **
import { serverUrl } from "../../assets/constants/globalVariables";
import { useSelector } from "react-redux";

const TaskForm = (props) => {
  const {
    setTaskFormOpen,
    allCategories,
    refreshAllTasks,
    setRefreshAllTasks,
    refreshAllCategories,
    setRefreshAllCategories,
  } = props;

  const { userToken } = useSelector((state) => ({
    ...state.tokenManagementReducer,
  }));

  const [TaskContent, setTaskContent] = useState("");
  const [deallineTask, setDeadlineTask] = useState("");
  const [urgentTask, setUrgentTask] = useState(false);
  const [importantTask, setImportantTask] = useState(false);
  const [categorySelect, setCategorySelect] = useState(
    allCategories.length > 0 ? allCategories[0]._id : "uncategorized"
  );

  /********************* Functions ***********************/

  const catchChangeCategory = (event) => {
    const newValue = event.target.value;
    setCategorySelect(newValue);
  };

  const catchChangeDate = (event) => {
    const newValue = event.target.value;
    setDeadlineTask(newValue);
  };

  const catchChangeUrgent = () => {
    setUrgentTask(!urgentTask);
  };

  const catchChangeImportant = () => {
    setImportantTask(!importantTask);
  };

  // Submit new task
  const submitNewTask = async (event) => {
    event.preventDefault();

    const newTask = {
      content: TaskContent,
      urgent: urgentTask,
      important: importantTask,
      deadline: deallineTask,
      categories: categorySelect,
    };

    await axios.post(`${serverUrl}/todo/create`, newTask, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    setRefreshAllTasks(!refreshAllTasks);
    setRefreshAllCategories(!refreshAllCategories);
    setTaskFormOpen(false);
  };

  /********************* Component ***********************/

  return (
    <div className="TaskForm">
      <CloseModale setValue={setTaskFormOpen} />

      <form onSubmit={submitNewTask}>
        <div className="TaskForm__inputs">
          <InputText
            placeholder="New tasks"
            value={TaskContent}
            setValue={setTaskContent}
          />

          <div className="TaskForm__categories">
            <label htmlFor="category">
              Category :
              <select onChange={catchChangeCategory} value={categorySelect}>
                {allCategories.length > 0 ? (
                  <>
                    <option value="uncategorized">Uncategorized</option>
                    {allCategories.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.category_name}
                        </option>
                      );
                    })}
                  </>
                ) : (
                  <option value="uncategorized">Uncategorized</option>
                )}
              </select>
            </label>
          </div>

          <div className="TaskForm__date">
            <p>Deadline :</p>
            <input
              type="date"
              value={deallineTask}
              onChange={catchChangeDate}
            />
          </div>

          <div className="TaskForm__priorities">
            <div className="TaskForm__priority">
              <input
                type="checkbox"
                name="urgent"
                onChange={catchChangeUrgent}
              />
              <label htmlFor="important">Urgent</label>
            </div>

            <div className="TaskForm__priority">
              <input
                type="checkbox"
                name="important"
                onChange={catchChangeImportant}
              />
              <label htmlFor="important">Important</label>
            </div>
          </div>
        </div>

        <SubmitButton title={"Add new task"} icon={"fas fa-plus"} />
      </form>
    </div>
  );
};

export default TaskForm;
