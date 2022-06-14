import "./Dashboard.scss";

// ** Components **
import LoadScreen from "../../components/LoadScreen/LoadScreen";
import Categories from "../../components/Categories/Categories";
import NewTaskButton from "../../components/NewTaskButton/NewTaskButton";

// ** Dependancies **
import { useNavigate } from "react-router-dom";

// ** Hooks **
import { useEffect } from "react";

const Dashboard = (props) => {
  const {
    bearerToken,
    tokenChange,
    allCategories,
    refreshAllCategories,
    setRefreshAllCategories,
    allCategoriesLoading,
    setTaskFormOpen,
  } = props;

  const naviguate = useNavigate();

  // Redirection if token
  useEffect(() => {
    if (!bearerToken) {
      naviguate("/signin");
    }
    // eslint-disable-next-line
  }, [tokenChange, bearerToken]);

  return (
    <div className="Dashboard">
      {allCategoriesLoading ? (
        <LoadScreen />
      ) : (
        <>
          <h2>What's up, ?USER?</h2>
          <Categories
            allCategories={allCategories}
            setRefreshAllCategories={setRefreshAllCategories}
            refreshAllCategories={refreshAllCategories}
          />

          <NewTaskButton setTaskFormOpen={setTaskFormOpen} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
