import "./Header.scss";

import { Link, useLocation } from "react-router-dom";

import { useState } from "react";

const Header = (props) => {
  const { pageUser } = props;

  const { pathname } = useLocation();

  const [headerIsClose, setHeaderIsClose] = useState(false);

  return (
    <header className={headerIsClose === true ? "Header--isClose" : ""}>
      <div
        className="Header__cross"
        onClick={() => setHeaderIsClose(!headerIsClose)}
      >
        <i className="fas fa-angle-left"></i>
      </div>

      <div className="Header__logo">
        <i className="fas fa-pen-nib"></i>
        <p>Flark</p>
      </div>

      <nav>
        <Link to={"/"}>
          <div
            className={
              pathname === "/"
                ? "Header__NavElement Header__NavElement--isActive"
                : "Header__NavElement"
            }
          >
            <div>
              <i className="fas fa-home"></i>
            </div>
            <p>Dashboard</p>
          </div>
        </Link>

        <Link to={"/allTasks"}>
          <div
            className={
              pathname === "/allTasks"
                ? "Header__NavElement Header__NavElement--isActive"
                : "Header__NavElement"
            }
          >
            <div>
              <i className="fas fa-tasks"></i>
            </div>
            <p>Tasks</p>
          </div>
        </Link>

        <Link to="/statistics">
          <div
            className={
              pathname === "/statistics"
                ? "Header__NavElement Header__NavElement--isActive"
                : "Header__NavElement"
            }
          >
            <div>
              <i className="fas fa-chart-pie"></i>
            </div>
            <p>Statistics</p>
          </div>
        </Link>

        <Link to={"settings"}>
          <div
            className={
              pathname === "/settings"
                ? "Header__NavElement Header__NavElement--isActive"
                : "Header__NavElement"
            }
          >
            <div>
              <i className="fas fa-cogs"></i>
            </div>
            <p>Settings</p>
          </div>
        </Link>
      </nav>

      <div className="Header__NavElement Header__NavElement--help">
        <div>
          <i className="far fa-question-circle"></i>
        </div>
        <p>Help center</p>
      </div>
    </header>
  );
};

export default Header;
