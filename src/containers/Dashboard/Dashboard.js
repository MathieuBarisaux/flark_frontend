import "./Dashboard.scss";

// ** Hooks **
import { useEffect } from "react";

// ** Dependancies **
import { useNavigate } from "react-router-dom";

const Dashboard = (props) => {
  const { bearerToken, tokenChange } = props;

  const naviguate = useNavigate();

  // Redirection if token
  useEffect(() => {
    if (!bearerToken) {
      naviguate("/signin");
    }
    // eslint-disable-next-line
  }, [tokenChange, bearerToken]);

  return <div></div>;
};

export default Dashboard;
