import "./AllTasksWidget.scss";

// ** Components **
import Task from "../Task/Task";

const AllTasksWidget = ({
  allTasks,
  refreshAllTasks,
  setRefreshAllTasks,
  refreshAllCategories,
  setRefreshAllCategories,
  bearerToken,
}) => {
  return (
    <div className="AllTasksWidget">
      <h4>All Tasks</h4>

      <div className="AllTasksWidget__container">
        {allTasks.map((item) => {
          return (
            <Task
              item={item}
              key={item._id}
              refreshAllTasks={refreshAllTasks}
              setRefreshAllTasks={setRefreshAllTasks}
              refreshAllCategories={refreshAllCategories}
              setRefreshAllCategories={setRefreshAllCategories}
              onDashboard={true}
              bearerToken={bearerToken}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllTasksWidget;
