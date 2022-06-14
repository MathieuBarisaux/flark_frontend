import "./App.scss";

// ** Dependancies **
import Cookie from "js-cookie";
import axios from "axios";

// ** Hooks **
import { useEffect, useState } from "react";

// ** Dependancies **
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

  /* Call to server to access all categories */
  //! CHANGE BACK FOR USER !!!!!
  useEffect(() => {
    const callServerForAllCategories = async () => {
      try {
        setAllCategoriesLoading(true);
        const response = await axios.get("http://localhost:3001/category/read");

        setAllCategories(response.data);
        setAllCategoriesLoading(true);
        setAllCategoriesLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    callServerForAllCategories();
  }, [refreshAllCategories]);

  // ** TASKS GESTION **
  const [allTasks, setAllStasks] = useState("");
  const [refreshAllTasks, setRefreshAllTasks] = useState(false);

  const [taskFormOpen, setTaskFormOpen] = useState(false);

  useEffect(() => {
    const callServerForAllTasks = async () => {
      try {
        const responses = await axios.get("http://localhost:3001/todo/read");
        setAllStasks(responses.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    callServerForAllTasks();
  }, [refreshAllTasks]);

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

  return (
    <div className="App">
      <Router>
        {bearerToken && (
          <>
            <Header /> <HeaderMobile />
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

          {/* User Management */}
          <Route
            path="/signup"
            element={
              <UserManagement
                tokenChange={tokenChange}
                setTokenChange={setTokenChange}
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
              />
            }
          />
        </Routes>

        {/* Set modales */}
        {taskFormOpen && (
          <TaskForm
            setTaskFormOpen={setTaskFormOpen}
            allCategories={allCategories}
          />
        )}

        {/* Set panel */}

        {bearerToken && (
          <Panel tokenChange={tokenChange} setTokenChange={setTokenChange} />
        )}
      </Router>
    </div>
  );
}

export default App;
