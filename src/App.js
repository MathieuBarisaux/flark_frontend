import "./App.scss";

// ** Hooks **
import { useEffect, useState } from "react";

// ** Dependencies **
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ** Components **
import Header from "./components/Header/Header";
import HeaderMobile from "./components/HeaderMobile/HeaderMobile";
import Panel from "./components/Panel/Panel";
import TaskForm from "./components/TaskForm/TaskForm";
import HelpCenter from "./components/HelpCenter/HelpCenter";

// ** Containers **
import UserManagement from "./containers/UserManagement/UserManagement";
import Dashboard from "./containers/Dashboard/Dashboard";
import AllTasks from "./containers/AllTasks/AllTasks";
import Statistics from "./containers/Statistics/Statistics";
import Settings from "./containers/Settings/Settings";

// ** Functions **
import checkIfTokenExist from "./Functions/checkIfTokenExist";
import fetchData from "./Functions/fetchData";

// ** Redux **
import { useDispatch, useSelector } from "react-redux";

function App() {
  /*************************************************** TEST ****************************************************/
  const dispatch = useDispatch();
  const { userToken, userTokenChange, userInformationsChange } = useSelector(
    (state) => ({
      ...state.tokenManagementReducer,
    })
  );

  // ** Manage token **
  useEffect(() => {
    dispatch({ type: "setToken", payload: checkIfTokenExist() });
    // eslint-disable-next-line
  }, [userTokenChange]);

  /**************************************************************************************************************/

  // ** Manage categories **
  const [allCategories, setAllCategories] = useState([]);
  const [allCategoriesLoading, setAllCategoriesLoading] = useState(false);

  const [refreshAllCategories, setRefreshAllCategories] = useState(false);

  /* Call server to access all categories */
  useEffect(() => {
    if (userToken) {
      fetchData(
        "/category/read",
        setAllCategories,
        userToken,
        setAllCategoriesLoading
      );
    }
  }, [userToken, refreshAllCategories]);

  // ** Manage tasks **
  const [allTasks, setAllStasks] = useState("");
  const [refreshAllTasks, setRefreshAllTasks] = useState(false);

  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [allTasksLoading, setAllTasksLoading] = useState(true);

  /* Call server to access all tasks */
  useEffect(() => {
    if (userToken) {
      fetchData("/todo/read", setAllStasks, userToken, setAllTasksLoading);
    }
  }, [userToken, refreshAllTasks]);

  /* Divide tasks by type */
  let urgentTasks = [];
  let importantTasks = [];
  let urgentImportantTasks = [];
  let otherTasks = [];
  for (let i = 0; i < allTasks.length; i++) {
    const actualTask = allTasks[i];

    if (actualTask.urgent === true && actualTask.important === true) {
      urgentImportantTasks.push(actualTask);
    } else if (actualTask.urgent === true && actualTask.important === false) {
      urgentTasks.push(actualTask);
    } else if (actualTask.urgent === false && actualTask.important === true) {
      importantTasks.push(actualTask);
    } else {
      otherTasks.push(actualTask);
    }
  }

  // ** Manage user informations **
  useEffect(() => {
    const checkUserInfos = JSON.parse(localStorage.getItem("InfosUser"));

    dispatch({ type: "setUserInformations", payload: checkUserInfos });
    // eslint-disable-next-line
  }, [userInformationsChange]);

  // ** Help Center **
  const [helpCenterOpen, setHelpCenterOpen] = useState(false);

  /********************* Component ***********************/
  return (
    <div className="App">
      <Router>
        {userToken && (
          <>
            <Header setHelpCenterOpen={setHelpCenterOpen} />
            <HeaderMobile setHelpCenterOpen={setHelpCenterOpen} />
          </>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                allCategories={allCategories}
                refreshAllCategories={refreshAllCategories}
                setRefreshAllCategories={setRefreshAllCategories}
                allCategoriesLoading={allCategoriesLoading}
                setTaskFormOpen={setTaskFormOpen}
                allTasks={allTasks}
                allTasksLoading={allTasksLoading}
                refreshAllTasks={refreshAllTasks}
                setRefreshAllTasks={setRefreshAllTasks}
              />
            }
          />

          <Route
            path="/allTasks"
            element={
              <AllTasks
                urgentTasks={urgentTasks}
                urgentImportantTasks={urgentImportantTasks}
                importantTasks={importantTasks}
                otherTasks={otherTasks}
                refreshAllCategories={refreshAllCategories}
                setRefreshAllCategories={setRefreshAllCategories}
                refreshAllTasks={refreshAllTasks}
                setRefreshAllTasks={setRefreshAllTasks}
                setTaskFormOpen={setTaskFormOpen}
              />
            }
          />

          <Route path="/statistics" element={<Statistics />} />

          <Route path="/settings" element={<Settings />} />

          {/* User Management */}
          <Route path="/signup" element={<UserManagement type={"signup"} />} />
          <Route path="/signin" element={<UserManagement type={"signin"} />} />
        </Routes>

        {/* Set Help Center*/}
        {helpCenterOpen && <HelpCenter setHelpCenterOpen={setHelpCenterOpen} />}

        {/* Set modales */}
        {taskFormOpen && (
          <TaskForm
            setTaskFormOpen={setTaskFormOpen}
            allCategories={allCategories}
            refreshAllTasks={refreshAllTasks}
            setRefreshAllTasks={setRefreshAllTasks}
            refreshAllCategories={refreshAllCategories}
            setRefreshAllCategories={setRefreshAllCategories}
          />
        )}

        {/* Set panel */}
        {userToken && (
          <Panel
            urgentTasks={urgentTasks}
            urgentImportantTasks={urgentImportantTasks}
            importantTasks={importantTasks}
            otherTasks={otherTasks}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
