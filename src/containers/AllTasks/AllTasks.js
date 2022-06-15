import "./AllTasks.scss";

// ** Hooks **
import { useState } from "react";

// ** Components **
import TasksWidget from "../../components/TasksWidget/TasksWidget";

const AllTasks = (props) => {
  const {
    urgentImportantTasks,
    urgentTasks,
    importantTasks,
    otherTasks,
    setTaskFormOpen,
    setRefreshAllTasks,
    refreshAllTasks,
    refreshAllCategories,
    setRefreshAllCategories,
  } = props;

  let totalTask =
    urgentImportantTasks.length +
    urgentTasks.length +
    importantTasks.length +
    otherTasks.length;

  return (
    <div className="AllTasks">
      <div className="AllTasks__container">
        <div className="AllTasks__infos">
          <div>
            <p>{urgentImportantTasks.length}</p>
            <p>
              Urgent & important
              <i className="fas fa-circle" style={{ color: "#FE452C" }}></i>
            </p>
          </div>
          <div className="AllTasks__infos--border"></div>
          <div>
            <p>{urgentTasks.length}</p>
            <p>
              Urgent
              <i className="fas fa-circle" style={{ color: "#FFA128" }}></i>
            </p>
          </div>
          <div className="AllTasks__infos--border"></div>
          <div>
            <p>{importantTasks.length}</p>
            <p>
              Important
              <i className="fas fa-circle" style={{ color: "#52E1F8" }}></i>
            </p>
          </div>
          <div className="AllTasks__infos--border"></div>
          <div>
            <p>{otherTasks.length}</p>
            <p>
              Other
              <i className="fas fa-circle" style={{ color: "#50E192" }}></i>
            </p>
          </div>
        </div>

        <div className="AllTasks__title">
          <h3>All tasks</h3>
          <div
            onClick={() => {
              setTaskFormOpen(true);
            }}
          >
            <div>
              <i className="fas fa-plus"></i>
            </div>
            <p>New tasks</p>
          </div>
        </div>

        <div className="AllTasks__bottom">
          <TasksWidget
            refreshAllTasks={refreshAllTasks}
            setRefreshAllTasks={setRefreshAllTasks}
            refreshAllCategories={refreshAllCategories}
            setRefreshAllCategories={setRefreshAllCategories}
            typeTasks={urgentImportantTasks}
            title={"Urgent & important"}
            labelColor={"#FE452C"}
          />

          <TasksWidget
            refreshAllTasks={refreshAllTasks}
            setRefreshAllTasks={setRefreshAllTasks}
            refreshAllCategories={refreshAllCategories}
            setRefreshAllCategories={setRefreshAllCategories}
            typeTasks={urgentTasks}
            title={"Urgent"}
            labelColor={"#FFA128"}
          />

          <TasksWidget
            refreshAllTasks={refreshAllTasks}
            setRefreshAllTasks={setRefreshAllTasks}
            refreshAllCategories={refreshAllCategories}
            setRefreshAllCategories={setRefreshAllCategories}
            typeTasks={importantTasks}
            title={"Important"}
            labelColor={"#52E1F8"}
          />

          <TasksWidget
            refreshAllTasks={refreshAllTasks}
            setRefreshAllTasks={setRefreshAllTasks}
            refreshAllCategories={refreshAllCategories}
            setRefreshAllCategories={setRefreshAllCategories}
            typeTasks={otherTasks}
            title={"Other"}
            labelColor={"#50E192"}
          />
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
