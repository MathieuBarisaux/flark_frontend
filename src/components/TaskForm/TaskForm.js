import "./TaskForm.scss";

// ** Hooks **
import { useState } from "react";

// ** Components **
import SubmitButton from "../SubmitButton/SubmitButton";
import InputText from "../InputText/InputText";

// ** Dependencies **
import axios from "axios";

const TaskForm = (props) => {
  const {
    setTaskFormOpen,
    allCategories,
    refreshAllTasks,
    setRefreshAllTasks,
    refreshAllCategories,
    setRefreshAllCategories,
    bearerToken,
  } = props;

  const [TaskContent, setTaskContent] = useState("");
  const [deallineTask, setDeadlineTask] = useState("");
  const [urgentTask, setUrgentTask] = useState(false);
  const [importantTask, setImportantTask] = useState(false);
  const [categorySelect, setCategorySelect] = useState(allCategories[0]._id);

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

    await axios.post("http://localhost:3001/todo/create", newTask, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    setRefreshAllTasks(!refreshAllTasks);
    setRefreshAllCategories(!refreshAllCategories);
    setTaskFormOpen(false);
  };

  return (
    <div className="TaskForm">
      <div
        className="TaskForm__close"
        onClick={() => {
          setTaskFormOpen(false);
        }}
      >
        <i className="fas fa-times"></i>
      </div>

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
                {allCategories.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.category_name}
                    </option>
                  );
                })}
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
