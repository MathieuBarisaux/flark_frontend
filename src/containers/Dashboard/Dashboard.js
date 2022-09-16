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
import { useEffect } from "react";

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
  } = props;

  const { userToken, userTokenChange, userInformations } = useSelector(
    (state) => ({
      ...state.tokenManagementReducer,
      ...state.userInformationsReducer,
    })
  );

  const naviguate = useNavigate();

  // Redirection if token
  useEffect(() => {
    if (!userToken) {
      naviguate("/signup");
    }
    // eslint-disable-next-line
  }, [userTokenChange, userToken]);

  return (
    <div className="Dashboard">
      {allCategoriesLoading ? (
        <LoadScreen />
      ) : (
        <>
          <h2>
            What's up,{" "}
            {userInformations && upperCaseFirst(userInformations.pseudo)} ? 👋
          </h2>

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
