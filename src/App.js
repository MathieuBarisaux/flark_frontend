import "./App.scss";

// ** Dependancies **
import Cookie from "js-cookie";
import axios from "axios";

// ** Hooks **
import { useEffect, useState } from "react";

// ** Dependencies **
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ** Components **
import Header from "./components/Header/Header";
import HeaderMobile from "./components/HeaderMobile/HeaderMobile";
import Panel from "./components/Panel/Panel";
import TaskForm from "./components/TaskForm/TaskForm";

// ** Containers **
import UserManagement from "./containers/UserManagement/UserManagement";
import Dashboard from "./containers/Dashboard/Dashboard";
import AllTasks from "./containers/AllTasks/AllTasks";
import Statistics from "./containers/Statistics/Statistics";
import Settings from "./containers/Settings/Settings";

function App() {
  const [tokenChange, setTokenChange] = useState(false);
  const [bearerToken, setBearerToken] = useState(null);

  useEffect(() => {
    const checkCookieToken = Cookie.get("token");

    if (checkCookieToken) {
      setBearerToken(checkCookieToken);
    } else {
      setBearerToken(null);
    }
  }, [tokenChange]);

  const [allCategories, setAllCategories] = useState([]);
  const [allCategoriesLoading, setAllCategoriesLoading] = useState(false);

  const [refreshAllCategories, setRefreshAllCategories] = useState(false);

  /* Call server to access all categories */
  useEffect(() => {
    if (bearerToken) {
      const callServerForAllCategories = async () => {
        try {
          setAllCategoriesLoading(true);
          const response = await axios.get(
            "http://localhost:3001/category/read",
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );

          setAllCategories(response.data);
          setAllCategoriesLoading(false);
        } catch (error) {
          console.log(error.response);
        }
      };
      callServerForAllCategories();
    }
  }, [bearerToken, refreshAllCategories]);

  // ** TASKS GESTION **
  const [allTasks, setAllStasks] = useState("");
  const [refreshAllTasks, setRefreshAllTasks] = useState(false);

  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [allTasksLoading, setAllTasksLoading] = useState(true);

  useEffect(() => {
    if (bearerToken) {
      const callServerForAllTasks = async () => {
        try {
          setAllTasksLoading(true);
          const responses = await axios.get("http://localhost:3001/todo/read", {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          });
          setAllStasks(responses.data);

          setAllTasksLoading(false);
        } catch (error) {
          console.log(error.response);
        }
      };
      callServerForAllTasks();
    }
  }, [bearerToken, refreshAllTasks]);

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

  // ** User informations **
  const [userInformations, setUserInformations] = useState(null);
  const [userInformationsChange, setUserInformationsChange] = useState(false);

  useEffect(() => {
    const checkUserInfos = JSON.parse(localStorage.getItem("InfosUser"));

    setUserInformations(checkUserInfos);
  }, [userInformationsChange]);

  return (
    <div className="App">
      <Router>
        {bearerToken && (
          <>
            <Header /> <HeaderMobile userInformations={userInformations} />
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
          />
        )}
      </Router>
    </div>
  );
}

export default App;
