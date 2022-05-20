import "./App.scss";

// ** Dependancies **
import Cookie from "js-cookie";

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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkCookieToken = Cookie.get("token");
    const checkCookieUserId = Cookie.get("userId");

    if (checkCookieToken) {
      setBearerToken(checkCookieToken);
    } else {
      setBearerToken(null);
    }

    if (checkCookieUserId) {
      setUserId(checkCookieUserId);
    } else {
      setBearerToken(null);
    }
  }, [tokenChange]);

  return (
    <div className="App">
      <Router>
        {bearerToken && <Header />}

        <Routes>
          <Route
            path="/"
            element={
              <Dashboard bearerToken={bearerToken} tokenChange={tokenChange} />
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
