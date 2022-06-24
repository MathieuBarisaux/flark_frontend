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
        {allTasks.length > 0 ? (
          allTasks.map((item) => {
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
          })
        ) : (
          <div className="AllTasksWidget__empty">
            <p>Create your first task and change your daily life !</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTasksWidget;
