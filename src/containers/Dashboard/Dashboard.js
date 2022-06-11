import "./Dashboard.scss";

// ** Components **
import LoadScreen from "../../components/LoadScreen/LoadScreen";

// ** Dependancies **
import { useNavigate } from "react-router-dom";

// ** Hooks **
import { useEffect, useState } from "react";

const Dashboard = (props) => {
  const { bearerToken, tokenChange } = props;

  const naviguate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  // Redirection if token
  useEffect(() => {
    if (!bearerToken) {
      naviguate("/signin");
    }
    // eslint-disable-next-line
  }, [tokenChange, bearerToken]);

  return (
    <div className="Dashboard">
      {isLoading ? <LoadScreen /> : <div>lol</div>}
    </div>
  );
};

export default Dashboard;
