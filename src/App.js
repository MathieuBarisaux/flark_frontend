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
import Panel from "./components/Panel/Panel";

// ** Containers **
import UserManagement from "./containers/UserManagement/UserManagement";
import Dashboard from "./containers/Dashboard/Dashboard";

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

  const [taskFormOpen, setTaskFormOpen] = useState(false);

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

  return (
    <div className="App">
      <Router>
        {bearerToken && <Header />}

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

        {bearerToken && (
          <Panel tokenChange={tokenChange} setTokenChange={setTokenChange} />
        )}
      </Router>
    </div>
  );
}

export default App;
