import "./Dashboard.scss";

// ** Components **
import LoadScreen from "../../components/LoadScreen/LoadScreen";
import Categories from "../../components/Categories/Categories";

// ** Dependancies **
import { useNavigate } from "react-router-dom";

// ** Hooks **
import { useEffect, useState } from "react";

const Dashboard = (props) => {
  const { bearerToken, tokenChange, allCategories } = props;

  const naviguate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // Redirection if token
  useEffect(() => {
    if (!bearerToken) {
      naviguate("/signin");
    }
    // eslint-disable-next-line
  }, [tokenChange, bearerToken]);

  return (
    <div className="Dashboard">
      {isLoading ? (
        <LoadScreen />
      ) : (
        <>
          <h2>What's up, ?USER?</h2>
          <Categories allCategories={allCategories} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
