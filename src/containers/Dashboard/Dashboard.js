import "./Dashboard.scss";

// ** Components **
import LoadScreen from "../../components/LoadScreen/LoadScreen";
import Categories from "../../components/Categories/Categories";

import AllTasksWidget from "../../components/AllTasksWidget/AllTasksWidget";
import Notes from "../../components/Notes/Notes";

import NewTaskButton from "../../components/NewTaskButton/NewTaskButton";

// ** Dependancies **
import { useNavigate } from "react-router-dom";

// ** Hooks **
import { useEffect, useState } from "react";

// ** Functions **
import upperCaseFirst from "../../Functions/upperCaseFirst";

// ** Redux **
import { useSelector } from "react-redux";

const Dashboard = (props) => {
  const {
    allCategories,
    refreshAllCategories,
    setRefreshAllCategories,
    allCategoriesLoading,
    setTaskFormOpen,
    allTasks,
    refreshAllTasks,
    setRefreshAllTasks,
    userInformations,
  } = props;

  const { userToken, userTokenChange } = useSelector((state) => ({
    ...state.tokenManagementReducer,
  }));

  const naviguate = useNavigate();

  const [userPseudo, setUserPseudo] = useState("");

  // Redirection if token
  useEffect(() => {
    if (!userToken) {
      naviguate("/signup");
    }
    // eslint-disable-next-line
  }, [userTokenChange, userToken]);

  useEffect(() => {
    if (userInformations) {
      setUserPseudo(upperCaseFirst(userInformations.pseudo));
    }
  }, [userInformations]);

  return (
    <div className="Dashboard">
      {allCategoriesLoading ? (
        <LoadScreen />
      ) : (
        <>
          <h2>What's up, {userPseudo} ? 👋</h2>

          <Categories
            allCategories={allCategories}
            setRefreshAllCategories={setRefreshAllCategories}
            refreshAllCategories={refreshAllCategories}
            refreshAllTasks={refreshAllTasks}
            setRefreshAllTasks={setRefreshAllTasks}
          />

          <div className="Dashboard__bottom">
            <AllTasksWidget
              allTasks={allTasks}
              refreshAllTasks={refreshAllTasks}
              setRefreshAllTasks={setRefreshAllTasks}
              refreshAllCategories={refreshAllCategories}
              setRefreshAllCategories={setRefreshAllCategories}
            />

            <Notes />
          </div>

          <NewTaskButton setTaskFormOpen={setTaskFormOpen} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
