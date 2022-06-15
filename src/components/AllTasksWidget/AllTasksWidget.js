import "./AllTasksWidget.scss";

// ** Components **
import Task from "../Task/Task";

const AllTasksWidget = ({
  allTasks,
  refreshAllTasks,
  setRefreshAllTasks,
  refreshAllCategories,
  setRefreshAllCategories,
}) => {
  return (
    <div className="AllTasksWidget">
      <h4>All Tasks</h4>

      {allTasks.map((item) => {
        return (
          <Task
            item={item}
            key={item._id}
            refreshAllTasks={refreshAllTasks}
            setRefreshAllTasks={setRefreshAllTasks}
            refreshAllCategories={refreshAllCategories}
            setRefreshAllCategories={setRefreshAllCategories}
          />
        );
      })}
    </div>
  );
};

export default AllTasksWidget;
