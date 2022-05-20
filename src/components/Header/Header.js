import "./Header.scss";

import { useState } from "react";

const Header = (props) => {
  const [headerIsClose, setHeaderIsClose] = useState(false);

  const { pageUser, setPageUser } = props;

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
        <div
          className={
            pageUser === "Dashboard"
              ? "Header__NavElement Header__NavElement--isActive"
              : "Header__NavElement"
          }
          onClick={() => {
            setPageUser("Dashboard");
          }}
        >
          <div>
            <i className="fas fa-home"></i>
          </div>
          <p>Dashboard</p>
        </div>

        <div
          className={
            pageUser === "AllTasks"
              ? "Header__NavElement Header__NavElement--isActive"
              : "Header__NavElement"
          }
          onClick={() => {
            setPageUser("AllTasks");
          }}
        >
          <div>
            <i className="fas fa-tasks"></i>
          </div>
          <p>Tasks</p>
        </div>

        <div
          className={
            pageUser === "Statistics"
              ? "Header__NavElement Header__NavElement--isActive"
              : "Header__NavElement"
          }
          onClick={() => {
            setPageUser("Statistics");
          }}
        >
          <div>
            <i className="fas fa-chart-pie"></i>
          </div>
          <p>Statistics</p>
        </div>

        <div
          className={
            pageUser === "Settings"
              ? "Header__NavElement Header__NavElement--isActive"
              : "Header__NavElement"
          }
          onClick={() => {
            setPageUser("Settings");
          }}
        >
          <div>
            <i className="fas fa-cogs"></i>
          </div>
          <p>Settings</p>
        </div>
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
