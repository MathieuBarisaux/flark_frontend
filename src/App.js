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

function App() {
  // ** Manage token **
  const [tokenChange, setTokenChange] = useState(false);
  const [bearerToken, setBearerToken] = useState(null);

  useEffect(() => {
    setBearerToken(checkIfTokenExist());
  }, [tokenChange]);

  // ** Manage categories **
  const [allCategories, setAllCategories] = useState([]);
  const [allCategoriesLoading, setAllCategoriesLoading] = useState(false);

  const [refreshAllCategories, setRefreshAllCategories] = useState(false);

  /* Call server to access all categories */
  useEffect(() => {
    if (bearerToken) {
      fetchData(
        "/category/read",
        setAllCategories,
        bearerToken,
        setAllCategoriesLoading
      );
    }
  }, [bearerToken, refreshAllCategories]);

  // ** Manage tasks **
  const [allTasks, setAllStasks] = useState("");
  const [refreshAllTasks, setRefreshAllTasks] = useState(false);

  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [allTasksLoading, setAllTasksLoading] = useState(true);

  /* Call server to access all tasks */
  useEffect(() => {
    if (bearerToken) {
      fetchData("/todo/read", setAllStasks, bearerToken, setAllTasksLoading);
    }
  }, [bearerToken, refreshAllTasks]);

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
  const [userInformations, setUserInformations] = useState(null);
  const [userInformationsChange, setUserInformationsChange] = useState(false);

  useEffect(() => {
    const checkUserInfos = JSON.parse(localStorage.getItem("InfosUser"));

    setUserInformations(checkUserInfos);
  }, [userInformationsChange]);

  // ** Help Center **
  const [helpCenterOpen, setHelpCenterOpen] = useState(false);

  /********************* Component ***********************/
  return (
    <div className="App">
      <Router>
        {bearerToken && (
          <>
            <Header setHelpCenterOpen={setHelpCenterOpen} />
            <HeaderMobile
              userInformations={userInformations}
              setHelpCenterOpen={setHelpCenterOpen}
            />
          </>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                bearerToken={bearerToken}
                tokenChange={tokenChange}
                allCategories={allCategories}
                refreshAllCategories={refreshAllCategories}
                setRefreshAllCategories={setRefreshAllCategories}
                allCategoriesLoading={allCategoriesLoading}
                setTaskFormOpen={setTaskFormOpen}
                allTasks={allTasks}
                allTasksLoading={allTasksLoading}
                refreshAllTasks={refreshAllTasks}
                setRefreshAllTasks={setRefreshAllTasks}
                userInformations={userInformations}
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
                bearerToken={bearerToken}
              />
            }
          />

          <Route path="/statistics" element={<Statistics />} />

          <Route
            path="/settings"
            element={
              <Settings
                userInformations={userInformations}
                tokenChange={tokenChange}
                setTokenChange={setTokenChange}
                bearerToken={bearerToken}
                userInformationsChange={userInformationsChange}
                setUserInformationsChange={setUserInformationsChange}
              />
            }
          />

          {/* User Management */}
          <Route
            path="/signup"
            element={
              <UserManagement
                tokenChange={tokenChange}
                setTokenChange={setTokenChange}
                userInformationsChange={userInformationsChange}
                setUserInformationsChange={setUserInformationsChange}
                bearerToken={bearerToken}
                type={"signup"}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <UserManagement
                tokenChange={tokenChange}
                setTokenChange={setTokenChange}
                bearerToken={bearerToken}
                type={"signin"}
                userInformationsChange={userInformationsChange}
                setUserInformationsChange={setUserInformationsChange}
              />
            }
          />
        </Routes>

        {/* Set Help Center*/}
        {helpCenterOpen && (
          <HelpCenter
            setHelpCenterOpen={setHelpCenterOpen}
            bearerToken={bearerToken}
          />
        )}

        {/* Set modales */}
        {taskFormOpen && (
          <TaskForm
            setTaskFormOpen={setTaskFormOpen}
            allCategories={allCategories}
            refreshAllTasks={refreshAllTasks}
            setRefreshAllTasks={setRefreshAllTasks}
            refreshAllCategories={refreshAllCategories}
            setRefreshAllCategories={setRefreshAllCategories}
            bearerToken={bearerToken}
          />
        )}

        {/* Set panel */}
        {bearerToken && (
          <Panel
            tokenChange={tokenChange}
            setTokenChange={setTokenChange}
            userInformations={userInformations}
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
