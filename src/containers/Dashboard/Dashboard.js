import "./Dashboard.scss";

// ** Components **
import LoadScreen from "../../components/LoadScreen/LoadScreen";
import Categories from "../../components/Categories/Categories";

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
        </>
      )}
    </div>
  );
};

export default Dashboard;
